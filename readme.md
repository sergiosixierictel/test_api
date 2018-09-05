# Servicios web Erictel

## Instrucciones para levantar servicios

### Instalar módulos
Instalar dependencias y devdependecias
```
$ npm install -d
```
### Correr el archivo servior
```
$ node server.js
```

## ¿Cómo leer el código?

Si no estás familiarizado con Node, te explicaremos paso a paso.
Primero debemos abrir el archivo server.js, que contiene los ejemplos de consumo, ahí veremos lo siguiente:

### Módulos

Son las librerías que se instalan con NPM, que es como maven, composer o nuget.

```
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')
const axios = require('axios')
const { config } = require('./config')
```

### Configuraciones de Servidor

Aquí se configura el servidor con express, un framework de node.
```
let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

let api = express.Router()
```
### Prefijo de la ruta

```
app.use('/api',api)
```

### Inicio del servidor node

```
app.listen(config.port, ()=>{
    console.log(`Express Server Listening in ${config.port}`)
})
```

### Endpoint modelo para consumir el servicio GetForm

```
api.route('/data').post((req,res)=>{
    let user = <Aquí va el usuario admin de GeoGestión>
    let pass = <Aquí la contraseña del usuario admin>
    let formId = req.body.formId //Este dato lo enviará Erictel 
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
```

La Url de este servicio quedaría así
https://dominio o ip:puerto/api/data




