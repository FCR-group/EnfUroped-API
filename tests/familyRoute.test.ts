import req from "supertest";
import server from "../src/server";

describe("Describe the API routes",()=>{
    it("Should return the complete family information",async()=>{
        const body = {
            "name":"Kauã",
            "cep":72215077,
            "income":1500,
            "dependents":2
        }
        const response = await req(server).get("/api/").send(body);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Kauã");
        expect(response.body.adress.locality).toBe("Brasília");
        expect(response.body.adress.uf).toBe("DF");
    })
    it("Should return the name as \"Uninformed\" because the name was never informed",async()=>{
        const body = {
            "cep":72215077,
            "income":1500,
            "dependents":2
        }
        const response = await req(server).get("/api/").send(body);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Uninformed");
    })
})