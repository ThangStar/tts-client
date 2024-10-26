"use client";
import React, { useState, useRef, useId } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Image, Input, Link, Modal, Progress, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import ModelVoice from "../modal/ModalVoice";
import { useDispatch, useSelector } from "react-redux";
import { VoiceAction, VoiceState } from "@/redux/slice/voice.slice";
const voices = [
  {
    id: 1,
    name: 'Giọng nói 1',
    category: 'Truyền hình',
    audioUrl: '/voice/thanh_pham.wav',
    imageUrl: 'path/to/image1.jpg',
  },
  {
    id: 2,
    name: 'Giọng nói 2',
    category: 'Ca sĩ',
    audioUrl: 'path/to/audio2.mp3',
    imageUrl: 'path/to/image2.jpg',
  },
  // Thêm các giọng nói khác ở đây
];

export const Content = () => {
  const [filter, setFilter] = useState('Tất cả');
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredVoices = voices.filter(voice =>
    filter === 'Tất cả' || voice.category === filter
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { voiceSelected }: VoiceState = useSelector((state: any) => state.voice.value)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const dispatch = useDispatch<any>()
  const { fetchTTS, addVoice } = VoiceAction
  const handleConvert = () => {
    dispatch(addVoice(voiceSelected))
    dispatch(fetchTTS({
      id: voiceSelected.id,
      avatar_uri: voiceSelected.avatar_uri,
      content: text,
      idRepo: voiceSelected.idRepo,
      voice_uri: voiceSelected.voice_uri,
      name: voiceSelected.name,
      bodys: voiceSelected.bodys || [],
    }))
  }
  return (
    <div className="flex flex-col justify-center px-6 py-4">
      <h1 className="mb-6">Chuyển văn bản thành giọng nói</h1>

      <Card
        isFooterBlurred
        radius="lg"
        className="border-none bg-gradient-to-r from-transparent to-secondary-500 flex flex-col p-4"
      >
        <div className="justify-between items-center flex gap-x-3">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">{voiceSelected.name}</h2>
              <p className="mb-3">@{voiceSelected.idRepo}</p>
            </div>
            <Button onClick={onOpen} color="secondary">
              Đổi giọng
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br rounded-xl from-[#0432ff10] to-[#0432ff30] absolute inset-0 z-20">
            </div>
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src={voiceSelected.avatar_uri}
              width={200}
            />
          </div>
        </div>
      </Card>

      <h2 className="text-xl font-bold mb-3 mt-6">Văn bản</h2>
      <Textarea
        variant="bordered"
        value={text}
        onChange={(e) => setText(e.target.value)}
        labelPlacement="outside"
        placeholder="Nhập 1 đoạn văn bản.."
        defaultValue="Xin chào tôi là một trợ lí AI ảo dùng để chuyển văn bản thành giọng nói"
        className="w-full mb-3"
      />

      <div className="flex mt-2 gap-3">
        <Checkbox defaultSelected color="secondary">
          Khử tiếng ồn
        </Checkbox>
        <Checkbox defaultSelected color="secondary">
          Chuẩn hóa văn bản
        </Checkbox>
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          className="py-7 mt-8 w-full bg-gradient-to-tr from-secondary-300 to-secondary-500 text-white shadow-lg"
          onClick={handleConvert}
        >
          Chuyển đổi
        </Button>
      </div>
      <Modal size={'full'} isOpen={isOpen} className="" onClose={onClose}>
        <ModelVoice />
      </Modal>
    </div>
  );
}
