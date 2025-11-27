/********************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de produtos),
*           Validações, tratamento de dados etc...
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

// Import das mensagens e status
const message = require('../../config/status/status.js');

// Import do DAO
const produtoDAO = require('../../model/DAO/produto.js')
const controllerCategoria= require('../../controller/Categoria/controller_categoria.js')
const controllerSOP = require('../../controller/Sistema_operacional/controller_sp.js')


// Inserir produto
const inserirProduto = async function(produto, contentType){
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            if(
                produto.nome                    == '' || produto.nome                    == null || produto.nome                    == undefined || produto.nome.length                    > 100 ||
                produto.fabricante              == '' || produto.fabricante              == null || produto.fabricante              == undefined || produto.fabricante.length              > 100 ||
                produto.preco                   == '' || produto.preco                   == null || produto.preco                   == undefined || isNaN(produto.preco) ||
                produto.processador             == '' || produto.processador             == null || produto.processador             == undefined || produto.processador.length             > 100 ||
                produto.memoria_ram             == '' || produto.memoria_ram             == null || produto.memoria_ram             == undefined || produto.memoria_ram.length             > 50  ||
                produto.armazenamento           == '' || produto.armazenamento           == null || produto.armazenamento           == undefined || produto.armazenamento.length           > 50  ||
                produto.tamanho_tela            == '' || produto.tamanho_tela            == null || produto.tamanho_tela            == undefined || produto.tamanho_tela.length            > 20  ||
                produto.resolucao_tela          == '' || produto.resolucao_tela          == null || produto.resolucao_tela          == undefined || produto.resolucao_tela.length          > 20  ||
                produto.camera                   == '' || produto.camera                   == null || produto.camera                   == undefined || produto.camera.length                   > 50  ||
                produto.alimentacao             == '' || produto.alimentacao             == null || produto.alimentacao             == undefined || produto.alimentacao.length             > 100 ||
                produto.peso                    == '' || produto.peso                    == null || produto.peso                    == undefined || produto.peso.length                    > 20  ||
                produto.material                == '' || produto.material                == null || produto.material                == undefined || produto.material.length                > 100 ||
                produto.dimensoes               == '' || produto.dimensoes               == null || produto.dimensoes               == undefined || produto.dimensoes.length               > 100 ||
                produto.id_categoria            == '' || produto.id_categoria            == null || produto.id_categoria            == undefined || isNaN(produto.id_categoria) ||
                produto.id_sistema_operacional  == '' || produto.id_sistema_operacional  == null || produto.id_sistema_operacional  == undefined || isNaN(produto.id_sistema_operacional)
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {

                let resultProduto = await produtoDAO.insertProduto(produto)

                if(resultProduto){
                    return message.SUCCESS_CREATED_ITEM // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}



// Atualizar produto
const atualizarProduto = async function(id, produto, contentType){
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            if(
                produto.nome                    == '' || produto.nome                    == null || produto.nome                    == undefined || produto.nome.length                    > 100 ||
                produto.fabricante              == '' || produto.fabricante              == null || produto.fabricante              == undefined || produto.fabricante.length              > 100 ||
                produto.preco                   == '' || produto.preco                   == null || produto.preco                   == undefined || isNaN(produto.preco) ||
                produto.processador             == '' || produto.processador             == null || produto.processador             == undefined || produto.processador.length             > 100 ||
                produto.memoria_ram             == '' || produto.memoria_ram             == null || produto.memoria_ram             == undefined || produto.memoria_ram.length             > 50  ||
                produto.armazenamento           == '' || produto.armazenamento           == null || produto.armazenamento           == undefined || produto.armazenamento.length           > 50  ||
                produto.tamanho_tela            == '' || produto.tamanho_tela            == null || produto.tamanho_tela            == undefined || produto.tamanho_tela.length            > 20  ||
                produto.resolucao_tela          == '' || produto.resolucao_tela          == null || produto.resolucao_tela          == undefined || produto.resolucao_tela.length          > 20  ||
                produto.camera                   == '' || produto.camera                   == null || produto.camera                   == undefined || produto.camera.length                   > 50  ||
                produto.alimentacao             == '' || produto.alimentacao             == null || produto.alimentacao             == undefined || produto.alimentacao.length             > 100 ||
                produto.peso                    == '' || produto.peso                    == null || produto.peso                    == undefined || produto.peso.length                    > 20  ||
                produto.material                == '' || produto.material                == null || produto.material                == undefined || produto.material.length                > 100 ||
                produto.dimensoes               == '' || produto.dimensoes               == null || produto.dimensoes               == undefined || produto.dimensoes.length               > 100 ||
                produto.id_categoria            == '' || produto.id_categoria            == null || produto.id_categoria            == undefined || isNaN(produto.id_categoria) ||
                produto.id_sistema_operacional  == '' || produto.id_sistema_operacional  == null || produto.id_sistema_operacional  == undefined || isNaN(produto.id_sistema_operacional) ||
                id                              == '' || id                              == null || id                              == undefined || isNaN(id)
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {

                let verificarID = await produtoDAO.selectByIdProduto(id)

                if(verificarID != false && verificarID.length > 0){

                    produto.id = id

                    let resultProduto = await produtoDAO.updateProduto(produto)

                    if(resultProduto)
                        return message.SUCESS_UPDATED_ITEM // 200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500

                } else {
                    return message.ERROR_NOT_FOUND // 404
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}



// Excluir produto
const excluirProduto = async function(numero){
    try {

        let id = numero

        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {

            let resultProduto = await produtoDAO.selectByIdProduto(id)

            if(resultProduto != false && resultProduto.length > 0){

                let result = await produtoDAO.deleteProduto(id)

                if(result)
                    return message.SUCCES_DELETE_ITEM // 200
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500

            } else {
                return message.ERROR_NOT_FOUND // 404
            }

        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}



// Listar produtos
const listarProduto = async function(){
    try {

        let dadosProduto = {}
        let produtosArray = []

        let resultProduto = await produtoDAO.selectAllProduto()

        if(resultProduto != false && resultProduto.length > 0){

            dadosProduto.status = true
            dadosProduto.status_code = 200
            dadosProduto.items = resultProduto.length

            for (const item of resultProduto) {
                
                let dadosCategoria = await controllerCategoria.buscarCategoria(item.id_categoria)
                item.categoria = dadosCategoria.categoria
                delete item.id_categoria
                

                let dadosSOP = await controllerSOP.buscarSOP(item.id_sistema_operacional)
                item.sistema_operacional = dadosSOP.categoria
                delete item.id_sistema_operacional

                produtosArray.push(item)
            }

            dadosProduto.produto = produtosArray

            return dadosProduto

        } else {
            return message.ERROR_NOT_FOUND // 404
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}



// Buscar por ID
const buscarProduto = async function(id){
    try {

        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // 400
        }

        let dadosProduto = {}
        let produtosArray = []

        let resultProduto = await produtoDAO.selectByIdProduto(id)

        if(resultProduto != false && resultProduto.length > 0){

            dadosProduto.status = true
            dadosProduto.status_code = 200
            
            for (const item of resultProduto) {
                    
                let dadosCategoria = await controllerCategoria.buscarCategoria(item.id_categoria)
                item.categoria = dadosCategoria.categoria
                delete item.id_categoria
                    

                let dadosSOP = await controllerSOP.buscarSOP(item.id_sistema_operacional)
                item.sistema_operacional = dadosSOP.categoria
                delete item.id_sistema_operacional
                    
                produtosArray.push(item)
            }

            dadosProduto.produto = produtosArray

            return dadosProduto

        } else {
            return message.ERROR_NOT_FOUND // 404
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


module.exports = {
    inserirProduto,
    atualizarProduto,
    excluirProduto,
    listarProduto,
    buscarProduto
}
