import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import isMobile from '../../utils/isMobile';

export default function TutorialVideoFrame({ videosList, enablePlayVideo }) {
    const [showVideo, setShowVideo] = useState(videosList[0].url);
    const isMobileDevice = isMobile();

    return (
        <div className={`${!isMobileDevice && "card shadow"} fadeItem`}>
            <div className="container">
                <div className="row">
                    <div className={`col-xl-8 col-12 fadeItem ${!isMobileDevice && "my-5"}`} style={{ height: isMobileDevice ? "25vh" : "" }}>
                        <iframe className='shadow rounded rounded-3 mt-1'
                            width="100%"
                            height="100%"
                            src={enablePlayVideo ? showVideo : ""}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>

                    <div className={`col-xl-4 col-12 d-flex ${isMobileDevice ? "mt-4" : "mt-5"}`}>
                        <div className='col-12' style={{ height: "482px" }}>
                            <div>
                                <b>Vídeos desta ferramenta:</b>
                                <p className='fs-small'><i>Clique no vídeo que deseja visualizar</i></p>
                            </div>
                            <div className='col-12 d-flex flex-column' style={{ height: "410px" }}>
                                {videosList.map((video, index) => (
                                    <button key={index} type="button" className={`btn btn-sm btn-light border text-start mt-2 py-3 ps-3 ${showVideo === video.url ? 'border-success border-1 rounded text-success fw-bold ' : ''}`} onClick={() => setShowVideo(video.url)}>
                                        <div className="d-flex align-items-center">
                                            {showVideo === video.url && <FontAwesomeIcon icon={faPlayCircle} className={`fs-5 me-2 text-secondary ${showVideo === video.url ? 'text-success' : 'text-secondary'}`} />}
                                            <span className='timeVideoTarget'> {video.title} </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}