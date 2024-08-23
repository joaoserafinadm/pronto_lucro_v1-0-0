

export function exempleTags() {


    const incomeTags = [
        {
            _id: new ObjectId(),
            category: 'Vendas e Receitas',
            color: '#4CAF50', // Verde
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Vendas na Loja Física' },
                { _id: new ObjectId(), tag: 'Vendas Online' },
                { _id: new ObjectId(), tag: 'Vendas por Redes Sociais' },
                { _id: new ObjectId(), tag: 'Receita de Assinaturas' }
            ]
        },
        {
            _id: new ObjectId(),
            category: 'Serviços',
            color: '#2196F3', // Azul
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Consultoria' },
                { _id: new ObjectId(), tag: 'Suporte Técnico' },
                { _id: new ObjectId(), tag: 'Design Gráfico' }
            ]
        },
        {
            _id: new ObjectId(),
            category: 'Investimentos',
            color: '#9C27B0', // Roxo
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Investimentos de Sócios' },
                { _id: new ObjectId(), tag: 'Venda de Ações' }
            ]
        },
        {
            _id: new ObjectId(),
            category: 'Outros Recebimentos',
            color: '#4CAF50', // Verde
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Juros de Aplicações Financeiras' },
                { _id: new ObjectId(), tag: 'Aluguéis Recebidos' },
                { _id: new ObjectId(), tag: 'Reembolsos' },
                { _id: new ObjectId(), tag: 'Royalties' }
            ]
        },
        {
            _id: new ObjectId(),
            category: 'Subvenções e Subsídios',
            color: '#2196F3', // Azul
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Subsídios Governamentais' }
            ]
        },
        {
            _id: new ObjectId(),
            category: 'Empréstimos e Financiamentos',
            color: '#9C27B0', // Roxo
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Empréstimos Bancários' }
            ]
        }
    ];

    const expenseTags = [
        {
            _id: new ObjectId(),
            category: 'Custos de Operação',
            color: '#F44336', // Vermelho
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Salários e Benefícios' },
                { _id: new ObjectId(), tag: 'Aluguel de Imóveis' },
                { _id: new ObjectId(), tag: 'Energia Elétrica' },
                { _id: new ObjectId(), tag: 'Água e Esgoto' }
            ]
        },
        {
            _id: new ObjectId(),
            category: 'Marketing e Publicidade',
            color: '#FF9800', // Laranja
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Publicidade Online' },
                { _id: new ObjectId(), tag: 'Publicidade Offline' },
                { _id: new ObjectId(), tag: 'Eventos e Patrocínios' }
            ]
        },
        {
            _id: new ObjectId(),
            category: 'Investimentos em Tecnologia',
            color: '#9E9E9E', // Cinza
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Software e Licenças' },
                { _id: new ObjectId(), tag: 'Equipamentos de TI' }
            ]
        },
        {
            _id: new ObjectId(),
            category: 'Outras Despesas',
            color: '#F44336', // Vermelho
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Consultoria Externa' },
                { _id: new ObjectId(), tag: 'Taxas Bancárias' },
                { _id: new ObjectId(), tag: 'Reparos e Manutenção' },
                { _id: new ObjectId(), tag: 'Despesas Jurídicas' }
            ]
        },
        {
            _id: new ObjectId(),
            category: 'Tributos e Impostos',
            color: '#FF9800', // Laranja
            textColor: 'white',
            tags: [
                { _id: new ObjectId(), tag: 'Imposto de Renda' },
                { _id: new ObjectId(), tag: 'Contribuições Sociais' }
            ]
        }
    ];

    return { incomeTags, expenseTags }
} 