
import { GoogleGenAI, Modality } from "@google/genai";
import type { AspectRatio } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImageFromPrompt = async (prompt: string, aspectRatio: AspectRatio): Promise<{ base64: string, mimeType: string }> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `An ultra-realistic, high-resolution, professional photograph of the following car concept: ${prompt}. Cinematic lighting, studio quality.`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });
    
    if (response.generatedImages && response.generatedImages.length > 0) {
      const image = response.generatedImages[0];
      return { base64: image.image.imageBytes, mimeType: 'image/jpeg' };
    } else {
      throw new Error("No images were generated.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image. Please check your prompt and API key.");
  }
};

export const refineImageWithPrompt = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<{ base64: string, mimeType: string, text: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: `Refine the car design with this instruction: ${prompt}. Maintain realism and photographic quality.`,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let newBase64 = '';
    let newMimeType = '';
    let textResponse = '';

    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        textResponse = part.text;
      } else if (part.inlineData) {
        newBase64 = part.inlineData.data;
        newMimeType = part.inlineData.mimeType;
      }
    }

    if (!newBase64) {
      throw new Error("Image refinement did not produce a new image.");
    }
    
    return { base64: newBase64, mimeType: newMimeType, text: textResponse };
  } catch (error) {
    console.error("Error refining image:", error);
    throw new Error("Failed to refine image. The model may not have been able to fulfill the request.");
  }
};
