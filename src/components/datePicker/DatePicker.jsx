import { useState, useEffect } from 'react';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './DatePicker.module.scss';

// Função para obter os dias do mês
const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

// Função para obter o nome do mês
const getMonthName = (month) => {
    const date = new Date(0, month);
    const monthName = date.toLocaleString('pt-BR', { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}

// Função para obter os dias a serem exibidos no calendário
const getCalendarDays = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Dias do mês atual
    const daysInMonth = getDaysInMonth(year, month);

    // Primeiro dia do mês
    const firstDayOfMonth = daysInMonth[0].getDay();

    // Último dia do mês
    const lastDayOfMonth = daysInMonth[daysInMonth.length - 1].getDay();

    // Dias do mês anterior para preencher o calendário
    const prevMonthDays = [];
    if (firstDayOfMonth !== 0) {
        const prevMonth = new Date(year, month, 0); // Último dia do mês anterior
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            prevMonthDays.push(new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate() - i));
        }
    }

    // Dias do próximo mês para preencher o calendário
    const nextMonthDays = [];
    if (lastDayOfMonth !== 6) {
        const nextMonth = new Date(year, month + 1, 1); // Primeiro dia do próximo mês
        for (let i = 1; i < 7 - lastDayOfMonth; i++) {
            nextMonthDays.push(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate() + i - 1));
        }
    }

    return [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
}

export default function DatePicker(props) {
    const initialDate = new Date(props.date.year, props.date.month, props.date.day);
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {
        setCalendarDays(getCalendarDays(currentDate));
    }, [currentDate]);

    const handlePrevMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    }

    const handleNextMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    }

    const handleDateClick = (date) => {
        if (date.getMonth() === currentDate.getMonth()) {
            props.setDate({
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
            });
        }
    }

    const month = getMonthName(currentDate.getMonth());
    const year = currentDate.getFullYear();

    return (
        <div className={`${styles.wrapper}`}>
            <header className='d-flex justify-content-between align-items-center'>
                <span className={`${styles.currentDate}`}>{month} {year}</span>
                <div className={`${styles.icons}`}>
                    <span onClick={handlePrevMonth} className='mx-2 fs-5 '><FontAwesomeIcon icon={faChevronLeft} /></span>
                    <span onClick={handleNextMonth} className='mx-2 fs-5'><FontAwesomeIcon icon={faChevronRight} /></span>
                </div>
            </header>
            <div className={`${styles.calendar}`}>
                <ul className={`${styles.weeks}`}>
                    <li >Dom</li>
                    <li >Seg</li>
                    <li >Ter</li>
                    <li >Qua</li>
                    <li >Qui</li>
                    <li >Sex</li>
                    <li >Sab</li>
                </ul>
                <ul className={`${styles.days}`}>
                    {calendarDays.map((date, index) => {
                        const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isSelected = date.getDate() === props.date.day && date.getMonth() === props.date.month && date.getFullYear() === props.date.year;
                        const dayClasses = `${isCurrentMonth ? '' : styles.textMuted} ${isToday ? 'fw-bold' : ''} ${isSelected ? styles.selected : ''}`;

                        return (
                            <li 
                                key={index}
                                className={dayClasses}
                                onClick={() => handleDateClick(date)}
                            >
                                {date.getDate()}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
