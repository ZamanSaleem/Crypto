import { configureStore } from "@reduxjs/toolkit";
import coinReducer  from "./marketSlice";
const store =configureStore ({
    reducer : {
        coin: coinReducer 
    }
})

export default store