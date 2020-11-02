'use strict';

/*
1. evt beforeinstallprompt --> Salvar evento de instalación y mostrar botón de instalación
2. hnd installPWA -----------> Preguntar al usuario si desea la instalación de la App y esconder el botón
3. evt appinstalled ---------> Comprobar si la App está instalada 
*/

let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall'); // Botónde instalación en index.html ...
installButton.addEventListener('click', installPWA); // ... añadimos evento-manejador para instalación ...

// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent); // ... éste evento-manejador es necesario para mostrar el botón para poder instalar la PWA ...


/**
 * Event handler for beforeinstallprompt event.
 *   Saves the event & shows install button.
 *
 * @param {Event} evt
 */
function saveBeforeInstallPromptEvent(evt) {
    // CODELAB: Add code to save event & show the install button.
    deferredInstallPrompt = evt; // ... almacenamos el evento ...
    installButton.removeAttribute('hidden'); // ... mostramos el botón, quitando el atributo hidden ...
}


/**
 * Event handler for butInstall - Does the PWA installation.
 *
 * @param {Event} evt
 */
function installPWA(evt) { // ... manejador del instalador ... si queremos logar, mandar a algún servicio de autenticación ...
    // CODELAB: Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt(); // ... Mostramos el evento que capturamos en evento saveBeforeInstallPromptEvent ...
    // Hide the install button, it can't be called twice.
    evt.srcElement.setAttribute('hidden', true); // ... volvemos a esconder botón de instalación ...
    // CODELAB: Log user response to prompt.
    deferredInstallPrompt.userChoice // ... capturamos la elección del usuario cuando se muestra el prompt de instalación ...
        .then((choice) => { // ... mediante una promesa ...
            if (choice.outcome === 'accepted') {
                console.log('El usuario aceptó la instalación de Invasores Vs Evadidos a través del prompt', choice);
            } else {
                console.log('El usuario NO aceptó la instalación de Invasores Vs Evadidos a través del prompt', choice);
            }
            deferredInstallPrompt = null;
        });
}

// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled); // ... Añadimos el último evento-manejador que controlará que la App está instalada ...

/**
 * Event handler for appinstalled event.
 *   Log the installation to analytics or save the event somehow.
 *
 * @param {Event} evt
 */
function logAppInstalled(evt) { // ... sólo registramos que el evento ocurrió ... pero podríamos hacre otras cosas
    // CODELAB: Add code to log the event
    console.log('Invasores Vs Evadidos versión PWA instalada.', evt);

}