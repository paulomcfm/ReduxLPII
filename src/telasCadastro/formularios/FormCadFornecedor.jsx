import { useState } from "react";
import { toast } from 'react-toastify';
import { Container, Form, Row, Col, FloatingLabel, Button, Spinner } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { adicionarFornecedor, atualizarFornecedor } from "../../redux/fornecedorReducer.js";
import ESTADO from '../../recursos/estado.js';

export default function FormCadFornecedor(props) {
    const { estado, mensagem, fornecedores } = useSelector((state) => state.fornecedor);
    const dispatch = useDispatch();

    const estadoInicialFornecedor = props.fornecedorParaEdicao;
    const [fornecedor, setFornecedor] = useState(estadoInicialFornecedor);
    const [formValidado, setFormValidado] = useState(false);
    const fornecedorVazio = {
        cnpj: '',
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        bairro: '',
        numero: '',
        cep: ''
    }

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setFornecedor({ ...fornecedor, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(adicionarFornecedor(fornecedor));
                props.setMensagem('Fornecedor incluído com sucesso');
                props.setTipoMensagem('success');
                props.setMostrarMensagem(true);
            }
            else {
                if (window.confirm('Deseja realmente alterar este fornecedor?')) {
                    dispatch(atualizarFornecedor(fornecedor));
                    props.setMensagem('Fornecedor alterado com sucesso');
                    props.setTipoMensagem('success');
                    props.setMostrarMensagem(true);
                    props.setModoEdicao(false);
                    props.setFornecedorParaEdicao(fornecedorVazio);
                }
            }
            setFornecedor(fornecedorVazio);
            setFormValidado(false);
        }
        else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }


    return (
        <Container>
            {estado === ESTADO.ERRO ?
                toast.error(({ closeToast }) =>
                    <div>
                        <p>{mensagem}</p>

                    </div>
                    , { toastId: estado })
                :
                null
            }
            {
                estado === ESTADO.PENDENTE ?
                    toast(({ closeToast }) =>
                        <div>
                            <Spinner animation="border" role="status"></Spinner>
                            <p>Processando a requisição...</p>
                        </div>
                        , { toastId: estado })
                    :
                    null
            }
            {
                estado === ESTADO.OCIOSO ?
                    setTimeout(() => {
                        toast.dismiss();
                    }, 2000)
                    :
                    null
            }
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="CNPJ:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="00.000.000/0000-00"
                                    id="cnpj"
                                    name="cnpj"
                                    value={fornecedor.cnpj}
                                    onChange={manipularMudancas}
                                    required
                                />

                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o CNPJ!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Nome:"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Informe o nome fantasia!" id="nome" name="nome"
                                    value={fornecedor.nome}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o nome da empresa!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="Email:"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="email@dominio.com.br" id="email" name="email"
                                    value={fornecedor.email}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o email!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={8}>
                        <Form.Group>
                            <FloatingLabel
                                label="Endereço:"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Avenida/Rua/Alameda/Viela" id="endereco"
                                    name="endereco"
                                    value={fornecedor.endereco}
                                    onChange={manipularMudancas}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o endereço!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>


                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="Nº:"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="130" id="numero" name="numero"
                                    value={fornecedor.numero}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o bairro!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="CEP:"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="00000-000" id="cep" name="cep"
                                    value={fornecedor.cep}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o CEP!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="Telefone:"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="00000-0000" id="telefone" name="telefone"
                                    value={fornecedor.telefone}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o Telefone!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"} onClick={() => {
                        }}>{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                    </Col>
                    <Col>
                        <Button type="submit" variant={"secondary"} onClick={() => {
                            props.exibirFormulario(false);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
