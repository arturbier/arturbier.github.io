
const C3 = globalThis.C3;
import { Swal } from './bundle.js';
C3.Plugins.EMI_INDO_sweetalert2.Instance = class EMI_INDO_sweetalert2Instance extends globalThis.ISDKInstanceBase
{
	constructor()
	{
		super();
		
		// Initialise object properties
		// this._testProperty = 0;
		
		const properties = this._getInitProperties();
		if (properties)		// note properties may be null in some cases
		{
			// this._testProperty = properties[0];
        }
        this._okTags = "";
        this._eTags = "";
	}
	
	_release()
	{
		super._release();
	}

	_setTestProperty(n)
	{
		this._testProperty = n;
	}

	_getTestProperty()
	{
		return this._testProperty;
	}
	
	_saveToJson()
	{
		return {
			// data to be saved for savegames
		};
	}
	
	_loadFromJson(o)
	{
		// load state for savegames
    }

    _basicMessage(msg) {

        if (typeof Swal !== 'undefined') {

            Swal.fire(msg);

        } 
    
    }


    _aTitleWithTextUnder(title, text, icon){

        if (typeof Swal !== 'undefined') {

            Swal.fire({
                title: title,
                text: text,
                icon: this._setIcon(icon)
            });

        } 

    }


    _alertError(icon, title, text, footer) {

        if (typeof Swal !== 'undefined') {

            Swal.fire({
                icon: this._setIcon(icon),
                title: title,
                text: text,
                footer: footer
            });

        }

    }




    _confirmButton(title, deny, cancel, confirm, denytext, cbpopup, successTag, errorTag) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: title,
                showDenyButton: deny,
                showCancelButton: cancel,
                confirmButtonText: confirm,
                denyButtonText: denytext
            }).then((result) => {
                if (result.isConfirmed) {
                    this._okTags = successTag;
                    if (cbpopup) {
                        Swal.fire(`${confirm}`, "", "success");
                    }
                    this._trigger(C3.Plugins.EMI_INDO_sweetalert2.Cnds.onSuccessTag);
                } else if (result.isDenied) {
                    this._eTags = errorTag;
                    if (cbpopup) {
                        Swal.fire(`${denytext}`, "", "info");
                    }
                    this._trigger(C3.Plugins.EMI_INDO_sweetalert2.Cnds.onErrorTag);
                }
            });
        }
    }




    _confirmButtonIcon(title, text, icon, cancel, confirmclr, cancelclr, confirmtext, okpopup, successTag, errorTag) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: title,
                text: text,
                icon: this._setIcon(icon),
                showCancelButton: cancel,
                confirmButtonColor: confirmclr,
                cancelButtonColor: cancelclr,
                confirmButtonText: confirmtext
            }).then((result) => {
                if (result.isConfirmed) {
                    if (okpopup) {
                        Swal.fire({
                            title: `${title}`,
                            text: `${text}`,
                            icon: this._setIcon(0)
                        });
                    }
                    this._okTags = successTag;
                    this._trigger(C3.Plugins.EMI_INDO_sweetalert2.Cnds.onSuccessTag);
                } else {
                    this._eTags = errorTag;
                    this._trigger(C3.Plugins.EMI_INDO_sweetalert2.Cnds.onErrorTag);
                }
            });

        }

    }


    _customImage(title, text, url, width, height, alt) {

        if (typeof Swal !== 'undefined') {

            Swal.fire({
                title: title,
                text: text,
                imageUrl: url,
                imageWidth: width,
                imageHeight: height,
                imageAlt: alt
            });

        }
    
}

   
    _setIcon(_index) {
        switch (_index) {
            case 0:
                return "success";
            case 1:
                return "error";
            case 2:
                return "warning";
            case 3:
                return "info";
            case 4:
                return "question";
            default:
                return "success";
        };
    }


    
}; 