"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { characters } from '@/constants/constants';
import { Character } from '@/types/character.type';
import { Message } from '@/types/message.type';
import { generateContent } from '@/http/charactorConfig';

type Props = {
    id?: string;
}

const Page = ({ id }: Props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [currentCharacter, setcurrentCharacter] = useState<Character>(characters[0])
    // Mock character data (replace with actual data)
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        setcurrentCharacter(characters.find(character => character.id === Number(id)) || characters[0])
        return () => {
            setcurrentCharacter(characters[0])
        }
    }, [id])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            content: inputMessage,
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');
        generateContent(inputMessage, currentCharacter.baseInstruction).then((res) => {
            const characterResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'character',
                content: res,
                timestamp: new Date(),
            };
            setMessages(prevMessages => [...prevMessages, characterResponse]);
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow-md p-4 flex items-center">
                <Image
                    src={currentCharacter.avatar}
                    alt={currentCharacter.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3 size-10 object-cover"
                />
                <h1 className="text-xl font-semibold">{currentCharacter.name}</h1>
            </div>

            {/* Message List */}
            <div className="h-[calc(100vh-224px)] overflow-y-auto p-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'
                            }`}
                    >
                        <div
                            className={`inline-block p-2 rounded-lg ${message.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-black'
                                }`}
                        >
                            {message.content}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="bg-white p-4 shadow-md">
                <div className="flex items-center">
                    <input
                        autoFocus
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Aa..."
                        className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;
