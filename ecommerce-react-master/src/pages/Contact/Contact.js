import './Contact.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';


const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Formulario enviado!',
            text: 'Tu consulta fue enviada correctamente! En breve nos comunicaremos para ayudarte',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })

        e.target.name.value = ''
        e.target.phone.value = ''
        e.target.mail.value = ''
        e.target.message.value = ''


    }

    return (
        <div className="contact">
            <h1>Vías de contacto con Bike Store</h1>
            <p className='contact__p'>Podés escribirnos en el siguiente formulario o bien al teléfono 3512367758, en nuestro pié de página tenés disponible nuestras redes sociales</p>
            <form className='contact-form' onSubmit={handleSubmit}>
                <TextField className='form-input' required id="name" label="Nombre completo" variant="outlined" />
                <TextField className='form-input' id="phone" label="Teléfono" type="number" variant="outlined" />
                <TextField className='form-input' required id="mail" label="Correo electrónico" type="email" variant="outlined" />
                <TextField
                    className='message form-input'
                    id="message"
                    label="Escribe tu consulta"
                    multiline
                    rows={6}
                />
                <div className='contact-form__button'>
                    <Button type="submit" variant="contained">Enviar</Button>
                    <Button type="reset" variant="outlined">Vaciar</Button>
                </div>
            </form>
        </div>
    )
}

export default Contact;