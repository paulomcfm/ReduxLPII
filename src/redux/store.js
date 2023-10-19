import {configureStore} from '@reduxjs/toolkit';
import clienteSlice from './clienteReducer';

const store = configureStore({
    reducers:{
        cliente: clienteSlice,
    }
})

export default store;