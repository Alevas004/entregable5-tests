const request = require('supertest');
const app = require('../app.js');
require('../models/index.js')

let id;

test('GET /actors must show all actors', async () => {
    const res = await  request(app).get('/actors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /actors must create an actor', async () => {
    const actor = {
        firstName: "Carlos",
        lastName: "Amparo",
        nationality: "Colombiana",
        image: "www.google.com",
        birthday: "1990-12-12"
    }

    const res = await request(app).post('/actors').send(actor)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(actor.name)
    expect(res.body-id).toBeDefined()
});

test('PUT /actors must update an actor', async () => {
    const actor = {
        firstName: "Mario",
        lastName: "Rodiguez"
    }
    const res = await request(app).put(`/actors/${id}`).send(actor)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(actor.name)
});

test('DELETE /actors must remove a actor', async () => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
});