/********************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de movimentações de estoque),
*           Validações, tratamento de dados etc...
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.1
*********************************************************************************************************************************/

// Import das mensagens e status
const message = require('../../config/status/status.js');

// Import do DAO
const movEstoqueDAO = require('../../model/DAO/mov_estoque.js');

// Inserir movimentação de estoque
const inserirMovimentacaoEstoque = async function(movimentacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                movimentacao.estoque_id == null || movimentacao.estoque_id == undefined || isNaN(movimentacao.estoque_id) ||
                movimentacao.movimento_id == null || movimentacao.movimento_id == undefined || isNaN(movimentacao.movimento_id) ||
                movimentacao.quantidade == null || movimentacao.quantidade == undefined || isNaN(movimentacao.quantidade)
            ) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                let result = await movEstoqueDAO.insertMovimentacaoEstoque(movimentacao);

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

// Atualizar movimentação de estoque
const atualizarMovimentacaoEstoque = async function(id, movimentacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == null || id == undefined || isNaN(id) ||
                movimentacao.estoque_id == null || movimentacao.estoque_id == undefined || isNaN(movimentacao.estoque_id) ||
                movimentacao.movimento_id == null || movimentacao.movimento_id == undefined || isNaN(movimentacao.movimento_id) ||
                movimentacao.quantidade == null || movimentacao.quantidade == undefined || isNaN(movimentacao.quantidade)
            ) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                let verificarID = await movEstoqueDAO.selectByIdMovimentacaoEstoque(id);

                if (verificarID != false && verificarID.length > 0) {
                    movimentacao.id = id;

                    let result = await movEstoqueDAO.updateMovimentacaoEstoque(movimentacao);

                    if (result) {
                        return message.SUCESS_UPDATED_ITEM; // 200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL; // 500
                    }
                } else {
                    return message.ERROR_NOT_FOUND; // 404
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Excluir movimentação de estoque
const excluirMovimentacaoEstoque = async function(id) {
    try {
        if (id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        } else {
            let result = await movEstoqueDAO.selectByIdMovimentacaoEstoque(id);

            if (result != false && result.length > 0) {
                let deleteResult = await movEstoqueDAO.deleteMovimentacaoEstoque(id);

                if (deleteResult) {
                    return message.SUCCES_DELETE_ITEM; // 200
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            } else {
                return message.ERROR_NOT_FOUND; // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Listar movimentações de estoque
const listarMovimentacoesEstoque = async function() {
    try {
        let result = await movEstoqueDAO.selectAllMovimentacoesEstoque();

        if (result != false && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                movimentacoes: result
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Buscar movimentação de estoque por ID
const buscarMovimentacaoEstoque = async function(id) {
    try {
        if (id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await movEstoqueDAO.selectByIdMovimentacaoEstoque(id);

        if (result != false && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                movimentacao: result
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

module.exports = {
    inserirMovimentacaoEstoque,
    atualizarMovimentacaoEstoque,
    excluirMovimentacaoEstoque,
    listarMovimentacoesEstoque,
    buscarMovimentacaoEstoque
};