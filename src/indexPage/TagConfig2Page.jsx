import { faBank, faChevronLeft, faChevronRight, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { set } from "lodash";
import { useEffect, useState } from "react";




export default function TagConfig2Page(props) {

    const {
        setorSelected,
        setSetorSelected,
        newSetorName,
        setNewSetorName,
        companyCategory,
        setCompanyCategory,
        regimeTributario,
        setRegimeTributario } = props


    const [regimeTributarioSelected, setRegimeTributarioSelected] = useState(null);




    useEffect(() => {
        setNewSetorName('')
    }, [setorSelected])

    useEffect(() => {

        if (regimeTributario) {
            const regimeExist = regimeTributarioOptions.find(elem => elem.name === regimeTributario)

            console.log("regimeExist", regimeExist)
            if (regimeExist) {
                setRegimeTributarioSelected(regimeExist)
            }

        }
    }, [regimeTributario])

    const handleRegimeTributario = (id) => {



    }





    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">Configure sua empresa</span>
            </div>
            <hr />

            <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Escolha o <b>setor</b> que melhor se encaixa na sua empresa:</span>
            </div>

            <div className="col-12 col-sm-6 my-1 px-3">
                <div type="button" className={`card cardAnimation  ${setorSelected === "Indústria" ? "shadow border-selected" : ""}`} onClick={() => setSetorSelected("Indústria")}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                    <img src="INDUSTRIA_ICON.png" alt="Indústria" className="w-100" />
                                </div>
                                <span className="bold ms-3 fs-5 text-c-secondary">Indústria</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 my-1 px-3">
                <div type="button" className={`card cardAnimation  ${setorSelected === "Comércio" ? "shadow border-selected" : ""}`} onClick={() => setSetorSelected("Comércio")}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                    <img src="COMERCIO_ICON.png" alt="Comércio" className="w-100" />
                                </div>
                                <span className="bold ms-3 fs-5 text-c-secondary">Comércio</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 my-1 px-3">
                <div type="button" className={`card cardAnimation  ${setorSelected === "Serviços" ? "shadow border-selected" : ""}`} onClick={() => setSetorSelected("Serviços")}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                    <img src="SERVICOS_ICON.png" alt="Serviços" className="w-100" />
                                </div>
                                <span className="bold ms-3 fs-5 text-c-secondary">Serviços</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 my-1 px-3">
                <div type="button" className={`card cardAnimation  ${setorSelected === "Outro" ? "shadow border-selected" : ""}`} onClick={() => setSetorSelected("Outro")}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                    <img src="OUTROS_ICON.png" alt="Outro" className="w-100" />
                                </div>
                                <span className="bold ms-3 fs-5 text-c-secondary">Outro</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {setorSelected === "Outro" && (

                <div className="col-12 mt-3 fadeItem">
                    <laberl className="form-label bold" htmlFor="newSetorInput">Qual é o setor que melhor se encaixa na sua empresa?</laberl>
                    <input id="newSetorInput" type="text" className="form-control" onChange={(e) => setNewSetorName(e.target.value)} value={newSetorName} placeholder="Nome do setor" />
                </div>
            )}


            <hr className="mt-3" />

            <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Escolha o <b>categoria</b> da sua empresa:</span>
            </div>

            <div className="px-3">
                <select name="" id="" onChange={(e) => setCompanyCategory(e.target.value)} value={companyCategory} className="form-select">
                    <option value="" selected>Escolha...</option>
                    {companyCategories.map(elem => (
                        <option value={elem.shortName}>{elem.name}</option>
                    ))}
                </select>
            </div>

            <hr className="mt-3" />

            <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Qual o <b>regime tributário</b> da sua empresa?</span>
            </div>

            <div className="px-3">
                <select name="" id="" onChange={(e) => setRegimeTributario(e.target.value)} value={regimeTributario} className="form-select">
                    <option value="" selected>Escolha...</option>
                    {regimeTributarioOptions.map(elem => (
                        <option value={elem.name}>{elem.name}</option>
                    ))}
                </select>
            </div>

            {regimeTributarioSelected && (
                <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                    {regimeTributarioSelected.description.map(elem => (
                        <span className=" small my-1 ">&#x2022; {elem}</span>
                    ))}
                </div>
            )}

<hr />


            <div className="col-12 my-3 d-flex justify-content-between fadeItem2s">
                <span className="cardAnimation  " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={6}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
                <span className="cardAnimation pulse " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={8}>
                    Próximo <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                </span>
            </div>

        </div >
    )
}





const companyCategories = [
    { shortName: "MEI", name: "Microempreendedor Individual", description: "Empreendedor individual com faturamento anual de até R$ 81 mil." },
    { shortName: "EI", name: "Empresário Individual", description: "Empresa de um único titular sem separação entre bens pessoais e empresariais." },
    { shortName: "SLU", name: "Sociedade Limitada Unipessoal", description: "Empresa de um único sócio, com responsabilidade limitada ao capital social." },
    { shortName: "LTDA", name: "Sociedade Limitada", description: "Empresa com dois ou mais sócios, limitada ao capital social." },
    { shortName: "SA_ABERTO", name: "Sociedade Anônima de Capital Aberto", description: "Empresa com ações negociadas na bolsa de valores." },
    { shortName: "SA_FECHADO", name: "Sociedade Anônima de Capital Fechado", description: "Empresa com ações restritas a um grupo específico de investidores." },
    { shortName: "COOP", name: "Cooperativa", description: "Entidade sem fins lucrativos formada por associados para benefícios comuns." },
    { shortName: "ASSOC", name: "Associação", description: "Organização sem fins lucrativos com objetivos sociais, culturais ou esportivos." },
    { shortName: "FUND", name: "Fundação", description: "Entidade criada para fins sociais, culturais ou assistenciais, sem fins lucrativos." },
    { shortName: "CONS", name: "Consórcio de Empresas", description: "Acordo entre empresas para execução de projetos específicos." },
    { shortName: "SOC_SIMP", name: "Sociedade Simples", description: "Sociedade formada por profissionais que exercem atividades intelectuais." }
];




