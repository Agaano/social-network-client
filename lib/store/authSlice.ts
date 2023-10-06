import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export interface IUser {
  email: string,
  username: string,
  avatar: string,
  service: object,
}

const initialState : {isAuthenticated: boolean, user: IUser | null, refresh: boolean} = {
  isAuthenticated: false,
  user: null,
  refresh: false,
} 


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action:PayloadAction<any>) => {
      state.isAuthenticated = true;
      if (!!action.payload.avatar) {
        action.payload.avatar = process.env.NEXT_PUBLIC_SERVER_URL + action.payload.avatar;
      }
      state.user = action.payload;
    },
    logout: (state) => {
      Cookies.remove('_tka');
      state.isAuthenticated = false;
      state.user = null;
    },
    refresh: (state) => {
      state.refresh = !state.refresh;
    }
  },
});

export const { login, logout, refresh } = authSlice.actions;
export default authSlice.reducer;