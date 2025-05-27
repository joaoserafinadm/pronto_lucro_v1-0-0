// import { useEffect, useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper-bundle.min.css';

// export default function MonthSelect(props) {
//     const { competenceMonth } = props;

//     const months = [
//         "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
//         "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
//     ];

//     const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

//     // Estados principais
//     const [viewMode, setViewMode] = useState('month'); // 'month', 'date', 'week'
//     const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
//     const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
//     const [dateSelected, setDateSelected] = useState(new Date().getDate());
//     const [weekSelected, setWeekSelected] = useState(null);

//     const swiperRef = useRef(null);

//     // Função para obter dias do mês
//     const getDaysInMonth = (month, year) => {
//         const firstDay = new Date(year, month, 1);
//         const lastDay = new Date(year, month + 1, 0);
//         const daysInMonth = lastDay.getDate();
//         const startWeekday = firstDay.getDay();
        
//         const days = [];
        
//         // Dias vazios do início
//         for (let i = 0; i < startWeekday; i++) {
//             days.push(null);
//         }
        
//         // Dias do mês
//         for (let day = 1; day <= daysInMonth; day++) {
//             days.push(day);
//         }
        
//         return days;
//     };

//     // Função para obter semanas do mês
//     const getWeeksInMonth = (month, year) => {
//         const days = getDaysInMonth(month, year);
//         const weeks = [];
        
//         for (let i = 0; i < days.length; i += 7) {
//             const week = days.slice(i, i + 7);
//             const weekDays = week.filter(day => day !== null);
//             if (weekDays.length > 0) {
//                 const weekStart = weekDays[0];
//                 const weekEnd = weekDays[weekDays.length - 1];
//                 weeks.push({
//                     start: weekStart,
//                     end: weekEnd,
//                     days: week
//                 });
//             }
//         }
        
//         return weeks;
//     };

//     // Função para voltar ao hoje
//     const goToToday = () => {
//         const today = new Date();
//         setMonthSelected(today.getMonth());
//         setYearSelected(today.getFullYear());
//         setDateSelected(today.getDate());
//         setWeekSelected(null);
        
//         if (swiperRef.current) {
//             swiperRef.current.slideTo(today.getMonth());
//         }
//     };

//     // Função para voltar ao mês atual
//     const goToCurrentMonth = () => {
//         const today = new Date();
//         setMonthSelected(today.getMonth());
//         setYearSelected(today.getFullYear());
//         setViewMode('month');
        
//         if (swiperRef.current) {
//             swiperRef.current.slideTo(today.getMonth());
//         }
//     };

//     // Atualiza o mês e ano quando `competenceMonth` mudar
//     useEffect(() => {
//         if (
//             competenceMonth?.month !== undefined &&
//             competenceMonth?.year !== undefined &&
//             (competenceMonth.month !== monthSelected || competenceMonth.year !== yearSelected)
//         ) {
//             setMonthSelected(competenceMonth.month);
//             setYearSelected(competenceMonth.year);

//             if (swiperRef.current) {
//                 swiperRef.current.slideTo(competenceMonth.month);
//             }
//         }
//     }, [competenceMonth]);

//     // Atualiza as props quando houver mudanças
//     useEffect(() => {
//         if (props.setMonth) {
//             const selectedData = {
//                 month: monthSelected,
//                 year: yearSelected,
//                 viewMode,
//                 ...(viewMode === 'date' && { date: dateSelected }),
//                 ...(viewMode === 'week' && { week: weekSelected })
//             };

//             props.setMonth(selectedData);
//         }
//     }, [monthSelected, yearSelected, dateSelected, weekSelected, viewMode]);

//     const handleSlideChange = (swiper) => {
//         const realIndex = swiper?.realIndex;

//         if (realIndex === 0 && monthSelected === 11) {
//             setYearSelected((prevYear) => prevYear + 1);
//         } else if (realIndex === 11 && monthSelected === 0) {
//             setYearSelected((prevYear) => prevYear - 1);
//         }

//         setMonthSelected(realIndex);
//     };

//     const handleDateSelect = (day) => {
//         setDateSelected(day);
//         setWeekSelected(null);
//     };

//     const handleWeekSelect = (week) => {
//         setWeekSelected(week);
//         setDateSelected(null);
//     };

