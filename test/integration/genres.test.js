const request = require('supertest');
const {Genre, User} = require('../../models');
const mongoose = require('mongoose');

let server;

describe('/api/genres', () => {
    beforeEach(async () => {
        server = require('../../app');
        await Genre.remove({});
    });
    
    afterEach(() => {
        server.close();
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return 404 when given invalid object id', async () => {
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        });

        it('should return 404 when genre id is not found', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get(`/api/genres/${id}`);
            expect(res.status).toBe(404);
        });

        it('should return the right genre if it exists', async () => {
            const genres = [
                { _id: mongoose.Types.ObjectId(), name: 'genre1' },
                { _id: mongoose.Types.ObjectId(), name: 'genre2' }
            ];
            await Genre.collection.insertMany(genres);
            const res = await request(server).get(`/api/genres/${genres[0]._id}`);
            expect(res.status).toBe(200);
            expect(res.body._id).toBe(genres[0]._id.toHexString());
            expect(res.body.name).toBe(genres[0].name);
        });
    });

    describe('POST /', () => {
        let token;
        let name;

        const exec = () => {
            let req = request(server).post('/api/genres');
            if (token)
                req = req.set('Authorization', `Bearer ${token}`);
            
            return req.send({name: name });
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        });

        it('should return 401 if client is not authenticated', async () => {
            token = null;
            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 when if genre is less than 3 characters', async () => {
            name = '12';
            const res = await exec();
            
            expect(res.status).toBe(400);
        });

        it('should save the genre to the database if it is valid', async () => {
            const res = await exec();
            
            const genre = await Genre.find({ name: 'genre1' });

            expect(res.status).toBe(200);
            expect(genre[0]).toHaveProperty('_id');
            expect(genre[0]).toHaveProperty('name', 'genre1');
        });

        it('should return the genre if it is valid', async () => {
            const res = await exec();
            
            const genre = await Genre.find({ name: 'genre1' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', genre[0]._id.toHexString());
            expect(res.body).toHaveProperty('name', genre[0].name);
        });
    });

    describe('PUT /:id', () => {
        let token;
        let name;
        let id;

        const exec = () => {
            let req = request(server).put('/api/genres/' + id);
            if (token)
                req = req.set('Authorization', `Bearer ${token}`);
            
            return req.send({name: name });
        }
        
        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
            id = mongoose.Types.ObjectId();
        });

        it('should return 404 if the genre is not found', async () => {
            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 400 if the genre is not valid', async () => {
            name = '12';
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should update the database if the genre is found', async () => {
            Genre.insertMany([
                { _id: id, name: 'genre1' },
                { name: 'genre2'}
            ]);

            name = 'genre3';
            const res = await exec();

            let genres = await Genre.find({name});
            expect(res.status).toBe(200);
            expect(genres.length).toBe(1);
            expect(genres[0]).toHaveProperty('_id', id);
            expect(genres[0]).toHaveProperty('name', name);
        });

        it('should return the genre after updating it', async () => {
            Genre.insertMany([
                { _id: id, name: 'genre1' },
            ]);

            name = 'genre2';
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', id.toHexString());
            expect(res.body).toHaveProperty('name', name);
        });
    });
});