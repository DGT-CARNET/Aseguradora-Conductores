const app = require('../server.js');
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
                expect(response.type).toEquals(expect.stringContains("html"));
                expect(response.text).toEquals(expect.stringContains("h1"));
            });
        });
    });
});