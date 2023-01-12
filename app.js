const express = require('express')

const app = express()
const port = 3000

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.urlencoded({ extended: true }));

// app.use('/', express.static('public'));
// app.use('/film', express.static('public'));
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.render('home')
    // res.status(200).send("Has mandado una petición")
})

app.get('/film/:title?', async (req, res) => {
    let response = await fetch(`https://www.omdbapi.com/?t=${req.params.title}&apikey=3bc504a3`);
    let filmData = await response.json();
    res.status(200).render('film', { "film" : filmData}) // si no probar con {film}
    // res.status(200).send("Has mandado una petición")
})

//extrae de la petición del formulario el input con name "title"
app.post('/film', (req, res) => {
    res.redirect(`/film/${req.body.title}`); 
    // res.status(201).send(`Creado ${req.body.title}`)
})

app.listen(port, () => {
    console.log("Funcionando")
})