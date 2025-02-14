import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { hideModal } from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryIcon, { SubCategoryIcon } from "../categories/categoryIcon";
import { useState } from "react";
import SubCategoryAdd from "./subCategoryAdd";



export default function CategorySelect(props) {

    const { categories, setSubCategorySelected, setSection, section, dataFunction } = props

    // const tagsArray = reorganizeTags(categories)

    const [newCategorySelected, setNewCategorySelected] = useState(null)

    return (
        <>

            <div className="modal-body">
                <div className=" carousel slide " data-bs-touch="false" data-bs-interval='false' id={`${'categorySelectPages' + section}`}>
                    <div className="carousel-inner ">
                        <div className="carousel-item active">

                            {categories?.map((elem, index) => (
                                <>
                                    <div className="row mb-2" >
                                        <div className="col-12">
                                            <div className="d-flex align-items-center ">
                                                <CategoryIcon color={elem?.color} />
                                                <span className="bold">{elem?.categoryName}</span>
                                            </div>

                                        </div>
                                        {elem?.subCategories?.map((elem1, index) => (
                                            <>
                                                <div className="col-12 d-flex">
                                                    <span type="button"
                                                        className="ms-2 shadow cardAnimation border rounded d-flex align-items-center px-2 py-1 m-2  small mx-1 rounded-pill bold"
                                                        onClick={() => { setSubCategorySelected({ name: elem1.name, color: elem.color, category_id: elem._id, tag_id: elem1._id }); hideModal(props.id) }}>
                                                        <SubCategoryIcon color={elem.color} />
                                                        <span
                                                            style={{ color: elem.color }}
                                                        >
                                                            {elem1.name}
                                                        </span>
                                                    </span>
                                                </div>
                                                {/* {elem1.subCategories.map((elem2, index) => (
                                        <div className="col-12 d-flex">
                                            <span type="button"
                                                className="ms-4 cardAnimation border rounded d-flex align-items-center px-2 py-1 m-2  small mx-1 rounded-pill fw-bold"
                                                onClick={() => { setSubCategorySelected({ name: elem2.subTag, color: elem.color, category_id: elem._id, tag_id: elem1._id, subTag_id: elem2._id }); hideModal(props.id) }}>

                                                <FontAwesomeIcon className="me-2 ms-2" icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)', color: elem.color }} />
                                                <span style={{ color: elem.color }}>
                                                    {elem2.subTag}
                                                </span>
                                            </span>
                                        </div>
                                    ))} */}


                                            </>
                                        ))}
                                        <div className="col-12 d-flex">
                                            <span type="button"
                                                className="ms-2 shadow cardAnimation border rounded d-flex align-items-center px-2 py-1 m-2  small mx-1 rounded-pill bold"
                                                data-bs-target={`${'#categorySelectPages' + section}`} data-bs-slide-to={1}
                                                onClick={() => { setNewCategorySelected(elem) }}>
                                                <SubCategoryIcon color="#C6D2E2" />
                                                <span className="text-c-tertiary" >
                                                    + Adicionar subcategoria
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <hr />

                                </>
                            ))}
                        </div>

                        <div className="carousel-item">
                            <SubCategoryAdd
                                section={section}
                                dataFunction={dataFunction}
                                newCategorySelected={newCategorySelected}
                                setNewCategorySelected={setNewCategorySelected}
                                setSubCategorySelected={(value) => { setSubCategorySelected(value); hideModal(props.id) }} />
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="modal-footer">

                <button
                    type="button"
                    className="btn btn-outline-custom-tertiary"
                    onClick={() => { hideModal(props.id); setSection('') }}
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    className={`btn ${props.section === 'income' ? 'btn-outline-custom-success' : props.section === 'expense' ? 'btn-outline-custom-danger' : 'btn-outline-custom-tertiary'} `}
                    onClick={() => { setSection('tagAdd') }}
                >
                    Adicionar marcador
                </button>
            </div> */}

        </>
    )

}


const reorganizeTags = (categories) => {
    return categories.reduce((acc, tag) => {
        const { category } = tag;

        // Encontra o índice da categoria no array acumulador
        const categoryIndex = acc.findIndex(item => item.category === category);

        // Se a categoria já existe no acumulador, adiciona a tag a essa categoria
        if (categoryIndex > -1) {
            acc[categoryIndex].categories.push(tag);
        } else {
            // Se a categoria não existe, cria um novo objeto de categoria
            acc.push({
                category,
                categories: [tag]
            });
        }

        return acc;
    }, []);
};