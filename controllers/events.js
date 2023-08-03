const { response, json } = require('express');
const Evento = require('../models/Evento');

const getEventos = async(req, res = response) => {
    const eventos = await Evento.find()
                                .populate('user', 'name');
    res.status(200).json({
        ok:true,
        eventos: eventos
    })
}
const crearEvento = async(req, res = response) => {
    const evento = new Evento( req.body );
    try {
        evento.user = req.uid;
        const eventoGuardado =await evento.save();

        res.status(200).json({
            ok:true,
            evento: eventoGuardado,
            msg: 'crear eventos',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"comuniquese con el administrador"
        })
    }
    
}
const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid
    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe evento con ese id',
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: "no tiene privilegios para editar este evento"
            })
        }

        const nuevoEvento ={
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true});

        res.status(200).json({
            ok: true,
            evento:eventoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Hable con el administrador"
           
        })
    }
}
const borrarEvento = async(req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid
    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe evento con ese id',
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: "no tiene privilegios para eliminar este evento"
            })
        }
        const eventoParaBorrar = Evento.findById(eventoId);
        await Evento.deleteOne(eventoParaBorrar);

        res.status(200).json({
            ok: true,
            msg: "Evento borrado"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Hable con el administrador"
           
        })
    }
}

/* {
    ok:true,
    msg: 'obtener eventos',
} */

/* {
    ok:true,
    msg: 'crear eventos',
} */

 /* {
    ok:true,
    msg: 'actualizar eventos',
} */
 
/* {
    ok:true,
    msg: 'actualizar eventos',
} */

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}