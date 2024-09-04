import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    medicine: [],
    searchTerm: ''
}

const MedicineSlice = createSlice({
    name: "medicine",
    initialState,
    reducers: {
        medicineData: (state, action) => {
            state.medicine = action.payload

        },
        changeRating: (state, action) => {
            const { id, rating } = action.payload
            const medicine = state.medicine.find(med => med.id === id)
            if (medicine) {
                medicine.rating = rating
            }
        },

        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
    }
})
export const medicineReducer = MedicineSlice.reducer
export const { medicineData } = MedicineSlice.actions
export const { changeRating } = MedicineSlice.actions
export const { setSearchTerm } = MedicineSlice.actions