import { tts_dto, tts_params_dto } from "@/redux/slice/voice.slice";
import { tts_response } from "@/types/tts_response.type";
import { Client } from "@gradio/client";
import { omit } from "lodash";


export const TTSApi = {
    tts: async (params: tts_params_dto) => {
        console.log('body', params.body);

        const client = await Client.connect(params.idRepo);
        console.log("Đã connect được đến server");

        console.log("BODY SAMSUNG", params.body.route ? omit(params.body, ['route']) : params.body);

        const result = await client.predict(params.route || "/text_to_speech", params.body.route ? omit(params.body, ['route']) : params.body);
        console.log("Đã predict được");
        console.log("result", result.data, Array.isArray(result.data));

        const data = result.data as tts_response[]
        let res: tts_response | null = null
        if (Array.isArray(data)) {
            data.map((e, i) => {
                if (e.url && typeof e.url === 'string') {
                    if (e.url.includes('.wav')) {
                        console.log("OK", e);
                        res = e
                    }
                }
            })
        }
        return res || data[0] || null
    },
    loadModel: async () => {
        const client = await Client.connect("akthangdz/tts-vie2");
        const result = await client.predict("/load_model", {
            checkpoint_dir: "/home/user/app/model",
            repo_id: "capleaf/viXTTS",
            use_deepspeed: true,
        });
    }
}
