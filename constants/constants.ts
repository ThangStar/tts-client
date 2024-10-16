import { voice } from "@/types/voice.type"

export const VOICE_LIST: voice[] = [
    {
        id: 5,
        name: 'Hoài My',
        idRepo: 'akthangdz/tts-vie-applio',
        avatar_uri: 'image/hoai-my.jpg',
        voice_uri: 'voice/hoai_my.mp3',
        bodys: [
            {
                route: "/text_to_speech",
                text: "TEXT",
                voice: "vi-VN-HoaiMyNeural",

            }
        ]
    },
    {
        id: 6,
        name: 'Nam minh',
        idRepo: 'akthangdz/tts-vie-applio',
        avatar_uri: 'image/nam-minh.jpg',
        voice_uri: 'voice/nam_minh.mp3',
        bodys: [
            {
                route: "/text_to_speech",
                text: "TEXT",
                voice: "vi-VN-NamMinhNeural",
            }
        ]
    },
    {
        id: 1,
        name: 'Thành Phạm',
        avatar_uri: 'image/thanh_pham.jpg',
        idRepo: 'akthangdz/tts-vie2',
        voice_uri: 'voice/thanhpham.wav',
        bodys: [
            {
                route: "/run_tts",
                lang: "vi",
                tts_text: "TEXT",
                speaker_audio_file: '',
                use_deepfilter: false,
                normalize_text: true,
            }
        ]

    },
    {
        id: 2,
        name: 'Cô ba Bình Dương',
        idRepo: 'akthangdz/tts-vie2',
        avatar_uri: 'image/co_ba_binh_duong.jpg',
        voice_uri: 'voice/CoBaBinhDuong.wav',
        bodys: [
            {
                route: "/run_tts",
                lang: "vi",
                tts_text: "TEXT",
                speaker_audio_file: '',
                use_deepfilter: true,
                normalize_text: true,
            }
        ]
    },
    {
        id: 3,
        name: 'Web 5 ngày',
        idRepo: 'akthangdz/tts-vie2',
        avatar_uri: 'image/web-5-ngay.jpg',
        voice_uri: 'voice/web5ngay.wav',
        bodys: [
            {
                route: "/run_tts",
                lang: "vi",
                tts_text: "TEXT",
                speaker_audio_file: '',
                use_deepfilter: true,
                normalize_text: true,
            }
        ]
    },
    {
        id: 4,
        name: 'Vũ trụ nguyên thủy',
        idRepo: 'akthangdz/tts-vie2',
        avatar_uri: 'image/vu-tru-nguyen-thuy.jpg',
        voice_uri: 'voice/VuTruNguyenThuy.wav',
        bodys: [
            {
                route: "/run_tts",
                lang: "vi",
                tts_text: "TEXT",
                speaker_audio_file: '',
                use_deepfilter: true,
                normalize_text: true,
            }
        ]
    },
    {
        id: 7,
        name: 'Trợ lí nam',
        idRepo: 'https://ntt123-vietnam-male-voice-tts.hf.space/',
        avatar_uri: 'image/tro-li-nam.jpg',
        voice_uri: 'voice/hoai_my.mp3',
        bodys: [
            {
                text: ["TEXT"],
                route: "/predict",
            }
        ]
    },

    {
        id: 8,
        name: 'Trợ lí nữ',
        idRepo: 'https://ntt123-vietnam-female-voice-tts.hf.space/',
        avatar_uri: 'image/tro-li-nu.jpg',
        voice_uri: 'voice/hoai_my.mp3',
        bodys: [
            {
                text: ["TEXT"],
                route: "/predict",
            }
        ]
    },
    {
        id: 9,
        name: 'VTV 24 Bản 1',
        idRepo: 'akthangdz/tts-vie2',
        avatar_uri: 'image/vtv24.jpg',
        voice_uri: 'voice/vtv24_1.wav',
        bodys: [
            {
                route: "/run_tts",
                lang: "vi",
                tts_text: "TEXT",
                speaker_audio_file: '',
                use_deepfilter: true,
                normalize_text: true,
            }
        ]
    },
    {
        id: 10,
        name: 'Thời sự',
        idRepo: 'akthangdz/tts-vie2',
        avatar_uri: 'image/thoi_su.jpg',
        voice_uri: 'voice/vtv24_2.wav',
        bodys: [
            {
                route: "/run_tts",
                lang: "vi",
                tts_text: "TEXT",
                speaker_audio_file: '',
                use_deepfilter: true,
                normalize_text: true,
            }
        ]
    },
    {
        id: 11,
        name: 'Nguyễn Ngọc Ngạn',
        idRepo: 'akthangdz/tts-ngngan',
        avatar_uri: 'image/ngoc_ngan.jpg',
        voice_uri: 'voice/vtv24_2.wav',
        bodys: [
            {
                route: "/speak",
                text: "TEXT",
            },
        ]

    }
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