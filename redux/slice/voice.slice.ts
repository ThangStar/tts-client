import { TTSApi } from "@/api/tts.api";
import { VOICE_LIST } from "@/constants/constants";
import { tts_response } from "@/types/tts_response.type";
import { voice } from "@/types/voice.type";
import { VoiceExport } from "@/types/voice_export.type";
import { Client } from "@gradio/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export type tts_dto = voice & {
    content: string;
};
export type tts_params_dto = Pick<voice, 'body' | 'idRepo' | 'route'>
const action = {
    fetchTTS: createAsyncThunk('voice/fetchTTS', async (voice: tts_dto, thunkAPI) => {
        try {
            console.log("Đã chuyển sang blob");
            let body: any = null;
            if (Array.isArray(voice.body)) {
                body = [voice.content]
            } else {
                body = voice.body
                Object.keys(voice.body).forEach(async (key) => {
                    console.log(key);
                    if (key === "speaker_audio_file") {
                        const response = await fetch(voice.voice_uri);
                        const audioBlob = await response.blob();
                        body!.speaker_audio_file = audioBlob
                    }
                    if (voice.body[key] === "TEXT") {
                        body = { ...voice.body, [key]: voice.content }
                    }

                });
            }
            console.log(1111111);

            console.log(body);

            const params: tts_params_dto = {
                idRepo: voice.idRepo,
                route: voice.route,
                body: body
            }

            console.log(params);
            const data: tts_response = await TTSApi.tts(params);
            // Kiểm tra nếu data có key chứa value c chứa http
            const httpValue = Object.values(data).find(value => typeof value === 'string' && value.includes('http'));
            if (httpValue) {
                return thunkAPI.fulfillWithValue({ voice: voice, response: { ...data, url: httpValue } });
            }
            // Nếu không, tìm key nào có value chứa /tmp
            const tmpValue = Object.values(data).find(value => typeof value === 'string' && value.includes('/tmp'));
            if (tmpValue) {
                return thunkAPI.fulfillWithValue({ voice: voice, response: { ...data, url: `${voice.idRepo}file=${tmpValue}` } });
            }
        } catch (error) {
            console.error("Error in TTS process:", error);
        }
        return thunkAPI.rejectWithValue('Lỗi')
    }),
    addVoice: createAsyncThunk('voice/addVoice', async (voice: voice, thunkAPI) => {
        return thunkAPI.fulfillWithValue(voice)
    }),
    setVoiceSelected: createAsyncThunk('voice/setVoiceSelected', async (voice: voice, thunkAPI) => {
        return thunkAPI.fulfillWithValue(voice)
    })
}

export type VoiceState = {
    voiceExports: tts_response[],
    voiceSelected: voice,
}

export const initialData: VoiceState = {
    voiceExports: [],
    voiceSelected: VOICE_LIST[0]
}

export const voiceSlice = createSlice({
    name: 'voice',
    initialState: {
        value: initialData
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(action.fetchTTS.fulfilled, (state, action) => {
            toast(`Hoàn tất voice ${action.payload.voice.name}`);
            const index = state.value.voiceExports.findIndex((voice: tts_response) => voice.voice.id === action.payload.voice.id && voice.progress)
            if (index !== -1) {
                state.value.voiceExports[index] = {
                    ...action.payload.response,
                    voice: action.payload.voice,
                    progress: false,
                    url: String(action.payload.response.url) // Ensure url is a string
                }
            } else {
                state.value.voiceExports.push(
                    {
                        ...action.payload.response,
                        voice: action.payload.voice,
                        progress: false,
                        url: String(action.payload.response.url) // Ensure url is a string
                    }
                )
            }
        })
            .addCase(action.fetchTTS.rejected, (state, action) => {
                toast.error(`Lỗi: ${action.payload}`);
                state.value.voiceExports.map((voice) => {
                    voice.progress = false;
                })
            })
            .addCase(action.addVoice.fulfilled, (state, action) => {
                state.value.voiceExports.push({
                    progress: true,
                    voice: action.payload
                })
            })
            .addCase(action.setVoiceSelected.fulfilled, (state, action) => {
                state.value.voiceSelected = action.payload
            })
    },
})
export const VoiceAction = {
    ...voiceSlice.actions, ...action
}
export default voiceSlice
