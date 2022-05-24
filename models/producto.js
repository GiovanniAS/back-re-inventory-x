
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productoSchema = new Schema({
	nombre: {type: String, required: [ true, 'Nombre Obligatorio']},
	descripcion: String,
	precio: {type: Number, default:0},
	categoria: {type: String, enum:['computers', 'phones', 'accesories']},
	cantidad: {type: Number, default:1},
	activo: {type: Boolean, default: true}
})

module.exports = mongoose.model('Producto', productoSchema)