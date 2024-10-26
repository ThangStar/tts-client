"use client"
import React, { useState, useRef, useEffect } from 'react';

import CharacterDetail from './CharacterDetail';
import { useParams, useSearchParams } from 'next/navigation';


export default function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    return <CharacterDetail id={id as string} />;
}