const regimeTributarioOptions = [
    {
        name: "Simples Nacional",
        description: [
            "Regime simplificado para micro e pequenas empresas com faturamento de até R$ 4,8 milhões/ano.",
            "Tributação unificada em uma única guia (DAS).",
            "Alíquota varia conforme o faturamento e atividade da empresa."
        ]
    },
    {
        name: "Lucro Presumido",
        description: [
            "Regime para empresas com faturamento de até R$ 78 milhões/ano.",
            "Base de cálculo do imposto é presumida sobre a receita bruta, variando conforme o setor.",
            "Pode ter alíquotas menores do que o Lucro Real dependendo da margem de lucro da empresa."
        ]
    },
    {
        name: "Lucro Real",
        description: [
            "Obrigatório para empresas com faturamento acima de R$ 78 milhões/ano.",
            "O imposto é calculado sobre o lucro real da empresa, considerando receitas e despesas.",
            "Geralmente usado por empresas com margens de lucro menores ou com grande volume de despesas dedutíveis."
        ]
    },
    {
        name: "Lucro Arbitrado",
        description: [
            "Regime aplicado quando a empresa não mantém escrituração contábil regular.",
            "A Receita Federal determina arbitrariamente o lucro tributável com base na receita bruta.",
            "Geralmente é utilizado como penalidade para empresas que não cumprem obrigações fiscais."
        ]
    }
];


















const segmentos = [
    {
        setor: "Agropecuária",
        exemplos: ["Agricultura", "Pecuária", "Silvicultura", "Aquicultura"]
    },
    {
        setor: "Comércio",
        exemplos: ["Varejo", "Atacado", "E-commerce", "Importação e Exportação"]
    },
    {
        setor: "Indústria",
        exemplos: [
            "Alimentícia",
            "Automotiva",
            "Têxtil e Vestuário",
            "Química",
            "Metalúrgica",
            "Farmacêutica",
            "Construção Civil"
        ]
    },
    {
        setor: "Serviços",
        exemplos: [
            "Consultoria",
            "Tecnologia da Informação (TI)",
            "Saúde e Bem-Estar",
            "Educação e Treinamento",
            "Turismo e Hospitalidade",
            "Transporte e Logística",
            "Serviços Financeiros"
        ]
    },
    {
        setor: "Setor Imobiliário",
        exemplos: ["Compra e Venda de Imóveis", "Aluguel e Administração de Imóveis", "Construção e Incorporação"]
    },
    {
        setor: "Energia",
        exemplos: ["Geração de Energia Elétrica", "Distribuição de Energia", "Energias Renováveis"]
    },
    {
        setor: "Telecomunicações",
        exemplos: ["Telefonia Fixa e Móvel", "Internet e Provedores de Serviços", "Televisão por Assinatura"]
    },
    {
        setor: "Financeiro",
        exemplos: ["Bancos e Instituições Financeiras", "Corretoras de Valores", "Seguradoras"]
    },
    {
        setor: "Educação",
        exemplos: ["Ensino Básico e Médio", "Ensino Superior", "Cursos Técnicos e Profissionalizantes", "Educação à Distância"]
    },
    {
        setor: "Saúde",
        exemplos: ["Hospitais e Clínicas", "Laboratórios e Diagnósticos", "Farmácias e Drogarias", "Planos de Saúde"]
    },
    {
        setor: "Alimentação",
        exemplos: ["Restaurantes e Bares", "Distribuição de Alimentos", "Produção de Alimentos", "Delivery de Comida"]
    },
    {
        setor: "Entretenimento e Cultura",
        exemplos: ["Produção de Eventos", "Mídia e Publicidade", "Cinemas e Teatros", "Editoras e Livrarias"]
    },
    {
        setor: "Transporte e Logística",
        exemplos: ["Transporte Rodoviário", "Transporte Aéreo", "Transporte Marítimo", "Armazenagem e Distribuição"]
    },
    {
        setor: "Moda",
        exemplos: ["Design de Moda", "Confecção e Produção de Roupas", "Comércio de Roupas e Acessórios"]
    },
    {
        setor: "Setor Público",
        exemplos: ["Administração Pública", "Defesa e Segurança", "Infraestrutura Urbana"]
    },
    {
        setor: "Meio Ambiente",
        exemplos: ["Gestão de Resíduos", "Consultoria Ambiental", "Preservação e Sustentabilidade"]
    },
    {
        setor: "Automotivo",
        exemplos: ["Montadoras de Veículos", "Concessionárias", "Oficinas e Serviços Automotivos"]
    },
    {
        setor: "Comunicação",
        exemplos: ["Agência de Publicidade", "Relações Públicas", "Marketing Digital", "Produção Audiovisual"]
    },
    {
        setor: "Tecnologia",
        exemplos: ["Desenvolvimento de Software", "Hardware e Equipamentos", "Inovação e Startups", "Inteligência Artificial"]
    },
    {
        setor: "Turismo",
        exemplos: ["Agências de Viagem", "Hotéis e Pousadas", "Transporte Turístico", "Guias Turísticos"]
    }
];
