/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de usuario no Banco de dados
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const insertUsuario = async function(usuario){
    try{
        let sql  = `insert into tbl_usuario (
                        nome, 
                        email, 
                        senha
                        
                        ) 
                    values ( 
                        '${usuario.nome}', 
                        '${usuario.email}', 
                        '${usuario.senha}'
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
//Função para atualizar um usuario existente
const updateUsuario = async function(usuario){
    try {
        let sql = `update tbl_usuario set nome = '${usuario.nome}',
                                        email = '${usuario.email}', 
                                        senha = '${usuario.senha}'
                                        where id = ${usuario.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir um usuario existente
const deleteUsuario = async function(id){
    try {

        let sql = `delete from tbl_usuario where id=${id}`

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
//Função para retornar todas as usuario do banco de dados
const selectAllUsuario = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_usuario order by id desc'

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
//Função para buscar uma usuario pelo ID
const selectByIdUsuario = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_usuario where id=${id} `

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


const loginUsuario = async function (usuario) {
    try {
        
        let sql = `SELECT * FROM tbl_usuario WHERE email = '${usuario.email}' and senha = '${usuario.senha}'`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0 ) {
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario,
    loginUsuario
}
