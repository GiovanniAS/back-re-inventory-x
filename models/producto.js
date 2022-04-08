import mongoose from 'mongoose'
const Schema = mongoose.Schema

const productoSchema = new Schema({
	nombre: {type: String, required: [ true, 'Nombre Obligatorio']},
	descripcion: String,
	precio: {type: Number, default:0},
	categoria: {type: String, enum:['computers', 'phones', 'accesories']},
	activo: {type: Boolean, default: true}
})

const Producto = mongoose.model('Producto', productoSchema)

export default Producto