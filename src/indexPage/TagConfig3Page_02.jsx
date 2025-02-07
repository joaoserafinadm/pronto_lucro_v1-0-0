import { faBank, faChevronLeft, faChevronRight, faCircle, faCircleDot, faExclamationCircle, faTag, faWallet, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useEffect, useState } from "react";
import { SpinnerSM } from "../components/loading/Spinners";
import { categories_comercio } from "../categories/categories_comercio";
import { categories_geral } from "../categories/categories_geral";
import { categories_industria } from "../categories/categories_industria";
import { categories_servicos } from "../categories/categories_servicos";
import { set } from "lodash";
import CategoryIcon, { SubCategoryIcon } from "../categories/categoryIcon";



export default function TagConfig3Page_02(props) {

    const token = jwt.decode(Cookie.get('auth'))

    const {
        newSetorName,
        setorSelected,
        companyCategory,
        regimeTributario
    } = props

    const [loadingSave, setLoadingSave] = useState(false)
    const [newCategories, setNewCategories] = useState(false)
    const [incomeCategories, setIncomeCategories] = useState([])
    const [expenseCategories, setExpenseCategories] = useState([])
    const [saveError, setSaveError] = useState('')

    useEffect(() => {

        if (setorSelected) {
            if (setorSelected === "Comércio") {
                setIncomeCategories(categories_comercio().incomeCategories)
                setExpenseCategories(categories_comercio().expenseCategories)
            } else if (setorSelected === "Serviços") {
                setIncomeCategories(categories_servicos().incomeCategories)
                setExpenseCategories(categories_servicos().expenseCategories)
            } else if (setorSelected === "Indústria") {
                setIncomeCategories(categories_industria().incomeCategories)
                setExpenseCategories(categories_industria().expenseCategories)
            } else if (setorSelected === "Outro") {
                setIncomeCategories(categories_geral().incomeCategories)
                setExpenseCategories(categories_geral().expenseCategories)
            }
        }

    }, [setorSelected])


    const handleTagsSave = async () => {

        const body = {
            user_id: token.sub,
            setorSelected: setorSelected,
            newSetorName: newSetorName,
            incomeCategories: newCategories ? [] : incomeCategories,
            expenseCategories: newCategories ? [] : expenseCategories,
            companyCategory: companyCategory,
            regimeTributario: regimeTributario
        }

        setLoadingSave(true)

        await axios.post(`/api/indexPage/newCategories`, body)
            .then(res => {
                setLoadingSave(false)
                var myCarousel = document.querySelector('#tutorialPages');
                var carousel = new bootstrap.Carousel(myCarousel);
                carousel.to(9);
            }).catch(e => {
                setLoadingSave(false)
                setSaveError("Houve um problema ao salvar. Por favor, verifique a conexão e tente novamente.");
                console.log(e)
            })


    }

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">Categorias sugeridas</span>
            </div>
            <hr />
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <div className="col-12 col-sm-6 my-1 px-3">
                    <span className="bold text-c-secondary fs-5">{newSetorName}</span>
                    <div className={`card   shadow border-selected`} >
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center align-items-center">
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                        <img src={setorSelected === "Indústria" ? "INDUSTRIA_ICON.png" : setorSelected === "Comércio" ? "COMERCIO_ICON.png" : setorSelected === "Serviços" ? "SERVICOS_ICON.png" : "OUTROS_ICON.png"} alt="Outro" className="w-100" />
                                    </div>
                                    <span className="bold ms-3 fs-5 text-c-secondary">{setorSelected}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Com base no setor escolhido, sugerimos categorias de <b className="text-c-success">receitas</b> e <b className="text-c-danger">despesas</b> para facilitar o <b>controle financeiro</b>.</span>
            </div>
            <div className="col-12 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Você pode configurar todas as categorias acessando a página <b className="fw-bold"><FontAwesomeIcon icon={faTag} className="small" /> Categorias</b>.</span>
            </div>
            <div className="col-12 mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="col-12 fadeItem1s d-flex flex-column">
                            <span className="bold fs-5 my-1">
                                Categorias de <b className="text-c-success">receitas</b>:
                            </span>
                        </div>
                        <div className="col-12 fadeItem1s d-flex flex-column">
                            {incomeCategories?.map((elem, index) => (
                                <div key={index} className="row my-2">
                                    <div className="col-12 d-flex my-1 align-items-center">
                                        <CategoryIcon color={elem.color} />
                                        {/* <div style={{ backgroundColor: elem.color, height: "15px", width: "15px" }} className="rounded-circle me-2"></div> */}
                                        <span className="bold">{elem.categoryName}</span>
                                    </div>
                                    {elem.subCategories?.map((elem1, index) => (
                                        <div className="col-12 d-flex my-1 align-items-center">
                                            <SubCategoryIcon color={elem.color} />
                                            {/* <div style={{ height: "10px", width: "10px", border: `2px solid ${elem.color}` }} className="rounded-circle ms-2 me-2"></div> */}
                                            <span>{elem1.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mt-2">
                <div className="card">
                    <div className="card-body">
                        <div className="col-12 fadeItem1s d-flex flex-column">
                            <span className="bold fs-5 my-1">
                                Categorias de <b className="text-c-danger">despesas</b>:
                            </span>
                        </div>
                        <div className="col-12 fadeItem1s d-flex flex-column">
                            {expenseCategories?.map((elem, index) => (
                                <div key={index} className="row my-2">
                                    <div className="col-12 d-flex my-1 align-items-center">
                                        <CategoryIcon color={elem.color} />
                                        {/* <div style={{ backgroundColor: elem.color, height: "15px", width: "15px" }} className="rounded-circle me-2"></div> */}
                                        <span className="bold">{elem.categoryName}</span>
                                    </div>
                                    {elem.subCategories?.map((elem1, index) => (
                                        <div className="col-12 d-flex my-1 align-items-center">
                                            <SubCategoryIcon color={elem.color} />
                                            {/* <div style={{ height: "10px", width: "10px", border: `2px solid ${elem.color}` }} className="rounded-circle ms-2 me-2"></div> */}
                                            <span className="">{elem1.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 col-12">
                <div className="alert alert-success">
                    <span>

                        <FontAwesomeIcon icon={faExclamationCircle} className="me-2" /> <b>Atenção!</b> Caso queira editar, adicionar ou excluir qualquer categoria ou subcategoria, basta acessar a página <b className="fw-bold"><FontAwesomeIcon icon={faTag} className="small" /> Categorias</b>.
                    </span>
                </div>

            </div>
            <div className="my-4 col-12">
                <div className="form-check">

                    <input type="checkbox" className="form-check-input" id="newCategoriesCheck" />
                    <label htmlFor="newCategoriesCheck" className="form-check-label bold" onClick={() => setNewCategories(!newCategories)} checked={newCategories}>
                        Essas categorias não se encaixam no meu negócio, quero adicionar manuamente.
                    </label>
                </div>
                {newCategories && (
                    <div className="alert alert-danger fadeItem">
                        <span>
                            <span className="small  "> <FontAwesomeIcon icon={faWarning} className="me-2" /><b>Atenção!</b> Ao marcar esta opção, sua página de categorias ficará em branco e você deverá adicionar categorias manualmente.</span>
                        </span>
                    </div>
                )}

            </div>


            <hr />
            <div className="col-12 my-3 d-flex justify-content-between fadeItem2s">
                <span className="cardAnimation  " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={7}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
                <span className="cardAnimation pulse " type="button" onClick={() => handleTagsSave(token.sub)}>
                    {loadingSave ?
                        <SpinnerSM className="mx-3 text-secondary" />
                        :
                        <>
                            Próximo < FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                        </>
                    }
                </span>
            </div>
        </div>
    )
}