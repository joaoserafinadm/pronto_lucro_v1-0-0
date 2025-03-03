import { ObjectId } from "bson"



export function categories_comercio() {

    const categories = {
        incomeCategories: [
            {
                _id: "1",
                categoryName: "Receita Operacional Bruta",
                color: "#4CAF50", // Verde
                subCategories: [
                    {
                        _id: "11",
                        name: 'Venda de produtos'
                    },
                    {
                        _id: "12",
                        name: 'Venda de serviços'
                    },
                    {
                        _id: "13",
                        name: 'Outras receitas operacionais'
                    }
                ]
            },
            {
                _id: "2",
                categoryName: "Receitas Não Operacionais",
                color: "#2196F3", // Verde
                subCategories: [
                    {
                        _id: "21",
                        name: 'Entrada de empréstimos bancários'
                    },
                    {
                        _id: "22",
                        name: 'Entrada de dinheiro dos sócios'
                    },
                    {
                        _id: "23",
                        name: 'Entrada de empréstimos de terceiros'
                    },
                    {
                        _id: "24",
                        name: 'Venda de Imobilizado'
                    },
                    {
                        _id: "25",
                        name: 'Juros recebidos'
                    },
                ]
            }

        ],
        expenseCategories: [
            {
                _id: "3",
                categoryName: "Impostos e Fretes",
                color: "#E57373", // Verde
                subCategories: [
                    {
                        _id: "31",
                        name: 'Simples nacional (DAS)'
                    },
                    {
                        _id: "32",
                        name: 'Imposto MEI'
                    },
                    {
                        _id: "33",
                        name: 'ICMS ST - GA'
                    },
                    {
                        _id: "34",
                        name: 'Fretes sobre compra'
                    },
                    {
                        _id: "35",
                        name: 'ISS (Imposto sobre Serviços)'
                    },
                    {
                        _id: "36",
                        name: 'PIS'
                    },
                    {
                        _id: "37",
                        name: 'COFINS'
                    },
                    {
                        _id: "38",
                        name: 'Contribuição Social (CS)'
                    },
                    {
                        _id: "39",
                        name: 'IRPJ'
                    },
                ]
            },
            {
                _id: "4",
                categoryName: "Custos com Vendas",
                color: "#FFB74D",
                subCategories: [
                    {
                        _id: "41",
                        name: 'Compra de matéria prima'
                    },
                    {
                        _id: "42",
                        name: 'Compra de mercadorias para revenda'
                    },
                    {
                        _id: "43",
                        name: 'Serviços terceirizados'
                    },
                    {
                        _id: "44",
                        name: 'Comissão de vendas'
                    },
                    {
                        _id: "45",
                        name: 'Frete sobre vendas'
                    },
                    {
                        _id: "46",
                        name: 'Compra de embalagens'
                    },
                    {
                        _id: "47",
                        name: 'Ajuda de custo'
                    }
                ]
            },
            {
                _id: "5",
                categoryName: "Despesas Comerciais",
                color: "#FFD54F",
                subCategories: [
                    {
                        _id: "51",
                        name: 'Viagens'
                    },
                    {
                        _id: "52",
                        name: 'Hospedagens'
                    },
                    {
                        _id: "53",
                        name: 'Combustíveis e lubrificantes'
                    },
                    {
                        _id: "54",
                        name: 'Estacionamentos'
                    },
                    {
                        _id: "55",
                        name: 'Pedágios'
                    },
                    {
                        _id: "56",
                        name: 'Multas de trânsito'
                    },
                    {
                        _id: "57",
                        name: 'Manutenção de veículos'
                    },
                    {
                        _id: "58",
                        name: 'IPVA/Licenciamento'
                    },
                    {
                        _id: "59",
                        name: 'Seguro veículos'
                    },
                    {
                        _id: "510",
                        name: 'Lavagem de veículos'
                    },
                    {
                        _id: "511",
                        name: 'Alimentação'
                    },
                ]
            },
            {
                _id: "6",
                categoryName: "Despesas Administrativas (Fixas)",
                color: "#F48FB1",
                subCategories: [
                    {
                        _id: "61",
                        name: 'Água'
                    },
                    {
                        _id: "62",
                        name: 'Aluguel'
                    },
                    {
                        _id: "63",
                        name: 'Alvará de localização'
                    },
                    {
                        _id: "64",
                        name: 'Assessoria jurídica'
                    },
                    {
                        _id: "65",
                        name: 'Associação de classe'
                    },
                    {
                        _id: "66",
                        name: 'Consultorias'
                    },
                    {
                        _id: "67",
                        name: 'Contabilidade'
                    },
                    {
                        _id: "68",
                        name: 'Conselhos profissionais'
                    },
                    {
                        _id: "69",
                        name: 'Doações e filantropia'
                    },
                    {
                        _id: "610",
                        name: 'Energia elétrica'
                    },
                    {
                        _id: "611",
                        name: 'Farmácia'
                    },
                    {
                        _id: "612",
                        name: 'Internet e telefone'
                    },
                    {
                        _id: "613",
                        name: 'IPTU'
                    },
                    {
                        _id: "614",
                        name: 'Licenciamento ambiental'
                    },
                    {
                        _id: "615",
                        name: 'Manutenção de máquinas e equip.'
                    },
                    {
                        _id: "616",
                        name: 'Manutenção predial'
                    },
                    {
                        _id: "617",
                        name: 'Material de escritório'
                    },
                    {
                        _id: "618",
                        name: 'Mercado (Café, Erva, Mat. Limpeza)'
                    },
                    {
                        _id: "619",
                        name: 'Outras taxas municipais'
                    },
                    {
                        _id: "620",
                        name: 'Publicidade e propaganda'
                    },
                    {
                        _id: "621",
                        name: 'Segurança privada'
                    },
                    {
                        _id: "622",
                        name: 'Seguro empresarial'
                    },
                    {
                        _id: "623",
                        name: 'Seguro de vida sócios'
                    },
                    {
                        _id: "624",
                        name: 'Serviços de limpeza'
                    },
                    {
                        _id: "625",
                        name: 'Softwares'
                    },
                    {
                        _id: "626",
                        name: 'Correio'
                    },
                    {
                        _id: "627",
                        name: 'Plano de saúde sócios'
                    },
                    {
                        _id: "628",
                        name: 'Plano odontológico dos sócios'
                    }
                ]
            },
            {
                _id: "7",
                categoryName: "Despesas com Salários e Encargos",
                color: "#CE93D8",
                subCategories: [
                    {
                        _id: "71",
                        name: 'Bonificações'
                    },
                    {
                        _id: "72",
                        name: 'Confraternizações'
                    },
                    {
                        _id: "73",
                        name: 'Contribuição Sindical'
                    },
                    {
                        _id: "74",
                        name: 'Cursos e treinamentos'
                    },
                    {
                        _id: "75",
                        name: 'Diferença de salário'
                    },
                    {
                        _id: "76",
                        name: 'EPI´s'
                    },
                    {
                        _id: "77",
                        name: 'Exames de admissão/demissão'
                    },
                    {
                        _id: "78",
                        name: 'Férias'
                    },
                    {
                        _id: "79",
                        name: 'FGTS'
                    },
                    {
                        _id: "710",
                        name: 'Indenizações'
                    },
                    {
                        _id: "711",
                        name: 'INSS sobre Pró-Labore (GPS)'
                    },
                    {
                        _id: "712",
                        name: 'INSS sobre Salários (GPS)'
                    },
                    {
                        _id: "713",
                        name: 'IRFF sobre Salários (DARF 0561)'
                    },
                    {
                        _id: "714",
                        name: 'Medicina do trabalho'
                    },
                    {
                        _id: "715",
                        name: 'Plano de saúde funcionários'
                    },
                    {
                        _id: "716",
                        name: 'Plano odontológico funcionários'
                    },
                    {
                        _id: "717",
                        name: 'Plano de saúde sócios'
                    },
                    {
                        _id: "718",
                        name: 'Plano odontológico sócios'
                    },
                    {
                        _id: "719",
                        name: 'Pró-labore 1'
                    },
                    {
                        _id: "720",
                        name: 'Pró-labore 2'
                    },
                    {
                        _id: "721",
                        name: 'Pró-labore 3'
                    },
                    {
                        _id: "722",
                        name: 'Pró-Labore 4'
                    },
                    {
                        _id: "723",
                        name: 'Diaristas'
                    },
                    {
                        _id: "724",
                        name: 'Uniformes'
                    },
                    {
                        _id: "725",
                        name: 'Vale alimentação'
                    },
                    {
                        _id: "726",
                        name: 'Vale transporte'
                    },
                    {
                        _id: "727",
                        name: 'Vales/Adiantamento de salários'
                    },
                    {
                        _id: "728",
                        name: 'Seguro de vida funcionários'
                    },
                    {
                        _id: "729",
                        name: 'Seguro de vida sócios'
                    },

                ]
            },
            {
                _id: "8",
                categoryName: "Despesas Financeiras",
                color: "#A1887F",
                subCategories: [
                    {
                        _id: "81",
                        name: 'Tarifas bancárias'
                    },
                    {
                        _id: "82",
                        name: 'Imposto sobre aplicações'
                    },
                    {
                        _id: "83",
                        name: 'Tarifas Boletos'
                    },
                    {
                        _id: "84",
                        name: 'Tarifa sobre venda de cartões'
                    },
                    {
                        _id: "85",
                        name: 'Tarifas sobre antecipação de cartões'
                    },
                    {
                        _id: "86",
                        name: 'Juros bancários'
                    },
                    {
                        _id: "87",
                        name: 'Juros desconto de cheques'
                    }

                ]
            },
            {
                _id: "9",
                categoryName: "Financiamentos e Dívidas",
                color: "#90A4AE",
                subCategories: [
                    {
                        _id: "91",
                        name: 'Financiamento Pronampe'
                    },
                    {
                        _id: "92",
                        name: 'Capital de giro'
                    },
                    {
                        _id: "93",
                        name: 'Dívidas com fornecedores'
                    },
                    {
                        _id: "94",
                        name: 'Dívidas com empréstimo pessoal'
                    }

                ]
            },
            {
                _id: "10",
                categoryName: "Investimentos",
                color: "#FF8A65",
                subCategories: [
                    {
                        _id: "101",
                        name: 'Máquinas e equipamentos'
                    },
                    {
                        _id: "102",
                        name: 'Móveis'
                    },
                    {
                        _id: "103",
                        name: 'Imóveis'
                    },
                    {
                        _id: "104",
                        name: 'Veículos'
                    },


                ]
            },
        ]
    }

    return categories

}



// #E57373 - Vermelho suave (representa alerta ou gastos elevados)
// #FFB74D - Laranja médio (associa-se a despesas moderadas)
// #FFD54F - Amarelo dourado (relacionado a custo-benefício ou valor)
// #81C784 - Verde médio (indica controle ou economia)
// #64B5F6 - Azul médio (remete a despesas neutras ou serviços)
// #9575CD - Roxo médio (despesas não essenciais ou luxos)
// #F06292 - Rosa vibrante (gastos pessoais ou indulgências)
// #A1887F - Marrom acinzentado (despesas fixas ou essenciais)


// #E57373 - Vermelho suave (alerta ou gastos elevados)
// #FFB74D - Laranja médio (despesas moderadas)
// #FFD54F - Amarelo dourado (custo-benefício ou valor)
// #F48FB1 - Rosa médio (gastos pessoais ou indulgências)
// #CE93D8 - Lilás médio (despesas relacionadas a lazer ou criatividade)
// #A1887F - Marrom acinzentado (despesas fixas ou essenciais)
// #90A4AE - Cinza azulado (gastos neutros ou tecnológicos)
// #FF8A65 - Salmão vibrante (despesas variáveis ou emergenciais)