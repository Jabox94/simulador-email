document.addEventListener('DOMContentLoaded', function () {

    // Objeto
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Variables
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMsj = document.querySelector('#mensaje');
    const btnSubmit = document.querySelector('button[type=submit]');
    const btnReset = document.querySelector('button[type=reset]');
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');

    // cargar eventos
    cargarEventos();
    function cargarEventos() {
        inputEmail.addEventListener('input', validarCampo);
        inputCC.addEventListener('input', validarCampo);
        inputAsunto.addEventListener('input', validarCampo);
        inputMsj.addEventListener('input', validarCampo);
        btnSubmit.addEventListener('click', enviarEmail);
        btnReset.addEventListener('click', resetFormulario);
    }

    // Funciones
    // Validar que el input no este vacio
    function validarCampo(e) {
        // e.target.value

        if (e.target.value.trim() === '') {
            mostrarMensaje(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarMensaje('El formato de email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarHTML(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(email);
        comprobarEmail();
    }
    // En caso de estar vacio el input, se imprime un mensaje
    function mostrarMensaje(mensaje, referencia) {

        limpiarHTML(referencia);

        // Generar contenedor para el mensaje
        const alerta = document.createElement('P');
        alerta.textContent = mensaje;
        alerta.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'alert-mandatory');

        // Agregarlo al HTML
        referencia.appendChild(alerta);
    }

    // Limpiar alerta
    function limpiarHTML(referencia) {
        const existe = referencia.querySelector('.alert-mandatory');
        // Revisa si existe ya una alerta
        if (existe) {
            existe.remove()
        }

    }

    // Validar que el formato de email se cumpla
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);

        return resultado;
    }

    // Comprueba que todas las variables del objeto NO esten vacios
    function comprobarEmail() {

        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    function resetFormulario() {
        for (let item in email) {
            // Limpia cada item del objeto
            email[item] = '';
            // Reinicia el formulario
            formulario.reset();
            // Deshabilita el boton de enviar
            comprobarEmail();
        }
    }

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase', 'msj-exitoso');
            alertaExito.textContent = 'Mensaje enviado exitosamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }
})