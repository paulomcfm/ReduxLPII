import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";

const produtoSlice = createSlice({
    name: 'produto',
    initialState: {
        status: ESTADO.OCIOSO,
        mensagem: '',
        listaProdutos: []
    },
    reducers: {
        adicionar: (state, action) => {
            state.listaProdutos.push(action.payload);
        },
        remover: (state, action) => {
            state.listaProdutos = state.listaProdutos.filter(produto => produto.nome !== action.payload.nome);
        },
        atualizar: (state, action) => {
            state.listaProdutos = state.listaProdutos.map(produto => {
                if (produto.nome === action.payload.nome) {
                    return produto;
                }
                return action.payload;
            });
        }
    }
});

export const { adicionar, remover, atualizar } = produtoSlice.actions;
export default produtoSlice.reducer;