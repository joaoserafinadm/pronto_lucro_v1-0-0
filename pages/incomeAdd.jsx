import Link from "next/link";
import { FixedTopicsBottom } from "../src/components/fixedTopics";
import IncomeAddPage from "../src/incomesManagement/IncomeAddPage";
import Icons from "../src/components/icons";
import { useRef, useState } from "react";
import { SpinnerSM } from "../src/components/loading/Spinners";




export default function IncomeAdd() {

    const childRef = useRef();

    const [loadingSave, setLoadingSave] = useState(false)

    const handleSave = () => {
        if (childRef.current) {
            childRef.current.handleSave();
        }
    };


    return (
        <div className="fadeItem">


            <div className="row my-3">
                <div className="col-12 d-flex">
                    <Link href={'/'}>
                        <span className="ms-3"><Icons icon='a-l' /></span>
                        <span className="ms-3 bold">Nova Receita</span>
                    </Link>

                </div>
            </div>
            

            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-6">


                    <IncomeAddPage ref={childRef} setLoadingSave={value => setLoadingSave(value)} />
                </div>
            </div>


            <FixedTopicsBottom >

                <div className="row">
                    <div className="col-12 d-flex justify-content-end align-items-center">
                        <Link href="/">
                            <button className="btn btn-sm btn-secondary">Cancelar</button>
                        </Link>

                        <button className="ms-2 btn btn-sm btn-custom-success fadeItem"
                            onClick={() => handleSave()} >
                            {loadingSave ?
                                <SpinnerSM className="mx-3" />
                                :
                                "Salvar"}
                        </button>

                    </div>
                </div>
            </FixedTopicsBottom>
        </div>
    )


}