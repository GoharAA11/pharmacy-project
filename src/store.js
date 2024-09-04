import { configureStore } from "@reduxjs/toolkit";
import { medicineReducer } from "./feautures/medicine/medicine.slice";

export const store = configureStore({
    reducer: medicineReducer
})