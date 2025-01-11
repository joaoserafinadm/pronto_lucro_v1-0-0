import CalculadoraGeeCard from "./calculadoraGeeCard";
import ToolsCard from "./toolsCard";




export default function AccountProductsPage(props) {

    const { companyData } = props




    return (

        <>
            <ToolsCard
                title='Demonstração do Resultado do Exercício - DRE'
                description='Ferramenta para análise detalhada de receitas, custos e despesas, gerando relatórios precisos do desempenho financeiro da empresa.'
                list={[
                    'Relatório detalhado de receitas e despesas',
                    'Análise de lucro bruto e líquido',
                    'Cálculo de margem de contribuição',
                    'Exportação em PDF ou Excel'
                ]}
                check={companyData?.tools?.dfc}
            />
            <ToolsCard
                title='Módulo de Precificação'
                description='Permite calcular preços de venda ideais, considerando custos, margens e concorrência para otimizar a lucratividade.'
                list={[
                    'Cálculo de preço com base em custos fixos e variáveis',
                    'Simulações de cenários de margem de lucro',
                    'Comparação com preços de mercado',
                    'Relatórios de rentabilidade por produto'
                ]}
                check={companyData?.tools?.precificacao}
            />
            <ToolsCard
                title='Consultoria por IA'
                description='Oferece sugestões automatizadas para melhorar a gestão financeira com base em análises de dados da empresa.'
                list={[
                    'Recomendações personalizadas de redução de custos',
                    'Análise de tendências financeiras',
                    'Alertas sobre riscos financeiros',
                    'Sugestões de otimização de fluxo de caixa'
                ]}
                check={companyData?.tools?.consultoriaIa}
            />
            <ToolsCard
                title='Consultoria'
                description='Apoio especializado para resolver questões financeiras e contábeis com base na realidade da sua empresa.'
                list={[
                    'Orientação sobre planejamento financeiro',
                    'Análise de viabilidade de novos projetos',
                    'Revisão de demonstrações contábeis',
                    'Consultas sobre legislação fiscal e tributária'
                ]}
                check={companyData?.tools?.consultoria}
            />
        </>

    )
}