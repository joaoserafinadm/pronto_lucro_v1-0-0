import React from 'react'
import TutorialVideoFrame from './TutorialVideoFrame';

export default function GeeCalculatorPage(props) {

    const videosList = [
        {
            title: "Cadastrar Instituição",
            url: "https://www.youtube.com/embed/YeFzxPBsbLg?si=ZFvRZndla2nepb_i",
        },
        {
            title: "Cadastrar Unidades",
            url: "https://www.youtube.com/embed/7JZ8ZR4vs9s?si=emNGibKHplDGKygN",
        },
        {
            title: "Cadastrar Usuários",
            url: "https://www.youtube.com/embed/lve4iMfL6Js?si=I2TnUpz425i12dgY",
        },
        {
            title: "Inventário",
            url: "https://www.youtube.com/embed/lVAzUyXyoNw?si=UoW9o7QdjJMPWI1l",
        },
        {
            title: "Gestão de Emissões",
            url: "https://www.youtube.com/embed/pH9KenGzHh8?si=YLEcRiwaQwZQJ_JN",
        },
        {
            title: "Compensar Emissões",
            url: "https://www.youtube.com/embed/dDgEZAFh4NQ?si=HQn-z-qrj4Sl6val",
        }
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