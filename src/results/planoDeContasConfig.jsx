import CategoryIcon from "../categories/categoryIcon";
import { useStateContext } from "./context/resultsContext";




export default function PlanoDeContasConfig(props) {

    const {
        incomeCategories,
        expenseCategories,
        planoDeContasConfig
    } = useStateContext();


    return (
        <>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">

                    <button className="btn btn-c-outline-secondary" data-bs-target="#planoDeContasConfigCarousel" data-bs-slide="next">+ Adicionar resultado</button>

                </div>
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <div className="row">
                        <span className="small fw-bold mb-2">
                            Categorias sem resultado
                        </span>
                        {incomeCategories.map((elem, index) => (
                            <div className="d-flex align-items-center my-1">
                                <span className="bold me-2 text-c-success">
                                    (+)
                                </span>
                                <div className="d-flex align-items-center">

                                    <CategoryIcon color={elem.color} />
                                    <span className="bold text-muted ms-1">{elem.categoryName}</span>
                                </div>
                            </div>
                        ))}
                        {expenseCategories.map((elem, index) => (
                            <div className="d-flex align-items-center my-1">
                                <span className="bold me-2 text-c-danger">
                                    (-)
                                </span>
                                <div className="d-flex align-items-center">
                                    <CategoryIcon color={elem.color} />
                                    <span className="bold text-muted ms-1">{elem.categoryName}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )



}