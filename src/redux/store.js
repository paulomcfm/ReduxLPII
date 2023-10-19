import {configureStore} from '@reduxjs/toolkit';
import clienteSlice from './clienteReducer';
import fornecedorSlice from './fornecedorReducer';

const store = configureStore({
    reducer:{
        cliente: clienteSlice,
        fornecedor: fornecedorSlice,
    }
})

export default store;