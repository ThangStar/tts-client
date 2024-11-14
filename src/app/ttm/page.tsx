'use client'
import { TTMApi } from '@/api/ttm.api'
import { VoiceAction, VoiceState } from '@/redux/slice/voice.slice'
import { Button, Card, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

function Page() {
    const [text, setText] = useState('vinahouse, tiktok vietnam, house lak')
    const dispatch = useDispatch<any>()
    const { ttm } = VoiceAction
    const { voiceTtm }: VoiceState = useSelector((state: any) => state.voice.value)
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);

    const handleConvert = async () => {
        if (text.trim() === '') {
            toast.error('Vui lòng nhập văn bản');
            return;
        }
        dispatch(ttm(text))
    }
    const handleListen = (data: string, index: number) => {
        try {
            if (audioObj) {
                if (playingIndex === index) {
                    // Pause current audio
                    audioObj.pause();
                    setIsPlaying(false);
                    setPlayingIndex(null);
                    return;
                }
                // Stop previous audio if playing different track
                audioObj.pause();
                setAudioObj(null);
            }

            if (data.startsWith('http')) {
                const audio = new Audio(data);
                setAudioObj(audio);
                audio.play();
                setIsPlaying(true);
                setPlayingIndex(index);
                return;
            }

            const byteCharacters = atob(data);
            const byteNumbers = new Array(byteCharacters.length);
            
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(blob);
            
            const audio = new Audio(audioUrl);
            setAudioObj(audio);
            audio.play();
            setIsPlaying(true);
            setPlayingIndex(index);
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                setIsPlaying(false);
                setPlayingIndex(null);
            };
        } catch (error) {
            console.error('Error playing audio:', error);
            toast.error('Không thể phát âm thanh');
        }
    }

    return (
        <div className="flex flex-col justify-center px-6 py-4">
            <h1 className="mb-6">Công cụ AI sáng tạo âm nhạc</h1>
            <Textarea
                variant="bordered"
                placeholder="Nhập nội dung âm nhạc"
                disableAnimation
                value={text}
                onChange={(e) => setText(e.target.value)}
                classNames={{
                    base: "max-w-full",
                    input: "resize-y min-h-[180px] text-lg",
                }}
            />
            <Button
                // isLoading={isLoading}
                className="py-7 mt-8 w-full bg-gradient-to-tr from-secondary-300 to-secondary-500 text-white shadow-lg"
                onClick={handleConvert}
            >
                Chuyển đổi
            </Button>
            <div className='flex flex-col gap-4 mt-4 w-full'>
                <p>Kết quả</p>
                {
                    voiceTtm.map((voice, index) => (
                        <Card key={index}>
                            <Button 
                                variant='bordered' 
                                className='w-full' 
                                onClick={() => handleListen(voice.data, index)}
                            >
                                <p>{playingIndex === index ? (isPlaying ? "Tạm dừng" : "Tiếp tục") : "Nghe"}</p>
                            </Button>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default Page
