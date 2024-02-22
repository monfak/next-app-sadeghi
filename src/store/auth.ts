import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import User, { UserType } from '../models/user';


interface AuthState {
    loading? : boolean
    phoneVerifyToken? : string,
    user? : UserType
}

const initialState : AuthState = {
    loading : true,
    phoneVerifyToken : undefined,
    user : undefined
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        updatePhoneVerifyToken: (state , action : PayloadAction<string|undefined>) => {
            state.phoneVerifyToken = action.payload;
        },
        updateUser : (state , action : PayloadAction<UserType>) => {
            state.user = action.payload
        },
        updateLoading : (state , action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        }
    }
})


export const { updatePhoneVerifyToken , updateUser , updateLoading } = authSlice.actions;

export const selectPhoneVerifyToken = (state : RootState) => state.auth.phoneVerifyToken
export const selectUser = (state : RootState) => new User(state.auth.user)
export const selectUserLoading = (state : RootState) => state.auth.loading;

export default authSlice.reducer;