import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import User, { UserType } from '../models/user';
import {storeLoginToken} from "@/helpers/auth";


interface AuthState {
    loading? : boolean
    isRedirect? : boolean
    access_token? : string,
    user? : UserType
}

const initialState : AuthState = {
    loading : true,
    isRedirect : false,
    access_token : undefined,
    user : undefined
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        updateCurrentToken: (state , action : PayloadAction<string|undefined>) => {
            state.access_token = action.payload;
        },
        updateUser : (state , action : PayloadAction<UserType>) => {
            state.user = action.payload
        },
        updateLoading : (state , action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
        updateIsRedirect : (state , action: PayloadAction<boolean> ) => {
            state.isRedirect = action.payload;
        }
    }
})


export const { updateCurrentToken , updateUser , updateLoading,updateIsRedirect } = authSlice.actions;

export const selectAccessToken = (state : RootState) => state.auth.access_token
export const selectUser = (state : RootState) => new User(state.auth.user)
export const selectUserLoading = (state : RootState) => state.auth.loading;
export const selectIsRedirect = (state : RootState) => state.auth.isRedirect;

export default authSlice.reducer;