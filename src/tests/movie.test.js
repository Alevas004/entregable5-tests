const request = require('supertest');
const app = require('../app.js');
const Actor = require('../models/Actor.js');
const Genre = require('../models/Genre.js');
const Director = require('../models/Director.js');
require('../models/index.js')

let id;

test('GET /movies must show all movies', async () => {
    const res = await  request(app).get('/movies')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /movies must create a movie', async () => {
    const movie = {
        name: "Spring",
        image: "www.google.com",
        synopsis: "Lorem imasio aoihgspa awleaihfoa oaihgvpa  aighspao aposhpdga lksjghpa poih poi g goiug",
        releaseYear: 2014
    }

    const res = await request(app).post('/movies').send(movie)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movie.name)
    expect(res.body-id).toBeDefined()
});

test('PUT /movies must update a movie', async () => {
    const movie = {
        name: "Matrix"
    }
    const res = await request(app).put(`/movies/${id}`).send(movie)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movie.name)
});

test('POST /movies/:id/genres must set the movie genres', async () => {
    const genre = await Genre.create({
        name: "Thriller"
    })

    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id])
    await genre.destroy()
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/actors must set the movie actors', async () => {
    const actor = await Actor.create({
        firstName: "Carlos",
        lastName: "Amparo",
        nationality: "Colombiana",
        image: "www.google.com",
        birthday: "1990-12-12"
    })

    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
    await actor.destroy()
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/directors must set the movie directors', async () => {
    const director = await Director.create({
        firstName: "Santiago",
        lastName: "Mendez",
        nationality: "Mexicano",
        image: "www.google.com",
        birthday: "1995-01-16"
    })

    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])
    await director.destroy()
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

test('DELETE /movies must remove a movie', async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)
});