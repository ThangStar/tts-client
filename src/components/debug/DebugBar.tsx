import { Client } from '@gradio/client';
import { Button } from '@nextui-org/react'
import React from 'react'

function DebugBar() {
    const handleCallApi = async () => {
        const client = await Client.connect("akthangdz/tts-ngngan");
        const result = await client.predict("/speak", {
            text: "chuyển đổi chuyển văn bản thành giọng nói, sử dụng giọng đọc của nhà văn Nguyễn Ngọc Ngạn",
        } as any);
    }
    return (
        <div className='fixed bottom-3 right-3 border z-50 p-8'>
            <div className='flex items-center justify-center mb-6'>DEBUG API</div>
            <div className='flex items-center justify-center'>
                <Button color='primary' onClick={handleCallApi}>CALL</Button>
            </div>
        </div>
    )
}

export default DebugBar
