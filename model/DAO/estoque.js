/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de estoque no Banco de dados
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const insertestoque = async function(estoque){
    try{
        let sql  = `insert into tbl_estoque (
                        id_produto, 
                        quantidade_atual, 
                        
                        
                        ) 
                    values ( 
                        '${estoque.id_produto}', 
                        '${estoque.quantidade_atual}'
                        )`

        
        
        //Await só vai funcionar se na função estiver com o async
        //Executa um script sql no banco de dados, e aguarda o resultado (retornando um true or false)
        let result  = await prisma.$executeRawUnsafe(sql)

        if(result)
            return  true
        else
            return false//Bug no Banco de dados
        
        }catch(error){
            
            return false//Bug de programação
    }

}
//Função para atualizar um estoque existente
const updateestoque = async function(estoque){
    try {
        let sql = `update tbl_estoque set id_produto = '${estoque.id_produto}',quantidade_atual = '${estoque.quantidade_atual}'where id = ${estoque.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir um estoque existente
const deleteestoque = async function(id){
    try {

        let sql = `delete from tbl_estoque where id=${id}`

        //
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

        
    } catch (error) {
        return false
    }
}
//Função para retornar todas as estoque do banco de dados
const selectAllestoque = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_estoque order by id desc'

        //Encaminha o script SQL para o Banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result//retorna dados do banco
        else
            return false

    } catch (error) {
        return false
    }
}
//Função para buscar uma estoque pelo ID
const selectByIdestoque = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_estoque where id=${id} `

        // Encaminha o Script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result // Retorna os dados do Banco 
        else
            return false

    } catch (error) {
        return false
    }
}


module.exports = {
    insertestoque,
    updateestoque,
    deleteestoque,
    selectAllestoque,
    selectByIdestoque,
}
