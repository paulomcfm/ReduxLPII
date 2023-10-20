import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";

const fornecedorSlice = createSlice({
    name: 'fornecedor',
    initialState: {
        status: ESTADO.OCIOSO,
        mensagem: '',
        listaFornecedores: []
    },
    reducers: {
        adicionar: (state, action) => {
            state.listaFornecedores.push(action.payload);
        },
        remover: (state, action) => {
            state.listaFornecedores = state.listaFornecedores.filter(fornecedor => fornecedor.cnpj !== action.payload.cnpj);
        },
        atualizar: (state, action) => {
            state.listaFornecedores = state.listaFornecedores.map(fornecedor => {
                if (fornecedor.cnpj === action.payload.cnpj) {
                    return fornecedor;
                }
                return action.payload;
            });
        }
    }
});

export const { adicionar, remover, atualizar } = fornecedorSlice.actions;
export default fornecedorSlice.reducer;