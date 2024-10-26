"use client"
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CharacterDetail from './CharacterDetail';

function CharacterDetailWrapper() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return <CharacterDetail id={id as string} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CharacterDetailWrapper />
    </Suspense>
  );
}
