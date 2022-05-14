const router = require('express').Router()
const User = require('../models/User')
const Joi = require('@hapi/joi')
//const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const schemaRegister = Joi.object({
	name: Joi.string().min(6).max(255).required(),
	email: Joi.string().min(6).max(1024).required().email(),
	password: Joi.string().min(6).max(1024).required(),

})

router.post('/register', async (req, res) => {
	//validar el usuario
	const { error } = schemaRegister.validate(req.body)
	
	if(error){
		return res.status(400).json(
			{ error: error.details[0].message }
		)
	}

	//validar correo unico
	const isEmailExist = await User.findOne({
		email: req.body.email
	})

	if(isEmailExist){
		return res.status(400).json(
			{ error: 'Correo ya existe' }
		)
	}

	//hash de la contraseña
	//const salt = await bcrypt.genSalt(10)
	//const password = await bcrypt.hash(req.body.password, salt)

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	})

	try {
		const savedUser = await user.save()
		res.json({
			error: null,
			data: savedUser
		})
	} catch (error) {
		res.status(400).json({error})
	}

})

const schemaLogin = Joi.object({
	email: Joi.string().min(6).max(1024).required().email(),
	password: Joi.string().min(6).max(1024).required(),
})

router.post('/login', async (req, res) =>{
	try {
		const { error } = schemaLogin.validate(req.body)
		const TOKENS = process.env.TOKEN_SECRET

		if(error){
			return res.status(400).json(
				{ error: error.details[0].message}
			)
		}

		const user = await User.findOne({
			email: req.body.email
		})

		if( !user ){
			return res.status(400).json(
				{ error: 'No se encontro el usuario' }
			)
		}

		//const validPassword = await bcrypt.compare(req.body.password, user.password)
	/* 	if( !validPassword ){
			return res.status(400).json(
				{ error: 'Constraseña incorrecta' }
			)
		} */

		if( req.body.password != user.password ){
			return res.status(400).json(
				{ error: 'Constraseña incorrecta' }
			)
		}

		//Creacion del token
		const token = jwt.sign({
			name: user.name,
			id: user._id,

		}, TOKENS)

		res.header('auth-token', token).json({
			error: null,
			data: {token}
		})
	} catch (error) {
		console.log(error)
	}
	
})

module.exports = router