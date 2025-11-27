/********************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de movimentacao de produtos),
*           Validações, tratamento de dados etc...
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

// Import das mensagens e status
const message = require('../../config/status/status.js');

// Import do DAO
const MovimentacaosDAO = require('../../model/DAO/movimentacao.js');

// Inserir movimentacao de produto
const inserirMovimentacao = async function(movimentacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                movimentacao.nome_tipo == '' || movimentacao.nome_tipo == null || movimentacao.nome_tipo == undefined || movimentacao.nome_tipo.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                let result = await MovimentacaosDAO.insertMovimentacao(movimentacao);

                if (result) {
                    return message.SUCCES_CREATED_ITEM; // 201
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

// Atualizar movimentacao de produto
const atualizarMovimentacao = async function(id, movimentacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                movimentacao.nome_tipo == '' || movimentacao.nome_tipo == null || movimentacao.nome_tipo == undefined || movimentacao.nome_tipo.length > 100 ||
                id == '' || id == null || id == undefined || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                let verificarID = await MovimentacaosDAO.selectByIdMovimentacao(id);

                if (verificarID != false && verificarID.length > 0) {
                    movimentacao.id = id;

                    let result = await MovimentacaosDAO.updateMovimentacao(movimentacao);

                    if (result) {
                        return message.SUCCES_UPDATE_ITEM; // 200
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

// Excluir movimentacao de produto
const excluirMovimentacao = async function(id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        } else {
            let result = await MovimentacaosDAO.selectByIdMovimentacao(id);

            if (result != false && result.length > 0) {
                let deleteResult = await MovimentacaosDAO.deleteMovimentacao(id);

                if (deleteResult) {
                    return message.SUCCES_DELETED_ITEM; // 200
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

// Listar movimentacaos de produtos
const listarMovimentacao = async function() {
    try {
        let result = await MovimentacaosDAO.selectAllMovimentacao();

        if (result != false && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                movimentacaos: result
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Buscar movimentacao de produto por ID
const buscarMovimentacao = async function(id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await MovimentacaosDAO.selectByIdMovimentacao(id);

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
    inserirMovimentacao,
    atualizarMovimentacao,
    excluirMovimentacao,
    listarMovimentacao,
    buscarMovimentacao
};