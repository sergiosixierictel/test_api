const express = require('express');
const port = process.env.port || 9000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

let app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())


let api = express.Router();

api.route('/').get((req,res)=>{
    res.status(200).send('Default route OK')
});

api.route('/form').post((req,res)=>{
    console.log('Cuerpo de la respuesta')
    console.log(req.body)
    res.status(200).send('Ok');
});
app.use('/api',api);


app.listen(port, ()=>{
    console.log(`Express Server Listening in ${port}`)
})