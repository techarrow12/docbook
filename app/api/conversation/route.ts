import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
import OpenAIApi from "openai";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

// const openai = new OpenAIApi(configuration);

  export async function POST(
    req: Request
  ) {
    try {
      const { userId } = auth();
      const body = await req.json();
      let { messages } = body;
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!openai.apiKey) {
        return new NextResponse("OpenAI API Key not configured.", { status: 500 });
      }
  
      if (!messages) {
        return new NextResponse("Messages are required", { status: 400 });
      }

      const freeTrial = await checkApiLimit();
      const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    // Including a prompt that guides GPT to behave as a clinical assistant
    messages = [
      ...messages,
      { role: "system", content: "You are a highly knowledgeable clinical assistant. Provide accurate, concise medical information and include a reference link in your response." },
    ];

  
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages
      });

      if (!isPro) {
        await incrementApiLimit();
      }

      await incrementApiLimit();
  
      return NextResponse.json(response.choices[0].message);
    } catch (error) {
      console.log('[CONVERSATION_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };

