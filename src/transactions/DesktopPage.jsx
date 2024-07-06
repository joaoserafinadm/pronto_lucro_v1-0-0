import DesktopTotalCards from "./DesktopTotalCards"



export default function DesktopPage(props) {

    const { data } = props



    return (
        <div className="row d-flex">
            <div className="col-12 col-xl-8 d-flex justify-content-center align-items-center order-1 order-xl-0">
                <div style={{ backgroundColor: 'red' }}> dsadsa</div>
            </div>
            <div className="col-12 col-xl-4  order-0 order-xl-1">

                <DesktopTotalCards data={data} />

            </div>

        </div>
    )
}