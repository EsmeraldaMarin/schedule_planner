import React, { useState } from 'react';
const horasPosibles = () => {
    let hora = '8';
    let minuto = '00';
    let res = []
    for (let i = 0; i < 32; i++) {
        if (minuto == '00') {
            res.push([`${hora}:${minuto}`, i])
            minuto = '30'
        } else {
            res.push([`${hora}:${minuto}`, i])
            hora = parseInt(hora, 10) + 1
            minuto = '00'
        }

    }
    return res
}

const Formulario = ({ onAgregarHorario, onLimpiarHorario, onGenerarImagen }) => {

    const diasSemana = [['Lunes', 0], ['Martes', 1], ['Miercoles', 2], ['Jueves', 3], ['Viernes', 4], ['Sabado', 5]];

    const [asignatura, setAsignatura] = useState('');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [dia, setDia] = useState('');
    const [colorCelda, setColorCelda] = useState('');

    const agregarHorario = () => {
        if (asignatura && desde && hasta && dia && colorCelda) {
            const nuevoHorario = {
                asignatura, desde, hasta, dia, colorCelda
            }
            onAgregarHorario(nuevoHorario);
        } else {
            alert('Porfi completa todos los campos q te cuesta animal')
        }
    }

    const limpiarHorario = () => {
        onLimpiarHorario()
    };
    const descargarHorario = () => {
        onGenerarImagen()
    }
    return (
        <div className='formulario'>
            <label>Ingrese la Asignatura</label>
            <input
                type='text'
                placeholder='Ej: Economia'
                value={asignatura}
                onChange={(event) => setAsignatura(event.target.value)}
            />
            <label>Ingrese el dia</label>
            <select
                value={dia}
                onChange={(event) => setDia(event.target.value)}>
                <option value='' disabled>Seleccione un día</option>
                {diasSemana.map((dias, index) => (
                    <option key={index} value={dias[1]}>{dias[0]}</option>
                ))}
            </select>
            <label>Ingrese el Horario</label>
            <div>
                de:
                <select
                    value={desde}
                    onChange={(event) => setDesde(event.target.value)}>
                    <option value='' disabled>Hora</option>
                    {horasPosibles().map((h, index) => (
                        <option key={index} value={h[1]}>{h[0]}</option>
                    ))}
                </select>
                a:
                <select
                    value={hasta}
                    onChange={(event) => setHasta(event.target.value)}>
                    <option value='' disabled>Hora</option>
                    {horasPosibles().map((h, index) => (
                        <option key={index} value={h[1]}>{h[0]}</option>
                    ))}
                </select>
            </div>
            <label>Ingrese un Color</label>
            <input
                type='text'
                placeholder='Ej: A05696'
                value={colorCelda}
                onChange={(event) => setColorCelda(event.target.value)}
            />
            <div className='botonesCtn'>
                <div>
                    <button onClick={limpiarHorario} className='limpiar'>Limpiar Todo</button>
                    <button onClick={agregarHorario}>Agregar Horario</button>
                </div>
                <button onClick={descargarHorario}>Descargar Horario</button>

            </div>

        </div>
    )
}
export default Formulario;