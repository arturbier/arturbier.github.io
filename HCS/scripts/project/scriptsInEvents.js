


const scriptsInEvents = {

	async E_app_Event4_Act1(runtime, localVars)
	{
// Создаем новый элемент <style>
const style = document.createElement('style');
style.type = 'text/css';

// Добавляем стили в элемент <style>
style.innerHTML = `
    /* Стили для элемента с id number */
    #number {
        background-color: transparent;
        border: none;
        outline: none;
        text-align: center;
        padding: 10px;
        -moz-appearance: textfield;
        -webkit-appearance: none;
        font-family: 'SFProText-Medium', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: clamp(20px, 3vw, 30px);
        color: rgb(125, 125, 125);
    }
    #number::placeholder {
        font-size: 14px;
        color: rgb(140, 140, 140);
    }
    #number::-webkit-inner-spin-button,
    #number::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Стили для элемента с id price */
    #price {
        background-color: transparent;
        border: none;
        outline: none;
        text-align: center;
        padding: 10px;
        -moz-appearance: textfield;
        -webkit-appearance: none;
        font-family: 'SFProText-Medium', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: clamp(15px, 2vw, 20px);
        color: rgb(125, 125, 125);
    }
    #price::placeholder {
        font-size: clamp(12px, 2vw, 18px);
        color: rgb(140, 140, 140);
    }
    #price::-webkit-inner-spin-button,
    #price::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

// Вставляем элемент <style> в <head> документа
document.head.appendChild(style);
	},

	async E_app_Event4_Act2(runtime, localVars)
	{


        // Создаем новый элемент <style>
        const style = document.createElement('style');
        style.innerHTML = `
            .glass {
                padding: 20px 40px;
                font-size: 18px;
                color: white;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(0px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                transition: all 0.3s ease;
				pointer-events: none; /* Отключаем касания */
            }
        `;
        // Встраиваем стили в <head>
        document.head.appendChild(style);

        // Добавляем класс к кнопке
        document.getElementById('glass-button').classList.add('glass');


	},

	async E_app_Event149_Act1(runtime, localVars)
	{


        // Создаем новый элемент <style>
        const style = document.createElement('style');
        style.innerHTML = `
            .glass {
                padding: 20px 40px;
                font-size: 18px;
                color: white;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(5px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                transition: all 0.3s ease;
				pointer-events: auto; /* Включаем касания */
            }
        `;
        // Встраиваем стили в <head>
        document.head.appendChild(style);

        // Добавляем класс к кнопке
        document.getElementById('glass-button').classList.add('glass');


	},

	async E_app_Event150_Act1(runtime, localVars)
	{


        // Создаем новый элемент <style>
        const style = document.createElement('style');
        style.innerHTML = `
            .glass {
                padding: 20px 40px;
                font-size: 18px;
                color: white;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(0px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                transition: all 0.3s ease;
				pointer-events: none; /* Отключаем касания */
            }
        `;
        // Встраиваем стили в <head>
        document.head.appendChild(style);

        // Добавляем класс к кнопке
        document.getElementById('glass-button').classList.add('glass');


	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

