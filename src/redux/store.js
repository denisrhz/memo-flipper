import { configureStore } from "@reduxjs/toolkit"
import dataReducer from "./services/dataReducer"

export default configureStore({
  reducer: {
    data: dataReducer,
  },
})
