import {createSlice} from '@reduxjs/toolkit';

const clienteSlice = ({
    name:'cliente',
    initialState:{
        status: ESTADO.OCIOSO,
        mensagem:'',
        listaCliente:[]
    },
    reducers:{
        adicionar:(state, action)=>{
            state.listaClientes.push(action.payload);
        },
        remover:(state, action)=>{
            state.listaClientes = state.listaClientes.filter(cliente => cliente.cpf !== action.payload.cliente.cpf);
        },
        atualizar:(state, action)=>{
            const listaTemporariaClientes = state.listaClientes.filter(cliente => cliente.cpf !== action.payload.cliente.cpf);
            state.listaCliente = [...listaTemporariaClientes, action.payload.cliente];
        }
    }
});

export const {adicionar,remover,atualizar} = clienteSlice.actions;
export default clienteSlice.reducer;