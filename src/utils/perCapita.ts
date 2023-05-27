// function that calculates the per capita income from a family
// it return the income if the value of dependents is zero
// or return 0 if the income value or the dependents value is less than zero
function CalculatePerCapita(income:number,
    dependents:number){
    if(income < 0 || dependents < 0) 
        return 0;
    return dependents !== 0 ? income / dependents : income;
}

export default CalculatePerCapita