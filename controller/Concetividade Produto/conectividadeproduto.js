/********************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de conectividade de produtos),
*           Validações, tratamento de dados etc...
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

// Import das mensagens e status
const message = require('../../config/status/status.js');

// Import do DAO
const conectividadeProdutosDAO = require('../../model/DAO/conectividade_produtos.js');

// Inserir conectividade de produto
const inserirConectividadeProduto = async function(conectividade, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                conectividade.nome == '' || conectividade.nome == null || conectividade.nome == undefined || conectividade.nome.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                let result = await conectividadeProdutosDAO.insertConectividadeProduto(conectividade);

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

// Atualizar conectividade de produto
const atualizarConectividadeProduto = async function(id, conectividade, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                conectividade.nome == '' || conectividade.nome == null || conectividade.nome == undefined || conectividade.nome.length > 100 ||
                id == '' || id == null || id == undefined || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                let verificarID = await conectividadeProdutosDAO.selectByIdConectividadeProduto(id);

                if (verificarID != false && verificarID.length > 0) {
                    conectividade.id = id;

                    let result = await conectividadeProdutosDAO.updateConectividadeProduto(conectividade);

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

// Excluir conectividade de produto
const excluirConectividadeProduto = async function(id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        } else {
            let result = await conectividadeProdutosDAO.selectByIdConectividadeProduto(id);

            if (result != false && result.length > 0) {
                let deleteResult = await conectividadeProdutosDAO.deleteConectividadeProduto(id);

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

// Listar conectividades de produtos
const listarConectividadesProdutos = async function() {
    try {
        let result = await conectividadeProdutosDAO.selectAllConectividadesProdutos();

        if (result != false && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                conectividades: result
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Buscar conectividade de produto por ID
const buscarConectividadeProduto = async function(id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await conectividadeProdutosDAO.selectByIdConectividadeProduto(id);

        if (result != false && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                conectividade: result
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

module.exports = {
    inserirConectividadeProduto,
    atualizarConectividadeProduto,
    excluirConectividadeProduto,
    listarConectividadesProdutos,
    buscarConectividadeProduto
};