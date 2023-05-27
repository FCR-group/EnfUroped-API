import CalculatePerCapita from "../src/utils/perCapita";

describe("Family Per Capita income function",()=>{
    it("Should return the income of a family",()=>{
        expect(CalculatePerCapita(1500,2)).toBe(750);
    });
    it("Should return the same value of the income because the dependents value is zero",()=>{
        expect(CalculatePerCapita(1500,0)).toBe(1500);
    })
    it("Should return 0 because the income and the dependents value is less than zero ",()=>{
        expect(CalculatePerCapita(1500,-1)).toBe(0);
        expect(CalculatePerCapita(-1500,2)).toBe(0);
    })
})