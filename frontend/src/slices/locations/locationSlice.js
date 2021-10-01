import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name: "locations",
    initialState: {
        countries: null,
        countryCitys: null,
        token: null,
    },
    reducers: {
        getCountrys: (state, action) => {
            state.countries = action.payload;
        },
        getCountryCitys: (state, action) => {
            state.countryCitys = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        resetCountryCities: (state) => {
            state.countryCitys = null;
        },
    },
});

export const { 
    getCountrys,
    getCountryCitys,
    setToken,
    resetCountryCities
} = locationSlice.actions;

export const locationData = (state) => state.locations;

export default locationSlice.reducer;