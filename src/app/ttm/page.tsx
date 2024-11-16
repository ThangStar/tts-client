'use client'
import { TTMApi } from '@/api/ttm.api'
import AudioVisualizer from '@/components/AudioVisualizer'
import { VoiceAction, VoiceState } from '@/redux/slice/voice.slice'
import { Button, Card, CircularProgress, Input, Textarea, Select, SelectItem } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { number } from 'yup'

function Page() {
    const [text, setText] = useState('Vinahouse remix sôi động, hòa quyện âm hưởng đàn tranh Việt Nam, bass mạnh, drop cuốn hút, mở đầu nhẹ nhàng, cao trào bùng nổ, âm sắc đơn')
    const dispatch = useDispatch<any>()
    const { ttm, ttmLoading } = VoiceAction
    const { voiceTtm }: VoiceState = useSelector((state: any) => state.voice.value)
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [token, setToken] = useState('S3_TOKEN_FREE')
    const [duration, setDuration] = useState("30")
    const [payloadDuration, setPayloadDuration] = useState("30")
    const [currentTime, setCurrentTime] = useState<number>(0);

    const durationOptions = [
        { label: "30 giây", value: "30" },
        { label: "50 giây", value: "50" },
        { label: "70 giây", value: "70" },
    ]

    const isLoading = voiceTtm.some(item => item.loading)

    const handleConvert = async () => {
        if (text.trim() === '') {
            toast.error('Vui lòng nhập văn bản');
            return;
        }
        if (text.length > 200) {
            toast.error('Văn bản không được quá 200 ký tự');
            return;
        }
        dispatch(ttmLoading({ loading: true, mediaTitle: text }))
        dispatch(ttm({ text: text, token: token, payloadDuration: Number(payloadDuration) }))
    }

    const handleTimeUpdate = (audio: HTMLAudioElement) => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration.toString());
    };
    const handleChangePayloadDuration = (value: string) => {
        setPayloadDuration(value)
    }

    const handleSliderChange = (value: number) => {
        if (audioObj) {
            audioObj.currentTime = value;
            setCurrentTime(value);
        }
    };

    const formatTime = (time: string) => {
        let t = Number(time)
        const minutes = Math.floor(t / 60);
        const seconds = Math.floor(t % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleListen = (data: string, index: number) => {
        try {
            if (audioObj) {
                if (playingIndex === index) {
                    audioObj.pause();
                    setIsPlaying(false);
                    setPlayingIndex(null);
                    return;
                }
                audioObj.pause();
                setAudioObj(null);
            }

            let audio: HTMLAudioElement;
            if (data.startsWith('http')) {
                audio = new Audio(data);
            } else {
                const base64Data = data.split(',')[1] || data;
                const byteCharacters = atob(base64Data);
                const byteNumbers = new Array(byteCharacters.length);

                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(blob);

                audio = new Audio(audioUrl);
            }

            audio.addEventListener('timeupdate', () => handleTimeUpdate(audio));
            audio.addEventListener('ended', () => {
                setIsPlaying(false);
                setPlayingIndex(null);
                setCurrentTime(0);
            });

            setAudioObj(audio);
            audio.play();
            setIsPlaying(true);
            setPlayingIndex(index);
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
            <h3 className='my-3'>Nội dung âm nhạc</h3>
            <Textarea
                variant="bordered"
                placeholder="Nhập nội dung âm nhạc"
                disableAnimation
                value={text}
                isInvalid={text.length > 200}
                errorMessage="Nội dung không được quá 200 ký tự"
                onChange={(e) => setText(e.target.value)}
                classNames={{
                    base: "max-w-full",
                    input: "resize-y min-h-[180px] text-lg",
                }}
            />
            <p className='mt-2'><span className='font-semibold text-primary'>Nên</span>: Các từ về phong cách nhạc, giai điệu, âm thanh</p>
            <p className=''><span className='font-semibold text-red-500'>Hạn chế</span>: Các từ về ca sĩ, tên bài hát, tên album - có thể gây ra lỗi</p>
            <h3 className='mt-3'>Token</h3>
            <Input
                variant='bordered'
                className='max-w-full mt-1'
                value={token}
                placeholder='Nhập token'
                onChange={(e) => setToken(e.target.value)}
            />
            <Link href="https://www.facebook.com/mt.meow.meow/" className="Btn mt-3">
            </Link>
            <h3 className='mt-3'>Thời lượng</h3>
            <Select
                variant='bordered'
                className='max-w-[100px] mt-1'
                selectedKeys={[payloadDuration]}
                onChange={(e) => handleChangePayloadDuration(e.target.value)}
                defaultSelectedKeys={["30"]}
            >
                {durationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>

            <Button
                className="py-7 mt-8 w-full bg-gradient-to-tr from-secondary-300 to-secondary-500 text-white shadow-lg text-lg font-medium"
                onClick={handleConvert}
                isLoading={isLoading}
                isDisabled={isLoading}
            >
                {isLoading ? "Đang xử lý..." : "Chuyển đổi"}
            </Button>
            <div className='flex flex-col gap-4 mt-4 w-full'>
                <p className="text-xl font-semibold">Kết quả</p>
                {
                    voiceTtm.length === 0 && (
                        <p className="text-xl opacity-50">Chưa có bài hát nào</p>
                    )
                }
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4'>

                    {voiceTtm.map((voice, index) => (
                        <Card key={index} className="p-4 bg-gradient-to-tr from-secondary-200 to-secondary-400 text-white shadow-lg text-lg font-medium">
                            {voice.loading ? <CircularProgress size="lg" aria-label="Đang sáng tác..." /> :
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-medium">Audio #{index + 1}</span>

                                            <span className="text-sm ">
                                                {voice.audioEncoding}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant='bordered'
                                                className='px-3'
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
                                                className='px-3'
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
                                    {playingIndex === index && (
                                        <div className="flex flex-col gap-2">
                                            <input
                                                type="range"
                                                min={0}
                                                max={duration || 100}
                                                value={currentTime}
                                                onChange={(e) => handleSliderChange(Number(e.target.value))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                            <div className="flex justify-between text-sm">
                                                <span>{formatTime(currentTime.toString())}</span>
                                                <span>{formatTime(duration)}</span>
                                            </div>
                                        </div>
                                    )}
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
