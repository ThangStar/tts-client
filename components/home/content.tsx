"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../table/table";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { CardAgents } from "./card-agents";
import { CardTransactions } from "./card-transactions";
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Image, Input, Link, Modal, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import NextLink from "next/link";
import { Client } from "@gradio/client";
import ModelVoice from "../modal/ModelVoice";
import { VOICE_LIST } from "@/constants/constants";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);
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
const dqwdwqd = async () => {
  try {
    const response = await fetch('/voice/thanh_pham.wav');

    const exampleAudio = await response.blob();
    console.log("Đã chuyển sang blob", exampleAudio);

    const client = await Client.connect("akthangdz/tts-vie");
    console.log("Đã connect được đến server");
    const result = await client.predict("/run_tts", {
      lang: "vi",
      tts_text: "Hello anh em alo alo 123",
      speaker_audio_file: exampleAudio,
      use_deepfilter: true,
      normalize_text: true,
    });
    console.log("Đã predict được");
    console.log(result.data);
  } catch (error) {
    console.error("Error in TTS process:", error);
  }
};

export const Content = () => {

  const [filter, setFilter] = useState('Tất cả');
  const [text, setText] = useState('');

  const filteredVoices = voices.filter(voice =>
    filter === 'Tất cả' || voice.category === filter
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultVoice = VOICE_LIST[0]
  return (
    <div className="flex flex-col justify-center px-6 py-4">
      <h1 className="mb-6">Chuyển văn bản thành giọng nói</h1>

      <Card
        isFooterBlurred
        radius="lg"
        className="border-none bg-gradient-to-r from-transparent to-secondary-500 flex flex-col p-4"
      >
        <div className=" justify-between items-center flex">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">{defaultVoice.name}</h2>
              <p className="mb-3">@{defaultVoice.idRepo}</p>
            </div>
            <Button onClick={onOpen} color="secondary">
              Đổi giọng
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br  rounded-xl from-[#0432ff10] to-[#0432ff60] absolute inset-0 z-20">
            </div>
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src={defaultVoice.avatar_uri}
              width={200}
            />
          </div>
        </div>
      </Card>
      <h2 className="text-xl font-bold mb-3 mt-6">Văn bản</h2>
      <Textarea
        variant="bordered"
        labelPlacement="outside"
        placeholder="Nhập 1 đoạn văn bản.."
        defaultValue="Xin chào tôi là một trợ lí AI ảo dùng để chuyển văn bản thành giọng nói"
        className="w-full mb-3"
      />

      <Checkbox
        defaultSelected color="secondary" className="mb-3">Khử tiếng ồn</Checkbox>
      <Button className="py-7 w-1/3 mx-auto bg-gradient-to-tr from-secondary-50 to-secondary-500 text-white shadow-lg">
        Chuyển đổi
      </Button>

      <Modal
        size={'full'}
        isOpen={isOpen}
        className="h-full"
        onClose={onClose}
      >
        <ModelVoice />
      </Modal>
    </div>
  );
}
