// // import { ObjectId } from 'mongodb'; // Importa ObjectId para gerar IDs únicos
// import { ObjectId } from "bson";
// export function getTagsBySector(sector) {
//     const tags = {
//         Indústria: {
//             incomeTags: [
//                 {
//                     _id: new ObjectId(),
//                     category: 'Vendas e Receitas',
//                     color: '#4CAF50', // Verde
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Vendas de Produtos'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Exportações'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Receitas de Licenciamento'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Serviços e Consultorias',
//                     color: '#2196F3', // Azul
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Consultoria Técnica'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Serviços de Engenharia'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Subvenções e Subsídios',
//                     color: '#9C27B0', // Roxo
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Subsídios Governamentais'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Incentivos Fiscais'
//                         }
//                     ]
//                 }
//             ],
//             expenseTags: [
//                 {
//                     _id: new ObjectId(),
//                     category: 'Custos de Produção',
//                     color: '#F44336', // Vermelho
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Matérias-Primas'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Custos de Maquinário'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Despesas com Mão de Obra'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Manutenção e Reparos',
//                     color: '#FF9800', // Laranja
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Manutenção de Equipamentos'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Reparos de Infraestrutura'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Despesas Operacionais',
//                     color: '#9E9E9E', // Cinza
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Salários e Benefícios'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Despesas Administrativas'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Impostos e Taxas',
//                     color: '#FFC107', // Amarelo
//                     textColor: 'black',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Imposto sobre Produtos'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Taxas de Licenciamento'
//                         }
//                     ]
//                 }
//             ]
//         },
//         Comércio: {
//             incomeTags: [
//                 {
//                     _id: new ObjectId(),
//                     category: 'Vendas e Receitas',
//                     color: '#4CAF50', // Verde
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Vendas de Produtos'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Vendas Online'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Vendas em Lojas Físicas'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Comissões e Outras Receitas',
//                     color: '#2196F3', // Azul
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Comissões sobre Vendas'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Receitas de Parcerias'
//                         }
//                     ]
//                 }
//             ],
//             expenseTags: [
//                 {
//                     _id: new ObjectId(),
//                     category: 'Custos de Mercadorias Vendidas',
//                     color: '#F44336', // Vermelho
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Aquisição de Mercadorias'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Despesas com Armazenagem'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Marketing e Publicidade',
//                     color: '#FF9800', // Laranja
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Campanhas Publicitárias'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Promoções e Descontos'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Despesas Operacionais',
//                     color: '#9E9E9E', // Cinza
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Salários e Benefícios'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Aluguel de Loja'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Impostos e Taxas',
//                     color: '#FFC107', // Amarelo
//                     textColor: 'black',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Imposto sobre Vendas'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Taxas de Registro'
//                         }
//                     ]
//                 }
//             ]
//         },
//         Serviços: {
//             incomeTags: [
//                 {
//                     _id: new ObjectId(),
//                     category: 'Serviços Prestados',
//                     color: '#2196F3', // Azul
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Consultoria'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Serviços Técnicos'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Manutenção e Suporte'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Receitas Diversas',
//                     color: '#9C27B0', // Roxo
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Honorários'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Comissões de Serviços'
//                         }
//                     ]
//                 }
//             ],
//             expenseTags: [
//                 {
//                     _id: new ObjectId(),
//                     category: 'Custos Operacionais',
//                     color: '#F44336', // Vermelho
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Salários e Benefícios'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Aluguel de Escritório'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Despesas Gerais',
//                     color: '#FF9800', // Laranja
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Despesas Administrativas'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Treinamento e Capacitação'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Impostos e Taxas',
//                     color: '#FFC107', // Amarelo
//                     textColor: 'black',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Imposto sobre Serviços'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Taxas de Registro e Licenciamento'
//                         }
//                     ]
//                 }
//             ]
//         },
//         Outro: {
//             incomeTags: [
//                 {
//                     _id: new ObjectId(),
//                     category: 'Receitas Diversas',
//                     color: '#4CAF50', // Verde
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Rendimentos Diversos'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Ganhos Eventuais'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Investimentos e Aplicações',
//                     color: '#9C27B0', // Roxo
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Dividendos Recebidos'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Rendimentos de Aplicações Financeiras'
//                         }
//                     ]
//                 }
//             ],
//             expenseTags: [
//                 {
//                     _id: new ObjectId(),
//                     category: 'Despesas Eventuais',
//                     color: '#F44336', // Vermelho
//                     textColor: 'white',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Multas e Penalidades'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Despesas Imprévistas'
//                         }
//                     ]
//                 },
//                 {
//                     _id: new ObjectId(),
//                     category: 'Impostos e Taxas',
//                     color: '#FFC107', // Amarelo
//                     textColor: 'black',
//                     tags: [
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Impostos Diversos'
//                         },
//                         {
//                             _id: new ObjectId(),
//                             subTags: [],
//                             tag: 'Taxas Bancárias'
//                         }
//                     ]
//                 }
//             ]
//         }
//     };

//     return tags[sector] || { incomeTags: [], expenseTags: [] };
// }


export function getTagsBySector_02(sector) {

    const tags = {
        industria: {
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
                    color: "#F44336", // Verde
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
                    color: "#FF9800",
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
                    color: "#9E9E9E",
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
                    color: "#9C27B0",
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
                    color: "#FF9800",
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
                    color: "#FF9800",
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
                    color: "#FF9800",
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
                    color: "#FF9800",
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
    }

}