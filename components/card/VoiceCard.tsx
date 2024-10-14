import { Button, Card, CardBody, Image, Slider } from '@nextui-org/react'
import React, { useEffect, useMemo, useState } from 'react'
import { HeartIcon } from '../icons/HeartIcon'
import { RepeatOneIcon } from '../icons/RepeatOneIcon'
import { PauseCircleIcon } from '../icons/PauseCircleIcon'
import { PreviousIcon } from '../icons/PreviousIcon'
import { ShuffleIcon } from '../icons/ShuffleIcon'
import { NextIcon } from '../icons/NextIcon'
import { Voice } from '@/types/voice.type'
import { clsx } from 'clsx';

function VoiceCard({ voice }: { voice: Voice }) {
    const [liked, setLiked] = React.useState(false);
    const [isPlay, setIsPlay] = React.useState(false);
    let audio: HTMLAudioElement
    useEffect(() => {
        audio = new Audio(voice.voice_uri)
        return () => {
        }
    }, [])

    const handlePlay = () => {
        if (isPlay) {
            audio.pause()
            setIsPlay(false)
        } else {
            audio.currentTime = 0;
            audio.play()
            setIsPlay(true)
        }
    }
    useEffect(() => {
        if (audio) { // Check if audio is defined
            audio.onended = () => { // Use assignment instead of invoking
                setIsPlay(false);
            };
        }

        return () => {
            // Cleanup if necessary
        }
    }, []) // Ensure audio is in the dependency array

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
                            onClick={
                                handlePlay
                            }>
                            <div className={`absolute inset-0 hover:bg-[#00000061] transition-all z-20 ${clsx({
                                'bg-[#00000061]': isPlay
                            })}`}>
                            </div>
                            <Image
                                alt="Album cover"
                                className="object-cover"
                                height={200}
                                shadow="md"
                                src={voice.avatar_uri}
                                width={200}
                            />

                            <div className="flex w-full items-center justify-center absolute bottom-0 top-0 z-10">
                                <Button
                                    isIconOnly
                                    className="w-auto h-auto data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                    onClick={
                                        () => setIsPlay(!isPlay)
                                    }
                                >
                                    {isPlay && <PauseCircleIcon className='text-white' size={54} />}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h3 className="font-semibold text-foreground/90">{voice.name}</h3>
                                <p className="text-small text-foreground/80">@{voice.idRepo}</p>
                            </div>
                            <Button
                                isIconOnly
                                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                radius="full"
                                variant="light"
                                onPress={() => setLiked((v) => !v)}
                            >
                                <HeartIcon
                                    className={liked ? "[&>path]:stroke-transparent" : ""}
                                    fill={liked ? "currentColor" : "none"}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card >
    )
}

export default VoiceCard
