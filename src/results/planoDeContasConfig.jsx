import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryIcon from "../categories/categoryIcon";
import { useStateContext } from "./context/resultsContext";
import { faEdit, faShuffle, faTrash } from "@fortawesome/free-solid-svg-icons";
import tippy from "tippy.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import { SpinnerSM } from "../components/loading/Spinners";

export default function PlanoDeContasConfig(props) {

    const token = jwt.decode(Cookie.get("auth"));

    const { dataFunction, setPlanoDeContasEdit } = props


    const { incomeCategories, expenseCategories, planoDeContasConfig } = useStateContext();

    const [planoDeContasDelete, setPlanoDeContasDelete] = useState(null);
    const [deleteError, setDeleteError] = useState('');
    const [loadingDelete, setLoadingDelete] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            tippyFunction();
        }, 700);
    }, []);

    const tippyFunction = () => {
        tippy('#editPlanoDeContasBtn', { content: 'Editar', placement: 'bottom' });
        tippy('#deletePlanoDeContasBtn', { content: 'Deletar', placement: 'bottom' });
        tippy('#shufflePlanoDeContasBtn', { content: 'Ordenar categorias', placement: 'bottom' });
    };

    // Verifica se todas as categorias já estão alocadas
    const todasCategoriasAlocadas = incomeCategories.every(cat =>
        planoDeContasConfig.some(config => config.selectedCategories.includes(cat._id))
    ) && expenseCategories.every(cat =>
        planoDeContasConfig.some(config => config.selectedCategories.includes(cat._id))
    );


    const handleDeletePlanoDeContas = async (id) => {

        setLoadingDelete(true);

        await axios.delete(`/api/results/planoDeContas`, {
            params: {
                user_id: token.sub,
                id: id
            }
        }).then(res => {
            setLoadingDelete(false);
            setPlanoDeContasDelete(null);
            dataFunction(token.sub);
        }).catch(e => {
            console.log(e);
            setDeleteError("Houve um problema ao deletar. Por favor, verifique a conexão e tente novamente.");
            setLoadingDelete(false);
            setPlanoDeContasDelete(null);
        })


    }

    return (
        <>

            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-c-outline-secondary" data-bs-target="#planoDeContasConfigCarousel" data-bs-slide-to={3}>
                        <FontAwesomeIcon icon={faShuffle} /> Ordenar Resultados
                    </button>
                </div>
            </div>
            {planoDeContasConfig.length > 0 && planoDeContasConfig.map((elem, index) => (
                <div className="card my-2" key={index}>
                    <div className="card-body">
                        <div className="row">
                            <span className="small fw-bold mb-2">{elem.resultName}</span>
                        </div>
                        {elem.selectedCategories.map((catId, i) => {
                            const incomeCategory = incomeCategories.find(category => category._id === catId);
                            const expenseCategory = expenseCategories.find(category => category._id === catId);

                            if (incomeCategory) {
                                return (
                                    <div className="d-flex align-items-center my-1" key={i}>
                                        <span className="bold me-2 text-c-success">(+)</span>
                                        <div className="d-flex align-items-center">
                                            <CategoryIcon color={incomeCategory.color} />
                                            <span className="bold text-muted ms-1">{incomeCategory.categoryName}</span>
                                        </div>
                                    </div>
                                );
                            }

                            if (expenseCategory) {
                                return (
                                    <div className="d-flex align-items-center my-1" key={i}>
                                        <span className="bold me-2 text-c-danger">(-)</span>
                                        <div className="d-flex align-items-center">
                                            <CategoryIcon color={expenseCategory.color} />
                                            <span className="bold text-muted ms-1">{expenseCategory.categoryName}</span>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                    <button type="button"
                                        className="btn btn-outline-secondary"
                                        id="shufflePlanoDeContasBtn" data-bs-target="#planoDeContasConfigCarousel" data-bs-slide-to={4}
                                        onClick={() => setPlanoDeContasEdit(elem)}>
                                        <FontAwesomeIcon icon={faShuffle} />
                                    </button>
                                    <button type="button"
                                        className="btn btn-outline-secondary"
                                        id="editPlanoDeContasBtn" data-bs-target="#planoDeContasConfigCarousel" data-bs-slide-to={2}
                                        onClick={() => setPlanoDeContasEdit(elem)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button type="button"
                                        className="btn btn-outline-secondary"
                                        id="deletePlanoDeContasBtn"
                                        onClick={() => setPlanoDeContasDelete(elem)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {planoDeContasDelete?._id === elem?._id && (
                            <div className="alert alert-danger fadeItem mt-2">
                                <div className="row">
                                    <div className="col-12">
                                        Tem certeza que deseja excluir essa configuração?
                                    </div>
                                    <div className="col-12 d-flex justify-content-end mt-2">
                                        <button className="btn btn-sm btn-c-tertiary me-2" onClick={() => setPlanoDeContasDelete(null)}>Cancelar</button>
                                        <button className="btn btn-sm btn-c-danger" onClick={() => handleDeletePlanoDeContas(planoDeContasDelete._id)}>
                                            {loadingDelete ? <SpinnerSM className="mx-3" /> : 'Excluir'}
                                        </button>
                                    </div>
                                    {deleteError && (
                                        <div className="col-12 mt-2">
                                            <small className="text-danger">
                                                {deleteError}
                                            </small>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}


                    </div>
                </div >
            ))
            }

            {
                !todasCategoriasAlocadas && (
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <button className="btn btn-c-outline-secondary" data-bs-target="#planoDeContasConfigCarousel" data-bs-slide="next">
                                + Adicionar resultado
                            </button>
                        </div>
                    </div>
                )
            }

            {
                !todasCategoriasAlocadas && (
                    <>
                        <hr />
                        <div className="card mt-3">
                            <div className="card-body">
                                <div className="row">
                                    <span className="small fw-bold mb-2">Categorias sem resultado</span>
                                    {[...incomeCategories, ...expenseCategories].map((elem, index) => {
                                        const selectedCategory = planoDeContasConfig.find(result => result.selectedCategories.includes(elem._id));
                                        if (selectedCategory) return null;

                                        return (
                                            <div className="d-flex align-items-center my-1" key={index}>
                                                <span className={`bold me-2 ${incomeCategories.includes(elem) ? 'text-c-success' : 'text-c-danger'}`}>
                                                    {incomeCategories.includes(elem) ? '(+)' : '(-)'}
                                                </span>
                                                <div className="d-flex align-items-center">
                                                    <CategoryIcon color={elem.color} />
                                                    <span className="bold text-muted ms-1">{elem.categoryName}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}
