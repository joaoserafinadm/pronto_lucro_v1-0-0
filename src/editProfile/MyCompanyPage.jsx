import axios from "axios"
import { maskCep, maskCnpj } from "../../utils/mask"
import CropperImageModal from "../companyEdit/CropperImageModal"
import EstadosList from "../components/estadosList"
import Setores from "../components/Setores/Setores"
import StyledDropzone from "../components/styledDropzone/StyledDropzone"
import { useEffect } from "react"




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
        setOutroSetorSec
    } = props


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

            <hr className="d-none d-lg-block" />


        </>
    )
}