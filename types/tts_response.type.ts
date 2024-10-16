import { voice } from "./voice.type";

export type tts_response = {
    is_stream?: boolean;
    mime_type?: string | null;
    orig_name?: string | null;
    path?: string | null;
    size?: number | null;
    url?: string;
    voice: voice;
    progress: boolean;
}