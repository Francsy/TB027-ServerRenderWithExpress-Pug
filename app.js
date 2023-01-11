const express = require('express')
const bodyParser = require('body-parser');
const { dirname } = require('path') //

const app = express()
const port = 3000

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/film/:title?', async (req, res) => {
    let response = await fetch(`https://www.omdbapi.com/?t=${req.params.title}&apikey=3bc504a3`);
    let filmData = await response.json();
    res.render('film', { "film" : filmData}) // si no probar con {film}
})

app.post('/film', (req, res) => {
    res.redirect(`/film/${req.body.title}`);
})

app.listen(port, () => {
    console.log("Funcionando")
})