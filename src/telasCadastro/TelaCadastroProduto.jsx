import { Container } from "react-bootstrap";
import TelaMensagem from "./TelaMensagem";
import Pagina from "../templates/Pagina";
import FormCadProduto from "./formularios/FormCadProduto";
import TabelaProdutos from "./tabelas/TabelaProdutos";
import { useState } from "react";

export default function TelaCadastroProduto(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    const [modoEdicao, setModoEdicao] = useState(false);
    const [produtoParaEdicao, setProdutoParaEdicao] = useState({
        codigo: '0',
        nome: '',
        descricao: '',
        quantidade: '',
        preco: '',
        categoria: {
            codigo: 0,
            nome: ''
        }
    });

    if (mostrarMensagem) {
        return (
            <TelaMensagem mensagem={mensagem} tipo={tipoMensagem} setMostrarMensagem={setMostrarMensagem} />
        );
    }
    else {
        return (
            <Container>
                <Pagina>
                    {
                        exibirFormulario ?
                            <FormCadProduto exibirFormulario={setExibirFormulario}
                                setExibirFormulario={setExibirFormulario}
                                modoEdicao={modoEdicao}
                                setModoEdicao={setModoEdicao}
                                produtoParaEdicao={produtoParaEdicao}
                                setProdutoParaEdicao={setProdutoParaEdicao}
                                setMostrarMensagem={setMostrarMensagem}
                                setMensagem={setMensagem}
                                setTipoMensagem={setTipoMensagem}
                            />
                            :
                            <TabelaProdutos exibirFormulario={setExibirFormulario}
                                setExibirFormulario={setExibirFormulario}
                                modoEdicao={modoEdicao}
                                setModoEdicao={setModoEdicao}
                                setProdutoParaEdicao={setProdutoParaEdicao}
                            />
                    }
                </Pagina>
            </Container>
        )
    }
}