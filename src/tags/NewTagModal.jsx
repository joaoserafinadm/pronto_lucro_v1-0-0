import NewTagAdd from "../incomeAdd/NewTagAdd";




export default function NewTagModal(props) {

    const {dataFunction, section, tags, id} = props


    return (
        <div class="modal fade" id={id} tabindex="-1" aria-labelledby="newTagModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newTagModalLabel">Nova conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <NewTagAdd
                            tags={tags}
                            setSection={()=>''}
                            setTagSelected={()=>''}
                            dataFunction={() => dataFunction()}
                            transactionSection={section}
                            id={id} newTagModal
                        />
                </div>
            </div>
        </div>
    )
}