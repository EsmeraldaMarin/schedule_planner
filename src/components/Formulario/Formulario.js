import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const horasPosibles = () => {
    let hora = '8';
    let minuto = '00';
    let res = []
    for (let i = 0; i < 32; i++) {
        if (minuto === '00') {
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
    const [colorCelda, setColorCelda] = useState('ffffff');

    const handleColorChange = (color) => {
        setColorCelda(color.hex);
    }

    const agregarHorario = () => {
        if (asignatura && desde && hasta && dia && colorCelda) {

            const nuevoHorario = {
                asignatura, desde, hasta, dia, colorCelda
            }
            onAgregarHorario(nuevoHorario);

        } else {
            alert('Porfi completa todos los campos q te cuesta animal')
        }
/*         setAsignatura('');
        setDesde('');
        setHasta('');
        setDia('');
        setColorCelda('');
 */    }

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
                className='inp_sel'
                value={asignatura}
                onChange={(event) => setAsignatura(event.target.value)}
            />
            <label>Ingrese el dia</label>
            <select
                className='inp_sel'
                value={dia}
                onChange={(event) => setDia(event.target.value)}>
                <option value='' disabled>Seleccione un día</option>
                {diasSemana.map((dias, index) => (
                    <option key={index} value={dias[1]}>{dias[0]}</option>
                ))}
            </select>
            <label>Ingrese el Horario</label>
            <div className='horasCtn'>
                de:
                <select
                    className='inp_sel'
                    value={desde}
                    onChange={(event) => setDesde(event.target.value)}>
                    <option value='' disabled>Hora</option>
                    {horasPosibles().map((h, index) => (
                        <option key={index} value={h[1]}>{h[0]}</option>
                    ))}
                </select>
                a:
                <select
                    className='inp_sel'
                    value={hasta}
                    onChange={(event) => setHasta(event.target.value)}>
                    <option value='' disabled>Hora</option>
                    {horasPosibles().map((h, index) => (
                        <option key={index} value={h[1]}>{h[0]}</option>
                    ))}
                </select>
            </div>
            <label htmlFor="colorPicker">Selecciona un color:</label>
            <ChromePicker className='colorInput' color={colorCelda} onChangeComplete={handleColorChange} />

            <div className='botonesCtn'>
                <div>
                    <button onClick={limpiarHorario} className='limpiar inp_sel'>Limpiar Todo</button>
                    <button onClick={agregarHorario} className='inp_sel'>Agregar Horario</button>
                </div>
                <button onClick={descargarHorario} className='inp_sel'>Descargar Horario</button>

            </div>

        </div>
    )
}
export default Formulario;