/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de conectividades que eu produto tem no Banco de dados
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const insertConectividadeProduto = async function(conectividade){
    try{
        let sql  = `insert into tbl_produto_conectividade (
                        id_produto,
                        id_conectividade
                        ) 
                    values ( 
                        '${conectividade.id_produto}',
                        '${conectividade.id_conectividade}'
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

const deleteConectividadeProduto = async function(id){
    try {

        let sql = `delete from tbl_produto_conectividade where id=${id}`

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



module.exports = {
    insertConectividadeProduto,
    deleteConectividadeProduto,
   
}
