import React, { useState } from 'react';
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
        for(let i = desde; i < hasta ; i++){
            filas[i][dia+3] = asignatura
            filas[i][9]=`#${colorCelda}:${dia}`
        }
    });

}

const Tabla = () => {
    
    const [horarios, setHorarios] = useState([])
    let filas = crearHoras("8:00")

    const agregarHorario = (nuevoHorario) => {
        setHorarios([...horarios, nuevoHorario])
    }
    const limpiarHorario =()=>{
        setHorarios([])
    }
    const borrarCelda = (fila)=>{
        console.log(horarios)
        const nuevaListaHorarios = horarios.filter((horario) => `#${horario.colorCelda}:${horario.dia}` !== fila[9]);
        console.log(nuevaListaHorarios)
        setHorarios(nuevaListaHorarios);
    }
    rellenarHoras(filas, horarios)

    return (
        <div className='t'>
            <div className='tablaHorarios'>
                <HeadTable />
                {filas.map((fila, i) => (
                    <div key={i} className='fila'>
                        <div>{fila[0]}</div>
                        <div className='desde'>{fila[1]}</div>
                        <div className='hasta'>{fila[2]}</div>
                        
                        {fila.slice(3).map((celda, j) => {
                            let [color, numDia] = fila[9].split(":");
                            if(j<6){
                                if (numDia==j){ 
                                    return <button key={j} 
                                                   id={j} 
                                                   className= 'celda ocupada'
                                                   style={{ backgroundColor: color }}
                                                   onClick={()=>borrarCelda(fila)}> 
                                                   {celda}
                                            </button>
                            
                                } else{
                                    return <div key={j} id={j} className='celda' style={{ backgroundColor: "#fff" }}>{celda}</div>
                                }
                            }
                            
                        })}
                    </div>
                ))}</div>
            <Formulario onAgregarHorario={agregarHorario} onLimpiarHorario={limpiarHorario} />
            
        </div>
    )
}
export default Tabla;
