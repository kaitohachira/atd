const { request } = require('express');
const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn')

const User = require('./models/User')

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))


//ROTA PARA MOSTRAR O FORMULARIO
app.get('/user/create', (request, response)=>{
    return response.render('useradd')
})


//ROTA PARA CADASTRAR AS INFORMAÇÕES DO FORMULARIO
app.post('/user/create', async (request, response)=>{
   const  {name, occupation} = request.body
    // const name = request.body.name
    // const occupation = request.body.occupation

    let newsletter =  request.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    await User.create({ name, occupation, newsletter })
    return response.redirect('/')
})


//LISTA APENAS UM DADO
app.get('/users/:id', async  function(request, response){
    const id = request.params.id
    //SELECT * FROM users WHERE id = id
   const user = await User.findOne({raw: true, where:{id:id}}) 
   console.log(user);
   return response.render('viewuser', {user})

})


//DELETAR DADOS
app.post('/users/delete/:id', async (request, response)=>{
    const id = request.params.id
    await User.destroy({where:{id : id}})
    return response.redirect('/')
})


//EDITAR DADOS
app.get('/users/edit/:id', async (request, response)=>{
    const id = request.params.id
    const user = await User.findOne({raw: true, where:{id:id}})
    
    return response.render('edituser', {user:user})
})

//User.update()
app.post('/users/update', async(request, response)=>{
    const{id, name, occupation} = request.body
    let newsletter = request.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    const UserData = {
        id,
        name, 
        occupation,
        newsletter
    }

    await User.update(UserData, {where:{id:id}})

     return response.redirect('/')
})


//LISTAR TODOS OS DADOS
app.get('/', async (request, response) => {
    const users = await User.findAll({raw: true})
    console.log(users);
    
    return response.render('home', {users})
})


            // ROTAS BOOKS


//HOME BOOKS
app.get('/books', async (request, response) => {
    const users = await User.findAll({raw: true})
    console.log(users);
    
    return response.render('books', {users})
})

app.post('/books/create/:id', async (request, response)=>{
    const  {author, title, preco} = request.body
    let newsletter =  request.body.newsletter
 
     if(newsletter === 'on'){
         newsletter = true
     }else{
         newsletter = false
     }
     await User.create({ author, title, preco })
     return response.redirect('/')
 })
 


 app.post('/books/update', async(request, response)=>{
    const{id, author, title, preco} = request.body
    let newsletter = request.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    const UserData = {
        id,
        author, 
        title,
        preco
    }

    await User.update(UserData, {where:{id:id}})

     return response.redirect('/')
})






conn.sync()
    .then(() => {

    app.listen(3333, () => {
        console.log('Servidor ON')
    });
    
}).catch((error) => console.log(error))