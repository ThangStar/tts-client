import { ttm_data, ttm_response, TTMApi } from "@/api/ttm.api";
import { TTSApi } from "@/api/tts.api";
import { VOICE_LIST } from "@/constants/constants";
import { tts_response } from "@/types/tts_response.type";
import { voice } from "@/types/voice.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export type tts_dto = voice & {
    content: string;
};
export type tts_params_dto = Pick<voice, 'idRepo'> & {
    body: any,
    route: string
}
const action = {
    fetchTTS: createAsyncThunk('voice/fetchTTS', async (voice: tts_dto, thunkAPI) => {
        try {
            let bodys: any = voice.bodys;
            let res: tts_response = { progress: false, voice: voice };
            await Promise.all(bodys.map(async (body: any, index: number) => {
                // exist KEY == "TEXT" => tts_process
                // else => setup process
                if (!Object.keys(body).includes("TEXT")) {
                    if (Array.isArray(body.text)) {
                        body = [voice.content];
                    } else {
                        await Promise.all(Object.keys(body).map(async (key) => {
                            if (key === "speaker_audio_file") {
                                await TTSApi.loadModel();
                                console.log("có speaker_audio_file");
                                const response = await fetch(voice.voice_uri);
                                const audioBlob = await response.blob();
                                body = { ...body, [key]: audioBlob };
                            } else if (body[key] === "TEXT") {
                                body = { ...body, [key]: voice.content };
                            }
                        }));
                    }
                    const params: tts_params_dto = {
                        idRepo: voice.idRepo,
                        body: body,
                        route: voice.bodys![index].route
                    };

                    console.log("params", params);
                    const data: tts_response = await TTSApi.tts(params);
                    console.log("server response", data);
                    const httpValue = Object.values(data).find(value => typeof value === 'string' && value.includes('http'));
                    if (httpValue) {
                        console.log("httpValue", httpValue);
                        res = { ...data, url: httpValue, voice: voice };
                    } else {
                        const tmpValue = Object.values(data).find(value => typeof value === 'string' && value.includes('/tmp'));
                        if (tmpValue) {
                            res = { ...data, voice: voice, url: `${voice.idRepo}file=${tmpValue}` };
                        }
                    }
                }
            }));
            console.log("final ", res);
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),
    addVoice: createAsyncThunk('voice/addVoice', async (voice: voice, thunkAPI) => {
        return thunkAPI.fulfillWithValue(voice)
    }),
    setVoiceSelected: createAsyncThunk('voice/setVoiceSelected', async (voice: voice, thunkAPI) => {
        return thunkAPI.fulfillWithValue(voice)
    }),
    ttm: createAsyncThunk('ttm/ttm', async ({ text, token }: { text: string, token: string }, thunkAPI) => {
        toast("Đang sáng tác...")
        try {
            const res = await TTMApi.ttm(text, token)
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue({error, mediaTitle: text})
        }
    }),
    ttmLoading: createAsyncThunk('ttm/ttmLoading', async (payload: { loading: boolean, mediaTitle: string }, thunkAPI) => {
        return thunkAPI.fulfillWithValue(payload)
    })
}

export type VoiceState = {
    voiceExports: tts_response[],
    voiceSelected: voice,
    voiceTtm: ttm_data[]
}

export const initialData: VoiceState = {
    voiceExports: [],
    voiceSelected: VOICE_LIST[0],
    voiceTtm: []
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
                    ...action.payload,
                    voice: action.payload.voice,
                    progress: false,
                    url: String(action.payload.url) // Ensure url is a string
                }
            } else {
                state.value.voiceExports.push(
                    {
                        ...action.payload,
                        voice: action.payload.voice,
                        progress: false,
                        url: String(action.payload.url) // Ensure url is a string
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
            .addCase(action.ttm.fulfilled, (state, action) => {
                toast(`Hoàn tất ttm`);
                const index = state.value.voiceTtm.findIndex((voice: ttm_data) => voice.mediaTitle === action.payload.mediaTitle && voice.loading)
                if (index !== -1) {
                    state.value.voiceTtm[index] = {
                        ...action.payload,
                        loading: false,
                    }
                } else {
                    state.value.voiceTtm.push(action.payload)
                }
            })
            .addCase(action.ttm.rejected, (state, action) => {
                console.log("payload", action.payload);

                const index = state.value.voiceTtm.findIndex((voice: ttm_data) => voice.mediaTitle === (action.payload as any).mediaTitle && voice.loading)
                if (index !== -1) {
                    state.value.voiceTtm.splice(index, 1)
                }
                let payload = action.payload as any;
                if(payload.error){
                    payload = payload.error
                    toast.error(payload.response && payload.response.data ? payload.response.data.message : payload.message);
                }
            })
            .addCase(action.ttmLoading.fulfilled, (state, action) => {
                state.value.voiceTtm.push({
                    loading: action.payload.loading,
                    mediaTitle: action.payload.mediaTitle
                })
            })
    },
})
export const VoiceAction = {
    ...voiceSlice.actions, ...action
}
export default voiceSlice