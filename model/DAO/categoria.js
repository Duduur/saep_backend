/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de categorias de eletronicos no Banco de dados
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const insertCategoria = async function(categoria){
    try{
        let sql  = `insert into tbl_categoria (
                        categoria
                        ) 
                    values ( 
                        '${categoria.categoria}'
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
//Função para atualizar um categoria existente
const updatecategoria = async function(categoria){
    try {
        let sql = `update tbl_categoria set categoria = '${categoria.categoria}'where id = ${categoria.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir um categoria existente
const deletecategoria = async function(id){
    try {

        let sql = `delete from tbl_categoria where id=${id}`

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
//Função para retornar todas as categoria do banco de dados
const selectAllcategoria = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_categoria order by id desc'

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
//Função para buscar uma categoria pelo ID
const selectByIdcategoria = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_categoria where id=${id} `

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
    insertCategoria,
    updatecategoria,
    deletecategoria,
    selectAllcategoria,
    selectByIdcategoria
}
