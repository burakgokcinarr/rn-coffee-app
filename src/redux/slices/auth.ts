import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AuthState {
    userInfo: any,
    isLoggedIn: boolean
}

const initialState: AuthState = {
    userInfo: null,
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<any>) => {
            state.userInfo   = action.payload,
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.userInfo   = null;
            state.isLoggedIn = false;
        },
    }
})

export const { setUserInfo, logout } = authSlice.actions

export const selectUserData = (state: RootState) => state.auth.userInfo;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer