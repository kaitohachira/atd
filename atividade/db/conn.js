const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('nodesequelize2', 'aluno_medio', '@lunoSenai23.', {
    host: '127.0.0.1',  //local da rota
    port: 3306,  //porta que o banco de dados entar disponivel
    dialect: 'mysql'  // qual banco RELACIONAL esta utilizando
})

// try{ //tente
//     sequelize.authenticate()
//     console.log('Conectado com sucesso');
// }catch(error){ //erro
//     console.log(error);
// }

module.exports = sequelize //exportar o mudulo para ser utilizado