const { Router} = require('express');
const { check } = require('express-validator');

const {  emailExiste } = require('../helpers/validations-db');
const { validarCampos } = require('../middlewares/valida-campos');
const { usuariosGet, usuariosPost } = require('../controllers/usuarios_controller');


const router = Router();


router.get('/', usuariosGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y de almenos 6 letras').not().isEmpty().isLength({ min: 6 }),
    check('correo','El correo no es valido').isEmail(),
    check('correo','El correo ya está registrado').custom( emailExiste ),
    validarCampos
], usuariosPost );












module.exports = router;