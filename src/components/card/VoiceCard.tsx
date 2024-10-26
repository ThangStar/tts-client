import { Button, Card, CardBody, Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { PauseCircleIcon } from '../icons/PauseCircleIcon'
import { PlayIcon } from '../icons/playicon'
import { useDispatch } from 'react-redux'
import { voice } from '@/types/voice.type'
import { VoiceAction } from '@/redux/slice/voice.slice'

function VoiceCard({ voice, onClose }: { voice: voice, onClose: () => void }) {
    const [liked, setLiked] = React.useState(false);
    const [isPlay, setIsPlay] = React.useState(false);
    const [mounted, setMounted] = useState(false)
    const [audio, setAudio] = useState<any>(new Audio(voice.voice_uri))
    const handleTogglePlay = () => {
        setIsPlay(!isPlay)
        setMounted(true)
        if (isPlay) {
            audio.pause()
            setIsPlay(false)
            audio.currentTime = 0;
        } else {
            audio.currentTime = 0;
            audio.play()
            setIsPlay(true)
        }
    }
    useEffect(() => {
        audio.onended = () => {
            setIsPlay(false)
        }
    }, [audio])

    const dispatch = useDispatch<any>()
    const { setVoiceSelected } = VoiceAction

    const handleSelectVoice = () => {
        onClose()
        dispatch(setVoiceSelected(voice))
    }
    return (
        <Card
            isBlurred
            className={`border-none !border-2 !border-primary bg-background/60 dark:bg-default-100/50 max-w-[310px] cursor-pointer `}
            shadow="sm"
        >
            <CardBody
                onClick={handleSelectVoice}
            >
                <div className="gap-3 md:gap-6 flex flex-col h-full items-center place-content-between">
                    <div className="relative col-span-6 md:col-span-4">
                        <div
                            className='mb-3'
                        >
                            <Image
                                alt="Album cover"
                                className="object-cover w-96 h-40 sm:h-56    md:h-64 lg:h-72"
                                shadow="md"
                                src={voice.avatar_uri}
                            />
                        </div>
                    </div>
                    <div className="flex  flex-col col-span-6 md:col-span-8"
                    >
                        <div className="grid grid-cols-3 justify-between items-start w-full">
                            <div className="flex flex-col col-span-2 gap-0">
                                <h3 className="font-semibold text-foreground/90">{voice.name}</h3>
                                <p className="text-small text-foreground/80 line-clamp-1">@{voice.idRepo}</p>
                            </div>
                            <div className="col-span-1 flex justify-end">
                                <Button
                                    isIconOnly
                                    className="w-auto h-auto data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                    onClick={
                                        handleTogglePlay
                                    }
                                >
                                    {isPlay ? <PauseCircleIcon className='text-default-900' size={54} /> : <PlayIcon className='text-default-900 p-1' size={40} />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card >
    )
}

export default VoiceCard
