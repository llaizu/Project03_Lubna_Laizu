const express = require('express')
const bcrypt = require('bcryptjs')
const data = require('./data')// we can write data.ja as well but it will recognise by default

const app = express()
// Body Parser
app.use(express.json())//body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(express.urlencoded({ extended: true }))//Parses the text as URL encoded data (which is how browsers tend to send form data
//from regular forms set to POST) and exposes the resulting object (containing the keys and values) on req.body

const PORT = 3000

app.listen(PORT, ()=>{

    console.log(`App is listening at http://localhost:${PORT}`)// Quatation that is above the TAB button
})

//ROUTES

app.get('/' , (req, res) => {    // request and response
    res.send('Welcome to our schedule website') // responds will print in the browser in the local host port :3000
})
//})

// Now all users info will print on the browser

app.get('/users' ,(req, res) => {
    res.send(data.users)

})
// Now all schedules info will print on the browser

app.get('/schedules' ,(req, res) => {
    res.send(data.schedules)

})

//individual users route
app.get('/users/:id' ,(req, res) => {
    console.log(data.users[req.params.id])// Access userId via: req.params.userId
    res.send(data.users[req.params.id])
    
})
 


//individual schedules route

app.get("/users/:id/schedules", (req, res) => {

    const id = req.params.id
    let arr = []
    for (let i = 0; i < data.schedules.length; i++) {
        if (id == data.schedules[i].user_id){
        arr.push(data.schedules[i])
     }
   }
    res.send(arr)
  })   
 

// Add new user by using post function

app.post('/users' ,(req, res) => {

    console.log(req.body.password)

    const password = req.body.password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = {

        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password: hash
    }

    data.users.push(newUser)
    res.send(newUser)
})

//Add new schedule

app.post('/schedules', (req, res) => {

    console.log(req.body)

//Add New Schedule

    const newSchedule = {
    'user_id' : req.body.user_id,
    'day' : req.body.day,
    'start_at': req.body.start_at,
    'end_at' : req.body.end_at
}

data.schedules.push(newSchedule)
res.send(newSchedule)
})