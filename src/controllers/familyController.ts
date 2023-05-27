import { RequestHandler } from "express";
import getAdress from "../services/cepService";
import CalculatePerCapita from "../utils/perCapita";

// controller that is responsible for return data to frontend
const getUserInfo:RequestHandler = async (req,res) =>{
    const adressF :any = await getAdress(req.body.cep);
    const perCapitaF : number = CalculatePerCapita(req.body.income, req.body.dependents);
    const nameF : string = req.body.name || "Uninformed";

    const family:Family ={
        name : nameF,
        perCapita : perCapitaF,
        adress : {
            cep : adressF.cep,
            complement : adressF.complemento,
            ddd : adressF.ddd,
            gia: adressF.gia,
            ibge: adressF.ibge,
            locality: adressF.localidade,
            neighborhood: adressF.bairro,
            publicPlace: adressF.logradouro,
            siafi: adressF.siafi,
            uf: adressF.uf
        }
    }
    return res.json(family);
}

export default getUserInfo;