/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de conectividades que eu produto tem no Banco de dados
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const insertConectividade = async function(conectividade){
    try{
        let sql  = `insert into tbl_conectividade (
                        conectividade
                        ) 
                    values ( 
                        '${conectividade.conectividade}'
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
//Função para atualizar um conectividade existente
const updateConectividade = async function(conectividade){
    try {
        let sql = `update tbl_conectividade set conectividade = '${conectividade.conectividade}'where id = ${conectividade.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir um conectividade existente
const deleteConectividade = async function(id){
    try {

        let sql = `delete from tbl_conectividade where id=${id}`

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
//Função para retornar todas as conectividade do banco de dados
const selectAllConectividade = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_conectividade order by id desc'

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
//Função para buscar uma conectividade pelo ID
const selectByIdConectividade = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_conectividade where id=${id} `

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
    insertConectividade,
    updateConectividade,
    deleteConectividade,
    selectAllConectividade,
    selectByIdConectividade
}
