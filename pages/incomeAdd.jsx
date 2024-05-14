import Link from "next/link";
import { FixedTopicsBottom } from "../src/components/fixedTopics";
import IncomeAddPage from "../src/incomesManagement/IncomeAddPage";




export default function IncomeAdd() {


    return (
        <div>

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