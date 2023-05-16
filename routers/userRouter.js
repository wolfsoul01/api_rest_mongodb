const {Router}= require('express'); 
const { getUser, postUser, putUser, deletUser, pathcUser } = require('../controllers/userControllers');

//Rutas
const router=Router();

router.get('/',getUser);

router.post('/',postUser);

router.put('/:userID',putUser);

router.delete('/',deletUser);

router.patch('/',pathcUser);

module.exports= router;