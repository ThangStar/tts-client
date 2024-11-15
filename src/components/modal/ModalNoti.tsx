import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function ModalNoti() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        onOpen()
        return () => { onClose() }
        
    }, [])
    const router = useRouter()
    return (
        <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Thông báo tính năng mới</ModalHeader>
                <ModalBody>
                    <h3>Các tính năng mới:</h3>
                    <ul>
                        <li>
                            <strong>Sáng tạo âm nhạc:</strong> Chuyển đổi văn bản thành giai điệu độc đáo với công nghệ AI tiên tiến. 
                            Bạn có thể:
                            <ul className="ml-6 my-2 list-disc">
                                <li>Tạo nhạc nền từ văn bản với nhiều độ dài khác nhau (30, 50, 70 giây)</li>
                                <li>Tải xuống và sử dụng cho video, podcast hoặc các dự án cá nhân</li>
                                <li>Tạo không giới hạn các bản nhạc từ cùng một văn bản</li>
                                <li>Điều chỉnh và nghe thử trước khi tải xuống</li>
                            </ul>
                        </li>
                    </ul>
                    <p>
                        Chúng tôi vui mừng giới thiệu hai tính năng mới đột phá:
                    </p>
                    <ol>
                        <li>
                            <strong>Chat với AI:</strong> Bạn có thể trò chuyện trực tiếp với trí tuệ nhân tạo tiên tiến của chúng tôi. Đặt câu hỏi, tìm kiếm thông tin, hoặc chỉ đơn giản là trò chuyện để có những cuộc đối thoại thú vị và bổ ích.
                        </li>
                        <li>
                            <strong>Chuyển văn bản thành giọng nói:</strong> Sử dụng AI để chuyển đổi văn bản thành giọng nói, giúp bạn tạo ra các giọng đọc nhanh chóng và hiệu quả.
                        </li>
                    </ol>
                    <p>
                        Khám phá ngay các tính năng mới này để nâng cao hiệu suất và trải nghiệm của bạn với ứng dụng của chúng tôi!
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" onPress={onClose}>
                        Đóng
                    </Button>
                    <Button onClick={() => {
                        router.push('/ttm');
                        onClose()
                    }} color="primary">
                        Xem ngay
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalNoti
