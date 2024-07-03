import { faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { maskInputMoney } from "../../utils/mask"
import DfcResultsCard from "./DfcResultsCard"
import DfcList from "./DfcList"




export default function TransactionsCard(props) {

    const { data } = props


    return (
        <div className="row d-flex">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <DfcResultsCard data={data} />
                        <hr />
                        <DfcList data={data} />

                    </div>
                </div>

            </div>
        </div>
    )


}