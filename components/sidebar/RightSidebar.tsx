import React from 'react'
import ModalPremium from '../modal/ModalPremium'
import { Modal, Progress, useDisclosure } from '@nextui-org/react'
import { VoiceState } from '@/redux/slice/voice.slice';
import { useSelector } from 'react-redux';
import { VoiceExport } from '@/types/voice_export.type';
import { tts_response } from '@/types/tts_response.type';

function LeftSidebar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { voiceExports }: VoiceState = useSelector((state: any) => state.voice.value)

    return (
        <aside className="h-screen border-l border-[#ffffff30] px-6 py-8 z-[20] sticky top-0 right-0 w-1/4 bg-background">
            <h2>File đã xuất</h2>
            <button className="Btn mt-6" onClick={onOpen}>
            </button>
            <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
                <ModalPremium />
            </Modal>
            <div className='mt-12'>

                {
                    voiceExports.map((voice: tts_response, index: number) => {
                        return voice.progress ?
                            (
                                <div className="mt-6" key={index}>
                                    <h2 className="text-xl font-bold mb-3 mt-6 ">Đang xử lí voice {voice.voice.name}</h2>
                                    <Progress
                                        size="md"
                                        isIndeterminate
                                        aria-label="Loading..."
                                        className="w-full mt-3"
                                        color="secondary" />
                                </div>
                            )
                            :
                            (
                                <div className='flex flex-col gap-4 mt-4 w-full'>
                                    <audio controls key={index} className='w-full'>
                                        <source src={voice.url} type="audio/mpeg" />
                                    </audio>
                                </div>
                            )
                    })
                }
            </div>
        </aside>
    )
}

export default LeftSidebar
