'use client'
import { TTMApi } from '@/api/ttm.api'
import { VoiceAction, VoiceState } from '@/redux/slice/voice.slice'
import { Button, Card, CircularProgress, Input, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

function Page() {
    const [text, setText] = useState('vinahouse, remix tiktok vietnam')
    const dispatch = useDispatch<any>()
    const { ttm, ttmLoading } = VoiceAction
    const { voiceTtm }: VoiceState = useSelector((state: any) => state.voice.value)
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [token, setToken] = useState('S3_TOKEN_FREE')
    const handleConvert = async () => {
        if (text.trim() === '') {
            toast.error('Vui lòng nhập văn bản');
            return;
        }
        dispatch(ttmLoading({ loading: true, mediaTitle: text }))
        dispatch(ttm({ text: text, token: token }))
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

    const handleDownload = (data: string, index: number) => {
        try {
            let audioUrl: string;
            if (data.startsWith('http')) {
                audioUrl = data;
            } else {
                const base64Data = data.split(',')[1] || data;
                const byteCharacters = atob(base64Data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'audio/mpeg' });
                audioUrl = URL.createObjectURL(blob);
            }

            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = `audio_${index + 1}.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (!data.startsWith('http')) {
                URL.revokeObjectURL(audioUrl);
            }
        } catch (error) {
            console.error('Error downloading audio:', error);
            toast.error('Không thể tải xuống âm thanh');
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

            <h3 className='mt-3'>Token</h3>
            <Input
                variant='bordered'
                className='max-w-full mt-1'
                value={token}
                placeholder='Nhập token'
                onChange={(e) => setToken(e.target.value)}
            />
            <Button
                className="py-7 mt-8 w-full bg-gradient-to-tr from-secondary-300 to-secondary-500 text-white shadow-lg text-lg font-medium"
                onClick={handleConvert}
            >
                Chuyển đổi
            </Button>
            <div className='flex flex-col gap-4 mt-4 w-full'>
                <p className="text-xl font-semibold">Kết quả</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4'>

                    {voiceTtm.map((voice, index) => (
                        <Card key={index} className="p-4 bg-gradient-to-tr from-secondary-200 to-secondary-400 text-white shadow-lg text-lg font-medium">
                            {voice.loading ? <CircularProgress size="lg" aria-label="Đang sáng tác..." /> :
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-medium">Audio #{index + 1}</span>

                                            <span className="text-sm ">
                                                {new Date().toLocaleString()} {/* Thay bằng voice.timestamp nếu có */}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant='bordered'
                                                className='min-w-[120px]'
                                                onClick={() => handleListen(voice.data || '', index)}
                                            >
                                                <p className="text-lg text-primary-foreground">
                                                    {playingIndex === index
                                                        ? (isPlaying ? "Tạm dừng" : "Tiếp tục")
                                                        : "Nghe"}
                                                </p>
                                            </Button>
                                            <Button
                                                variant='bordered'
                                                className='min-w-[50px]'
                                                onClick={() => handleDownload(voice.data || '', index)}
                                            >
                                                <p className="text-lg text-primary-foreground">⬇Tải xuống</p>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium mb-1">Nội dung:</p>
                                        <p>{voice.mediaTitle || text}</p> {/* Hiển thị text tương ứng của voice nếu có */}
                                    </div>
                                </div>
                            }
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page
