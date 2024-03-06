import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Formulario from '../Formulario/Formulario';
import HeadTable from './HeadTable';

function crearHoras(horaInicio) {
    let horas = [];
    let [hora, minuto] = horaInicio.split(":");
    for (let i = 0; i < 31; i++) {
        if (minuto == '00') {
            horas.push([i,`${hora}:00`, `${hora}:30`, '', '', '', '', '', '','#fff'])
            minuto = '30'
        }
        else {
            hora = parseInt(hora, 10)
            horas.push([i,`${hora}:30`, `${hora + 1}:00`, '', '', '', '', '', '','#fff'])
            hora = hora + 1
            minuto = '00';
        }

    }
    return horas
}
const coloresLindos = [
    '#FF6F61', '#FFD700', '#40E0D0', '#87CEEB', '#FF6347',
    '#FFA07A', '#98FB98', '#FF69B4', '#20B2AA', '#FFDAB9',
    '#FF4500', '#FF8C00', '#FFD700', '#32CD32', '#008B8B',
    '#8A2BE2', '#FF00FF', '#9370DB', '#00BFFF', '#1E90FF',
    '#00FA9A', '#008000', '#228B22', '#556B2F', '#8B4513',
    '#A0522D', '#D2691E', '#CD853F', '#FFD700', '#FF4500',
    '#FF8C00', '#FFD700', '#32CD32', '#008B8B', '#8A2BE2',
    '#FF00FF', '#9370DB', '#00BFFF', '#1E90FF', '#00FA9A',
    '#008000', '#228B22', '#556B2F', '#8B4513', '#A0522D',
    '#D2691E', '#CD853F', '#FFD700'
];

const rellenarHoras = (filas, horarios)=>{
    horarios.forEach(horario => {
    
        let {asignatura, desde, dia, hasta, colorCelda} = horario
        dia = parseInt(dia,10)
        desde = parseInt(desde,10)
        hasta = parseInt(hasta,10)
        for(let i = desde; i < hasta ; i++){
            filas[i][dia+3] = `${asignatura}:${colorCelda}`
        }
    });

}

const Tabla = () => {
    
    const [horarios, setHorarios] = useState([]);
    const tablaRef = useRef(null);


    let filas = crearHoras("8:00")

    const agregarHorario = (nuevoHorario) => {
        setHorarios([...horarios, nuevoHorario])
        
    }
    const limpiarHorario =()=>{
        setHorarios([])
    }

    const generarImagen = ()=>{
        if (tablaRef.current){
            html2canvas(tablaRef.current).then((canvas)=>{
                //obtengo URL de la imagen
                const imgURL = canvas.toDataURL('image/png');

                //creo un enlace de desacarga
                const link = document.createElement('a');
                link.href= imgURL;
                link.download = 'mis_horarios.png';

                //simular clic en el enlace para descargar la imagen
                link.click();
            })
        }
    }
    const borrarEntrada = (event)=>{
        const codigo = event.target.classList[0];
        const [asignatura, color] = codigo.split('_')
        const nuevosHorarios = horarios.filter((horario)=> horario.asignatura !== asignatura && horario.color !== color);
        setHorarios(nuevosHorarios)

    }
    rellenarHoras(filas, horarios)

    return (
        <div className='t'>
            <Formulario onAgregarHorario={agregarHorario} onLimpiarHorario={limpiarHorario} onGenerarImagen={generarImagen}/>
            <div ref={tablaRef} className='tablaHorarios'>
                <HeadTable />
                {filas.map((fila, i) => (
                    <div key={i} className='fila'>
                        <div>{fila[0]}</div>
                        <div className='desde'>{fila[1]}</div>
                        <div className='hasta'>{fila[2]}</div>
                        
                        {fila.slice(3).map((celda, j) => {
                            //let [color, numDia] = fila[9].split(":");
                            if(j<6){
                                if (celda!==""){ 
                                    let [asignatura, color] = fila[j+3].split(":");
                                    return <button key={j} 
                                                   className= {`${asignatura}_${color} celda ocupada`}
                                                   style={{ backgroundColor: color }}
                                                   onClick={borrarEntrada}> 
                                                   
                                                   {asignatura}                          
                                            </button>
                            
                                } else{
                                    return <div key={j} className='celda' style={{ backgroundColor: "#fff" }}>{celda}</div>
                                }
                            }
                            
                        })}
                    </div>
                ))}</div>
            
        </div>
    )
}
export default Tabla;
