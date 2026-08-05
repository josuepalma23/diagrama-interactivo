import React, { useState } from 'react';

const datos = {
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
  const [seccionActiva, setSeccionActiva] = useState(null);
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  const handleClick = (seccion) => {
    setSeccionActiva(seccion);
    setPantallaCompleta(true);
  };

  const handleReset = (e) => {
    if(pantallaCompleta && e.target === e.currentTarget) {
        setPantallaCompleta(false);
        setTimeout(() => {
          setSeccionActiva(null);
        }, 500);
    }
  };

  return (
    // CONTENEDOR RAÍZ: Fijo a la pantalla, bloquea el scroll y el zoom táctil
    <div 
        className={`fixed inset-0 w-screen h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-700 ease-in-out font-serif ${pantallaCompleta ? '' : 'bg-white'}`}
        onClick={handleReset}
        style={{ 
          fontFamily: 'Times New Roman, serif',
          backgroundColor: pantallaCompleta && seccionActiva ? datos[seccionActiva].color : 'white',
          touchAction: 'none' // Evita que se haga zoom con los dedos en pantallas táctiles
        }}
    >
      
      {/* CONTENEDOR PRINCIPAL: Flexbox estricto centrado al medio de la pantalla */}
      <div 
        className={`flex flex-row items-center justify-center w-full max-w-[1600px] px-8 transition-all duration-700 ease-in-out ${pantallaCompleta ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'}`}
      >
        
        {/* IZQUIERDA: Diagrama de Venn (60% del espacio) */}
        <div className="w-[60%] flex items-center justify-center">
          <svg 
            // ViewBox ajustado milimétricamente para eliminar bordes muertos y hacer crecer los círculos
            viewBox="120 70 710 460" 
            className="w-full max-h-[85vh] drop-shadow-md"
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

        {/* DERECHA: Leyenda (40% del espacio) con tamaños proporcionales al diagrama */}
        <div className="w-[40%] flex flex-col justify-center space-y-12 pl-12">
          
          <div 
            className="flex items-center space-x-6 cursor-pointer group"
            onClick={(e) => { e.stopPropagation(); handleClick('conjuntoA'); }}
          >
            <div 
                className="w-16 h-12 flex-shrink-0 transition-transform group-hover:scale-110" 
                style={{ backgroundColor: datos.conjuntoA.color, border: '3.5px solid black' }}
            ></div>
            <span className="text-3xl text-black leading-tight whitespace-pre-line group-hover:font-bold transition-all">
              Filosofía de la{"\n"}tecnología
            </span>
          </div>

          <div 
             className="flex items-center space-x-6 cursor-pointer group"
            onClick={(e) => { e.stopPropagation(); handleClick('conjuntoB'); }}
          >
            <div 
                className="w-16 h-12 flex-shrink-0 transition-transform group-hover:scale-110" 
                style={{ backgroundColor: datos.conjuntoB.color, border: '3.5px solid black' }}
            ></div>
            <span className="text-3xl text-black leading-tight whitespace-pre-line group-hover:font-bold transition-all">
              Teoría política de{"\n"}la tecnología
            </span>
          </div>

          <div 
             className="flex items-center space-x-6 cursor-pointer group"
            onClick={(e) => { e.stopPropagation(); handleClick('interseccion'); }}
          >
            <div 
                className="w-16 h-12 flex-shrink-0 transition-transform group-hover:scale-110" 
                style={{ backgroundColor: datos.interseccion.color, border: '3.5px solid black' }}
            ></div>
            <span className="text-3xl text-black leading-tight whitespace-pre-line group-hover:font-bold transition-all">
              Teoría política de las{"\n"}tecnodiversidades
            </span>
          </div>

        </div>
      </div>

      {/* PANTALLA COMPLETA AL HACER CLICK */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-700 ease-in-out ${pantallaCompleta ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-110 pointer-events-none'}`}
        onClick={handleReset}
      >
        <button 
          onClick={() => setPantallaCompleta(false)}
          className="fixed top-8 right-8 z-50 text-gray-800 hover:text-black font-bold text-2xl hover:scale-110 transition-transform flex items-center gap-3 bg-white/90 hover:bg-white px-6 py-4 rounded-full shadow-2xl border-2 border-black/20 backdrop-blur-md cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Cerrar
        </button>

        {seccionActiva && (
          <div 
            className="w-full max-w-5xl p-12 bg-white/50 backdrop-blur-sm rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.15)] border-4 border-black/10 cursor-default text-center"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900">
              {datos[seccionActiva].titulo}
            </h2>
            
            {datos[seccionActiva].elementos.length > 0 && (
              <ul className="text-3xl w-full mx-auto space-y-8 pl-4 md:pl-16 list-none mt-10 border-t-4 border-black/10 pt-10 text-left">
                {datos[seccionActiva].elementos.map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <span 
                      className="inline-block w-6 h-6 mt-3 mr-8 rounded-sm flex-shrink-0 shadow-md group-hover:scale-125 transition-transform"
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
