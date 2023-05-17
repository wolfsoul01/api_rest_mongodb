const {Schema,model}= require('mongoose');


const rolSchema = Schema({
    rol:{
        type:String,
        required:true,
    }
})

module.exports= model('Rol',rolSchema);