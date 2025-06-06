import { faCalendarMinus } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDays, faCalendarWeek, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import tippy from "tippy.js";

export default function MonthSelect(props) {
    const { competenceMonth } = props;

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Estados principais
    const [viewMode, setViewMode] = useState('actualMonth'); // 'month', 'date', 'week'
    const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
    const [dateSelected, setDateSelected] = useState(new Date().getDate());
    const [weekSelected, setWeekSelected] = useState(null);

    const [showModeView, setShowModeView] = useState(false);

    const [statusSelected, setStatusSelected] = useState("Mês");

    const swiperRef = useRef(null);


    useEffect(() => {

        setShowModeView(false);

        if(monthSelected === new Date().getMonth() && yearSelected === new Date().getFullYear()) {
            setViewMode("actualMonth");
        } else {
            setViewMode("otherMonth");
        }

    }, [monthSelected])

    useEffect(() => {
        setTimeout(() => {
            tippy('#monthBtn', { content: 'Mês', placement: 'bottom' });
            tippy('#weekBtn', { content: 'Semana', placement: 'bottom' });
            tippy('#dateBtn', { content: 'Data', placement: 'bottom' });
        }, 700)
    }, [])

    // Função para obter a semana atual
    const getCurrentWeek = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const currentDate = today.getDate();

        const weeks = getWeeksInMonth(currentMonth, currentYear);

        // Encontrar a semana que contém o dia atual
        const currentWeek = weeks.find(week =>
            currentDate >= week.start && currentDate <= week.end
        );

        return {
            week: currentWeek,
            month: currentMonth,
            year: currentYear
        };
    };

    // Função para obter dias do mês
    const getDaysInMonth = (month, year) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startWeekday = firstDay.getDay();

        const days = [];

        // Dias vazios do início
        for (let i = 0; i < startWeekday; i++) {
            days.push(null);
        }

        // Dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    // Função para obter semanas do mês
    const getWeeksInMonth = (month, year) => {
        const days = getDaysInMonth(month, year);
        const weeks = [];

        for (let i = 0; i < days.length; i += 7) {
            const week = days.slice(i, i + 7);
            const weekDays = week.filter(day => day !== null);
            if (weekDays.length > 0) {
                const weekStart = weekDays[0];
                const weekEnd = weekDays[weekDays.length - 1];
                weeks.push({
                    start: weekStart,
                    end: weekEnd,
                    days: week
                });
            }
        }

        return weeks;
    };

    // Função para voltar ao hoje
    const goToToday = () => {
        const today = new Date();
        setMonthSelected(today.getMonth());
        setYearSelected(today.getFullYear());
        setDateSelected(today.getDate());
        setWeekSelected(null);

        if (swiperRef.current) {
            swiperRef.current.slideTo(today.getMonth());
        }
    };

    // Função para voltar ao mês atual
    const goToCurrentMonth = () => {
        const today = new Date();
        setMonthSelected(today.getMonth());
        setYearSelected(today.getFullYear());

        if (swiperRef.current) {
            swiperRef.current.slideTo(today.getMonth());
        }
    };

    // Função para ir para a semana atual
    const goToCurrentWeek = () => {
        const currentWeekData = getCurrentWeek();
        setMonthSelected(currentWeekData.month);
        setYearSelected(currentWeekData.year);
        setWeekSelected(currentWeekData.week);
        setDateSelected(null);

        if (swiperRef.current) {
            swiperRef.current.slideTo(currentWeekData.month);
        }
    };

    // Atualiza o mês e ano quando `competenceMonth` mudar
    useEffect(() => {
        if (
            competenceMonth?.month !== undefined &&
            competenceMonth?.year !== undefined &&
            (competenceMonth.month !== monthSelected || competenceMonth.year !== yearSelected)
        ) {
            setMonthSelected(competenceMonth.month);
            setYearSelected(competenceMonth.year);

            if (swiperRef.current) {
                swiperRef.current.slideTo(competenceMonth.month);
            }
        }
    }, [competenceMonth]);

    // Atualiza as props quando houver mudanças
    useEffect(() => {
        if (props.setMonth) {
            const selectedData = {
                month: monthSelected,
                year: yearSelected,
                viewMode,
                ...(viewMode === 'date' && { date: dateSelected }),
                ...(viewMode === 'week' && { week: weekSelected }),
                ...(viewMode === 'actualWeek' && { week: weekSelected })
            };

            props.setMonth(selectedData);
        }
    }, [monthSelected, yearSelected, dateSelected, weekSelected, viewMode]);

    const handleSlideChange = (swiper) => {
        const realIndex = swiper?.realIndex;

        if (realIndex === 0 && monthSelected === 11) {
            setYearSelected((prevYear) => prevYear + 1);
        } else if (realIndex === 11 && monthSelected === 0) {
            setYearSelected((prevYear) => prevYear - 1);
        }

        setMonthSelected(realIndex);
    };

    const handleDateSelect = (day) => {
        setDateSelected(day);
        setWeekSelected(null);
    };

    const handleWeekSelect = (week) => {
        setWeekSelected(week);
        setDateSelected(null);
    };

    const renderModeButtons = () => (
        <div className="row mt-3">
            {!showModeView ?
                <div className="col-12 d-flex justify-content-center mt-0 fadeItem" >
                    <button className="badge border-0 rounded-pill btn-c-tertiary cardAnimation" onClick={() => setShowModeView(true)}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </div>
                :
                <div className="col-12 d-flex justify-content-center gap-2 fadeItem">
                    <button
                        className={`btn btn-sm rounded-pill px-2 d-flex align-items-center justify-content-center flex-column  fw-bold text-secondary ${viewMode === 'date' ? 'btn-c-tertiary text-light' : 'btn-light'}`}
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        onClick={() => setViewMode('date')}
                    >
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <span style={{ fontSize: '7px' }} className={`${viewMode === 'date' ? ' text-light' : 'text-secondary'}`}>
                            Dia
                        </span>
                    </button>
                    <button
                        className={`btn btn-sm rounded-pill px-2 d-flex align-items-center justify-content-center flex-column  fw-bold text-secondary ${viewMode === 'week' ? 'btn-c-tertiary text-light' : 'btn-light'}`}
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        onClick={() => setViewMode('week')}
                    >
                        <FontAwesomeIcon icon={faCalendarMinus} />
                        <span style={{ fontSize: '7px' }} className={`${viewMode === 'week' ? ' text-light' : 'text-secondary'}`} >
                            Semana
                        </span>
                    </button>
                    <button
                        className={`btn btn-sm rounded-pill px-2 d-flex align-items-center justify-content-center flex-column  fw-bold text-secondary ${viewMode === 'month' ? 'btn-c-tertiary text-light' : 'btn-light'}`}
                        onClick={() => setViewMode('month')}
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    >
                        <FontAwesomeIcon icon={faCalendarWeek} />
                        <span style={{ fontSize: '7px' }} className={`${viewMode === 'month' ? ' text-light' : 'text-secondary'}`}>
                            Mês
                        </span>
                    </button>
                </div>
            }

        </div>
    );

    const renderQuickActions = () => (
        <div className="row mt-3">
            <div className="col-12 d-flex justify-content-center">
                <div className="rounded-pill" style={{ backgroundColor: '#f8f9fa' }} onClick={() => setShowModeView(false)}>
                    <button
                        type="button"
                        className={`btn btn-sm rounded-pill px-2  fw-bold text-secondary ${viewMode === 'actualDay' ? 'btn-c-tertiary text-light' : ''}`}
                        style={{ fontSize: '11px' }}
                        onClick={() => { setViewMode('actualDay'); goToToday() }} >
                        Hoje
                    </button>
                    <button type="button"
                        className={`btn btn-sm rounded-pill px-2  fw-bold text-secondary ${viewMode === 'actualWeek' ? 'btn-c-tertiary text-light' : ''}`}
                        style={{ fontSize: '11px' }}
                        onClick={() => { setViewMode('actualWeek'); goToCurrentWeek() }} >
                        Semana Atual
                    </button>
                    <button type="button"
                        className={`btn btn-sm rounded-pill px-2  fw-bold text-secondary ${viewMode === 'actualMonth' ? 'btn-c-tertiary text-light' : ''}`}
                        style={{ fontSize: '11px' }}
                        onClick={() => { setViewMode('actualMonth'); goToCurrentMonth() }} >
                        Mês Atual
                    </button>
                </div>
            </div>
        </div>
    );

    const renderDateView = () => {
        const days = getDaysInMonth(monthSelected, yearSelected);

        return (
            <div className="calendar-grid mt-3">
                <div className="row">
                    {weekdays.map(day => (
                        <div key={day} className="col text-center fw-bold small">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="row">
                    {days.map((day, index) => (
                        <div key={index} className="col p-1">
                            {day && (
                                <button
                                    className={`btn btn-sm w-100 ${day === dateSelected
                                        ? 'btn-primary'
                                        : 'btn-outline-secondary'
                                        } ${day === new Date().getDate() &&
                                            monthSelected === new Date().getMonth() &&
                                            yearSelected === new Date().getFullYear()
                                            ? 'border-success border-2'
                                            : ''
                                        }`}
                                    onClick={() => handleDateSelect(day)}
                                >
                                    {day}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderWeekView = () => {
        const weeks = getWeeksInMonth(monthSelected, yearSelected);
        const today = new Date();
        const currentDate = today.getDate();
        const isCurrentMonth = monthSelected === today.getMonth() && yearSelected === today.getFullYear();

        return (
            <div className="weeks-view mt-3">
                {weeks.map((week, index) => {
                    const isCurrentWeek = isCurrentMonth &&
                        currentDate >= week.start &&
                        currentDate <= week.end;

                    return (
                        <div key={index} className="row mb-2">
                            <div className="col-12">
                                <button
                                    className={`btn w-100 ${weekSelected?.start === week.start && weekSelected?.end === week.end
                                        ? 'btn-primary'
                                        : 'btn-outline-secondary'
                                        } ${isCurrentWeek ? 'border-success border-2' : ''}`}
                                    onClick={() => handleWeekSelect(week)}
                                >
                                    Semana {index + 1}: {week.start} - {week.end}
                                    {isCurrentWeek && <span className="ms-2 badge bg-success">Atual</span>}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderCurrentWeekHighlight = () => {
        if (viewMode === 'actualWeek' && weekSelected) {
            return (
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <div className="alert alert-info">
                            <strong>Semana Atual Selecionada:</strong><br />
                            {weekSelected.start} - {weekSelected.end} de {months[monthSelected]} {yearSelected}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="col-10 col-lg-6 col-md-8">
            <div className="row d-flex justify-content-center text-center">
                <span className="fs-5 fw-bold">{yearSelected}</span>
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
                            <span className="bold fs-4">{elem}</span>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {renderQuickActions()}
            {/* {renderModeButtons()} */}

            {/* Destaque da semana atual quando selecionada 
            {renderCurrentWeekHighlight()}*/}

            {/* Exibição da seleção atual 
            <div className="row mt-3">
                <div className="col-12 text-center">
                    <small className="text-muted">
                        {viewMode === 'date' && dateSelected && `Data selecionada: ${dateSelected}/${monthSelected + 1}/${yearSelected}`}
                        {viewMode === 'week' && weekSelected && `Semana selecionada: ${weekSelected.start} - ${weekSelected.end}/${monthSelected + 1}/${yearSelected}`}
                        {viewMode === 'actualWeek' && weekSelected && `Semana atual: ${weekSelected.start} - ${weekSelected.end}/${monthSelected + 1}/${yearSelected}`}
                    </small>
                </div>
            </div>*/}

            {/* Renderização condicional baseada no modo */}
            {/* {viewMode === 'date' && renderDateView()}
            {(viewMode === 'week' || viewMode === 'actualWeek') && renderWeekView()} */}
        </div>
    );
}