const express = require('express')
const uuid = require('uuid')

const router = express.Router()

const fruits = require('../../Fruits')

//! GET ALL
router.get('/', (req, res) => {
  res.json(fruits)
})

//! GET ONE
router.get('/:id',(req, res) => {
  const found = fruits.some(fruit => fruit.id === parseInt(req.params.id))

  if(found){
    res.json(fruits.filter(fruit => fruit.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({msg: `No fruit with the id ${req.params.id}`})
  }
})

//! POST
router.post('/', (req, res) => {
  const newFruit = {
    id: uuid.v4(),
    name: req.body.name,
    url: req.body.url
  }
  if(!newFruit.name || !newFruit.url){
    return res.status(400).json({msg: "Please include Name and URL"})
  }
  
  fruits.push(newFruit)
  // res.json(fruits)
  res.redirect('/')
})

//! PUT
router.put('/:id', (req,res) => {
  const found = fruits.some(fruit => fruit.id === parseInt(req.params.id))

  if(found){
    const updFruit = req.body
    fruits.forEach(fruit => {
      if(fruit.id === parseInt(req.params.id)){
        fruit.name = updFruit.name ? updFruit.name: fruit.name;
        fruit.url = updFruit.url ? updFruit.url : fruit.url;

        res.json({msg: "Fruit Updated!", fruit:fruit})
      }
    })
  } else {
    res.status(400).json({msg: "Fruit was not updated"})
  }
})

//! DELETE
router.delete('/:id', (req, res)=> {
  const found = fruits.some(fruit => fruit.id === parseInt(req.params.id))

  if(found){
    res.json({msg: "Deleted", fruits: fruits.filter(fruit => fruit.id !== parseInt(req.params.id))})
  } else {
    res.status(400).json({msg: `No fruit with the id ${req.params.id}`})
  }
})


module.exports = router