import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';

export default function MonthSelect(props) {


    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

    useEffect(() => {

        props.setMonth({
            month: monthSelected,
            year: yearSelected
        })

    }, [monthSelected, yearSelected]);

    const handleSlideChange = (swiper) => {
        const realIndex = swiper?.realIndex;

        if (realIndex === 0 && monthSelected === 11) {
            setYearSelected((prevYear) => prevYear + 1);
        } else if (realIndex === 11 && monthSelected === 0) {
            setYearSelected((prevYear) => prevYear - 1);
        }

        setMonthSelected(realIndex);
    };

    return (
        <div className="col-10 col-lg-4 col-md-6">
            <div className="row d-flex justify-content-center text-center">
                <span>{yearSelected}</span>
            </div>
            <div className="row d-flex justify-content-center">
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#333',
                        '--swiper-pagination-color': '#333',
                        '--swiper-navigation-size': '25px',
                        zIndex: 0
                    }}
                    initialSlide={monthSelected}
                    slidesPerView={1}
                    navigation
                    loop
                    onSlideChange={handleSlideChange}>
                    {months.map((elem, index) => (
                        <SwiperSlide key={index} className="text-center">
                            <span className="bold">{elem}</span>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
