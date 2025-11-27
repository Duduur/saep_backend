/**************************************************
 * Autor: EDUARDO NASCIMENTO COUTO LUIZ
 * Date: 27/11/25
 * Versão: 1.0
 * Desc: App que irá conter os end-points
 * 
 * Instalações necessárias:
 *     Para criar a API precisamos instalar:
 *          * express           npm install express --save
 *          * cors              npm install cors --save
 *          * body-parser       npm install body-parser --save
 *
 *      Para criar a integração com o Banco de Dados precisamos instalar:
 *          * prisma            npm install prisma --save           (para fazer conexão com o BD)
 *          * prisma/client     npm install @prisma/client --save   (para rodar os scripts SQL)
 *        
 * 
 *            Após a instalação do prisma e do prisma client, devemos:
 *              npx prisma init
 *            Você deverá configurar o arquivo .env e schema.prisma com as credenciais do BD
 *            Após essa configuração deverá rodar o seguinte comando:
 *               npx prisma migrate dev
 * 
 **************************************************/



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Controllers
const estoqueController = require('./controller/Estoque/controller_estoque.js');
const movEstoqueController = require('./controller/Movimentação Estoque/mov_estoque.js');
const conectividadeProdutosController = require('./controller/Conectividade/controller_conectividade_produtos.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Endpoints para Estoque
app.post('/estoque', async (req, res) => {
    const result = await estoqueController.inserirestoque(req.body, req.headers['content-type']);
    res.status(result.status_code || 500).json(result);
});

app.put('/estoque/:id', async (req, res) => {
    const result = await estoqueController.atualizarestoque(req.params.id, req.body, req.headers['content-type']);
    res.status(result.status_code || 500).json(result);
});

app.delete('/estoque/:id', async (req, res) => {
    const result = await estoqueController.excluirestoque(req.params.id);
    res.status(result.status_code || 500).json(result);
});

app.get('/estoque', async (req, res) => {
    const result = await estoqueController.listarestoque();
    res.status(result.status_code || 500).json(result);
});

app.get('/estoque/:id', async (req, res) => {
    const result = await estoqueController.buscarestoque(req.params.id);
    res.status(result.status_code || 500).json(result);
});

// Endpoints para Movimentação de Estoque
app.post('/movimentacao-estoque', async (req, res) => {
    const result = await movEstoqueController.inserirMovimentacaoEstoque(req.body, req.headers['content-type']);
    res.status(result.status_code || 500).json(result);
});

app.put('/movimentacao-estoque/:id', async (req, res) => {
    const result = await movEstoqueController.atualizarMovimentacaoEstoque(req.params.id, req.body, req.headers['content-type']);
    res.status(result.status_code || 500).json(result);
});

app.delete('/movimentacao-estoque/:id', async (req, res) => {
    const result = await movEstoqueController.excluirMovimentacaoEstoque(req.params.id);
    res.status(result.status_code || 500).json(result);
});

app.get('/movimentacao-estoque', async (req, res) => {
    const result = await movEstoqueController.listarMovimentacoesEstoque();
    res.status(result.status_code || 500).json(result);
});

app.get('/movimentacao-estoque/:id', async (req, res) => {
    const result = await movEstoqueController.buscarMovimentacaoEstoque(req.params.id);
    res.status(result.status_code || 500).json(result);
});

// Endpoints para Conectividade de Produtos
app.post('/conectividade-produtos', async (req, res) => {
    const result = await conectividadeProdutosController.inserirConectividadeProduto(req.body, req.headers['content-type']);
    res.status(result.status_code || 500).json(result);
});

app.put('/conectividade-produtos/:id', async (req, res) => {
    const result = await conectividadeProdutosController.atualizarConectividadeProduto(req.params.id, req.body, req.headers['content-type']);
    res.status(result.status_code || 500).json(result);
});

app.delete('/conectividade-produtos/:id', async (req, res) => {
    const result = await conectividadeProdutosController.excluirConectividadeProduto(req.params.id);
    res.status(result.status_code || 500).json(result);
});

app.get('/conectividade-produtos', async (req, res) => {
    const result = await conectividadeProdutosController.listarConectividadesProdutos();
    res.status(result.status_code || 500).json(result);
});

app.get('/conectividade-produtos/:id', async (req, res) => {
    const result = await conectividadeProdutosController.buscarConectividadeProduto(req.params.id);
    res.status(result.status_code || 500).json(result);
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});