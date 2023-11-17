import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";
const urlBase = 'http://localhost:3000/produtos';

export const buscarProdutos = createAsyncThunk(
    'buscarProdutos', async () => {
        try {
            const reposta = await fetch(urlBase, { method: 'GET' });
            const dados = await reposta.json();
            if (dados.status) {
                return {
                    status: dados.status,
                    mensagem: "",
                    listaProdutos
                }
            } else {
                return {
                    status: dados.status,
                    mensagem: dados.mensagem,
                    listaProdutos: []
                }
            }
        }
        catch (erro) {
            {
                return {
                    status: false,
                    mensagem: "Erro ao recuperar produtos" + erro.message,
                    listaProdutos: []
                }
            }
        }
    }
)

export const incluirProdutos = createAsyncThunk(
    'incluirProdutos', async (produto) => {
        try {
            const resposta = await fetch(urlBase, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: produto // produto no do prof
            });
            const dados = await resposta.json();
            if (dados.status) {
                produto.codigo = dados.codigoGerado;
                return {
                    status: dados.status,
                    produto,
                    mensagem: dados.mensagem
                }
            }
            else {
                return {
                    status: dados.status,
                    mensagem: dados.mensagem
                }
            }
        }
        catch (erro) {
            return {
                status: false,
                mensagem: "Não foi possível cadastrar o produto: " + erro.message
            }
        }
    }
)

export const atualizarProduto = createAsyncThunk(
    'atualizarProduto', async (produto) => {
        try {
            const resposta = await fetch(urlBase, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: produto // produto no do prof
            });
            const dados = await resposta.json();
            if (dados.status) {
                return {
                    status: dados.status,
                    produto,
                    mensagem: dados.mensagem
                }
            }
            else {
                return {
                    status: dados.status,
                    mensagem: dados.mensagem
                }
            }
        }
        catch (erro) {
            return {
                status: false,
                mensagem: "Não foi possível atualizar o produto: " + erro.message
            }
        }
    }
)

export const excluirProdutos = createAsyncThunk(
    'atualizarProduto', async (produto) => {
        try {
            const resposta = await fetch(urlBase, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: produto // produto no do prof
            });
            const dados = await resposta.json();
            if (dados.status) {
                return {
                    status: dados.status,
                    produto,
                    mensagem: dados.mensagem
                }
            }
            else {
                return {
                    status: dados.status,
                    mensagem: dados.mensagem
                }
            }
        }
        catch (erro) {
            return {
                status: false,
                mensagem: "Não foi possível excluir o produto: " + erro.message
            }
        }
    }
)

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: '',
    produtos: []
}

const produtoSlice = createSlice({
    name: 'produto',
    initialState: estadoInicial,
    reducers: { // DEVERIA ESTAR VAZIO 
        adicionar: (state, action) => {
            state.listaProdutos.push(action.payload);
        },
        remover: (state, action) => {
            state.listaProdutos = state.listaProdutos.filter(produto => produto.nome !== action.payload.nome);
        },
        atualizar: (state, action) => {
            state.listaProdutos = state.listaProdutos.map(produto => {
                if (produto.nome === action.payload.nome) {
                    return action.payload;
                }
                return produto;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(buscarProdutos.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Buscando produtos...';
            })
            .addCase(buscarProdutos.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = 'Produtos recuperados do backend!';
                    state.produtos = action.payload.listaProdutos;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.produtos = [];
                }
            })
            .addCase(buscarProdutos.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.produtos = [];
            })
            .addCase(incluirProdutos.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...';
            })
            .addCase(incluirProdutos.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.produtos.push(action.payload.produto);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirProdutos.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(atualizarProduto.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...';
            })
            .addCase(atualizarProduto.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice =  state.produtos.findIndex((produto) => {
                        produto.codigo === action.payload.produto.codigo
                    })
                    state.produtos[indice] = action.payload.produto;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(excluirProdutos.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...';
            })
            .addCase(excluirProdutos.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.produtos =  state.produtos.filter((produto) => {
                        produto.codigo !== action.payload.produto.codigo
                    });
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(excluirProdutos.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default produtosSlice.reducer;