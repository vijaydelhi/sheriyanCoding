const express = require('express');
const morgan = require('morgan');
const app = express();
const userModel = require('./models/user.models')
const db = require('./config/db')
app.set('view engine','ejs')
//Middleware
app.use(morgan('dev'))

// For post method to get the data from the form we need to use this
// and also we need to use body-parser module to parse the data and hide from the url
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// close the post method

// any file excess from backend without restriction in frontend 
//that is called static file
app.use(express.static('public'))
//close static file 

app.use((req,res,next)=>{
    console.log('middleware run for every request')
    next()
})

app.get('/', (req,res,next)=>{
 console.log('middleware run only for / route')
 next()
},

(req,res)=>{
    
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.send('about page')
})
app.get('/profile',(req,res)=>{
    res.send('profile page')
})
// app.get('/get-form',(req,res)=>{
//     console.log(req.query)
//     res.send('data received')
// })
app.post('/get-form',(req,res)=>{
    console.log(req.body)
    res.send('data received')
})
 



app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register', async(req,res)=>{
    console.log(req.body)
    const {username,email,password} = req.body;
  await userModel.create({
        username:username,
        email:email,
        password:password
    })
    res.send('data received')
})

app.get('/get-ALl-user',(req,res)=>{
    userModel.find({
        username:'admin2'
    }).then((data)=>{
        res.send(data)
    })
})

app.get('/get-update-user',(req,res)=>{
    userModel.findOneAndUpdate(
    {
        username:'admin2'
    },
    {
        email:'hitesh@gmail.com'
    }
     ).then((data)=>{
         res.send(data)
    })
})

app.get('/get-delete-user',(req,res)=>{
    userModel.findOneAndDelete(
        {
            username:'admin2'
        }
    ).
    then((data)=>{
        res.send(data)
    })
})


 

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
