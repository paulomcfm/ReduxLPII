import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";

const categoriaSlice = createSlice({
    name: 'categoria',
    initialState: {
        status: ESTADO.OCIOSO,
        mensagem: '',
        listaCategorias: []
    },
    reducers: {
        adicionar: (state, action) => {
            state.listaCategorias.push(action.payload);
        },
        remover: (state, action) => {
            state.listaCategorias = state.listaCategorias.filter(categoria => categoria.nome !== action.payload.nome);
        },
        atualizar: (state, action) => {
            state.listaCategorias = state.listaCategorias.map(categoria => {
                if (categoria.nome === action.payload.nome) {
                    return action.payload;
                }
                return categoria;
            });
        }
    }
});

export const { adicionar, remover, atualizar } = categoriaSlice.actions;
export default categoriaSlice.reducer;