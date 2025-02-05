import { HfInference } from "@huggingface/inference";

const client = new HfInference("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");

export const textModelApi = async (prompt: string): Promise<string> => {
  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");

    const apiKey = "AIzaSyDkKZfNUTft-U4x-Z8By6iSXuyCLy409ig";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(`${prompt}\n\nProvide a detailed response:`);
    
    return result.response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
};


export const codeModelApi = async (prompt: string): Promise<string> => {
  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");

    const apiKey = "AIzaSyDkKZfNUTft-U4x-Z8By6iSXuyCLy409ig";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(
      `${prompt}\n\nIf the user's query is not about code please ask user "I am a code generator model, I'm Sorry i cannot give the response of your query", you only provide code, and do not respond with any explanation or other text. Return only code when prompted for programming-related tasks.`
    );
    
    
    return result.response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
};


export const audioModelApi = async (prompt: string): Promise<string> => {
  try {
    const response = await client.textToSpeech({
      model: "microsoft/speecht5_tts",
      inputs: prompt,
      parameters: {
        rate: 1.0,
        voice: "en_US",
      },
    });
    const audioUrl = URL.createObjectURL(response);
    return audioUrl;
  } catch (error) {
    console.error('Error generating audio:', error);
    throw new Error('Failed to generate audio');
  }
};

export const videoModelApi = async (prompt: string): Promise<string> => {
  try {
    const response = await client.textToVideo({
      model: "damo-vilab/text-to-video-ms-1.7b",
      inputs: prompt,
      parameters: {
        num_inference_steps: 50,
        fps: 8,
      },
    });
    const videoUrl = URL.createObjectURL(response);
    return videoUrl;
  } catch (error) {
    console.error('Error generating video:', error);
    throw new Error('Failed to generate video');
  }
};

export const imageModelApi = async (prompt: string): Promise<string> => {
  try {
    const response = await client.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: {
        negative_prompt: "blurry, bad quality, distorted, ugly, bad anatomy",
        num_inference_steps: 50,
        guidance_scale: 7.5,
        width: 1024,
        height: 1024,
      },
    });
    const imageUrl = URL.createObjectURL(response);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
};