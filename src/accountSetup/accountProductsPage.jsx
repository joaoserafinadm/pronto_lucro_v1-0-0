import CalculadoraGeeCard from "./calculadoraGeeCard";
import ToolsCard from "./toolsCard";




export default function AccountProductsPage(props) {




    return (

        <>
            <ToolsCard
                title='Calculadora GEE'
                description='Crie o inventário de emissões de GEE da sua instituição.'
                imgUrl='./InventarioGEE_icon_02.png'
                check={props.companyData.tools.geeCalculator} />
            <ToolsCard
                title='Indicadores ESG'
                description='Avalie a maturidade dos critérios ESG da sua instituição.'
                imgUrl='./IndicadoresESG_icon.png'
                check={props.companyData.tools.esgIndicators} />
            <ToolsCard
                title='Emissões Financiadas'
                description='Ferramenta para bancos avaliarem os impactos das emissões de GEE dos seus financiamentos.'
                imgUrl='./PCAF_icon.png'
                check={props.companyData.tools.pcaf} />
        </>
    )
}