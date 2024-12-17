import { ObjectId } from "bson"



export default function bankAccounts() {

    const data = [
        {
            "_id": new ObjectId(),
            "bankSelected": {
                "id": "1",
                "name": "Carteira",
                "legalName": "Carteira",
                "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723513994/PRONTO%20LUCRO/PUBLIC/rvfp6bsncja0my1mkynp.png",
                "keyWord": "intermedium",
                "active": true,
                "dataCriacao": "2020-05-20T16:29:20.473",
                "dataModificacao": "2020-05-20T16:29:20.473",
                "countries": [
                    "BR"
                ],
                "institutionType": [
                    "checking_account",
                    "savings_account"
                ],
                "ranking": 1
            },
            "color": "#333333",
            "initialValue": 0,
            "description": "Carteira",
            "valueSum": true,
            "creditCard": false,
            "creditLimit": 0,
            "creditNetwork": null,
            "diaFechamento": 1,
            "diaLancamento": 5,
            "active": true,
            "date": dateObject(new Date())
        }
    ]

    return data





}