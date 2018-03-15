const express = require('express');
const port = process.env.PORT || 9000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const axios = require('axios');

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
    console.log(req.body)
    res.status(200).send('Ok');
});

api.route('/data').post((req,res)=>{
    let user = req.body.user;
    let pass = req.body.pass;
    let formId = req.body.formId;
    let params = {
        user:user,
        pass:pass,
        formId:formId
    }
    axios.post('https://apigeogestion.erictelm2m.com:7443/getForm',params)
    .then(data=>{
        res.status(200).send(data.data);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
})
app.use('/api',api);

app.listen(port, ()=>{
    console.log(`Express Server Listening in ${port}`)
})