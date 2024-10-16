import { voice } from "@/types/voice.type"

export const VOICE_LIST: voice[] = [
    {
        id: 5,
        name: 'Hoài My',
        idRepo: 'akthangdz/tts-vie-applio',
        avatar_uri: 'image/hoai-my.jpg',
        voice_uri: 'voice/hoai_my.mp3',
        route: "/text_to_speech",
        body: {
            text: "TEXT",
            voice: "vi-VN-HoaiMyNeural",
        }
    },
    {
        id: 6,
        name: 'Nam minh',
        idRepo: 'akthangdz/tts-vie-applio',
        avatar_uri: 'image/nam-minh.jpg',
        route: "/text_to_speech",
        voice_uri: 'voice/nam_minh.mp3',
        body: {
            text: "TEXT",
            voice: "vi-VN-NamMinhNeural",
        }
    },
    {
        id: 1,
        name: 'Thành Phạm',
        avatar_uri: 'image/thanh_pham.jpg',
        idRepo: 'akthangdz/tts-vie2',
        voice_uri: 'voice/thanhpham.wav',
        route: "/run_tts",
        body: {
            lang: "vi",
            tts_text: "TEXT",
            speaker_audio_file: '',
            use_deepfilter: true,
            normalize_text: true,
        }

    },
    {
        id: 2,
        name: 'Cô ba Bình Dương',
        idRepo: 'akthangdz/tts-vie2',
        avatar_uri: 'image/co_ba_binh_duong.jpg',
        voice_uri: 'voice/CoBaBinhDuong.wav',
        route: "/run_tts",
        body: {
            lang: "vi",
            tts_text: "TEXT",
            speaker_audio_file: '',
            use_deepfilter: true,
            normalize_text: true,
        }
    },
    {
        id: 3,
        name: 'Web 5 ngày',
        idRepo: 'akthangdz/tts-vie2',
        avatar_uri: 'image/web-5-ngay.jpg',
        voice_uri: 'voice/web5ngay.wav',
        route: "/run_tts",
        body: {
            lang: "vi",
            tts_text: "TEXT",
            speaker_audio_file: '',
            use_deepfilter: true,
            normalize_text: true,
        }
    },
    {
        id: 4,
        name: 'Vũ trụ nguyên thủy',
        idRepo: 'akthangdz/tts-vie2',
        avatar_uri: 'image/vu-tru-nguyen-thuy.jpg',
        voice_uri: 'voice/VuTruNguyenThuy.wav',
        route: "/run_tts",
        body: {
            lang: "vi",
            tts_text: "TEXT",
            speaker_audio_file: '',
            use_deepfilter: true,
            normalize_text: true,
        }
    },
    {
        id: 7,
        name: 'Trợ lí nam',
        idRepo: 'https://ntt123-vietnam-male-voice-tts.hf.space/',
        avatar_uri: 'image/hoai-my.jpg',
        voice_uri: 'voice/hoai_my.mp3',
        route: "/predict",
        body: ["TEXT"]
    },

    {
        id: 8,
        name: 'Trợ lí nữ',
        idRepo: 'https://ntt123-vietnam-female-voice-tts.hf.space/',
        avatar_uri: 'image/hoai-my.jpg',
        voice_uri: 'voice/hoai_my.mp3',
        route: "/predict",
        body: ["Xin chào, tôi là một trợ lí A.I, dùng để chuyển văn bản thành giọng nói"]
    },

]

export const VOICE_FILTER =
    [
        {
            label: "Mô hình 1",
        },
        {
            label: "Mô hình 2",
        },
        {
            label: "Mô hình 3",
        },
        {
            label: "Mô hình 4",
        },

    ]