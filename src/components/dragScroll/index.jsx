import React, { useRef, useState, useEffect } from 'react';

/**
 * DragScroll - Componente com funcionalidade de arrastar para rolar e sem barras de rolagem visíveis
 * @param {Object} props - Propriedades do componente
 * @param {string|number} props.maxHeight - Altura máxima do componente (ex: '300px', 300)
 * @param {string|number} props.maxWidth - Largura máxima do componente (ex: '100%', 500)
 * @param {React.ReactNode} props.children - Conteúdo do componente
 * @param {Object} props.style - Estilos adicionais (opcional)
 * @param {string} props.className - Classes adicionais (opcional)
 */
const DragScroll = ({ 
  maxHeight = '300px', 
  maxWidth = '100%', 
  children, 
  style = {}, 
  className = '',
  ...props 
}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Formata dimensões para CSS
  const formatDimension = (value) => {
    if (typeof value === 'number') return `${value}px`;
    return value;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
    
    // Muda o cursor para indicar o estado de arrasto
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;
    
    // Calcular a distância percorrida
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    
    // Aplicar a rolagem
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
      }
    }
  };

  // Adicionar listeners para eventos fora do componente
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (containerRef.current) {
          containerRef.current.style.cursor = 'grab';
        }
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Estilos base do container
  const containerStyle = {
    maxHeight: formatDimension(maxHeight),
    maxWidth: formatDimension(maxWidth),
    overflow: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    cursor: 'grab',
    userSelect: 'none',
    ...style
  };

  return (
    <div
      ref={containerRef}
      className={`drag-scroll-container ${className}`}
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <style jsx>{`
        .drag-scroll-container::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
      {children}
    </div>
  );
};

export default DragScroll;