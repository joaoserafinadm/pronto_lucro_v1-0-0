import CategoryIcon from "../icons/categoryIcon"



export default function CategorySelect(props) {

    const { tags, setCategorySelected } = props

    return (
        <div className="row py-2 ">
            {tags?.map((elem, index) => (
                <span className="col-12 py-3 hover border-bottom px-3  d-flex align-items-center" 
                type="button" onClick={() => setCategorySelected(elem)}>
                    <CategoryIcon color={elem?.color} />
                    <span className="bold">{elem?.category}</span>
                </span>
            ))}
        </div >
    )


}