const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require("./models/Todo")
const app = express()

app.use(cors())

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.post('/add',(req, res) => {
    const task = req.body.task
    TodoModel.create({ task: task })
        .then(result => res.json(result))
    .catch(err=>{res.json(err)})
})

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => { return res.json(result) })
    .catch(err=>{res.json(err)})
})

app.put('/update/:id', async (req, res) => {
    const { id } = req.params
    const sch = await TodoModel.findById(id)
    TodoModel.findByIdAndUpdate({ _id: id }, { done: !(sch.done)})
        .then(result => { res.json(result) })
        .catch(err=>res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    TodoModel.findByIdAndDelete(id)
        .then(response => { res.json(response) })
    .catch(err=>console.log(err))
})

app.listen(3001, () => {
    console.log("Server is running in port 3001")
})