const express = require('express')
const path = require('path')
const fruits = require('./Fruits')
const exphbs = require('express-handlebars')


const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res)=> {
  res.render('index', {
    title: "We love fruit!",
    subTitle: "Fruit APP",
    fruits
  })
})





app.get('/', (req, res) => {
  res.send("hello world")
})


app.use(express.json())
app.use(express.urlencoded({extended: false}))
// router. Folder, then path to route file
app.use('/api/fruits', require('./routes/api/fruits'))


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))