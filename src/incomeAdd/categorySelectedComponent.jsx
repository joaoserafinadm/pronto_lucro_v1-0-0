import { faArrowTurnUp, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showModal } from "../components/Modal";
import { SubCategoryIcon } from "../categories/categoryIcon";




export default function CategorySelectedComponent(props) {

    const { subCategorySelected, type, edit } = props




    return (
        <div className="col-12 mt-2 d-flex justify-content-between" onClick={() => showModal(`tagSelectModal${type}${edit && 'Edit'}`)}>
            {!subCategorySelected ?
                <span type="button"
                    class=" px-2 py-1  small mx-1 rounded-pill border pulse shadow">
                    Selecionar categoria
                </span>
                :
                <>
                    <div className="row">
                        <div>
                            <span type="button" onClick={() => showModal(`tagSelectModal${type}`)}
                                style={{ backgroundColor: subCategorySelected.color, color: "white" }}
                                className=" cardAnimation border rounded d-flex align-items-center px-2 py-1   small mx-1 rounded-pill fw-bold">
                                <SubCategoryIcon color={"white"} />

                                {subCategorySelected.name}
                            </span>
                        </div>
                    </div>
                </>
            }
            <div className="text-center text-secondary" style={{ width: "40px" }}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    )
}