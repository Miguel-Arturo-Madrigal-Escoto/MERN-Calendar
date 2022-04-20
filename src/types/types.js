
export const types = {

    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',

    eventAddNew: '[calendar] Add new event',
    eventSetActive: '[calendar] Set active event',
    eventUpdated: '[calendar] Event updated',
    eventDeleted: '[calendar] Event deleted',

    authChecking: '[auth] Checking login state',
    authCheckingFinish: '[auth] Finished checking state',
    authStartLogin: '[auth] Start login', // asincrona
    authLogin: '[auth] Login', // sincrona
    authStartRegister: '[auth] Start register',
    authStartTokenRenewal: '[auth] Start token renewal',
    authLogout: '[auth] Logout',

}