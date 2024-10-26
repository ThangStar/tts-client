import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Link from 'next/link';
import React, { useEffect } from 'react'

function ModalNoti() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        onOpen()
        return () => { }
    }, [])

    return (
        <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Thông báo tính năng mới</ModalHeader>
                <ModalBody>
                    <h3>Các tính năng mới:</h3>
                    <ul>
                        <li>Chat với AI: Tương tác trực tiếp với trí tuệ nhân tạo</li>
                        <li>Tạo content tự động: Sử dụng AI để tạo nội dung chất lượng cao</li>
                    </ul>
                    <p>
                        Chúng tôi vui mừng giới thiệu hai tính năng mới đột phá:
                    </p>
                    <ol>
                        <li>
                            <strong>Chat với AI:</strong> Bạn có thể trò chuyện trực tiếp với trí tuệ nhân tạo tiên tiến của chúng tôi. Đặt câu hỏi, tìm kiếm thông tin, hoặc chỉ đơn giản là trò chuyện để có những cuộc đối thoại thú vị và bổ ích.
                        </li>
                        <li>
                            <strong>Tạo content tự động:</strong> Sử dụng sức mạnh của AI để tạo ra nội dung chất lượng cao cho blog, mạng xã hội, hoặc bất kỳ nhu cầu nào của bạn. Tiết kiệm thời gian và công sức trong quá trình sáng tạo nội dung.
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
                    <Link href={'/characters'} >
                        <Button color="primary">
                            Xem ngay
                        </Button>
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalNoti
