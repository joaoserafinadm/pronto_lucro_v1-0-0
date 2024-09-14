import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




export default function TagSelected(props) {

    const { tag, tagsArray } = props

    console.log("ttt'", tag, tagsArray)


    const renderTag = () => {

        const category_id = tag?.category_id
        const tag_id = tag?.tag_id
        const subTag_id = tag?.subTag_id

        const categorySelected = tagsArray?.find(e => e._id === category_id)
        const tagSelected = categorySelected?.tags?.find(e => e._id === tag_id)
        const subTagSelected = tagSelected?.subTags?.find(e => e._id === subTag_id)

        console.log('ccc1', categorySelected, tagSelected, subTagSelected)

        if (!categorySelected || !tagSelected) {
            return (
                <span class=" px-2 py-1  small rounded-pill border text-muted">
                    Sem categoria
                </span>
            )
        } else {
            return (
                <div className="col-12 d-flex">

                    <div className="row">
                        <div>


                            <span style={{ color: categorySelected.color }}
                                className=" border  d-flex align-items-center px-2 py-1   small mx-1 rounded-pill fw-bold">
                                {!subTagSelected ?
                                    <div style={{ height: "12px", width: "12px", border: `2px solid ${categorySelected.color}` }} className="rounded-circle ms-2 me-2"></div>
                                    :
                                    <FontAwesomeIcon className="me-2 ms-2" icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)', color: categorySelected.color }} />
                                }

                                {subTagSelected ? subTagSelected.subTag : tagSelected.tag}
                            </span>
                        </div>
                    </div>
                </div>
            )
        }



    }


    return renderTag()

}