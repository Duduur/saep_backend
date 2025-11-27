/********************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de estoques),
*           Validações, tratamento de dados etc...
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.1
*********************************************************************************************************************************/

// Import das mensagens e status
const message = require('../../config/status/status.js');

// Import do DAO
const estoqueDAO = require('../../model/DAO/estoque.js');
const produtoDAO = require('../../model/DAO/produto.js');

// Inserir estoque
const inserirEstoque = async function(estoque, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                estoque.id_produto == null || estoque.id_produto == undefined || isNaN(estoque.id_produto) ||
                estoque.quantidade_atual == null || estoque.quantidade_atual == undefined || isNaN(estoque.quantidade_atual)
            ) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                // Verificar se o produto existe
                const produto = await produtoDAO.selectByIdProduto(estoque.id_produto);
                if (!produto || produto.length === 0) {
                    return message.ERROR_NOT_FOUND; // 404
                }

                // Inserir o estoque
                const result = await estoqueDAO.insertestoque(estoque);
                if (result) {
                    return message.SUCCESS_CREATED_ITEM; // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Atualizar estoque
const atualizarEstoque = async function(id, estoque, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == null || id == undefined || isNaN(id) ||
                estoque.id_produto == null || estoque.id_produto == undefined || isNaN(estoque.id_produto) ||
                estoque.quantidade_atual == null || estoque.quantidade_atual == undefined || isNaN(estoque.quantidade_atual)
            ) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                // Verificar se o estoque existe
                const estoqueExistente = await estoqueDAO.selectByIdestoque(id);
                if (!estoqueExistente || estoqueExistente.length === 0) {
                    return message.ERROR_NOT_FOUND; // 404
                }

                // Verificar se o produto existe
                const produto = await produtoDAO.selectByIdProduto(estoque.id_produto);
                if (!produto || produto.length === 0) {
                    return message.ERROR_NOT_FOUND; // 404
                }

                // Atualizar o estoque
                estoque.id_estoque = id;
                const result = await estoqueDAO.updateestoque(estoque);
                if (result) {
                    return message.SUCESS_UPDATED_ITEM; // 200
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Excluir estoque
const excluirEstoque = async function(id) {
    try {
        if (id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        } else {
            // Verificar se o estoque existe
            const estoqueExistente = await estoqueDAO.selectByIdEstoque(id);
            if (!estoqueExistente || estoqueExistente.length === 0) {
                return message.ERROR_NOT_FOUND; // 404
            }

            // Excluir o estoque
            const result = await estoqueDAO.deleteestoque(id);
            if (result) {
                return message.SUCCES_DELETE_ITEM; // 200
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Listar estoques
const listarEstoques = async function() {
    try {
        const result = await estoqueDAO.selectAllestoques();
        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                estoques: result
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Buscar estoque por ID
const buscarEstoque = async function(id) {
    try {
        if (id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        }

        const result = await estoqueDAO.selectByIdestoque(id);
        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                estoque: result
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

module.exports = {
    inserirEstoque,
    atualizarEstoque,
    excluirEstoque,
    listarEstoques,
    buscarEstoque
};