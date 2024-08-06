import DesktopTotalCards from "./DesktopTotalCards"
import DesktopTransactionsList from "./DesktopTransactionsList"
import DfcList from "./DfcList"



export default function DesktopPage(props) {

    const { data, dateSelected } = props



    return (
        <div className="row d-flex mt-3">
            <div className="col-12    my-3">

                <DesktopTotalCards data={data} dateSelected={dateSelected} />

            </div>
            <div className="col-12 my-3 px-sm-5">
                <div className="d-none d-lg-flex justify-content-center">

                    <DesktopTransactionsList data={data} />
                </div>
                <div className="d-lg-none">

                    <DfcList data={data} />

                </div>
            </div>

        </div>
    )
}