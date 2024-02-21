import React from 'react'
import TutorialVideoFrame from './TutorialVideoFrame';

export default function GeeCalculatorPage(props) {

    const videosList = [
        {
            title: "AKVO ESG - Nossas soluções",
            url: "https://www.youtube.com/embed/Bkk9rdWPg_c?si=1K1bAprE7xwJzWnE",
        },
        {
            title: "Vídeo Institucional AKVO ESG",
            url: "https://www.youtube.com/embed/csVYxiv5pGA?si=-qvoIJFtKd4HGX-3",
        },
    ];

    return (
        <>
            <TutorialVideoFrame
                videosList={videosList}
                enablePlayVideo={props.enablePlayVideo}
            />
        </>
    )
}