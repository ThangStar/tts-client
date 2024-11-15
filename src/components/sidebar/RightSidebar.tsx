import React from 'react'
import ModalPremium from '../modal/ModalPremium'
import { Modal, Progress, useDisclosure } from '@nextui-org/react'
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion"
import { VoiceState } from '@/redux/slice/voice.slice';
import { tts_response } from '@/types/tts_response.type';
type Props = {
    isOpenDrawer?: boolean;
    onCloseDrawer?: () => void;
}
function RightSidebar({ isOpenDrawer, onCloseDrawer }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { voiceExports }: VoiceState = useSelector((state: any) => state.voice.value)

    return (
        <AnimatePresence>
            {
                isOpenDrawer &&
                <div>
                    <div onClick={onCloseDrawer} className='fixed lg:hidden inset-0 bg-[#00000060] z-40'>
                    </div>
                    <motion.aside
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        transition={{ duration: 0.3 }}
                        className="h-screen border-l fixed lg:sticky lg:block border-default-200 px-6 py-8 z-[50] top-0 right-0 w-2/3 lg:w-full bg-background">
                        <div className='z-20'>
                            <h2 className='w-full'>File đã xuất</h2>
                            
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
                                                        <source src={voice.url as string} type="audio/mpeg" />
                                                    </audio>
                                                </div>
                                            )
                                    })
                                }
                            </div>
                        </div>
                    </motion.aside>
                </div>
            }
        </AnimatePresence>
    )
}

export default RightSidebar
