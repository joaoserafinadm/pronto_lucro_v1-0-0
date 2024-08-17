import DesktopTotalCards from "./DesktopTotalCards"
import DesktopTransactionsList from "./DesktopTransactionsList"
import DfcList from "./DfcList"
import ResultsCard from "./ResultsCard"



export default function DesktopPage(props) {

    const { data, dateSelected, setIncomeSelected } = props



    return (
        <div className="row d-flex mt-3">


            <div className="col-12    ">

                {/* <DesktopTotalCards data={data} dateSelected={dateSelected} /> */}

                <ResultsCard data={data} dateSelected={dateSelected} />


            </div>
            <div className="col-12 my-3 px-sm-5">
                <div className="d-none d-lg-flex justify-content-center">

                    <DesktopTransactionsList data={data} setIncomeSelected={setIncomeSelected} />
                </div>
                <div className="d-lg-none">

                    <DfcList data={data} setIncomeSelected={setIncomeSelected} />

                </div>
            </div>

        </div>
    )
}