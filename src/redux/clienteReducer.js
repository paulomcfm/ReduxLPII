import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";

const clienteSlice = createSlice({
    name:'cliente',
    initialState:{
        status: ESTADO.OCIOSO,
        mensagem:'',
        listaClientes:[]
    },
    reducers:{
        adicionar:(state, action)=>{
            state.listaClientes.push(action.payload);
        },
        remover:(state, action)=>{
            state.listaClientes = state.listaClientes.filter(cliente => cliente.cpf !== action.payload.cpf);
        },
        atualizar:(state, action)=>{
            state.listaClientes = state.listaClientes.map(cliente => {
                if (cliente.cpf === action.payload.cpf) {
                  return cliente;
                }
                return action.payload;
              });
        }
    }
});

export const {adicionar,remover,atualizar} = clienteSlice.actions;
export default clienteSlice.reducer;