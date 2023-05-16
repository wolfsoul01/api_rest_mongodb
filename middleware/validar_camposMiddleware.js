const { validationResult } = require("express-validator");
const {response,request}=require('express')

const validarCampos=(req=request,res=response,next)=>{
    const error= validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({
      error
    })
  }

  next();
}

module.exports={
    validarCampos,
}