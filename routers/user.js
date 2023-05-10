const {Router}= require('express'); 
const { getUser, postUser, putUser, deletUser, pathcUser } = require('../controllers/user');


const router=Router();

router.get('/',getUser);

router.post('/',postUser);

router.put('/',putUser);

router.delete('/',deletUser);

router.patch('/',pathcUser);

module.exports= router;