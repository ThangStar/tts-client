import { Autocomplete, AutocompleteItem, AutocompleteSection, Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'
import VoiceCard from '../card/VoiceCard'
import { VOICE_FILTER, VOICE_LIST } from '@/constants/constants'

function ModalPremium() {
  const headingClasses = "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";
  return (
    <ModalContent className='bg-transparent from-inherit to-primary-50 px-6 py-4 bg-secondary-50'>
      {(onClose) => (
        <div className='overflow-y-scroll scrollbar-hide'>
          <ModalHeader className="flex flex-col gap-3 text-3xl">Đăng kí Pro</ModalHeader>

          <ModalBody className=''>
            <div className='flex gap-4 justify-between'>
              <div className="card stylePremium">
                <span className="title"
                >Miễn phí
                  <p className="pricing font-bold">0 đ</p>
                  <span className="sub-title"
                  >Gói dùng thử
                    <ul className="list mt-3">
                      <li className="list-item"><span className="check">✓</span> Tốc độ thường</li>
                      <li className="list-item"><span className="check">✓</span> Sử dụng dụng nói miễn phí</li>
                      <li className="list-item"><span className="check">✓</span> Giới hạn 1000 từ/1 lần</li>
                    </ul>
                    <Button className='bg-gray-600 mt-[70px] bg-opacity-20'>
                      Đang sử dụng
                    </Button>
                  </span>
                </span>
              </div>

              <div className="card stylePremium">
                <span className="title"
                >Premium
                  <p className="pricing font-bold">50.000 đ<span className="pricing-time">/ Tháng</span></p>
                  <span className="sub-title"
                  >Gói đăng kí Pro
                    <ul className="list mt-3">
                      <li className="list-item"><span className="check">✓</span> Trở thành thành viên Pro</li>
                      <li className="list-item"><span className="check">✓</span> Tốc độ xử lí nhanh</li>
                      <li className="list-item"><span className="check">✓</span> Mở khóa tất cả giọng nói</li>
                      <li className="list-item"><span className="check">✓</span> Không giới hạn số lần sử dụng</li>
                      <li className="list-item"><span className="check">✓</span> mở khóa giới hạn 10.000 từ/1 lần</li>
                    </ul>
                    <Button color="danger" className='my-4'>
                      Đăng kí
                    </Button>
                  </span>
                </span>
              </div>
            </div>
          </ModalBody>
        </div>
      )}
    </ModalContent>
  )
}

export default ModalPremium
