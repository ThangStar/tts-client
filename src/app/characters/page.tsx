"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { characters } from '@/constants/constants';
import { Character } from '@/types/character.type';

const Page = () => {
    const handleCharacterClick = (character: Character) => {
        console.log(`Selected character: ${character.name}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Chọn một nhân vật để trò chuyện</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {characters.map((character) => (
                    <Link
                        key={character.id}
                        href={`/characters/chat?id=${character.id}`}
                        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => handleCharacterClick(character)}
                    >
                        <div className="w-24 h-24 mx-auto mb-2 relative">
                            <Image
                                src={character.avatar}
                                alt={character.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <h2 className="text-center font-semibold">{character.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Page;
