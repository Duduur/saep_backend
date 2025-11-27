/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de movimentacao estoque no Banco de dados
* Data: 27/11/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

// CREATE TABLE movimentacao_estoque (
//     id_movimentacao INT AUTO_INCREMENT PRIMARY KEY,
//     id_estoque INT NOT NULL,
//     id_tipo_movimentacao INT NOT NULL,
//     quantidade INT NOT NULL,
//     data_movimentacao DATE NOT NULL,
//     observacao VARCHAR(255),

//     CONSTRAINT FK_MOVIMENTACAO_ESTOQUE
// 	FOREIGN KEY (id_estoque)
// 	REFERENCES tbl_estoque(id_estoque),

//     CONSTRAINT FK_TIPO_MOVIMENTAÇÃO
// 	FOREIGN KEY (id_tipo_movimentacao)
// 	REFERENCES tipo_movimentacao(id_tipo_movimentacao)
// );



const insertMovimentacaoEstoque = async function(movimentacao_estoque){
    try{
        let sql  = `insert into tbl_movimentacao_estoque (
                        id_estoque, 
                        id_tipo_movimentacao, 
                        quantidade,
                        data_movimentacao,
                        observacao
                        
                        ) 
                    values ( 
                        '${movimentacao_estoque.id_estoque}', 
                        '${movimentacao_estoque.id_tipo_movimentacao}', 
                        '${movimentacao_estoque.quantidade}',
                        '${movimentacao_estoque.data_movimentacao}',
                        '${movimentacao_estoque.observacao}'
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
//Função para atualizar um movimentacao_estoque existente
const updateMovimentacaoEstoque = async function(movimentacao_estoque){
    try {
        let sql = `update tbl_movimentacao_estoque set id_estoque = '${movimentacao_estoque.id_estoque}',
                                        id_tipo_movimentacao = '${movimentacao_estoque.id_tipo_movimentacao}', 
                                        quantidade = '${movimentacao_estoque.quantidade}',
                                        data_movimentacao = '${movimentacao_estoque.data_movimentacao}',
                                        observacao = '${movimentacao_estoque.observacao}'
                                        where id = ${movimentacao_estoque.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir um movimentacao_estoque existente
const deleteMovimentacaoEstoque = async function(id){
    try {

        let sql = `delete from tbl_movimentacao_estoque where id=${id}`

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
//Função para retornar todas as movimentacao_estoque do banco de dados
const selectAllMovimentacaoEstoque = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_movimentacao_estoque order by id desc'

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
//Função para buscar uma movimentacao_estoque pelo ID
const selectByIdMovimentacaoEstoque = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_movimentacao_estoque where id=${id} `

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
    insertMovimentacaoEstoque,
    updateMovimentacaoEstoque,
    deleteMovimentacaoEstoque,
    selectAllMovimentacaoEstoque,
    selectByIdMovimentacaoEstoque
}
