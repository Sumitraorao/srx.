
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateText(prompt: string, systemInstruction?: string) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction || "You are SrxAI, a helpful AI assistant for SRXHUB business operations."
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Text Error:", error);
        throw error;
    }
}

export async function generateImage(prompt: string) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: "1:1"
                }
            }
        });

        const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (imagePart?.inlineData?.data) {
            return `data:${imagePart.inlineData.mimeType || 'image/png'};base64,${imagePart.inlineData.data}`;
        }
        throw new Error("No image data returned from Gemini");
    } catch (error) {
        console.error("Gemini Image Error:", error);
        throw error;
    }
}

export async function generateCode(prompt: string, language: string = "typescript") {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-pro-preview",
            contents: `Generate high-quality ${language} code for: ${prompt}. Return ONLY the code inside a markdown code block.`,
            config: {
                systemInstruction: "You are a senior software architect for SRXHUB. Your goal is to build highly scalable and secure applications."
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Code Error:", error);
        throw error;
    }
}

export async function analyzeData(data: any, query: string) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Analyze this data: ${JSON.stringify(data)}. Question: ${query}`,
            config: {
                systemInstruction: "You are a business intelligence expert. Provide sharp, actionable insights."
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Analytics Error:", error);
        throw error;
    }
}
