const mongoose = require('mongoose');
const Carnet = require('../carnets.js');
const dbConnect = require('../db.js');

describe('Carnets DB connection', () => {
    beforeAll(() => {
        return dbConnect();
    });

    beforeEach((done) => {
        Carnet.deleteMany({}, (err) => {
            done();
        });
    });

    it('Writes a carnet in the db', (done) => {
        const carnet = new Carnet({name:"jesus", surname:"torres", valido:true, DNI: 12});
        carnet.save((err, carnet) => {
            expect(err).toBeNull();
            Carnet.find({}, (err, carnets) =>{
                expect(carnets).toBeArrayOfSize(1);
                done();
            });
        });
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
});