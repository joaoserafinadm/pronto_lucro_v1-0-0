import { useEffect, useRef } from "react";
import isMobile from "../../../utils/isMobile";
import scrollTo from "../../../utils/scrollTo";

export default function Sections(props) {
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const myCarousel = document.querySelector("#" + props.idTarget);
            const carousel = myCarousel ? new bootstrap.Carousel(myCarousel) : null;
            if (carousel) {
                carousel?.to(props.sections.indexOf(props.section));
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [props.section]);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            // Força um pequeno scroll para ativar o comportamento
            requestAnimationFrame(() => {
                scrollContainer.scrollLeft = 1;
            });
        }
    }, []);

    useEffect(() => {
        // Scroll para o elemento ativo quando a seção muda
        if (props.section) {
            const activeIndex = props.sections.indexOf(props.section);
            if (activeIndex !== -1) {
                const activeId = props.section + activeIndex;
                setTimeout(() => scroll(activeId), 100);
            }
        }
    }, [props.section, props.sections]);

    const scroll = (id) => {
        const element = document.getElementById(id);
        const scrollContainer = scrollContainerRef.current;
        
        if (element && scrollContainer) {
            const elementOffsetLeft = element.offsetLeft;
            const containerWidth = scrollContainer.clientWidth;
            const elementWidth = element.clientWidth;
            
            // Calcula a posição para centralizar o elemento
            const scrollLeft = elementOffsetLeft - (containerWidth / 2) + (elementWidth / 2);
            
            scrollContainer.scroll({
                left: Math.max(0, scrollLeft), // Evita scroll negativo
                behavior: 'smooth'
            });
        }
    };

    const handleSectionClick = (elem, index) => {
        props.setSection(elem);
        scroll(elem + index);
    };

    return (
        <div className="sections-container">
            <div 
                className="sections-scrollbar" 
                id="sectionsScrollbar"
                ref={scrollContainerRef}
            >
                <div className="sections-wrapper">
                    {props.sections.map((elem, index) => {
                        const isActive = props.section === elem;
                        
                        return (
                            <button
                                key={index}
                                id={elem + index}
                                className={`section-tab ${isActive ? 'active' : ''}`}
                                onClick={() => handleSectionClick(elem, index)}
                                data-bs-target={"#" + props.idTarget}
                                data-bs-slide-to={index}
                                type="button"
                            >
                                <span className="section-text">{elem}</span>
                                {isActive && <div className="active-indicator" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .sections-container {
                    position: relative;
                    margin: 0 0.5rem 1.5rem 0.5rem;
                }

                .sections-scrollbar {
                    overflow-x: ${isMobile() ? 'scroll' : 'auto'};
                    overflow-y: hidden;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    padding-bottom: 2px;
                }

                .sections-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                .sections-wrapper {
                    display: flex;
                    align-items: end;
                    gap: 0.25rem;
                    min-width: fit-content;
                    position: relative;
                }

                .section-tab {
                    all: unset;
                    position: relative;
                    min-width: ${isMobile() ? '120px' : '150px'};
                    width: auto;
                    padding: ${isMobile() ? '0.75rem 1rem' : '1rem 1.5rem'};
                    text-align: center;
                    cursor: pointer;
                    border-radius: 12px 12px 0 0;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    border: 1px solid #dee2e6;
                    border-bottom: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    font-weight: 500;
                    color: #6c757d;
                    font-size: ${isMobile() ? '0.875rem' : '1rem'};
                    transform: translateY(4px);
                    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
                }

                .section-tab:hover {
                    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                    color: #495057;
                    transform: translateY(2px);
                    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
                }

                .section-tab.active {
                    background: linear-gradient(135deg, #ffffff 0%, #f1f8ff 100%);
                    color: #0d6efd;
                    font-weight: 600;
                    transform: translateY(0);
                    border-color: #0d6efd;
                    box-shadow: 0 -6px 20px rgba(13, 110, 253, 0.15);
                }

                .section-text {
                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    position: relative;
                    z-index: 1;
                }

                .active-indicator {
                    position: absolute;
                    bottom: -1px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60%;
                    height: 3px;
                    background: linear-gradient(90deg, #0d6efd, #6610f2);
                    border-radius: 2px 2px 0 0;
                    animation: slideIn 0.3s ease-out;
                }

                @keyframes slideIn {
                    from {
                        width: 0%;
                        opacity: 0;
                    }
                    to {
                        width: 60%;
                        opacity: 1;
                    }
                }

                /* Adicionar linha de base */
                .sections-container::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, #dee2e6, #adb5bd, #dee2e6);
                }

                /* Responsividade aprimorada */
                @media (max-width: 768px) {
                    .sections-container {
                        margin: 0 0.25rem 1rem 0.25rem;
                    }
                    
                    .section-tab {
                        min-width: 100px;
                        padding: 0.625rem 0.75rem;
                        font-size: 0.8rem;
                    }
                }

                /* Efeito de foco para acessibilidade */
                .section-tab:focus-visible {
                    outline: 2px solid #0d6efd;
                    outline-offset: 2px;
                }
            `}</style>
        </div>
    );
}