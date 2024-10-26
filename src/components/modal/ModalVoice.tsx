import { Autocomplete, AutocompleteItem, AutocompleteSection, Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'
import VoiceCard from '../card/VoiceCard'
import { useDispatch } from 'react-redux';
import { VOICE_FILTER, VOICE_LIST } from '@/constants/constants';

function ModelVoice() {
    const headingClasses = "flex w-full sticky top-1 z-[20] py-1.5 px-2 bg-default-100 shadow-small rounded-small";
    return (
        <ModalContent className=''>
            {(onClose) => (
                <div className='overflow-y-scroll scrollbar-hide'>
                    <ModalHeader className="flex flex-col gap-1">Giọng nói</ModalHeader>
                    <ModalBody className=''>
                        <h2>Bộ lọc</h2>
                        <Autocomplete
                            defaultItems={VOICE_FILTER}
                            variant="bordered"
                            label="Mô hình"
                            placeholder="Lựa chọn mô hình"
                            labelPlacement="inside"
                            listboxProps={{
                                emptyContent: 'Your own empty content text.'
                            }}
                            className="max-w-xs"
                        >
                            <AutocompleteSection
                                title="Tất cả"
                                classNames={{
                                    heading: headingClasses,
                                }}
                            >
                                {
                                    VOICE_FILTER.map(item => (
                                        <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>
                                    ))
                                }
                            </AutocompleteSection>
                        </Autocomplete>

                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 flex-wrap'>
                            {VOICE_LIST.map((voice) => (
                                <VoiceCard onClose={onClose} key={voice.id} voice={voice} />
                            ))}
                        </div>
                    </ModalBody>
                    <div className='flex justify-end gap-4 bg-background w-full absolute bottom-0 right-0 p-6'>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Đóng
                        </Button>
                        <Button color="primary" onPress={onClose}>
                            Lưu
                        </Button>
                    </div>
                </div>
            )}
        </ModalContent>
    )
}

export default ModelVoice
