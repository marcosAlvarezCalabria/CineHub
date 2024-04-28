const axios = require('axios');
require('dotenv').config();
require('../configs/db.config');
const mongoose = require('mongoose');
const Movie = require('../models/movie.model');

mongoose.connection.once('open', () => {
    console.info(`Connected to the database ${mongoose.connection.db.databaseName}`);
    console.info('Running seeds script');

    const accessToken = process.env.TMDB_ACCESS_TOKEN; // Asegúrate de definir esta variable de entorno

    const totalPagesToFetch = 5; // Número total de páginas que deseas obtener de la API
    const promises = [];

    for (let page = 1; page <= totalPagesToFetch; page++) {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/21237768/lists?page=${page}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        };

        // Realiza la solicitud y almacena la promesa en un array
        promises.push(
            axios
                .request(options)
                .then(response => {
                    // Procesa los datos obtenidos de la respuesta y almacena en la base de datos
                    const moviesData = response.data.results; // Suponiendo que los datos de la API están bajo 'results'
                    return Movie.insertMany(moviesData); // Inserta los datos en la base de datos usando Mongoose
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                })
        );
    }

    // Cuando todas las promesas se resuelvan o rechacen, imprime un mensaje y cierra la conexión con la base de datos
    Promise.all(promises)
        .then(() => {
            console.info('Data population complete');
            mongoose.connection.close();
        })
        .catch(error => {
            console.error('Error populating data:', error);
            mongoose.connection.close();
        });
});
