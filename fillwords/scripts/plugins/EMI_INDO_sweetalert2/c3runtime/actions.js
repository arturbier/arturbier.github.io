globalThis.C3.Plugins.EMI_INDO_sweetalert2.Acts = {
    async atitlewithtextunder(title, text, icon) {

        await this._aTitleWithTextUnder(title, text, icon);

    },
    async basicAlert(text) {

        await this._basicMessage(text);
        
    },
    async error(icon, title, text, footer) {

        await this._alertError(icon, title, text, footer);

    },
    async confirmButton(title, deny, cancel, confirm, denytext, cbpopup, successTag, errorTag) {

        await this._confirmButton(title, deny, cancel, confirm, denytext, cbpopup, successTag, errorTag);

    },
    async confirmButtonIcon(title, text, icon, cancel, confirmclr, cancelclr, confirmtext, okpopup, successTag, errorTag) {

        await this._confirmButtonIcon(title, text, icon, cancel, confirmclr, cancelclr, confirmtext, okpopup, successTag, errorTag);
        
    },
    async customImage(title, text, url, width, height, alt) {

        await this._customImage(title, text, url, width, height, alt);

    },
    
};