//Módulos
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')
const axios = require('axios')
const { config } = require('./config')

let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

let api = express.Router()

api.route('/').get((req,res)=>{
    res.status(200).send('Default Route OK')
})

/**
 * Método para obtener formId
 * En el request, se encuentra el body con el formId 
 * Ejemplo : { formId:'numerodeid' }
 */
api.route('/form').post((req,res)=>{
    console.log(req.body)
    res.status(200).send('Ok')
})

/**
 * Método para obtener datos del formulario
 * Ingresar user, pass, formId
 * Json de entrada
 * {
 *      "user":"usuariodeladmin",
 *      "pass":"passdeladmin",
 *      "formId":"numerodelformid"
 * }
 */
api.route('/data').post((req,res)=>{
    // Obtención de los parámetros
    let user = req.body.user
    let pass = req.body.pass
    let formId = req.body.formId
    // Contrucción del JSON
    let params = {
        user:user,
        pass:pass,
        formId:formId
    }
    // Petición al apigeogestion
    axios.post(config.api,params)
    .then(data=>{
        // Aquí se recibe los datos del formulario
        // Aquí se podría guardar la data en su base de datos
        res.status(200).send(data.data)
    })
    .catch(err=>{
        // Manejo de errores
        res.status(500).send(err)
    })
})

//prefijo para las rutas
app.use('/api',api)

//Iniciamos el servidor
app.listen(config.port, ()=>{
    console.log(`Express Server Listening in ${config.port}`)
})