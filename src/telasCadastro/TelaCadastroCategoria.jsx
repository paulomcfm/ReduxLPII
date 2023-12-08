import { Container } from "react-bootstrap";
import TelaMensagem from "./TelaMensagem";
import Pagina from "../templates/Pagina";
import FormCadCategoria from "./formularios/FormCadCategoria";
import TabelaCategorias from "./tabelas/TabelaCategorias";
import { useState } from "react";

export default function TelaCadastroCategoria(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    const [categoriaParaEdicao, setCategoriaParaEdicao] = useState({
        codigo: '0',
        nome: ''
    });
    const [modoEdicao, setModoEdicao] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                    exibirFormulario ? 
                    <FormCadCategoria exibirFormulario={setExibirFormulario}
                        categoriaParaEdicao={categoriaParaEdicao}
                        setCategoriaParaEdicao={setCategoriaParaEdicao}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        setMostrarMensagem={setMostrarMensagem}
                        setMensagem={setMensagem}
                        setTipoMensagem={setTipoMensagem}
                    />
                        :
                        <TabelaCategorias exibirFormulario={setExibirFormulario}
                            categoriaParaEdicao={categoriaParaEdicao}
                            setCategoriaParaEdicao={setCategoriaParaEdicao}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                }
            </Pagina>
        </Container>
    )
}