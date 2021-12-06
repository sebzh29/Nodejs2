//npm i express --save
//npm install ejs --save
const express = require('express');
const ejs = require('ejs');
const jsonfile = require('jsonfile');
const bdd = require('./model/controller.js');

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // on pourra faire du format express.json


app.set('views',__dirname + '/mesvues'); // repertoire contenant les templates

// declaration du moteur de template utilisé

app.set('view engine','ejs'); // https://ejs.co

//declaration d'une route et declaration d'une focntion de callback

// middleware (executé a chaque requete)
app.use(function (req, res, next) {
    console.log('une requete a ete executé a cette heure:', Date.now());
    next();
});

//afichage d un templage html pur
app.get('/', function(req,res){
    res.render('index');
});

// lancement d'un objet en parametre
app.get('/about', function(req, res) {
    res.render('about', { info: "une information" });
});

//affichage d un template avec objet javascript possedant une cle:valeur
app.get('/route1', function(req,res){
    // data1 est le fichier ejs qui se trouve dans le rep mesvues
    res.render('data1',{resultat : "Bravo  Biloute !!!"} )
})

// recuperation des parametres et affichage
app.get('/route2/:param1/:param2', function(req,res){
    // dans url http://localhost:8082/route2/a/b
    
    console.log(req.params);

    // dans data2.ejs afficher param1 param2
    res.render('data2',{ resultat : "Bravo!!!!",param1: req.params.param1, param2: req.params.param2});
} )

/* creer un rep model et dedans creer data.json avec ces donnees:

{
    "result1" : "résultat interessant",
    "result2" : 80
}
*/
//https://www.npmjs.com/package/jsonfile
//npm i jsonfile --save
app.get('/route3', function(req, res){
    //lecture synchrone de data.json ds le rep model
    let donnees = jsonfile.readFileSync('model/data.json')
    console.log(donnees);
    res.render('data3', donnees)

})

app.get('/route4', function(req, res){
    //lecture Assynchrone de data.json ds le rep model
    jsonfile.readFile('model/data.json', function(err,donnees){
        console.log(donnees)
        res.render('data3', donnees)
    })
    console.log("Coucou");

})

app.get('/route5', function(req,res){
    //lecture d une table dans la bdd
    bdd.getAll("article",function(article){ 
        console.log(article);
        res.render("data4",{ article: article });
    } )
})

app.get('/route6', function(req,res){
    // formulaire de creation d article    
        res.render("form");
         // creer dans mesvues un formulaire pour POSTer un  article
         // l action de form sera addarticle
    } )


app.post('/addarticle', function(req,res) {
    console.log(req.body);
    bdd.createarticle('article', req.body, function(){
        res.redirect('form')
    })
})

// creer la fonction update et tester avec postman
app.post('/update_article/:id', function(req,res) {
    console.log(req.body);
    console.log(req.params);
    bdd.update('article', req.params.id, function(){
        res.redirect('data5')
    })
})

app.get('/modif_article/:id', function(req,res) {
    bdd.getOne('article', req.params.id, function(article){
        res.render("article", { article: article });
    })
})





app.listen(8082);






