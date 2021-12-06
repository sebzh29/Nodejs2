const express = require('express');
const cors = require('cors');
const app = express();
const port = 8088;

app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// middleware
app.use(function (req, res, next) {
    console.log('un GET a ete effectué a cette heure:', Date.now());
    next();
});

app.get('/', function(req,res) {
    res.json({ nom: "TOMI", age: 5 } );
})

app.listen(port,() => {
    console.log('le serveur fonctionne sur le port:'+port);
})
