const { Router } = require("express");
const { check } = require("express-validator");
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

//Validar JWT
const router = Router();
router.use( validarJWT );


router.get('/', getEventos);

//crear evento
router.post('/',
[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom( isDate ),
    check('end', 'Fecha de finalizacion obligatorio').custom( isDate ),
    validarCampos 
]
,crearEvento);

//actualizar evento
router.put('/:id',
[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom( isDate ),
    check('end', 'Fecha de finalizacion obligatorio').custom( isDate ),
    validarCampos
], actualizarEvento);


//borrar evento 
router.delete('/:id', borrarEvento);

module.exports = router;