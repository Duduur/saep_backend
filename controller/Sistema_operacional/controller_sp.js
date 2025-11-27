/********************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de sistema_operacional de produtos),
*           Validações, tratamento de dados etc...
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

// Import das mensagens e status
const message = require('../../config/status/status.js');

// Import do DAO
const SOPsDAO = require('../../model/DAO/so.js');

// Inserir sistema_operacional de produto
const inserirSOP = async function(sistema_operacional, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                sistema_operacional.nome_so == '' || sistema_operacional.nome_so == null || sistema_operacional.nome_so == undefined || sistema_operacional.nome_so.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                let result = await SOPsDAO.insertsop(sistema_operacional);

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

// Atualizar sistema_operacional de produto
const atualizarSOP = async function(id, sistema_operacional, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                sistema_operacional.nome_so == '' || sistema_operacional.nome_so == null || sistema_operacional.nome_so == undefined || sistema_operacional.nome_so.length > 100 ||
                id == '' || id == null || id == undefined || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                let verificarID = await SOPsDAO.selectByIdsop(id);

                if (verificarID != false && verificarID.length > 0) {
                    sistema_operacional.id = id;

                    let result = await SOPsDAO.updatesop(sistema_operacional);

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

// Excluir sistema_operacional de produto
const excluirSOP = async function(id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        } else {
            let result = await SOPsDAO.selectByIdsop(id);

            if (result != false && result.length > 0) {
                let deleteResult = await SOPsDAO.deletesop(id);

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

// Listar sistema_operacionals de produtos
const listarSOP = async function() {
    try {
        let result = await SOPsDAO.selectAllsop();

        if (result != false && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                sistema_operacionals: result
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Buscar sistema_operacional de produto por ID
const buscarSOP = async function(id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await SOPsDAO.selectByIdsop(id);

        if (result != false && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                sistema_operacional: result
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

module.exports = {
    inserirSOP,
    atualizarSOP,
    excluirSOP,
    listarSOP,
    buscarSOP
};