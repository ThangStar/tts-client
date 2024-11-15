import { http } from "@/http/http";
import { tts_dto, tts_params_dto } from "@/redux/slice/voice.slice";
import { tts_response } from "@/types/tts_response.type";
import { Client } from "@gradio/client";
import axios from "axios";
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
    data?: string,
    audioContainer?: string, 
    conversationToken?: string,
    mediaTitle?: string,
    soundLengthSeconds?: number,
    audioEncoding?: string,
    mediaKey?: string,
    seed?: number,
    loading: boolean,
}
export type ttm_response = {
    sounds: ttm_data[]
}
export const TTMApi = {
    ttm: async (text: string, token: string, payloadDuration: number): Promise<ttm_data> => {
        const url = "http://haihoanghorse.io.vn/v2/api/ttm";
        console.log(payloadDuration);
        
        try {
            const response = await axios.post(url, {
                text: text,
                soundLengthSeconds: payloadDuration
            }, {
                headers: {
                    "x-api-token": token
                },
                timeout: 1000 * 60 * 10
            });
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }else{
                return response.data.data as ttm_data;
            }

        } catch (error: any) {
            console.error("Error making request:", error);
            throw error;
        }
    }
}
