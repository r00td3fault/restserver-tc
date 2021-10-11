const { Router} = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth_controller');
const { validarCampos } = require('../middlewares/valida-campos');


const router = Router();


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La constrasena es obligatoria').not().isEmpty(),
    validarCampos
], login);


module.exports = router;