import { tts_dto, tts_params_dto } from "@/redux/slice/voice.slice";
import { tts_response } from "@/types/tts_response.type";
import { Client } from "@gradio/client";


export const TTSApi = {
    tts: async (params: tts_params_dto) => {
        const client = await Client.connect(params.idRepo);
        console.log("Đã connect được đến server");
        const result = await client.predict(params.route || "/text_to_speech", params.body);
        console.log("Đã predict được");
        console.log(result.data);
        const data = result.data as tts_response[]
        if(Array.isArray(data) && data.length > 1 && data[1]!.url){
            return data[1]
        }
        return data[0] || null
    },
    loadModel: async (params: tts_params_dto) => {
        const client = await Client.connect("akthangdz/tts-vie2");
        const result = await client.predict("/load_model", {
            checkpoint_dir: "/home/user/app/model",
            repo_id: "capleaf/viXTTS",
            use_deepspeed: true,
        });

        console.log(result.data);
    }
}