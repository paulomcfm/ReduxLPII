import TelaCadastroCategoria from './telasCadastro/TelaCadastroCategoria.jsx';
import TelaCadastroCliente from './telasCadastro/TelaCadastroCliente.jsx';
import TelaCadastroFornecedor from './telasCadastro/TelaCadastroFornecedor.jsx';
import TelaCadastroProduto from './telasCadastro/TelaCadastroProduto.jsx';
import Tela404 from './telasCadastro/Tela404.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaMenu from './telasCadastro/TelaMenu.jsx';
import store from './redux/store.js';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/clientes" element={<TelaCadastroCliente />} />
            <Route path="/fornecedores" element={<TelaCadastroFornecedor />} />
            <Route path='/produtos' element={<TelaCadastroProduto />} />
            <Route path='/categorias' element={<TelaCadastroCategoria />} />
            <Route path='/' element={<TelaMenu />} />
            <Route path='*' element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;


