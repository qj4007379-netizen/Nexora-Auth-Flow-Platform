import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export const runtime = "edge";

const prompt = `You are a helpful assistant that provides suggestions for improving messages.
 When given a message, you will analyze it and suggest improvements in terms of clarity, tone, and grammar.
  Your suggestions should be concise and actionable. 
  
  If the message is already well-written, you can simply acknowledge that. 
  Always provide constructive feedback to help the user enhance their communication.`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_completion_tokens: 2000,
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
    });

    // Convert the OpenAI stream to a proper Response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(`data: ${content}\n\n`));
            }
          }
          // Send completion marker
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (streamError) {
          controller.error(streamError);
        }
      }
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type',
      },
    });
  } catch (error) {
    console.error("Error in suggest-message API:", error);
    
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return new Response(JSON.stringify({ 
        error: name, 
        status, 
        message 
      }), { 
        status,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ 
        error: "Internal Server Error",
        message: "An unexpected error occurred while processing your request."
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}
