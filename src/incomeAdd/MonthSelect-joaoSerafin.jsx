import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';

export default function MonthSelect(props) {
    const { competenceMonth } = props;

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

    const swiperRef = useRef(null);

    // Atualiza o mês e ano quando `competenceMonth` mudar
    useEffect(() => {
        if (
            competenceMonth?.month !== undefined &&
            competenceMonth?.year !== undefined &&
            (competenceMonth.month !== monthSelected || competenceMonth.year !== yearSelected)
        ) {
            setMonthSelected(competenceMonth.month);
            setYearSelected(competenceMonth.year);

            // Atualiza a posição do Swiper sem disparar outro efeito
            if (swiperRef.current) {
                swiperRef.current.slideTo(competenceMonth.month);
            }
        }
    }, [competenceMonth]);

    // Atualiza o mês na prop apenas quando o usuário realmente altera o mês
    useEffect(() => {
        if (
            props.setMonth &&
            (monthSelected !== competenceMonth?.month || yearSelected !== competenceMonth?.year)
        ) {
            props.setMonth({
                month: monthSelected,
                year: yearSelected
            });
        }
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
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
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
