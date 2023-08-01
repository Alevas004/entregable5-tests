const request = require('supertest');
const app = require('../app.js');
const Genre = require('../models/Genre.js');
require('../models/index.js')

let id;


test('GET /directors must show all directors', async() => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test('POST /directors must create an artist', async() => {
    const artist = {
        firstName: "Santiago",
        lastName: "Mendez",
        nationality: "Mexicano",
        image: "www.google.com",
        birthday: "1995-01-16"
    }

    const res = await request(app).post('/directors').send(artist)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(artist.name)
    expect(res.body.id).toBeDefined()
    
})

test('PUT /directors must update an artist', async () => {
    const artist = {
        nationality: "Colombiana",
    }

    const res = await request(app).put(`/directors/${id}`).send(artist)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(artist.name)

})



test('DELETE /directors must remove an artist', async () => {
    const res = await request(app).delete(`/directors/${id}`)

    expect(res.status).toBe(204)
})