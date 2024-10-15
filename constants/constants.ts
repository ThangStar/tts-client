import { Voice } from "@/types/voice.type"

export const VOICE_LIST: Voice[] = [
    {
        id: 1,
        name: 'Thành Phạm',
        avatar_uri: 'image/thanh_pham.jpg',
        idRepo: 'capleaf/viXTTS',
        voice_uri: 'voice/thanhpham.wav'
    },
    {
        id: 2,
        name: 'Cô ba Bình Dương',
        idRepo: 'capleaf/viXTTS',
        avatar_uri: 'image/co_ba_binh_duong.jpg',
        voice_uri: 'voice/CoBaBinhDuong.wav'
    },
    {
        id: 3,
        name: 'Web 5 ngày',
        idRepo: 'capleaf/viXTTS',
        avatar_uri: 'image/web-5-ngay.jpg',
        voice_uri: 'voice/web5ngay.wav'
    },
    {
        id: 4,
        name: 'Vũ trụ nguyên thủy',
        idRepo: 'capleaf/viXTTS',
        avatar_uri: 'image/vu-tru-nguyen-thuy.jpg',
        voice_uri: 'voice/VuTruNguyenThuy.wav'
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