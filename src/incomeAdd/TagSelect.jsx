import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { hideModal } from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function TagSelect(props) {

    const { tags, setTagSelected, setSection } = props

    // const tagsArray = reorganizeTags(tags)

    return (
        <>

            <div className="modal-body">
                {tags?.map((elem, index) => (
                    <>
                        <div className="row mb-2" >
                            <div className="col-12">
                                <div className="d-flex align-items-center">
                                    <div style={{ backgroundColor: elem.color, height: "17px", width: "17px" }} className="rounded-circle me-2"></div>
                                    <span className="bold">{elem?.category}</span>
                                </div>

                            </div>
                            {elem?.tags?.map((elem1, index) => (
                                <>
                                    <div className="col-12 d-flex">
                                        <span type="button"
                                            className="ms-2 cardAnimation border rounded d-flex align-items-center px-2 py-1 m-2  small mx-1 rounded-pill fw-bold"
                                            onClick={() => { setTagSelected({name: elem1.tag, color: elem.color, category_id: elem._id, tag_id: elem1._id}); hideModal(props.id) }}>

                                            <div style={{ height: "12px", width: "12px", border: `2px solid ${elem.color}` }} className="rounded-circle ms-2 me-2"></div>
                                            <span style={{color: elem.color}}>
                                                {elem1.tag}
                                            </span>
                                        </span>
                                    </div>
                                    {elem1.subTags.map((elem2, index) => (
                                        <div className="col-12 d-flex">
                                            <span type="button"
                                                className="ms-4 cardAnimation border rounded d-flex align-items-center px-2 py-1 m-2  small mx-1 rounded-pill fw-bold"
                                                onClick={() => { setTagSelected({name: elem2.subTag, color: elem.color, category_id: elem._id, tag_id: elem1._id, subTag_id: elem2._id}); hideModal(props.id) }}>

                                                <FontAwesomeIcon className="me-2 ms-2" icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)', color: elem.color }} />
                                                <span style={{color: elem.color}}>
                                                    {elem2.subTag}
                                                </span>
                                            </span>
                                        </div>
                                    ))}
                                </>
                            ))}
                        </div>
                        <hr />

                    </>
                ))}
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


const reorganizeTags = (tags) => {
    return tags.reduce((acc, tag) => {
        const { category } = tag;

        // Encontra o índice da categoria no array acumulador
        const categoryIndex = acc.findIndex(item => item.category === category);

        // Se a categoria já existe no acumulador, adiciona a tag a essa categoria
        if (categoryIndex > -1) {
            acc[categoryIndex].tags.push(tag);
        } else {
            // Se a categoria não existe, cria um novo objeto de categoria
            acc.push({
                category,
                tags: [tag]
            });
        }

        return acc;
    }, []);
};