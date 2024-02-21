import axios from "axios";



export default async function buscaCep(event) {



    const { value } = event.target

    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
        return false;
    }

    let data


    await axios.get(`https://viacep.com.br/ws/${value}/json/`)
        .then(res => {

            console.log('res', res.data)

            data = res.data


        })

    return data


}