import axios from "axios"
import { maskCep, maskCnpj } from "../../utils/mask"
import CropperImageModal from "../companyEdit/CropperImageModal"
import EstadosList from "../components/estadosList"
import Setores from "../components/Setores/Setores"
import StyledDropzone from "../components/styledDropzone/StyledDropzone"
import { useEffect, useState } from "react"




export default function MyCompanyPage(props) {

    const {
        companyName,
        setCompanyName,
        companyLogo,
        setCompanyLogo,
        cnpjPrincipal,
        setCnpjPrincipal,
        companyCep,
        setCompanyCep,
        companyBairro,
        setCompanyBairro,
        companyLogradouro,
        setCompanyLogradouro,
        companyNumero,
        setCompanyNumero,
        companyCidade,
        setCompanyCidade,
        companyEstado,
        setCompanyEstado,
        selectCompanyFile,
        setSelectCompanyFile,
        logoImageUrlReview,
        setlogoImageUrlReview,
        setorPrimario,
        setSetorPrimario,
        setorSecundario,
        setSetorSecundario,
        outroSetorSec,
        setOutroSetorSec,
        companyCategory,
        setCompanyCategory,
        regimeTributario,
        setRegimeTributario
    } = props

    const [regimeTributarioSelected, setRegimeTributarioSelected] = useState(null);



    const handleFileChange = file => {


        if (file) {
            setSelectCompanyFile(URL.createObjectURL(file))
            setTimeout(() => {
                var modal = document.getElementById('cropperLogoModal')
                var cropperModal = new bootstrap.Modal(modal)
                cropperModal.show()
            }, 20)
        } else {
            return
        }
    }

    const onBlurCep = (event) => {

        const { value } = event.target

        const cep = value?.replace(/[^0-9]/g, '');

        if (cep?.length !== 8) {
            return;
        }

        axios.get(`https://viacep.com.br/ws/${value}/json/`)
            .then(res => {

                const data = res.data

                setCompanyLogradouro(data.logradouro)
                setCompanyCidade(data.localidade)
                setCompanyEstado(data.uf)
                setCompanyBairro(data.bairro)
            })
    }

    useEffect(() => {

        setSetorSecundario('')

    }, [setorPrimario])

    useEffect(() => {

        setOutroSetorSec('')

    }, [setorSecundario])

    useEffect(() => {

        if (regimeTributario) {
            const regimeExist = regimeTributarioOptions.find(elem => elem.name === regimeTributario)

            console.log("regimeExist", regimeExist)
            if (regimeExist) {
                setRegimeTributarioSelected(regimeExist)
            }

        }
    }, [regimeTributario])

    const handleCategorySelect = (id) => {
        const categoryExist = companyCategories.find(elem => elem.shortName === id);

        
        if (categoryExist) {
            const categoryData = companyCategories.find((elem) => elem.shortName === id);
            console.log("categoryData", categoryData)
            setCompanyCategory(categoryData);
        } else {
            return
        }
    }


    return (
        <>

            <CropperImageModal id={'cropperLogoModal'} selectFile={selectCompanyFile} setResult={value => setlogoImageUrlReview(value)} />



            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between mb-3">
                        <input type="file" name="image/*" id="logoItem" accept="image/*" onChange={e => handleFileChange(e.target.files[0])}
                            className="form-input" hidden />
                        <label className=" fw-bold">Logo da empresa</label>
                        <label htmlFor="logoItem" className="span" type='button'>Editar</label>
                    </div>
                    <StyledDropzone setFiles={array => { handleFileChange(array[0]) }} img>
                        <div className="row d-flex justify-content-center align-items-center" >

                            <div className="col-12 d-flex justify-content-center align-items-center" >
                                {logoImageUrlReview ?
                                    <img src={logoImageUrlReview} alt="logo" id="logoItem" className="logoEdit fadeItem" />
                                    :
                                    <>
                                        {companyLogo ?
                                            <img src={companyLogo} alt="logo" id="logoItem" className="logoEdit fadeItem" />
                                            :
                                            <div className="col-12 d-flex justify-content-center align-items-center flex-column py-5 text-center fadeItem bg-light   rounded" style={{ border: '1px dashed #ccc' }}>
                                                <span>
                                                    Clique aqui ou arraste o arquivo
                                                </span>
                                                <span className="small">
                                                    Permitido apenas um arquivo. Formato: .PNG, .JPG
                                                </span>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </StyledDropzone>
                </div>
            </div>
            <div className="row mt-3">
                <label for="companyNameInput" className="form-label fw-bold">Identificação*</label>
                <div className="col-12 col-lg-7 my-2">
                    <label for="companyNameInput" className=" ">Nome da empresa*</label>
                    <input type="text" className="form-control" id="companyNameInput" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="" />
                </div>
                <div className="col-12 col-lg-5 my-2">
                    <label for="cnpjPrincipalInput" className=" ">CNPJ Principal*</label>
                    <input type="text" className="form-control" id="cnpjPrincipalInput" value={maskCnpj(cnpjPrincipal)} onChange={e => setCnpjPrincipal(e.target.value)} placeholder="00.000.000/0000-0" />
                </div>
            </div>
            <div className="row mt-3">
                <label for="cepInput" className="form-label fw-bold">Localização</label>
                <div className="col-12 col-lg-3 my-2">
                    <label for="cepInput" className=" ">CEP</label>
                    <input type="text" className="form-control" id="cepInput" value={maskCep(companyCep)} onChange={e => setCompanyCep(e.target.value)} onBlur={e => onBlurCep(e)} placeholder="00000-000" />
                </div>
                <div className="col-12 col-lg-7 my-2">
                    <label for="companyLogradouroInput" className=" ">Logradouro</label>
                    <input type="text" className="form-control" id="companyLogradouroInput" value={companyLogradouro} onChange={e => setCompanyLogradouro(e.target.value)} placeholder="" />
                </div>
                <div className="col-12 col-lg-2 my-2">
                    <label for="companyNumeroInput" className=" ">Número</label>
                    <input type="text" className="form-control" id="companyNumeroInput" value={companyNumero} onChange={e => setCompanyNumero(e.target.value)} placeholder="" />
                </div>
                <div className="col-12 col-lg-4 my-2">
                    <label for="companyBairroInput" className=" ">Bairro</label>
                    <input type="text" className="form-control" id="companyBairroInput" value={companyBairro} onChange={e => setCompanyBairro(e.target.value)} placeholder="" />
                </div>
                <div className="col-12 col-lg-6 my-2">
                    <label for="companyCidadeInput" className=" ">Cidade</label>
                    <input type="text" className="form-control" id="companyCidadeInput" value={companyCidade} onChange={e => setCompanyCidade(e.target.value)} placeholder="" />
                </div>
                <div className="col-12 col-lg-2 my-2">
                    <label for="companyEstadoItem" className=" ">Estado</label>
                    <select name="companyEstadoItem" className="form-select" value={companyEstado} onChange={e => setCompanyEstado(e.target.value)} placeholder="UF" id="companyEstadoItem">
                        <EstadosList />
                    </select>
                </div>
            </div>
            <div className="row mt-4 d-flex ">
                <label for="telefoneItem" className="form-label fw-bold">Setor*</label>
                <small className="text-secondary">Escolha o(s) setor(es) da sua empresa para que a nossa IA possa te fornecer análises mais precisas.</small>
                <div className=" col-12 col-xl-6 mt-3">
                    <Setores
                        setorPrimario={setorPrimario}
                        setorSecundario={setorSecundario}
                        outroSetorSec={outroSetorSec}
                        setSetorPrimario={value => setSetorPrimario(value)}
                        setSetorSecundario={value => setSetorSecundario(value)}
                        setOutroSetorSec={value => setOutroSetorSec(value)}
                        className="mb-0" />
                    {/* <small className='text-danger error_font_size'>{setorError}</small> */}
                </div>

            </div>

            <div className="row mt-4 d-flex ">
                <label for="telefoneItem" className="form-label fw-bold">Categoria da empresa</label>
                <div className=" col-12 col-xl-6 mt-3">
                    <select name="" id="" onChange={(e) => handleCategorySelect(e.target.value)} value={companyCategory.shortName} className="form-select">
                        <option value="" disabled >Escolha...</option>
                        {companyCategories.map(elem => (
                            <option value={elem.shortName}>{elem.name}</option>
                        ))}
                    </select>
                </div>

            </div>
            {companyCategory?.description && (
                <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                    <span className=" small my-1 ">&#x2022; {companyCategory.description}</span>
                </div>
            )}
            <div className="row mt-4 d-flex ">
                <label for="telefoneItem" className="form-label fw-bold">Regime tributário</label>
                <div className=" col-12 col-xl-6 mt-3">

                    <select name="" id="" onChange={(e) => setRegimeTributario(e.target.value)} value={regimeTributario} className="form-select">
                        <option value="" disabled >Escolha...</option>
                        {regimeTributarioOptions.map(elem => (
                            <option value={elem.name}>{elem.name}</option>
                        ))}
                    </select>

                </div>
            </div>

            {regimeTributarioSelected && (
                <div className="row">

                    <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                        {regimeTributarioSelected.description.map(elem => (
                            <span className=" small my-1 ">&#x2022; {elem}</span>
                        ))}
                    </div>
                </div>
            )}

            <hr className="d-none d-lg-block" />


        </>
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
    { shortName: "SOC_SIMP", name: "Sociedade Simples", description: "Sociedade formada por profissionais que exercem atividades intelectuais." },
    { shortName: "OUTRA", name: "Outra categoria", description: "" }
];



const regimeTributarioOptions = [

    {
        name: "Microempreendedor Individual (MEI)",
        description: [
            "Regime simplificado para pequenos empreendedores com faturamento anual de até R$ 81 mil.",
            "Pagamento de tributos fixos mensais reduzidos (DAS-MEI), incluindo INSS, ISS e ICMS.",
            "Não pode ter mais de um empregado registrado.",
            "Não permite a participação como sócio, titular ou administrador de outra empresa."
        ]
    },
    {
        name: "Simples Nacional",
        description: [
            "Regime simplificado para micro e pequenas empresas com faturamento de até R$ 4,8 milhões/ano.",
            "Tributação unificada em uma única guia (DAS).",
            "Alíquota varia conforme o faturamento e atividade da empresa."
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
        name: "Lucro Presumido",
        description: [
            "Regime para empresas com faturamento de até R$ 78 milhões/ano.",
            "Base de cálculo do imposto é presumida sobre a receita bruta, variando conforme o setor.",
            "Pode ter alíquotas menores do que o Lucro Real dependendo da margem de lucro da empresa."
        ]
    },
    
];