import DesktopTotalCards from "./DesktopTotalCards"
import DesktopTransactionsList from "./DesktopTransactionsList"
import DfcList from "./DfcList"



export default function DesktopPage(props) {

    const { data, dateSelected } = props



    return (
        <div className="row d-flex mt-3">
            <div className="col-12 col-xl-8  order-1 order-xl-0 my-3">
                <div className="d-none d-lg-flex">

                    <DesktopTransactionsList data={data} />
                </div>
                <div className="d-lg-none">
                    
                                    <DfcList data={data} />
                                
                </div>
            </div>
            <div className="col-12 col-xl-4  order-0 order-xl-1 my-3">

                <DesktopTotalCards data={data} dateSelected={dateSelected} />

            </div>

        </div>
    )
}