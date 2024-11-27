import { useState } from "react"
import CategorySelect from "./categorySelect"
import TagSelect from "./tagSelect_02"



export default function TagSelectModal_02(props) {

    const { tags, setSection, id, section } = props

    const [categorySelected, setCategorySelected] = useState(null)
    const [tagSelected, setTagSelected] = useState(null)
    const [subTagList, setSubTagList] = useState([])


    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-12">
                        <CategorySelect tags={tags} setCategorySelected={setCategorySelected} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TagSelect categorySelected={categorySelected} setTagSelected={setTagSelected} />
                    </div>
                </div>

            </div>
        </div>

    )
}