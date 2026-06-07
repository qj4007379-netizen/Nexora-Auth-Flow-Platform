import {z} from 'zod';

export const acceptMessageSchema = z.object({
  content: z
  .string()
  .min(10, "Content must be at least 10 characters long").
  max(500, "Content must be at most 500 characters long"),
});
