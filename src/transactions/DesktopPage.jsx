import { useStateContext } from "./context/transactionsContext"
import DesktopTotalCards from "./DesktopTotalCards"
import DesktopTransactionsList from "./DesktopTransactionsList"
import DfcList from "./DfcList"
import ResultsCard from "./ResultsCard"



export default function DesktopPage(props) {

    const { data, dateSelected, setIncomeSelected,incomeSelected, categories } = useStateContext()



    return (
        <div className="row  mt-3">



            {/* <DesktopTotalCards data={data} dateSelected={dateSelected} /> */}

            <ResultsCard data={data} dateSelected={dateSelected} />


            <div className="col-12 my-3 " style={{fontSize: '14px'}}>
                <div className="d-none d-lg-flex justify-content-center">

                    <DesktopTransactionsList />
                </div>
                <div className="d-lg-none">

                    <DfcList />

                </div>
            </div>

        </div>
    )
}