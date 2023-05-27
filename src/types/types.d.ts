declare type Adress ={
    cep:string,
    publicPlace: string,
    complement: string,
    neighborhood: string,
    locality: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string,
}

declare type Family = {
    name:string,
    perCapita:number,
    adress:Adress
}
