import AccountsConfigTutorial from "./AccountsConfigTutorial";
import BankAccountsTutorialPage from "./BankAccoutsTutorialPage";
import WelcomePage from "./WelcomePage";



export default function TutorialModal(props) {


    return (
        <div class="modal fade" id='tutorialModal' tabindex="-1" aria-labelledby="tutorialModalLabel" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    {/* <div class="modal-header">
                         <h5 class="modal-title" id="tutorialModalLabel">Nova conta</h5> 
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div> */}
                    <div className="modal-body">
                        <div className=" carousel  " data-bs-touch="false" data-bs-interval='false' id="tutorialPages">
                            <div className="carousel-inner ">
                                <div className="carousel-item active">
                                    <WelcomePage />
                                </div>
                                <div className="carousel-item">
                                    <BankAccountsTutorialPage />
                                </div>
                                <div className="carousel-item">
                                    <AccountsConfigTutorial />

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}