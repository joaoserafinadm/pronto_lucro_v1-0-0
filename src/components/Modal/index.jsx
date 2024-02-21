



export default function Modal({ id, title, children }) {



    return (
        <div class="modal fade" id={id} tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title title-dark" id={id}>{title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )


}