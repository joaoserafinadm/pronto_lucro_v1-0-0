import { useDispatch, useSelector } from "react-redux"
import handleAkvoTool from "../../../../utils/handleAkvoTool"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export default function AkvoToolToggle(props) {

    const token = jwt.decode(Cookie.get('auth'))

    const akvoTool = useSelector(state => state.tool)


    return (
        <>
            {akvoTool && (
                <div className="d-flex fadeItem">
                    <div className="col ps-2">
                        <hr />
                    </div>
                    <div className="d-flex px-2 justify-content-center align-items-center dropend ">
                        <small className=" px-1  text-secondary" id="akvoToolChangeButton" style={{ "userSelect": 'none' }}>
                            {handleAkvoTool(akvoTool)}
                        </small>
                    </div>
                    <div className="col">
                        <hr />
                    </div>
                </div>
            )}

        </>
    )
}