const app = require('../server.js');
const Carnet = require('../carnets.js');
const request = require('supertest');

describe("Hello world tests", () => {
    it("Should do an stupid test", () => {
        const a = 5;
        const b = 3;
        const sum = a + b;

        expect(sum).toBe(8);
    });
});

describe("Carnets API", () => {
    describe("GET /", () => {
        it("Should return an HTML document", () => {
            request(app).get("/").then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("html"));
                expect(response.text).toEqual(expect.stringContaining("h1"));
            });
        });
    });

    describe("GET /carnets", () => {

        beforeAll(() => {
            const carnets = [
                new Carnet({"name":"Peter","surname":"Poter","valido":false,"DNI":"123"}),
                new Carnet({"name":"POT","surname":"Poter","valido":false,"DNI":"2"})
            ];

            dbFind = jest.spyOn(Carnet, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, carnets);
            });
        });

        it('Should return all carnets', () => {
            return request(app).get('/traffic_management').then((response) => {
                expect(response.statusCode).toBe(200);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });

    });

    describe('POST /carnets', () => {
        const carnet = new Carnet({name:"jesus", surname:"torres", valido:true, DNI: 12});
        let dbInsert;
        //let dbFindOne;

        beforeEach(() => {
           // dbFindOne = jest.spyOn(Carnet, "findOne");
            dbInsert = jest.spyOn(Carnet, "create");
        });

        //it('should enter', () => {
         //   dbFindOne.mockImplementation(carnet.DNI);
        //});
        
        it('Should add new carnet if everything is fine', () => {
                dbInsert.mockImplementation((c, callback) => {
                callback(false);
            });

            return request(app).post('/traffic_management').send(carnet).then((response) => {
                expect(response.statusCode).toBe(201);
                //expect(dbInsert).toBeCalledWith(carnet, expect.any(Function));
            });
        });

    

        it('Should return 500 if there is a Problem with db', () =>{
            dbInsert.mockImplementation((c, callback) => {
                callback(true);
            });

            return request(app).post('/traffic_management').send(carnet).then((response) => {
                expect(response.statusCode).toBe(500);
            });
        });
        
    });
});