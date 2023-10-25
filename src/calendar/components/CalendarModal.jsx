import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal'
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es'

registerLocale('es', es)

import 'sweetalert2/dist/sweetalert2.min.css'
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    },
};

Modal.setAppElement('#root');

const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore()

    const { activeEvent, startSavingEvent } = useCalendarStore()

    const [formSubmitted, setFormSubmitted] = useState(false)

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const titleClass = useMemo(() => {
        if (!formSubmitted) return ''

        return (formValues.title.length > 0)
        ? ''
        : 'is-invalid'

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if ( activeEvent !== null ) {
            setFormValues({ ...activeEvent })
        }
    }, [activeEvent])
    

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onCloseModal = () => {
        closeDateModal()
    }

    const onDateChanged = (e, changing) => {
        setFormValues({
            ...formValues,
            [changing]: e
        })
    }

    const onSubmit = async(event) => {
        event.preventDefault()
        setFormSubmitted(true)
        const difference = differenceInSeconds( formValues.end, formValues.start )
        if ( isNaN(difference) || difference <= 0 ) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return
        }

        if (formValues.title.length <= 0) return

        // TODO:
        await startSavingEvent( formValues )
        
        closeDateModal();

        setFormSubmitted(false)

        if (formValues._id === undefined) {
            Swal.fire('Nuevo Evento Creado', 'El evento a sido creado con exito!!!', 'success')
        } else {
            Swal.fire('Evento Actualizado', 'El evento a sido actualizado con exito!!!', 'success')
        }

    }

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={ 200 }
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={ formValues.start }
                        onChange={(event) => onDateChanged(event, 'start')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                    minDate={ formValues.start }
                    selected={ formValues.end }
                    onChange={ (event) => onDateChanged(event, 'end') }
                    className='form-control'
                    dateFormat='Pp'
                    showTimeSelect
                    locale='es'
                />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`} // is-invalid
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export {
    CalendarModal
}