
const express = require('express')
const router = express.Router()

//importamos el modelo de los productos que creamos
const Producto = require('../models/producto')

//Agregar un nuevo producto usamos POST
router.post('/nuevo-producto', async(req, res) =>{
    const body = req.body
    console.log(req, body)
    try {
        const productoDB = await Producto.create(body)
        res.status(200).json(productoDB)
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})

//Producto con id
router.get('/producto/:id', async(req, res) =>{
    const _id = req.params.id
    try{
        const productoDB = await Producto.findOne({_id})
        res.json(productoDB)
    }catch (error){
        return res.status(400).json({
            mensaje: "No se encontro el producto con es ID",
            error
        })
    }
})

//Todos los productos
router.get('/producto', async(req, res) =>{
    try{
        const productoDB = await Producto.find()
        res.json(productoDB)
    }catch (error){
        return res.status(400).json({
            mensaje: "No se encontro el producto con es ID",
            error
        })
    }
})

router.delete('/producto/:id', async(req, res) =>{
    const _id = req.params.id
    try{
        const productoDB = await Producto.findByIdAndDelete({_id})
        if(!productoDB){
            return res.status(400).json({
                mensaje: "No se pudo encontrar el ID",
                error
            })
        }
        res.json(productoDB)
    }catch (error){
        return res.status(400).json({
            mensaje: "No se pudo borrar",
            error
        })
    }
})

router.put('/producto/:id', async(req, res) =>{
    const _id = req.params.id
    const body = req.body
    try{
        const productoDB = await Producto.findByIdAndUpdate(
            _id,
            body,
            {new: true}

        )
        res.json(productoDB)
    }catch (error){
        return res.status(400).json({
            mensaje: "No se pudo actualizar la nota",
            error
        })
    }
})

module.exports = router