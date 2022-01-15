import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    authToken: '',
    isLoggedIn: false
  },
  reducers: {
    setLogin: (state, action) => {
      state.username = action.payload.username
      state.authToken = action.payload.authToken
      state.isLoggedIn = true
    },
    setLogout: (state) => {
        state.username = ''
        state.authToken = ''
        state.isLoggedIn = false
    },
  },
})

export const { setLogin, setLogout } = authSlice.actions

export default authSlice.reducer