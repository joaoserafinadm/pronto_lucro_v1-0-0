import { ObjectId } from "bson"



export function categories_geral() {

    const categories = {
        incomeCategories: [
            {
                _id: new ObjectId(),
                categoryName: "Receita Operacional Bruta",
                color: "#4CAF50", // Verde
                subCategories: [
                    {
                        _id: new ObjectId(),
                        name: 'Venda de produtos'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Venda de serviços'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Outras receitas operacionais'
                    }
                ]
            },
            {
                _id: new ObjectId(),
                categoryName: "Receitas Não Operacionais",
                color: "#2196F3", // Verde
                subCategories: [
                    {
                        _id: new ObjectId(),
                        name: 'Entrada de empréstimos bancários'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Entrada de dinheiro dos sócios'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Entrada de empréstimos de terceiros'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Venda de Imobilizado'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Juros recebidos'
                    },
                ]
            }

        ],
        expenseCategories: [
            {
                _id: new ObjectId(),
                categoryName: "Impostos e Fretes",
                color: "#E57373", // Verde
                subCategories: [
                    {
                        _id: new ObjectId(),
                        name: 'Simples nacional (DAS)'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Imposto MEI'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'ICMS ST - GA'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Fretes sobre compra'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'ISS (Imposto sobre Serviços)'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'PIS'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'COFINS'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Contribuição Social (CS)'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'IRPJ'
                    },
                ]
            },
            {
                _id: new ObjectId(),
                categoryName: "Custos com Vendas",
                color: "#FFB74D",
                subCategories: [
                    {
                        _id: new ObjectId(),
                        name: 'Compra de matéria prima'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Compra de mercadorias para revenda'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Serviços terceirizados'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Comissão de vendas'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Frete sobre vendas'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Compra de embalagens'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Ajuda de custo'
                    }
                ]
            },
            {
                _id: new ObjectId(),
                categoryName: "Despesas Comerciais",
                color: "#FFD54F",
                subCategories: [
                    {
                        _id: new ObjectId(),
                        name: 'Viagens'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Hospedagens'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Combustíveis e lubrificantes'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Estacionamentos'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Pedágios'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Multas de trânsito'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Manutenção de veículos'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'IPVA/Licenciamento'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Seguro veículos'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Lavagem de veículos'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Alimentação'
                    },
                ]
            },
            {
                _id: new ObjectId(),
                categoryName: "Despesas Administrativas (Fixas)",
                color: "#F48FB1",
                subCategories: [
                    {
                        _id: new ObjectId(),
                        name: 'Água'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Aluguel'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Alvará de localização'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Assessoria jurídica'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Associação de classe'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Consultorias'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Contabilidade'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Conselhos profissionais'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Doações e filantropia'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Energia elétrica'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Farmácia'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Internet e telefone'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'IPTU'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Licenciamento ambiental'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Manutenção de máquinas e equip.'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Manutenção predial'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Material de escritório'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Mercado (Café, Erva, Mat. Limpeza)'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Outras taxas municipais'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Publicidade e propaganda'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Segurança privada'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Seguro empresarial'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Seguro de vida sócios'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Serviços de limpeza'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Softwares'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Correio'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Plano de saúde sócios'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Plano odontológico dos sócios'
                    }
                ]
            },
            {
                _id: new ObjectId(),
                categoryName: "Despesas com Salários e Encargos",
                color: "#CE93D8",
                subCategories: [
                    {
                        _id: new ObjectId(),
                        name: 'Bonificações'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Confraternizações'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Contribuição Sindical'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Cursos e treinamentos'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Diferença de salário'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'EPI´s'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Exames de admissão/demissão'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Férias'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'FGTS'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Indenizações'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'INSS sobre Pró-Labore (GPS)'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'INSS sobre Salários (GPS)'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'IRFF sobre Salários (DARF 0561)'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Medicina do trabalho'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Plano de saúde funcionários'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Plano odontológico funcionários'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Plano de saúde sócios'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Plano odontológico sócios'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Pró-labore 1'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Pró-labore 2'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Pró-labore 3'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Pró-Labore 4'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Diaristas'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Uniformes'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Vale alimentação'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Vale transporte'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Vales/Adiantamento de salários'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Seguro de vida funcionários'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Seguro de vida sócios'
                    },

                ]
            },
            {
                _id: new ObjectId(),
                categoryName: "Despesas Financeiras",
                color: "#A1887F",
                subCategories: [
                    {
                        _id: new ObjectId(),
                        name: 'Tarifas bancárias'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Imposto sobre aplicações'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Tarifas Boletos'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Tarifa sobre venda de cartões'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Tarifas sobre antecipação de cartões'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Juros bancários'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Juros desconto de cheques'
                    }

                ]
            },
            {
                _id: new ObjectId(),
                categoryName: "Financiamentos e Dívidas",
                color: "#90A4AE",
                subCategories: [
                    {
                        _id: new ObjectId(),
                        name: 'Financiamento Pronampe'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Capital de giro'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Dívidas com fornecedores'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Dívidas com empréstimo pessoal'
                    }

                ]
            },
            {
                _id: new ObjectId(),
                categoryName: "Investimentos",
                color: "#FF8A65",
                subCategories: [
                    {
                        _id: new ObjectId(),
                        name: 'Máquinas e equipamentos'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Móveis'
                    },
                    {
                        _id: new ObjectId(),
                        name: 'Imóveis'
                    },
                    {
                        _id: new ObjectId(),
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