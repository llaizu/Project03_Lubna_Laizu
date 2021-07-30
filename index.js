
//---------------------------EXPRESS----------------------------------------


const express = require('express')
const bcrypt = require('bcryptjs')
const data = require('./data')// we can write data.ja as well but it will recognise by default

const app = express()

//----------------------- BODY PARSER---------------------------------------

app.use(express.json())//body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(express.urlencoded({ extended: true }))//Parses the text as URL encoded data (which is how browsers tend to send form data
//from regular forms set to POST) and exposes the resulting object (containing the KEYS and VALUES) on req.body


// EJS CONFIGURATION --- (TEMPLATING the Engines)

app.set('view engine', 'ejs')

// The views folder grabs the template folders when res.rendering

app.set('views', './views')

// set 'public' folder as static folder
app.use(express.static('./public'))


//------------ROUTES For the different pages ------------------------------------------------------------

app.get('/' , (req, res) => {    // Home page •	‘/'
    res.render('Pages/home')

})
app.get('/users' ,(req, res) => {// Users page where All Users information will be displayed •	‘/users'
   //console.log(data.users)
    res.render('Pages/users', {
    users: data.users

    })
})
app.get('/schedules' ,(req, res) => {// Schedules page where all users schedules will be displayed according to their IDs •	‘/schedules'\
  //console.log(data.users)
    res.render('Pages/schedules', {
    schedules: data.schedules

    }) 

})
//---------------Setting The route '/users/new' displays a form to add a user--------------------------

app.get('/users/new' ,(req, res) => {
  res.render('Pages/AddUser')
})

//---------------Setting The route '/schedules/new' displays a form to add a schedule.----------------

app.get('/schedules/new' ,(req, res) => {
  res.render('Pages/AddSchedule')
})


//-------------------------------- add new post---------------------------------------------------------
app.post("/posts", (req, res) => {
   // console.log(req.body)
    posts.push(req.body)
    res.send(req.body) // sends back new post
  })
  
  // display all posts----------------------------------------------------------------------------------
  app.get("/posts", (req, res) => {
    res.render('pages/posts', {
      posts: posts
    })
  })

 
  
//-------------------individual users route--------------------------------------------------------------------------------

app.get('/users/:id' ,(req, res) => {
    const id = data.users[req.params.id]
    const isNumber = /^[0-9]+$/.test(req.params.id)
    let isUser = false
  if(req.params.id<data.users.length){

  isUser = true
  }
  if(isNumber && isUser){
    
    res.render('Pages/indUsers',{
         users: id
      })
  }
  else
  {
      res.render('Pages/error', { 
        message : "INVALID INPUT PLEASE TRY AGAIN !"
      
      })
  }
})


//------------individual schedules information--------------------------------------------------------------------

app.get("/users/:id/schedules", (req, res) => {

    const id = req.params.id
    const arr = []

    for (let i = 0; i < data.schedules.length; i++) {
        if (id == data.schedules[i].user_id){
        arr.push(data.schedules[i])
     }
   }
   
 
    if (arr.length == 0||id > data.users.length){
      res.render('Pages/error', { 
        message : "INVALID USER_ID PLEASE TRY AGAIN !"
      
      })
    }
      else {
        res.render('Pages/indSchedules',{
         newIs: arr
        })
        //console.log(arr)
        
    }
  })   
 

//------------------- Add new user by using post function-----------------------------------------------------------------------

//app.post('/users' ,(req, res) => {
  app.post('/Adduser' ,(req, res) => {

  // console.log(req.body.password)
  // console.log(req.body)
   const id = data.users[req.params.id]
   const password = req.body.password
   const salt = bcrypt.genSaltSync(10)
   const hash = bcrypt.hashSync(password, salt)
    
    const newUser = {

        firstname : req.body.firstName,
        lastname : req.body.lastName,
        email : req.body.email,
        password: hash
    }
    
    data.users.push(newUser)// Pushing newUser into existing Data.-----------------------------------------------------------
   // res.send(newUser)
   res.redirect('/users')

})


//-------------------------------ADD NEW schedule----------------------------------------------------------------------------

app.post('/Addschedule', (req, res) => {

    console.log(req.body)

    const newSchedule = {
    'user_id' : req.body.userid,
    'day' : req.body.day,
    'start_at': req.body.start,
    'end_at' : req.body.end
}

data.schedules.push(newSchedule)// pushing new schedule into existing Data---------------------------------------------------
//res.send(newSchedule)
res.redirect('/schedules')
//res.render('Pages/schedules', { 
  //schedules: newSchedule
})


/*-----------------SETUP PORT-------------------------------------------------------------------*/ 
const PORT = 3000

app.listen(PORT, ()=>{

    console.log(`App is listening at http://localhost:${PORT}`)// Quatation that is above the TAB button
})
