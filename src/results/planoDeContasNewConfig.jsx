import { faChevronLeft, faEquals, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateContext } from "./context/resultsContext";
import CategoryIcon from "../categories/categoryIcon";



export default function PlanoDeContasNewConfig(props) {

    const {
        incomeCategories,
        expenseCategories,
    } = useStateContext();



    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-between fadeItem2s mt-0">
                <span className="cardAnimation  " type="button" data-bs-target="#planoDeContasConfigCarousel" data-bs-slide-to={0}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
            </div>
            <div className="col-12 my-3">

                <FontAwesomeIcon icon={faEquals} />
                <span className="small fw-bold mb-2 ms-3">Novo resultado</span>
                <input type="text" className="form-control" placeholder="Nome" />
            </div>

            <hr />
            <div className="col-12 my-2">

                <FontAwesomeIcon icon={faTags} />
                <span className="small fw-bold mb-3 ms-3">Adicionar categorias</span>
            </div>

            <div className="col-12 mb-2 ">

                {incomeCategories.map((elem, index) => (

                    <div class="form-check form-switch d-flex align-items-center my-2" type="button">
                        <input class="form-check-input me-1" type="checkbox" role="switch" id={'income' + index} />
                        <label class="form-check-label d-flex align-items-center" for={'income' + index} type="button">
                            <span className="bold me-2 text-c-success">
                                (+)
                            </span>
                            <div className="d-flex align-items-center">

                                <CategoryIcon color={elem.color} />
                                <span className="bold text-muted ms-1">{elem.categoryName}</span>
                            </div>
                        </label>
                    </div>


                ))}
                {expenseCategories.map((elem, index) => (

                    <div class="form-check form-switch d-flex align-items-center my-2" type="button">
                        <input class="form-check-input me-1" type="checkbox" role="switch" id={'expense' + index} />
                        <label class="form-check-label d-flex align-items-center" for={'expense' + index} type="button">
                            <span className="bold me-2 text-c-danger">
                                (-)
                            </span>
                            <div className="d-flex align-items-center">

                                <CategoryIcon color={elem.color} />
                                <span className="bold text-muted ms-1">{elem.categoryName}</span>
                            </div>
                        </label>
                    </div>


                ))}

            </div>

            <hr />

            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-sm btn-c-outline-tertiary me-2">
                    Cancelar
                </button>
                <button className="btn btn-sm btn-c-outline-success">
                    Salvar
                </button>

            </div>


        </div>
    )


}