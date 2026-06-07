"use client";

import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { User } from "next-auth";
import { refresh } from "next/cache";
import React, { useCallback, useEffect, useState } from "react";
import { Message } from "react-hook-form";
import { toast } from "sonner";

function page() {
  const [messages, setMaseges] = useState<Message[]>([]);
  const [isLoding, setIsLoding] = useState(false);
  const [isSwichLoding, setIsSwichLoading] = useState(false);
  const [tost] = useState();
  const hendelDeleteMessege = (id: string) => {
    setMaseges(messages.filter((messages) => messages.id !== messagesid));
  };
  const { data: session } = useSession();

  const { register, watch, setValue } = form;

  const acseptMessege = watch("acseptMessege");

  const fatcAcseptMessege = async () => {
    setIsSwichLoading(true);

    try {
      const respons = await axios.get("/api/accept-messages");

      setValue("acceptMessege", respons.data.isAcceptMessege);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response) {
        tost.error(axiosError.response?.data.message);
      }
    } finally {
      setIsLoding(true);
      setIsSwichLoading(false);
    }
  };

  const fatchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoding(true);
      setIsSwichLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/Api/get-messages");
        setMaseges(response.data.messages || []);

        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing Latest Masseges",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response) {
          tost.error(axiosError.response?.data.message);
        }
      } finally {
        setIsLoding(false);
        setIsSwichLoading(false);
      }
    },
    [setIsLoding, setMaseges],
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fatchMessages();
    fatcAcseptMessege();
  }, [session, setValue, fatcAcseptMessege, fatchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMasseges", !acceptMasseges);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
    
    }
  };

const {username} = session?.user as User 
const baseUrl = `$(window.location.protocol)//${window.location.host}`
const profileUrl = `${baseUrl}/u/${username}`


const copyToClipbord = () => {
  navigator.clipboard.writeText(profileUrl)
  toast({
    title: "URL copied" 
    discription: "profile URL hase been copid"
  })
}


  if (!session || !session.user ) {

    return <div>Please login</div>
    
  }

  return <div>page</div>;
}

export default page;
