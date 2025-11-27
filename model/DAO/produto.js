/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de produto no Banco de dados
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const insertProduto = async function(produto) {
    try {
        let sql = `
            INSERT INTO tbl_produto (
                nome,
                fabricante,
                preco,
                processador,
                memoria_ram,
                armazenamento,
                tamanho_tela,
                resolucao_tela,
                camera,
                alimentacao,
                peso,
                material,
                dimensoes,
                id_categoria,
                id_sistema_operacional
            ) VALUES (
                '${produto.nome}',
                '${produto.fabricante}',
                '${produto.preco}',
                '${produto.processador}',
                '${produto.memoria_ram}',
                '${produto.armazenamento}',
                '${produto.tamanho_tela}',
                '${produto.resolucao_tela}',
                '${produto.camera}',
                '${produto.alimentacao}',
                '${produto.peso}',
                '${produto.material}',
                '${produto.dimensoes}',
                ${produto.id_categoria},
                ${produto.id_sistema_operacional}
            )
        `;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
};



const updateProduto = async function(produto) {
    try {
        let sql = `
            UPDATE tbl_produto SET 
                nome = '${produto.nome}',
                fabricante = '${produto.fabricante}',
                preco = '${produto.preco}',
                processador = '${produto.processador}',
                memoria_ram = '${produto.memoria_ram}',
                armazenamento = '${produto.armazenamento}',
                tamanho_tela = '${produto.tamanho_tela}',
                resolucao_tela = '${produto.resolucao_tela}',
                camera = '${produto.camera}',
                alimentacao = '${produto.alimentacao}',
                peso = '${produto.peso}',
                material = '${produto.material}',
                dimensoes = '${produto.dimensoes}',
                id_categoria = ${produto.id_categoria},
                id_sistema_operacional = ${produto.id_sistema_operacional}
            WHERE id = ${produto.id}
        `;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
};


const deleteProduto = async function(id) {
    try {
        let sql = `DELETE FROM tbl_produto WHERE id = ${id}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
};



const selectAllProduto = async function() {
    try {
        let sql = `
            SELECT * 
            FROM tbl_produto
            ORDER BY id DESC
        `;

        let result = await prisma.$queryRawUnsafe(sql);

        if (result)
            return result;
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
};



const selectByIdProduto = async function(id) {
    try {
        let sql = `
            SELECT * 
            FROM tbl_produto 
            WHERE id = ${id}
        `;

        let result = await prisma.$queryRawUnsafe(sql);

        if (result)
            return result;
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
};


module.exports = {
    insertProduto,
    updateProduto,
    deleteProduto,
    selectAllProduto,
    selectByIdProduto
};
