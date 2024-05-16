import Link from "next/link";
import { FixedTopicsBottom } from "../src/components/fixedTopics";
import IncomeAddPage from "../src/incomesManagement/IncomeAddPage";
import Icons from "../src/components/icons";




export default function IncomeAdd() {


    return (
        <div>
            <div className="row my-3">
                <div className="col-12 d-flex">
                    <span className="ms-3"><Icons icon='a-l' /></span>
                    <span className="ms-3 bold">Nova Receita</span>

                </div>
            </div>

            
            <IncomeAddPage />


            <FixedTopicsBottom >

                <div className="row">
                    <div className="col-12 d-flex justify-content-end align-items-center">
                        <Link href="/">
                            <button className="btn btn-sm btn-secondary">Cancelar</button>
                        </Link>

                        <button className="ms-2 btn btn-sm btn-custom-success fadeItem" >Salvar</button>

                    </div>
                </div>
            </FixedTopicsBottom>
        </div>
    )


}