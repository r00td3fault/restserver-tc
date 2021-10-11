const { Router } = require('express');
const { check } = require('express-validator');
const { buscar } = require('../controllers/buscar_controller');
const { validarCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/:termino',[
    validarJWT,
    check('termino', 'El termino es obligatorio').not().isEmpty(),
    validarCampos
],buscar );





module.exports = router;