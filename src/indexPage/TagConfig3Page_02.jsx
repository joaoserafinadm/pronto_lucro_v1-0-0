import { faBank, faChevronLeft, faChevronRight, faCircle, faCircleDot, faExclamationCircle, faTag, faWallet, faWarning, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
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
import tippy from 'tippy.js';

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
    const [incomeCategories, setIncomeCategories] = useState(categories_geral().incomeCategories)
    const [expenseCategories, setExpenseCategories] = useState(categories_geral().expenseCategories)
    const [saveError, setSaveError] = useState('')
    
    // Estados para controlar quais categorias/subcategorias estão selecionadas
    const [selectedIncomeCategories, setSelectedIncomeCategories] = useState({})
    const [selectedExpenseCategories, setSelectedExpenseCategories] = useState({})

    // Inicializar tooltips quando as categorias mudarem
    useEffect(() => {
        // Configurar tooltips para elementos obrigatórios
        const tooltipElements = document.querySelectorAll('[data-tippy-content]');
        tooltipElements.forEach(element => {
            tippy(element, {
                theme: 'light',
                placement: 'top',
                arrow: true,
                animation: 'fade',
                delay: [200, 0]
            });
        });
        
        // Cleanup tooltips on unmount
        return () => {
            tooltipElements.forEach(element => {
                if (element._tippy) {
                    element._tippy.destroy();
                }
            });
        };
    }, [incomeCategories, expenseCategories, selectedIncomeCategories, selectedExpenseCategories]);

    // Inicializar seleções quando as categorias mudarem
    useEffect(() => {
        // Inicializar todas as categorias de receita como selecionadas
        const initialIncomeSelection = {}
        incomeCategories.forEach(category => {
            initialIncomeSelection[category._id] = {
                selected: true,
                subCategories: {}
            }
            category.subCategories?.forEach(subCat => {
                initialIncomeSelection[category._id].subCategories[subCat._id] = true
            })
        })
        setSelectedIncomeCategories(initialIncomeSelection)

        // Inicializar todas as categorias de despesa como selecionadas
        const initialExpenseSelection = {}
        expenseCategories.forEach(category => {
            initialExpenseSelection[category._id] = {
                selected: true,
                subCategories: {}
            }
            category.subCategories?.forEach(subCat => {
                initialExpenseSelection[category._id].subCategories[subCat._id] = true
            })
        })
        setSelectedExpenseCategories(initialExpenseSelection)
    }, [incomeCategories, expenseCategories])

    // Função para alternar seleção de categoria (e suas subcategorias)
    const toggleCategorySelection = (categoryId, isIncome) => {
        if (isIncome) {
            setSelectedIncomeCategories(prev => {
                const newSelection = { ...prev }
                const isCurrentlySelected = newSelection[categoryId]?.selected
                
                newSelection[categoryId] = {
                    ...newSelection[categoryId],
                    selected: !isCurrentlySelected
                }
                
                // Selecionar/deselecionar todas as subcategorias
                const category = incomeCategories.find(cat => cat._id === categoryId)
                if (category?.subCategories) {
                    category.subCategories.forEach(subCat => {
                        newSelection[categoryId].subCategories[subCat._id] = !isCurrentlySelected
                    })
                }
                
                return newSelection
            })
        } else {
            setSelectedExpenseCategories(prev => {
                const newSelection = { ...prev }
                const isCurrentlySelected = newSelection[categoryId]?.selected
                
                newSelection[categoryId] = {
                    ...newSelection[categoryId],
                    selected: !isCurrentlySelected
                }
                
                // Selecionar/deselecionar todas as subcategorias
                const category = expenseCategories.find(cat => cat._id === categoryId)
                if (category?.subCategories) {
                    category.subCategories.forEach(subCat => {
                        newSelection[categoryId].subCategories[subCat._id] = !isCurrentlySelected
                    })
                }
                
                return newSelection
            })
        }
    }

    // Função para alternar seleção de subcategoria
    const toggleSubCategorySelection = (categoryId, subCategoryId, isIncome) => {
        if (isIncome) {
            setSelectedIncomeCategories(prev => {
                const newSelection = { ...prev }
                newSelection[categoryId].subCategories[subCategoryId] = !newSelection[categoryId].subCategories[subCategoryId]
                
                // A categoria se mantém selecionada independentemente das subcategorias
                // Ela só é desmarcada se o usuário desmarcar explicitamente
                
                return newSelection
            })
        } else {
            setSelectedExpenseCategories(prev => {
                const newSelection = { ...prev }
                newSelection[categoryId].subCategories[subCategoryId] = !newSelection[categoryId].subCategories[subCategoryId]
                
                // A categoria se mantém selecionada independentemente das subcategorias
                // Ela só é desmarcada se o usuário desmarcar explicitamente
                
                return newSelection
            })
        }
    }

    // Função para filtrar categorias selecionadas
    const getFilteredCategories = (categories, selectedCategories) => {
        return categories.filter(category => 
            category.fixed || // Incluir categorias obrigatórias sempre
            selectedCategories[category._id]?.selected || 
            Object.values(selectedCategories[category._id]?.subCategories || {}).some(selected => selected)
        ).map(category => ({
            ...category,
            subCategories: category.subCategories?.filter(subCat => 
                subCat.fixed || // Incluir subcategorias obrigatórias sempre
                selectedCategories[category._id]?.subCategories[subCat._id]
            ) || []
        }))
    }

    const handleTagsSave = async () => {
        const fixedCategories = expenseCategories.filter(elem => elem?._id === '8')

        // Filtrar apenas as categorias e subcategorias selecionadas
        const filteredIncomeCategories = newCategories ? [] : getFilteredCategories(incomeCategories, selectedIncomeCategories)
        const filteredExpenseCategories = newCategories ? fixedCategories : getFilteredCategories(expenseCategories, selectedExpenseCategories)

        const body = {
            user_id: token.sub,
            setorSelected: setorSelected,
            newSetorName: newSetorName,
            incomeCategories: filteredIncomeCategories,
            expenseCategories: filteredExpenseCategories,
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
                    <div className={`card shadow border-selected`} >
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
                <span className="fs-6 fs-md-5 my-1">Com base no setor escolhido, sugerimos categorias de <b className="text-c-success">receitas</b> e <b className="text-c-danger">despesas</b> para facilitar o <b>controle financeiro</b>.</span>
            </div>
            <div className="col-12 fadeItem1s d-flex flex-column">
                <span className="fs-6 fs-md-5 my-1">Selecione as categorias que deseja manter. Você pode configurar todas as categorias acessando a página <b className="fw-bold"><FontAwesomeIcon icon={faTag} className="small" /> Categorias</b>.</span>
            </div>
            
            {!newCategories && (
                <>
                    <div className="col-12 mt-3">
                        <div className="card">
                            <div className="card-body p-2 p-md-3">
                                <div className="col-12 fadeItem1s d-flex flex-column">
                                    <span className="bold fs-6 fs-md-5 my-1">
                                        Categorias de <b className="text-c-success">receitas</b>:
                                    </span>
                                </div>
                                <div className="col-12 fadeItem1s d-flex flex-column">
                                    {incomeCategories?.map((elem, index) => (
                                        <div key={index} className="border-bottom pb-2 pb-md-3 mb-2 mb-md-3">
                                            <div className="d-flex align-items-center mb-2 flex-wrap">
                                                <div className="d-flex align-items-center flex-grow-1 mb-1 mb-md-0">
                                                    <input 
                                                        type="checkbox" 
                                                        className="form-check-input me-2 me-md-3"
                                                        style={{ transform: 'scale(1.1)', transformOrigin: 'left' }}
                                                        checked={selectedIncomeCategories[elem._id]?.selected || false}
                                                        onChange={() => toggleCategorySelection(elem._id, true)}
                                                        disabled={elem.fixed}
                                                        id={`income-category-${elem._id}`}
                                                    />
                                                    <CategoryIcon color={elem.color} />
                                                    <label 
                                                        htmlFor={`income-category-${elem._id}`}
                                                        className="bold ms-2 fs-6 cursor-pointer user-select-none"
                                                        style={{ cursor: elem.fixed ? 'default' : 'pointer' }}
                                                    >
                                                        {elem.categoryName}
                                                    </label>
                                                </div>
                                                {elem.fixed && (
                                                    <FontAwesomeIcon 
                                                        icon={faInfoCircle} 
                                                        className="text-warning ms-2" 
                                                        style={{ fontSize: '14px' }}
                                                        data-tippy-content="Esta categoria é obrigatória e não pode ser removida"
                                                    />
                                                )}
                                            </div>
                                            
                                            {elem.subCategories && elem.subCategories.length > 0 && (
                                                <div className="ms-3 ms-md-5">
                                                    {elem.subCategories.map((elem1, subIndex) => (
                                                        <div key={subIndex} className="d-flex align-items-center mb-1 py-1 flex-wrap">
                                                            <div className="d-flex align-items-center flex-grow-1 mb-1 mb-md-0">
                                                                <input 
                                                                    type="checkbox" 
                                                                    className="form-check-input me-2 me-md-3"
                                                                    checked={selectedIncomeCategories[elem._id]?.subCategories[elem1._id] || false}
                                                                    onChange={() => toggleSubCategorySelection(elem._id, elem1._id, true)}
                                                                    disabled={elem1.fixed}
                                                                    id={`income-subcategory-${elem._id}-${elem1._id}`}
                                                                />
                                                                <SubCategoryIcon color={elem.color} />
                                                                <label 
                                                                    htmlFor={`income-subcategory-${elem._id}-${elem1._id}`}
                                                                    className="ms-2 text-muted small cursor-pointer user-select-none"
                                                                    style={{ cursor: elem1.fixed ? 'default' : 'pointer' }}
                                                                >
                                                                    {elem1.name}
                                                                </label>
                                                            </div>
                                                            {elem1.fixed && (
                                                                <FontAwesomeIcon 
                                                                    icon={faInfoCircle} 
                                                                    className="text-warning ms-2" 
                                                                    style={{ fontSize: '12px' }}
                                                                    data-tippy-content="Esta subcategoria é obrigatória e não pode ser removida"
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-12 mt-2">
                        <div className="card">
                            <div className="card-body p-2 p-md-3">
                                <div className="col-12 fadeItem1s d-flex flex-column">
                                    <span className="bold fs-6 fs-md-5 my-1">
                                        Categorias de <b className="text-c-danger">despesas</b>:
                                    </span>
                                </div>
                                <div className="col-12 fadeItem1s d-flex flex-column">
                                    {expenseCategories?.map((elem, index) => (
                                        <div key={index} className="border-bottom pb-2 pb-md-3 mb-2 mb-md-3">
                                            <div className="d-flex align-items-center mb-2 flex-wrap">
                                                <div className="d-flex align-items-center flex-grow-1 mb-1 mb-md-0">
                                                    <input 
                                                        type="checkbox" 
                                                        className="form-check-input me-2 me-md-3"
                                                        style={{ transform: 'scale(1.1)', transformOrigin: 'left' }}
                                                        checked={selectedExpenseCategories[elem._id]?.selected || false}
                                                        onChange={() => toggleCategorySelection(elem._id, false)}
                                                        disabled={elem.fixed || elem._id === '8'}
                                                        id={`expense-category-${elem._id}`}
                                                    />
                                                    <CategoryIcon color={elem.color} />
                                                    <label 
                                                        htmlFor={`expense-category-${elem._id}`}
                                                        className="bold ms-2 fs-6 cursor-pointer user-select-none"
                                                        style={{ cursor: (elem.fixed || elem._id === '8') ? 'default' : 'pointer' }}
                                                    >
                                                        {elem.categoryName}
                                                    </label>
                                                </div>
                                                {(elem.fixed || elem._id === '8') && (
                                                    <FontAwesomeIcon 
                                                        icon={faInfoCircle} 
                                                        className="text-warning ms-2" 
                                                        style={{ fontSize: '14px' }}
                                                        data-tippy-content="Esta categoria é obrigatória e não pode ser removida"
                                                    />
                                                )}
                                            </div>
                                            
                                            {elem.subCategories && elem.subCategories.length > 0 && (
                                                <div className="ms-3 ms-md-5">
                                                    {elem.subCategories.map((elem1, subIndex) => (
                                                        <div key={subIndex} className="d-flex align-items-center mb-1 py-1 flex-wrap">
                                                            <div className="d-flex align-items-center flex-grow-1 mb-1 mb-md-0">
                                                                <input 
                                                                    type="checkbox" 
                                                                    className="form-check-input me-2 me-md-3"
                                                                    checked={selectedExpenseCategories[elem._id]?.subCategories[elem1._id] || false}
                                                                    onChange={() => toggleSubCategorySelection(elem._id, elem1._id, false)}
                                                                    disabled={elem1.fixed}
                                                                    id={`expense-subcategory-${elem._id}-${elem1._id}`}
                                                                />
                                                                <SubCategoryIcon color={elem.color} />
                                                                <label 
                                                                    htmlFor={`expense-subcategory-${elem._id}-${elem1._id}`}
                                                                    className="ms-2 text-muted small cursor-pointer user-select-none"
                                                                    style={{ cursor: elem1.fixed ? 'default' : 'pointer' }}
                                                                >
                                                                    {elem1.name}
                                                                </label>
                                                            </div>
                                                            {elem1.fixed && (
                                                                <FontAwesomeIcon 
                                                                    icon={faInfoCircle} 
                                                                    className="text-warning ms-2" 
                                                                    style={{ fontSize: '12px' }}
                                                                    data-tippy-content="Esta subcategoria é obrigatória e não pode ser removida"
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            
            <div className="mt-4 col-12">
                <div className="alert alert-success">
                    <span>
                        <FontAwesomeIcon icon={faExclamationCircle} className="me-2" /> <b>Atenção!</b> Caso queira editar, adicionar ou excluir qualquer categoria ou subcategoria, basta acessar a página <b className="fw-bold"><FontAwesomeIcon icon={faTag} className="small" /> Categorias</b>.
                    </span>
                </div>
            </div>
            
            <div className="my-4 col-12">
                <div className="form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="newCategoriesCheck" 
                        checked={newCategories}
                        onChange={() => setNewCategories(!newCategories)}
                    />
                    <label htmlFor="newCategoriesCheck" className="form-check-label bold">
                        Essas categorias não se encaixam no meu negócio, quero adicionar manualmente.
                    </label>
                </div>
                {newCategories && (
                    <div className="alert alert-danger fadeItem">
                        <span>
                            <span className="small"> <FontAwesomeIcon icon={faWarning} className="me-2" /><b>Atenção!</b> Ao marcar esta opção, serão adicionadas somente as categorias abaixo (obrigatórias).</span>
                        </span>
                        <div className="card">
                            <div className="card-body p-3">
                                {expenseCategories.filter(elem => elem?._id === '8').map((elem, index) => (
                                    <div key={index} className="border-bottom pb-3 mb-3 last:border-bottom-0 last:pb-0 last:mb-0">
                                        <div className="d-flex align-items-center mb-2">
                                            <CategoryIcon color={elem.color} />
                                            <span className="bold ms-2 fs-6">{elem.categoryName}</span>
                                            <FontAwesomeIcon 
                                                icon={faInfoCircle} 
                                                className="text-warning ms-2" 
                                                style={{ fontSize: '14px' }}
                                                data-tippy-content="Esta categoria é obrigatória e não pode ser removida"
                                            />
                                        </div>
                                        
                                        {elem.subCategories && elem.subCategories.length > 0 && (
                                            <div className="ms-4">
                                                {elem.subCategories.map((elem1, subIndex) => {
                                                    if (elem1.fixed) return (
                                                        <div key={subIndex} className="d-flex align-items-center mb-1 py-1">
                                                            <div className="d-flex align-items-center flex-grow-1 mb-1 mb-md-0">

                                                            <SubCategoryIcon color={elem.color} />
                                                            <span className="ms-2 text-muted">{elem1.name}</span>
                                                            </div>
                                                            <FontAwesomeIcon 
                                                                icon={faInfoCircle} 
                                                                className="text-warning ms-2" 
                                                                style={{ fontSize: '12px' }}
                                                                data-tippy-content="Esta subcategoria é obrigatória e não pode ser removida"
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <hr />
            <div className="col-12 my-3 d-flex justify-content-between align-items-center fadeItem2s flex-column flex-md-row gap-2 gap-md-0">
                <span className="cardAnimation order-2 order-md-1" type="button" data-bs-target="#tutorialPages" data-bs-slide-to={7}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
                <span className="cardAnimation pulse order-1 order-md-2" type="button" onClick={() => handleTagsSave(token.sub)}>
                    {loadingSave ?
                        <SpinnerSM className="mx-3 text-secondary" />
                        :
                        <>
                            Próximo <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                        </>
                    }
                </span>
            </div>
        </div>
    )
}