//     const renderModeButtons = () => (
//         <div className="row mb-3">
//             <div className="col-12 d-flex justify-content-center gap-2">
//                 <button 
//                     className={`btn btn-sm ${viewMode === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
//                     onClick={() => setViewMode('month')}
//                 >
//                     Mês
//                 </button>
//                 <button 
//                     className={`btn btn-sm ${viewMode === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
//                     onClick={() => setViewMode('week')}
//                 >
//                     Semana
//                 </button>
//                 <button 
//                     className={`btn btn-sm ${viewMode === 'date' ? 'btn-primary' : 'btn-outline-primary'}`}
//                     onClick={() => setViewMode('date')}
//                 >
//                     Data
//                 </button>
//             </div>
//         </div>
//     );

//     const renderQuickActions = () => (
//         <div className="row mb-2">
//             <div className="col-12 d-flex justify-content-center gap-2">
//                 <button 
//                     className="btn btn-sm btn-success"
//                     onClick={goToToday}
//                 >
//                     Hoje
//                 </button>
//                 <button 
//                     className="btn btn-sm btn-info"
//                     onClick={goToCurrentMonth}
//                 >
//                     Mês Atual
//                 </button>
//             </div>
//         </div>
//     );

//     const renderDateView = () => {
//         const days = getDaysInMonth(monthSelected, yearSelected);
        
//         return (
//             <div className="calendar-grid mt-3">
//                 <div className="row">
//                     {weekdays.map(day => (
//                         <div key={day} className="col text-center fw-bold small">
//                             {day}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="row">
//                     {days.map((day, index) => (
//                         <div key={index} className="col p-1">
//                             {day && (
//                                 <button
//                                     className={`btn btn-sm w-100 ${
//                                         day === dateSelected 
//                                             ? 'btn-primary' 
//                                             : 'btn-outline-secondary'
//                                     } ${
//                                         day === new Date().getDate() && 
//                                         monthSelected === new Date().getMonth() && 
//                                         yearSelected === new Date().getFullYear()
//                                             ? 'border-success border-2'
//                                             : ''
//                                     }`}
//                                     onClick={() => handleDateSelect(day)}
//                                 >
//                                     {day}
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     };

//     const renderWeekView = () => {
//         const weeks = getWeeksInMonth(monthSelected, yearSelected);
        
//         return (
//             <div className="weeks-view mt-3">
//                 {weeks.map((week, index) => (
//                     <div key={index} className="row mb-2">
//                         <div className="col-12">
//                             <button
//                                 className={`btn w-100 ${
//                                     weekSelected?.start === week.start && weekSelected?.end === week.end
//                                         ? 'btn-primary'
//                                         : 'btn-outline-secondary'
//                                 }`}
//                                 onClick={() => handleWeekSelect(week)}
//                             >
//                                 Semana {index + 1}: {week.start} - {week.end}
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <div className="col-10 col-lg-6 col-md-8">
//             {renderQuickActions()}
//             {renderModeButtons()}
            
//             <div className="row d-flex justify-content-center text-center">
//                 <span className="fs-5 fw-bold">{yearSelected}</span>
//             </div>
            
//             <div className="row d-flex justify-content-center">
//                 <Swiper
//                     style={{
//                         '--swiper-navigation-color': '#333',
//                         '--swiper-pagination-color': '#333',
//                         '--swiper-navigation-size': '25px',
//                         zIndex: 0
//                     }}
//                     initialSlide={monthSelected}
//                     slidesPerView={1}
//                     navigation
//                     loop
//                     onSlideChange={handleSlideChange}
//                     onSwiper={(swiper) => (swiperRef.current = swiper)}
//                 >
//                     {months.map((elem, index) => (
//                         <SwiperSlide key={index} className="text-center">
//                             <span className="bold fs-4">{elem}</span>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>

//             {/* Exibição da seleção atual */}
//             <div className="row mt-3">
//                 <div className="col-12 text-center">
//                     <small className="text-muted">
//                         {viewMode === 'date' && dateSelected && `Data selecionada: ${dateSelected}/${monthSelected + 1}/${yearSelected}`}
//                         {viewMode === 'week' && weekSelected && `Semana selecionada: ${weekSelected.start} - ${weekSelected.end}/${monthSelected + 1}/${yearSelected}`}
//                         {viewMode === 'month' && `Mês selecionado: ${months[monthSelected]} ${yearSelected}`}
//                     </small>
//                 </div>
//             </div>

//             {/* Renderização condicional baseada no modo */}
//             {viewMode === 'date' && renderDateView()}
//             {viewMode === 'week' && renderWeekView()}
//         </div>
//     );
// }


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
