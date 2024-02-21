import { useEffect, useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");
}

export default function CropperImageModal(props) {


    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({ aspect: props.aspect, unit: 'px', width: 100, height: 100, x: 50, y: 50 })


    function getCroppedImg() {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        const base64Image = canvas.toDataURL('image/png');
        props.setResult(base64Image)
    }


    return (
        <div class="modal fade" id="cropperImageModal" tabindex="-1" aria-labelledby="ImageHeaderModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title title-dark" id="ImageHeaderModalLabel">Editar Imagem</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className="col-12">


                            <ReactCrop src={props.selectFile} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/* <label htmlFor="inputButton" className="akvo_btn akvo_btn_primary btn-sm">Alterar Imagem</label> */}
                        <button className="btn btn-success btn-sm" onClick={getCroppedImg} data-bs-dismiss="modal">Cortar Imagem</button>
                    </div>
                </div>
            </div>
        </div>
    )
}