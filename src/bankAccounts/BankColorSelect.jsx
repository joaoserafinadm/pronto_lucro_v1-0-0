import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';

export default function BankColorSelect(props) {

    const { color, setColor } = props


    const coresBancosBrasileiros = [
        "#4d88bb", // Pronto Lucro
        "#F3C613", // Banco do Brasil
        "#FF0000", // Bradesco
        "#0047BB", // Caixa Econômica Federal
        "#FF6A00", // Itaú
        "#EC0000", // Santander
        "#262261", // Banco Safra
        "#0095DA", // Banrisul
        "#008C44", // Sicoob
        "#8A05BE",  // Nubank
        "#333333", // Cinza escuro
        "#1A1A1A" // Preto fosco
    ];

    return (
        <div className="row d-flex justify-content-center">
            <Swiper
                style={{
                    '--swiper-navigation-color': '#333',
                    '--swiper-pagination-color': '#333',
                    '--swiper-navigation-size': '25px',
                    zIndex: 0,
                    padding: '10px 20px'
                }}
                // initialSlide={monthSelected}
                slidesPerView={5}
                pagination
                navigation
            // onSlideChange={handleSlideChange}
            >
                {coresBancosBrasileiros.map((elem, index) => (
                    <SwiperSlide key={index} className="d-flex justify-content-center">
                        <span category="button" onClick={() => setColor(elem)} type="button"
                            className={`cardAnimation text-center d-flex justify-content-center align-items-center   m-1  small rounded-pill ${color === elem ? '  shadow' : ''} `}
                            style={{
                                backgroundColor: elem,
                                color: 'white',
                                height: '30px',
                                width: '30px',
                                scale: color === elem ? '1.1' : '1',
                                // border: color === elem ? '2px solid #ddd' : 'none'
                            }}>
                            {color === elem && <FontAwesomeIcon icon={faCheck} className="text-white" />}
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}