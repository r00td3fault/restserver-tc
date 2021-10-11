const { Router } = require('express');
const { historialGet } = require('../controllers/historial_controller');
const { validarCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/',[
    validarJWT,
    validarCampos
],historialGet );





module.exports = router;