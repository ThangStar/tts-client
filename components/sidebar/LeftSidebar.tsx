import React from 'react'
import ModalPremium from '../modal/ModalPremium'
import { Modal, useDisclosure } from '@nextui-org/react'

function LeftSidebar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <aside className="h-screen border-l border-[#ffffff30] px-6 py-8 z-[20] sticky top-0 right-0 w-1/4 bg-background">
            <h2>File đã xuất</h2>
            <button className="Btn mt-6" onClick={onOpen}>
            </button>
            <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
                <ModalPremium />
            </Modal>
            <div className='flex flex-col gap-4 mt-12 w-full'>
                {
                    Array.from({ length: 4 }).map((_, index) => (
                        <audio controls key={index} className='w-full'>
                            <source src={`voice/thanhpham.wav`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    ))
                }
            </div>
        </aside>
    )
}

export default LeftSidebar
