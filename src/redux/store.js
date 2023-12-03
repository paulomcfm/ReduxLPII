import { configureStore } from '@reduxjs/toolkit';
import clienteSlice from './clienteReducer';
import fornecedorSlice from './fornecedorReducer';
import categoriaSlice from './categoriaReducer.js';
import produtoSlice from './produtoReducer';

const store = configureStore({
    reducer: {
        cliente: clienteSlice,
        fornecedor: fornecedorSlice,
        categoria: categoriaSlice,
        produto: produtoSlice
    }
})

export default store;