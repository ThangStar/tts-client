const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
interface Content {
    role: string;
    parts: { text: string }[];
}

interface SystemInstruction {
    role: string;
    parts: { text: string }[];
}

interface GenerationConfig {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
    responseMimeType: string;
}

interface RequestBody {
    contents: Content[];
    systemInstruction: SystemInstruction;
    generationConfig: GenerationConfig;
}

export async function generateContent(userInput: string, instruction: string): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=${API_KEY}`;

    const requestBody: RequestBody = {
        contents: [
            {
                role: "user",
                parts: [{ text: userInput }]
            }
        ],
        systemInstruction: {
            role: "user",
            parts: [
                {
                    text: `${instruction}chỉ cần trả lời theo tính cách trên thôi nhé!`
                }
            ]
        },
        generationConfig: {
            temperature: 1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain"
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let text = data.candidates[0].content.parts[0].text;
        
        // Remove quotation marks and keep newline characters
        text = text.replace(/^"|"$/g, '').replace(/\\n/g, '\n');
        return text;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
