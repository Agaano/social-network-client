import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IUser {
  email: string,
  username: string,
  service: object,
}

const initialState : {isAuthenticated: boolean, user: IUser | null} = {
  isAuthenticated: false,
  user: null
} 

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action:PayloadAction<any>) => {
      // Ваша логика для обработки успешного входа пользователя
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      // Ваша логика для обработки выхода пользователя
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;