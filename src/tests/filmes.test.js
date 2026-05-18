const request = require('supertest');
const app = require('../app');
const filmes = require('../models/filmeModel');

beforeEach(() => {
    filmes.length = 0;
    filmes.push(
        { id: 1, nome: "Filme 1", ano: 2000, descricao: "desc" }
    );
});


describe('GET /api/filmes', () => {
    it('deve retornar lista de filmes', async () => {
        const response = await request(app).get('/api/filmes');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('POST /api/filmes', () => {
    it('deve adicionar um filme', async () => {
        const response = await request(app)
            .post('/api/filmes')
            .send({
                nome: "Teste",
                ano: 2020,
                descricao: "Filme teste"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('deve retornar erro se faltar dados', async () => {
        const response = await request(app)
            .post('/api/filmes')
            .send({ nome: "Teste" });

        expect(response.statusCode).toBe(400);
    });
});

describe('DELETE /api/filmes/:id', () => {

    it('deve remover um filme existente', async () => {
        const response = await request(app).delete('/api/filmes/1');
        expect(response.statusCode).toBe(204);
    });

    it('deve retornar 404 se o filme não existir', async () => {
        const response = await request(app).delete('/api/filmes/999');
        expect(response.statusCode).toBe(404);
    });

});