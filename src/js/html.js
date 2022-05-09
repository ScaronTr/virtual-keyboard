import keys from './keys.js'

function createBody() {
   alert(`Добрый день. Я не успел доделать задание и поэтому у меня есть просьба к Вам - проверить мою работу 11.05 после обеда. Большое спасибо за понимание!`);
   window.addEventListener('load', () => {
      if (localStorage.length == 0) {
         lang = 'en';
         createKeyboard(keys.keysOrder.en)
      }
      
      if (localStorage.getItem('lang') == 'en') {
         lang = 'en';
         createKeyboard(keys.keysOrder.en);
      } else if (localStorage.getItem('lang') == 'ru') {
         lang = 'ru';
         createKeyboard(keys.keysOrder.ru);
      }
      elementArr.forEach((item, index) => {
         map.set(keys.keysOrder.enDefault[index], item);
      })
   })

   const body = document.body;
   body.classList.add('body');

   const container = createElement('div', 'container', body);
   const title = createElement('h1', 'title', container, 'virtual keyboard');
   const textArea = createElement('textarea', 'textarea', container);
   const keyboard = createElement('div', 'keyboard', container);
   const keyboardMainPart = createElement('div', 'keyboard__main-part', keyboard);
   const keyboardMainPartRows = [];
  
   let lang;
   let elementArr = [];
   const obj = {};
   let map = new Map();

   addFunctionalForKeyboard();

   window.addEventListener('beforeunload', () => {
      localStorage.setItem('lang', lang);
   })

   function addFunctionalForKeyboard() {
      let key;
      let code;
      let currentElement;
      let capsLockOn = false;
      let shiftOn = false;

      body.addEventListener('keydown', event => {
         key = event.key;
         code = event.code;

         if (elementArr.find(item => (key == item.textContent || key == item.textContent.toUpperCase()) ? item : false) || map.get(key) || map.get(key.toLowerCase()) || obj[code] || keys.keysOrder.ruShift.includes(key)) {
            if (lang == 'ru') {
               currentElement = map.get(key) || map.get(key.toLowerCase()) || obj[code];
            } else currentElement = elementArr.find(item => (key == item.textContent || key == item.textContent.toUpperCase()) ? item : false) || obj[code]; 
            if (key == 'CapsLock' && !capsLockOn) {
               currentElement.classList.add('keyboard__key_active');
               capsLockOn = true;
            } else if (key == 'CapsLock' && capsLockOn && !event.repeat) {
               currentElement.classList.remove('keyboard__key_active');
               capsLockOn = false;
            } else if (key == 'Shift') {
               currentElement.classList.add('keyboard__key_active');
               shiftOn = true;
            } else currentElement.classList.add('keyboard__key_active');
                     
            if (obj['AltLeft'].classList.contains('keyboard__key_active') && obj['ControlLeft'].classList.contains('keyboard__key_active')) {
               if (lang == 'en') lang = 'ru';
               else lang = 'en';
            }

            if (!capsLockOn && !shiftOn) { 
               if (lang == 'en') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.enDefault[index])
               else if (lang == 'ru') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.ruDefault[index]);
            } else if (capsLockOn && !shiftOn) {
               if (lang == 'en') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.enCaps[index])
               else if (lang == 'ru') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.ruCaps[index]);
            } else if (!capsLockOn && shiftOn) {
               if (lang == 'en') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.enShift[index])
               else if (lang == 'ru') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.ruShift[index]);
            } else if (capsLockOn && shiftOn) {
               if (lang == 'en') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.enShiftCaps[index])
               else if (lang == 'ru') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.ruShiftCaps[index]);
            }

            if (!obj[code]) textArea.value += currentElement.textContent;
         }
      }) 

      body.addEventListener('keyup', event => {
         key = event.key;
         code = event.code;
         if (elementArr.find(item => (key == item.textContent || key == item.textContent.toUpperCase()) ? item : false) || map.get(key) || map.get(key.toLowerCase()) || obj[code]) {
            if (lang == 'ru') {
               currentElement = map.get(key) || map.get(key.toLowerCase()) || obj[code];
            } else currentElement = elementArr.find(item => (key == item.textContent || key == item.textContent.toUpperCase()) ? item : false) || obj[code];
            if (key != 'CapsLock') currentElement.classList.remove('keyboard__key_active');
            if (key == 'Shift') {
               shiftOn = false;
               if (lang == 'en') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.enDefault[index])
               else if (lang == 'ru') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.ruDefault[index]);
            }
   
            if (!capsLockOn && !shiftOn) { 
               if (lang == 'en') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.enDefault[index])
               else if (lang == 'ru') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.ruDefault[index]);
            } else if (capsLockOn && !shiftOn) {
               if (lang == 'en') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.enCaps[index])
               else if (lang == 'ru') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.ruCaps[index]);
            } else if (!capsLockOn && shiftOn) {
               if (lang == 'en') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.enShift[index])
               else if (lang == 'ru') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.ruShift[index]);
            } else if (capsLockOn && shiftOn) {
               if (lang == 'en') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.enShiftCaps[index])
               else if (lang == 'ru') elementArr.forEach((item, index) => item.textContent = keys.keysOrder.ruShiftCaps[index]);
            }

         }
      })

      document.onkeydown = (event) => {
         if (event.ctrlKey || event.altKey || event.keyCode >= 112 && event.keyCode <= 122) {
            return false;
         }

         if (event.key == 'Tab') {
            textArea.value = textArea.value + '\t';
            return false         
         }
      }
   }

   function createKeyboard(origin) {
      for (let i = 0; i < origin.length; i++) {
         keyboardMainPartRows.push(createElement('div', 'keyboard__main-part-row', keyboardMainPart));
         for (let value of origin[i]) {
            if (!Array.isArray(value)) {
               if (value.length > 1 && value[0] == 'F') obj[value] = (createElement('button', 'keyboard__key', keyboardMainPartRows[i], value))
               else {
                  elementArr.push(createElement('button', 'keyboard__key', keyboardMainPartRows[i], value));
               }
            } else {
               obj[value[1]] = (createElement('button', 'keyboard__key', keyboardMainPartRows[i], value[0]));
            }
         }
      }
   }
}

const createElement = (tag, cssClass, parent, text) => {
   const element = document.createElement(tag);
   element.classList.add(cssClass);
   if (text) element.textContent = text;
   parent.append(element);
   return element;
}

export {createBody}