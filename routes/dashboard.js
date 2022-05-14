//const User = require('../models/User')

const router = require('express').Router()

router.get('/',(req, res) =>{
  res.json({
    error: null,
    data:{
      title: 'ruta protegida',
      user: req.user
    }
  })
})

module.exports = router