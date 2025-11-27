/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de sistemas operacionais no Banco de dados
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const insertsop = async function(sop){
    try{
        let sql  = `insert into tbl_sistema_operacional (
                        nome_so
                        ) 
                    values ( 
                        '${sop.nome_so}'
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
//Função para atualizar um sop existente
const updatesop = async function(sop){
    try {
        let sql = `update tbl_sistema_operacional set nome_so = '${sop.nome_so}'where id = ${sop.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir um sop existente
const deletesop = async function(id){
    try {

        let sql = `delete from tbl_sistema_operacional where id=${id}`

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
//Função para retornar todas as sop do banco de dados
const selectAllsop = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_sistema_operacional order by id desc'

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
//Função para buscar uma sop pelo ID
const selectByIdsop = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_sistema_operacional where id=${id} `

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
    insertsop,
    updatesop,
    deletesop,
    selectAllsop,
    selectByIdsop
}
