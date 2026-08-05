import { useState } from 'react';

interface SeccionData {
  titulo: string;
  color: string;
  elementos: string[];
}

interface DatosEstructura {
  conjuntoA: SeccionData;
  conjuntoB: SeccionData;
  interseccion: SeccionData;
  [key: string]: SeccionData;
}

const datos: DatosEstructura = {
  conjuntoA: {
    titulo: "Filosofía de la tecnología",
    color: "#FFB3BA",
    elementos: [
      "Filosofía de la técnica del siglo XX",
      "Postfenomenología",
      "Teoría crítica de la tecnología",
      "Filosofía de la información",
      "Filosofía de la cosmotécnica"
    ]
  },
  conjuntoB: {
    titulo: "Teoría política de la tecnología",
    color: "#BAE1FF",
    elementos: [
      "El problema de la tecnología autónoma",
      "Teoría crítica de la tecnología",
      "Capitalismo de vigilancia",
      "Semiocapitalismo",
      "Soberanía y tecnología: El Stack de Bratton",
      "Crítica del solucionismo tecnológico",
      "La ilustración oscura"
    ]
  },
  interseccion: {
    titulo: "Teoría política de las tecnodiversidades",
    color: "#BAFFC9",
    elementos: [] 
  }
};

export default function DiagramaVennInteractvo() {
  const [seccionActiva, setSeccionActiva] = useState<string | null>(null);
  const [pantallaCompleta, setPantallaCompleta] = useState<boolean>(false);

  const handleClick = (seccion: string) => {
    setSeccionActiva(seccion);
    setPantallaCompleta(true);
  };

  const handleReset = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pantallaCompleta && e.target === e.currentTarget) {
        setPantallaCompleta(false);
        setTimeout(() => {
          setSeccionActiva(null);
        }, 500);
    }
  };

  return (
    <div 
        className={`fixed inset-0 w-screen h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-700 ease-in-out font-serif ${pantallaCompleta ? '' : 'bg-white'}`}
        onClick={handleReset}
        style={{ 
          fontFamily: 'Times New Roman, serif',
          backgroundColor: pantallaCompleta && seccionActiva ? datos[seccionActiva].color : 'white',
          touchAction: 'none'
        }}
    >
      {/* 
        CONTENEDOR RESPONSIVO:
        - En Celulares (< 1024px): 'flex-col' (Círculos arriba, leyenda abajo, scroll si es necesario)
        - En PC (>= 1024px): 'flex-row' (Diagrama izquierda, leyenda derecha tal como lo tenías)
      */}
      <div 
        className={`flex flex-col lg:flex-row items-center justify-center w-full max-w-[1600px] h-full lg:h-auto px-4 lg:px-8 transition-all duration-700 ease-in-out ${pantallaCompleta ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'}`}
      >
        
        {/* DIAGRAMA DE VENN */}
        <div className="w-full lg:w-[60%] flex items-center justify-center relative py-2 lg:py-0">
          
          {/* Indicador visual animado (Solo icono, sin palabras) */}
          <div className="absolute z-20 pointer-events-none animate-bounce bg-white/80 p-2.5 rounded-full shadow-lg border border-black/20 backdrop-blur-sm top-4 right-10 lg:right-24">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>

          <svg 
            viewBox="120 70 710 460" 
            className="w-full max-w-[380px] lg:max-w-none lg:max-h-[80vh] drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="hover-bright" x="-20%" y="-20%" width="140%" height="140%">
                 <feComponentTransfer>
                    <feFuncR type="linear" slope="1.05"/>
                    <feFuncG type="linear" slope="1.05"/>
                    <feFuncB type="linear" slope="1.05"/>
                  </feComponentTransfer>
              </filter>
              
              <clipPath id="clipA">
                <circle cx="350" cy="300" r="220" />
              </clipPath>
              <clipPath id="clipB">
                <circle cx="600" cy="300" r="220" />
              </clipPath>
            </defs>

            <circle 
              cx="350" cy="300" r="220" 
              fill={datos.conjuntoA.color} 
              className="cursor-pointer transition-all duration-200 hover:filter-[url(#hover-bright)]"
              onClick={(e) => { e.stopPropagation(); handleClick('conjuntoA'); }}
            />

            <circle 
              cx="600" cy="300" r="220" 
              fill={datos.conjuntoB.color} 
              className="cursor-pointer transition-all duration-200 hover:filter-[url(#hover-bright)]"
              onClick={(e) => { e.stopPropagation(); handleClick('conjuntoB'); }}
            />

            <circle 
              cx="350" cy="300" r="220" 
              fill={datos.interseccion.color} 
              clipPath="url(#clipB)"
              className="cursor-pointer transition-all duration-200 hover:filter-[url(#hover-bright)]"
              onClick={(e) => { e.stopPropagation(); handleClick('interseccion'); }}
            />

            <circle cx="350" cy="300" r="220" fill="none" stroke="black" strokeWidth="5.5" className="pointer-events-none" />
            <circle cx="600" cy="300" r="220" fill="none" stroke="black" strokeWidth="5.5" className="pointer-events-none" />
          </svg>
        </div>

        {/* LEYENDA (Abajo en celular, Derecha en PC) */}
        <div className="w-full lg:w-[40%] flex flex-row lg:flex-col justify-center items-center lg:items-start gap-4 lg:space-y-10 lg:pl-12 mt-2 lg:mt-0 pb-6 lg:pb-0">
          
          <div 
            className="flex flex-col lg:flex-row items-center lg:items-center space-y-1 lg:space-y-0 lg:space-x-6 cursor-pointer group text-center lg:text-left"
            onClick={(e) => { e.stopPropagation(); handleClick('conjuntoA'); }}
          >
            <div 
                className="w-10 h-8 lg:w-16 lg:h-12 flex-shrink-0 transition-transform group-hover:scale-110" 
                style={{ backgroundColor: datos.conjuntoA.color, border: '3.5px solid black' }}
            ></div>
            <span className="text-xs lg:text-3xl text-black leading-tight whitespace-pre-line group-hover:font-bold transition-all">
              Filosofía de la{"\n"}tecnología
            </span>
          </div>

          <div 
             className="flex flex-col lg:flex-row items-center lg:items-center space-y-1 lg:space-y-0 lg:space-x-6 cursor-pointer group text-center lg:text-left"
            onClick={(e) => { e.stopPropagation(); handleClick('conjuntoB'); }}
          >
            <div 
                className="w-10 h-8 lg:w-16 lg:h-12 flex-shrink-0 transition-transform group-hover:scale-110" 
                style={{ backgroundColor: datos.conjuntoB.color, border: '3.5px solid black' }}
            ></div>
            <span className="text-xs lg:text-3xl text-black leading-tight whitespace-pre-line group-hover:font-bold transition-all">
              Teoría política de{"\n"}la tecnología
            </span>
          </div>

          <div 
             className="flex flex-col lg:flex-row items-center lg:items-center space-y-1 lg:space-y-0 lg:space-x-6 cursor-pointer group text-center lg:text-left"
            onClick={(e) => { e.stopPropagation(); handleClick('interseccion'); }}
          >
            <div 
                className="w-10 h-8 lg:w-16 lg:h-12 flex-shrink-0 transition-transform group-hover:scale-110" 
                style={{ backgroundColor: datos.interseccion.color, border: '3.5px solid black' }}
            ></div>
            <span className="text-xs lg:text-3xl text-black leading-tight whitespace-pre-line group-hover:font-bold transition-all">
              Teoría política de las{"\n"}tecnodiversidades
            </span>
          </div>

        </div>
      </div>

      {/* PANTALLA COMPLETA AL HACER CLICK */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center p-4 lg:p-8 transition-all duration-700 ease-in-out overflow-y-auto ${pantallaCompleta ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-110 pointer-events-none'}`}
        onClick={handleReset}
      >
        <button 
          onClick={() => setPantallaCompleta(false)}
          className="fixed top-6 right-6 z-50 text-gray-800 hover:text-black font-bold text-lg lg:text-2xl hover:scale-110 transition-transform flex items-center gap-2 lg:gap-3 bg-white/90 hover:bg-white px-4 py-2.5 lg:px-6 lg:py-4 rounded-full shadow-2xl border-2 border-black/20 backdrop-blur-md cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-8 lg:w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Cerrar
        </button>

        {seccionActiva && (
          <div 
            className="w-full max-w-5xl p-6 lg:p-12 bg-white/50 backdrop-blur-sm rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.15)] border-4 border-black/10 cursor-default text-center my-auto"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-3xl lg:text-7xl font-bold mb-4 lg:mb-8 text-gray-900">
              {datos[seccionActiva].titulo}
            </h2>
            
            {datos[seccionActiva].elementos.length > 0 && (
              <ul className="text-lg lg:text-3xl w-full mx-auto space-y-4 lg:space-y-8 pl-2 lg:pl-16 list-none mt-6 lg:mt-10 border-t-4 border-black/10 pt-6 lg:pt-10 text-left">
                {datos[seccionActiva].elementos.map((item: string, index: number) => (
                  <li key={index} className="flex items-start group">
                    <span 
                      className="inline-block w-4 h-4 lg:w-6 lg:h-6 mt-2 lg:mt-3 mr-4 lg:mr-8 rounded-sm flex-shrink-0 shadow-md group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: datos[seccionActiva].color, border: '3px solid black' }}
                    ></span>
                    <span className="text-gray-900 leading-tight group-hover:text-black transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
