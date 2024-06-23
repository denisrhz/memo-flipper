import { createSlice } from "@reduxjs/toolkit"
import {
  FcCommandLine,
  FcElectronics,
  FcGlobe,
  FcAndroidOs,
  FcCellPhone,
  FcClock,
  FcCurrencyExchange,
  FcDepartment,
  FcDvdLogo,
  FcFilmReel,
  FcGraduationCap,
  FcWiFiLogo,
} from "react-icons/fc"

const dataSlice = createSlice({
  name: "data",
  initialState: {
    lastSelectedCards: [],
    win: false,
    counter: 2,
    attempts: 0,
    loading: false,
  },
  reducers: {
    setLastSelectedCards: (state, action) => {
      state.lastSelectedCards = action.payload
    },
    setWin: (state, action) => {
      state.win = action.payload
    },
    setCounter: (state, action) => {
      state.counter = action.payload
    },
    setAttempts: (state, action) => {
      state.attempts = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const {
  setLastSelectedCards,
  setWin,
  setCounter,
  setAttempts,
  setLoading,
} = dataSlice.actions
export default dataSlice.reducer
