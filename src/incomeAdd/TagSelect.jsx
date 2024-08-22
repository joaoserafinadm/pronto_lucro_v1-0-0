import { hideModal } from "../components/Modal";



export default function TagSelect(props) {

    const { tags, setTagSelected, setSection } = props

    // const tagsArray = reorganizeTags(tags)

    return (
        <>

            <div className="modal-body">
                <div className="row fadeItem">
                    <div className="col-12">

                    </div>
                </div>
            </div>
            <div className="modal-body" >
                <div className="row fadeItem">
                    <div className="col-12">
                        {tags.map((elem, index) => {
                            return (
                                <>
                                    <div className="row">
                                        <span className="bold">{elem?.category}</span>
                                        <div className="col-12 d-flex flex-wrap">
                                            {elem?.tags?.map((elem1, index) => {
                                                return (
                                                    <span type="button" onClick={() => { setTagSelected({ ...elem1, category: elem.category, category_id: elem._id }); hideModal(props.id) }}
                                                        className={`cardAnimation px-2 py-1 m-2  small mx-1 rounded-pill fw-bold `}
                                                        style={{ backgroundColor: elem1.color, color: elem1.textColor }}>
                                                        {elem1.tag}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            )
                        })}

                    </div>

                </div>

            </div>
            <div className="modal-footer">

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
            </div>

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