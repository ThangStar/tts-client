import { tts_dto, tts_params_dto } from "@/redux/slice/voice.slice";
import { tts_response } from "@/types/tts_response.type";
import { Client } from "@gradio/client";
import { omit } from "lodash";

interface SoundDemoPayload {
    generationCount: number;
    clientContext: {
        tool: string;
        sessionId: string;
    };
    input: {
        textInput: string;
    };
    loop: boolean;
    model: string;
    soundLengthSeconds: number;
}
export type ttm_data = {
    data: string,
    audioContainer: string, 
    conversationToken: string,
    mediaTitle: string,
    soundLengthSeconds: number
}
export type ttm_response = {
    sounds: ttm_data[]
}
export const TTMApi = {
    ttm: async (text: string): Promise<ttm_response> => {
        const url = "https://aisandbox-pa.googleapis.com/v1:soundDemo";
        
        const headers = {
            "accept": "*/*",
            "accept-language": "vi,en-US;q=0.9,en;q=0.8",
            "authorization": "Bearer ya29.a0AeDClZAA_ikdHbBsfTeElk05hl2EJE7DEhKHXlOkGVf8lPiW-glKDDgxzvivR-UKaijJ88vfEt9ZRNCfeftkmQmVqR1kz0JMmYsjXXOyvuEOexI_dPuG8krDjSQEvCltmTAFaLbqAeCU2Bc4O--GV3AoN0JKTtS6FcfzihumQ6NsQvZKZQhe7NKmbru-tGdWg_OgkRwFbxV-m0RJUpxA8qP8ZPdiAG1wA9tS9wt04CYFddAXszOPZf_le-X7S7ke5LiYkiWyKasUc5jRrFFEwiJ2cnrUR3jd_HTaZPCDtmk4hdKSTZ7Of4vWU5KwT9QNQdTWkjXphsM0AM4eg-khr7-9clmdtj57NKR6hI-4ifBOxSHpmBLpPN1fvA2ESbUy4Njd3UuPL67jbHJMOKbNZ0Tt5UmRdXwIbIaaa88V4waCgYKARkSARESFQHGX2MixAvK2tp6SPomvhhWY8Me4A0433",
            "content-type": "text/plain;charset=UTF-8",
            "origin": "https://aitestkitchen.withgoogle.com",
            "referer": "https://aitestkitchen.withgoogle.com/"
        };

        const payload: SoundDemoPayload = {
            generationCount: 2,
            clientContext: {
                tool: "MUSICLM_V2",
                sessionId: `production;${Date.now()}`
            },
            input: {
                textInput: text
            },
            loop: true,
            model: "DEFAULT",
            soundLengthSeconds: 70
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as ttm_response;
        } catch (error) {
            console.error("Error making request:", error);
            throw error;
        }
    }
}
