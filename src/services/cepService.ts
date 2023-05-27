import fetch from 'node-fetch';
import Utils from '../utils/consts';

// function that fetches the cep
const getAdress = async (cep:string) => {
    const finalUrl:string = `${Utils.APIURL}${cep}/json/`;
    const result = await fetch(finalUrl);
    return result.json();
}

export default getAdress;