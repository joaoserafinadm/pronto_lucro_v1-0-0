import TagIcon from "../icons/tagIcon"



export default function TagsSelect(props) {

    const { categorySelected, setTagSelected } = props

    const tags = categorySelected?.tags



    return (
        <div className="row py-2 ">
            {tags?.map((elem, index) => (
                <span className="col-12 py-3 hover border-bottom px-3  d-flex align-items-center"
                    type="button" onClick={() => setTagSelected(elem)}>
                    <TagIcon color={categorySelected?.color} />
                    <span className="bold">{elem?.tag}</span>
                </span>
            ))}
        </div >
    )


}