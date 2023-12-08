import { configureStore } from '@reduxjs/toolkit';
import clienteSlice from './clienteReducer.js';
import fornecedorSlice from './fornecedorReducer.js';
import categoriaSlice from './categoriaReducer.js';
import produtoSlice from './produtoReducer.js';

const store = configureStore({
    reducer: {
        cliente: clienteSlice,
        fornecedor: fornecedorSlice,
        categoria: categoriaSlice,
        produto: produtoSlice
    }
});

export default store;