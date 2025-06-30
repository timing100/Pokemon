const express = require('express');
const axios = require('axios');
const exphbs = require('express-handlebars');

const app = express();
const hbs = exphbs.create({ defaultLayout: 'main' });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.send(' Hey there! you should try my favorite pokemon Mankey by doing pokemon/mankey');
});

app.get('/pokemon/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const pokemon = response.data;

        res.render('pokemon', {pokemon});
    } catch (e) {
        console.error('Error fetching Pokémon:', e.message);
        res.status(404).render('error', { message: 'Pokemon not found' });
    }
});

app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).render('error', { message: 'Something went wrong!' });
});

const PORT = 3009;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
