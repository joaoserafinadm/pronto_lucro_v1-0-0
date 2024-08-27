import { faBank, faChevronLeft, faChevronRight, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";




export default function TagConfig2Page(props) {

    const { setorSelected, setSetorSelected } = props





    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">Escolha seu Setor</span>
            </div>
            <hr />
            <div className="col-12 my-3 d-flex justify-content-between fadeItem2s">
                <span className="cardAnimation  " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={6}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
            </div>
            <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Escolha o setor que melhor se encaixa na sua empresa:</span>
            </div>
            <hr />
            {segmentos.map(elem => (
                <div className="col-12 my-1 px-3">
                    <span type='button' className={`card cardAnimation ${setorSelected?.setor === elem.setor ? 'border-success border border-2 shadow' : ''}`} onClick={() => setSetorSelected(elem)} data-bs-target="#tutorialPages" data-bs-slide-to={8}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <span className="bold">{elem.setor}</span>
                                </div>
                                <div className="col-12">
                                    {elem.exemplos.map(exemplo => (
                                        <>
                                            <span className="small">&#x2022; {exemplo}</span><br />
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
            ))}
            <div className="mt-5"></div>

        </div>
    )
}


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
