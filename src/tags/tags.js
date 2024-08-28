// import { ObjectId } from 'mongodb'; // Importa ObjectId para gerar IDs únicos

export function getTagsBySector(sector) {
    const tags = {
        Indústria: {
            incomeTags: [
                {
                    // _id: new ObjectId(),
                    category: 'Vendas e Receitas',
                    color: '#4CAF50', // Verde
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Vendas de Produtos'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Exportações'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Receitas de Licenciamento'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Serviços e Consultorias',
                    color: '#2196F3', // Azul
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Consultoria Técnica'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Serviços de Engenharia'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Subvenções e Subsídios',
                    color: '#9C27B0', // Roxo
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Subsídios Governamentais'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Incentivos Fiscais'
                        }
                    ]
                }
            ],
            expenseTags: [
                {
                    // _id: new ObjectId(),
                    category: 'Custos de Produção',
                    color: '#F44336', // Vermelho
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Matérias-Primas'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Custos de Maquinário'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Despesas com Mão de Obra'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Manutenção e Reparos',
                    color: '#FF9800', // Laranja
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Manutenção de Equipamentos'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Reparos de Infraestrutura'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Despesas Operacionais',
                    color: '#9E9E9E', // Cinza
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Salários e Benefícios'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Despesas Administrativas'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Impostos e Taxas',
                    color: '#FFC107', // Amarelo
                    textColor: 'black',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Imposto sobre Produtos'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Taxas de Licenciamento'
                        }
                    ]
                }
            ]
        },
        Comércio: {
            incomeTags: [
                {
                    // _id: new ObjectId(),
                    category: 'Vendas e Receitas',
                    color: '#4CAF50', // Verde
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Vendas de Produtos'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Vendas Online'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Vendas em Lojas Físicas'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Comissões e Outras Receitas',
                    color: '#2196F3', // Azul
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Comissões sobre Vendas'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Receitas de Parcerias'
                        }
                    ]
                }
            ],
            expenseTags: [
                {
                    // _id: new ObjectId(),
                    category: 'Custos de Mercadorias Vendidas',
                    color: '#F44336', // Vermelho
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Aquisição de Mercadorias'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Despesas com Armazenagem'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Marketing e Publicidade',
                    color: '#FF9800', // Laranja
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Campanhas Publicitárias'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Promoções e Descontos'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Despesas Operacionais',
                    color: '#9E9E9E', // Cinza
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Salários e Benefícios'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Aluguel de Loja'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Impostos e Taxas',
                    color: '#FFC107', // Amarelo
                    textColor: 'black',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Imposto sobre Vendas'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Taxas de Registro'
                        }
                    ]
                }
            ]
        },
        Serviços: {
            incomeTags: [
                {
                    // _id: new ObjectId(),
                    category: 'Serviços Prestados',
                    color: '#2196F3', // Azul
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Consultoria'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Serviços Técnicos'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Manutenção e Suporte'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Receitas Diversas',
                    color: '#9C27B0', // Roxo
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Honorários'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Comissões de Serviços'
                        }
                    ]
                }
            ],
            expenseTags: [
                {
                    // _id: new ObjectId(),
                    category: 'Custos Operacionais',
                    color: '#F44336', // Vermelho
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Salários e Benefícios'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Aluguel de Escritório'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Despesas Gerais',
                    color: '#FF9800', // Laranja
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Despesas Administrativas'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Treinamento e Capacitação'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Impostos e Taxas',
                    color: '#FFC107', // Amarelo
                    textColor: 'black',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Imposto sobre Serviços'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Taxas de Registro e Licenciamento'
                        }
                    ]
                }
            ]
        },
        Outro: {
            incomeTags: [
                {
                    // _id: new ObjectId(),
                    category: 'Receitas Diversas',
                    color: '#4CAF50', // Verde
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Rendimentos Diversos'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Ganhos Eventuais'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Investimentos e Aplicações',
                    color: '#9C27B0', // Roxo
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Dividendos Recebidos'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Rendimentos de Aplicações Financeiras'
                        }
                    ]
                }
            ],
            expenseTags: [
                {
                    // _id: new ObjectId(),
                    category: 'Despesas Eventuais',
                    color: '#F44336', // Vermelho
                    textColor: 'white',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Multas e Penalidades'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Despesas Imprévistas'
                        }
                    ]
                },
                {
                    // _id: new ObjectId(),
                    category: 'Impostos e Taxas',
                    color: '#FFC107', // Amarelo
                    textColor: 'black',
                    tags: [
                        {
                            // _id: new ObjectId(),
                            tag: 'Impostos Diversos'
                        },
                        {
                            // _id: new ObjectId(),
                            tag: 'Taxas Bancárias'
                        }
                    ]
                }
            ]
        }
    };

    return tags[sector] || { incomeTags: [], expenseTags: [] };
}
