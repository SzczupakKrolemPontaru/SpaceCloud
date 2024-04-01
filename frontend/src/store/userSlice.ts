import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    value: string
}

const initialState: UserState = {
    value: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        clearUser: (state) => {
            state.value = '';
        }
    },
})


export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer