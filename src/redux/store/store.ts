import { configureStore } from '@reduxjs/toolkit'
import voiceSlice from '../slice/voice.slice'
export default configureStore({
    reducer: {
        voice: voiceSlice.reducer
    },
})