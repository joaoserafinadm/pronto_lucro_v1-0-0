import { faArrowTurnUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SubCategoryIcon } from "../categories/categoryIcon"




export default function TagSelected(props) {

    const { subCategory_id,
        categories } = props

    console.log("ttt'", subCategory_id, categories)

    const categorySelected = categories.find(elem => elem.subCategories.find(elem1 => elem1._id === subCategory_id))
    const subCategorySelected = categorySelected?.subCategories.find(elem => elem._id === subCategory_id)

    const data = {
        name: subCategorySelected?.name,
        color: categorySelected?.color,
    }




    const renderTag = () => {

        if (!subCategory_id || !categorySelected) {
            return (
                <span class=" px-2 py-1  small rounded-pill border text-muted">
                    Sem categoria <FontAwesomeIcon icon={faChevronDown} />
                </span>
            )
        } else {
            return (
                <div className="col-12 d-flex">

                    <div className="row">
                        <div>


                            <span style={{ backgroundColor: data.color }}
                                className=" border text-white  d-flex align-items-center px-2 py-1   small mx-1 rounded-pill fw-bold">

                                <SubCategoryIcon color={data.color} className="text-white" />
                                {data?.name}
                            </span>
                        </div>
                    </div>
                </div>
            )
        }



    }


    return renderTag()

}