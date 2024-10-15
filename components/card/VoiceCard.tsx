import { Button, Card, CardBody, Image, Slider } from '@nextui-org/react'
import React, { SetStateAction, useEffect, useMemo, useState } from 'react'
import { HeartIcon } from '../icons/HeartIcon'
import { RepeatOneIcon } from '../icons/RepeatOneIcon'
import { PauseCircleIcon } from '../icons/PauseCircleIcon'
import { PreviousIcon } from '../icons/PreviousIcon'
import { ShuffleIcon } from '../icons/ShuffleIcon'
import { NextIcon } from '../icons/NextIcon'
import { Voice } from '@/types/voice.type'
import { clsx } from 'clsx';
import { PlayIcon } from '../icons/playicon'

function VoiceCard({ voice }: { voice: Voice }) {
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
    return (

        <Card
            isBlurred
            className={`border-none !border-2 !border-primary bg-background/60 dark:bg-default-100/50 max-w-[310px] cursor-pointer `}
            shadow="sm"
        >
            <CardBody>
                <div className="gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <div
                            className='mb-3'
                        >

                            <Image
                                alt="Album cover"
                                className="object-cover"
                                height={200}
                                shadow="md"
                                src={voice.avatar_uri}
                                width={200}
                            />


                        </div>
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8"
                    >
                        <div className="flex justify-between items-start">

                            <div className="flex flex-col gap-0">
                                <h3 className="font-semibold text-foreground/90">{voice.name}</h3>
                                <p className="text-small text-foreground/80">@{voice.idRepo}</p>
                            </div>
                            <div className="">
                                <Button
                                    isIconOnly
                                    className="w-auto h-auto data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                    onClick={
                                        handleTogglePlay
                                    }
                                >
                                    {isPlay ? <PauseCircleIcon className='text-white' size={54} /> : <PlayIcon fill='#fff' size={40} />}
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
