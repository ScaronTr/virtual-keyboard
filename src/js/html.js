import keys from './keys';

export default function createBody() {
  function createElement(tag, cssClass, parent, text = false) {
    const element = document.createElement(tag);
    element.classList.add(cssClass);
    if (text) element.textContent = text;
    parent.append(element);
    return element;
  }

  const { body } = document;
  const container = createElement('div', 'container', body);
  createElement('h1', 'title', container, 'Virtual keyboard');
  const textArea = createElement('textarea', 'textarea', container);
  const keyboard = createElement('div', 'keyboard', container);
  const keyboardRows = [];
  createElement('span', 'description', container, 'Keyboard created in Windows OS. Press left Ctrl + left Alt for translate language.');

  let capsIndicator;
  let lang = 'en';
  const mainKeysObj = {};
  const serviceKeysObj = {};

  function createKeyboard(origin) {
    origin.forEach((item, index) => {
      keyboardRows.push(createElement('div', 'keyboard__row', keyboard));
      item.forEach((value) => {
        if (keys.keysOrder.serviceKeys.includes(value[1])) {
          serviceKeysObj[value[1]] = (createElement('button', 'keyboard__key', keyboardRows[index], value[0]));
          serviceKeysObj[value[1]].classList.add('keyboard__service-key');
          if (value[1] === 'CapsLock') capsIndicator = createElement('div', 'caps-indicator', serviceKeysObj[value[1]]);
        } else mainKeysObj[value[1]] = (createElement('button', 'keyboard__key', keyboardRows[index], value[0]));
      });
    });
  }

  window.addEventListener('load', () => {
    if (!localStorage || localStorage.length === 0) {
      lang = 'en';
      createKeyboard(keys.keysOrder.en);
    }

    if (localStorage.getItem('lang') === 'en') {
      lang = 'en';
      createKeyboard(keys.keysOrder.en);
    } else if (localStorage.getItem('lang') === 'ru') {
      lang = 'ru';
      createKeyboard(keys.keysOrder.ru);
    }
  });

  function updateKeys(type) {
    Object.keys(mainKeysObj).forEach((item, index) => {
      if (index < type.length) mainKeysObj[item].textContent = type[index];
    });
  }

  function addFunctionalForKeyboard() {
    let key;
    let mouseKey;
    let code;
    let currentElement;
    let capsLockOn = false;
    let shiftOn = false;

    const enDefault = keys.keysOrder.enDefault.split('');
    const enCaps = keys.keysOrder.enCaps.split('');
    const enShift = keys.keysOrder.enShift.split('');
    const enShiftCaps = keys.keysOrder.enShiftCaps.split('');

    const ruDefault = keys.keysOrder.ruDefault.split('');
    const ruCaps = keys.keysOrder.ruCaps.split('');
    const ruShift = keys.keysOrder.ruShift.split('');
    const ruShiftCaps = keys.keysOrder.ruShiftCaps.split('');

    keyboard.addEventListener('click', (event) => {
      mouseKey = event.target.textContent;
      if (Object.values(mainKeysObj).includes(event.target)) {
        textArea.value += mouseKey;
      } else if (Object.values(serviceKeysObj).includes(event.target)) {
        if (mouseKey === 'Tab') {
          textArea.value += '\t';
        }

        if (mouseKey === 'BackSpace') textArea.value = textArea.value.slice(0, textArea.value.length - 1);
        if (mouseKey === 'Enter') textArea.value += '\n';
        if (mouseKey === 'Space') textArea.value += ' ';

        if (mouseKey === 'CapsLock' && !capsLockOn) {
          capsIndicator.classList.add('caps-indicator_active');
          capsLockOn = true;
        } else if (mouseKey === 'CapsLock' && capsLockOn) {
          capsIndicator.classList.remove('caps-indicator_active');
          capsLockOn = false;
        } else if (mouseKey === 'Shift' && !shiftOn) {
          event.target.classList.add('keyboard__key_active');
          shiftOn = true;
        } else if (mouseKey === 'Shift' && shiftOn) {
          event.target.classList.remove('keyboard__key_active');
          shiftOn = false;
        }

        if (!capsLockOn && !shiftOn) {
          if (lang === 'en') updateKeys(enDefault);
          else if (lang === 'ru') updateKeys(ruDefault);
        } else if (capsLockOn && !shiftOn) {
          if (lang === 'en') updateKeys(enCaps);
          else if (lang === 'ru') updateKeys(ruCaps);
        } else if (!capsLockOn && shiftOn) {
          if (lang === 'en') updateKeys(enShift);
          else if (lang === 'ru') updateKeys(ruShift);
        } else if (capsLockOn && shiftOn) {
          if (lang === 'en') updateKeys(enShiftCaps);
          else if (lang === 'ru') updateKeys(ruShiftCaps);
        }
      }
    });

    body.addEventListener('keydown', (event) => {
      key = event.key;
      code = event.code;
      if (mainKeysObj[code] || serviceKeysObj[code]) {
        currentElement = mainKeysObj[code] || serviceKeysObj[code];

        if (key === 'CapsLock' && !capsLockOn && !event.repeat) {
          currentElement.classList.add('keyboard__key_active');
          capsIndicator.classList.add('caps-indicator_active');
          capsLockOn = true;
        } else if (key === 'CapsLock' && capsLockOn && !event.repeat) {
          currentElement.classList.add('keyboard__key_active');
          capsIndicator.classList.remove('caps-indicator_active');
          capsLockOn = false;
        } else if (key === 'Shift' && !shiftOn) {
          currentElement.classList.add('keyboard__key_active');
          shiftOn = true;
        } else if (key === 'Shift' && shiftOn && !event.repeat) {
          currentElement.classList.remove('keyboard__key_active');
          shiftOn = false;
        } else if (currentElement) {
          currentElement.classList.add('keyboard__key_active');
        }

        if (serviceKeysObj.AltLeft.classList.contains('keyboard__key_active') && serviceKeysObj.ControlLeft.classList.contains('keyboard__key_active')) {
          if (lang === 'en') lang = 'ru';
          else lang = 'en';
        }

        if (!capsLockOn && !shiftOn) {
          if (lang === 'en') updateKeys(enDefault);
          else if (lang === 'ru') updateKeys(ruDefault);
        } else if (capsLockOn && !shiftOn) {
          if (lang === 'en') updateKeys(enCaps);
          else if (lang === 'ru') updateKeys(ruCaps);
        } else if (!capsLockOn && shiftOn) {
          if (lang === 'en') updateKeys(enShift);
          else if (lang === 'ru') updateKeys(ruShift);
        } else if (capsLockOn && shiftOn) {
          if (lang === 'en') updateKeys(enShiftCaps);
          else if (lang === 'ru') updateKeys(ruShiftCaps);
        }

        if (mainKeysObj[code]) {
          textArea.value += mainKeysObj[code].textContent;
        }
      }
    });

    body.addEventListener('keyup', (event) => {
      key = event.key;
      code = event.code;
      if (mainKeysObj[code] || serviceKeysObj[code]) {
        currentElement = mainKeysObj[code] || serviceKeysObj[code];
        if (key !== 'CapsLock') currentElement.classList.remove('keyboard__key_active');
        else if (key === 'CapsLock') {
          setTimeout(() => {
            currentElement.classList.remove('keyboard__key_active');
          }, 50);
        }
        if (key === 'Shift') {
          shiftOn = false;
          if (lang === 'en') updateKeys(enDefault);
          else if (lang === 'ru') updateKeys(ruDefault);
        }

        if (!capsLockOn && !shiftOn) {
          if (lang === 'en') updateKeys(enDefault);
          else if (lang === 'ru') updateKeys(ruDefault);
        } else if (capsLockOn && !shiftOn) {
          if (lang === 'en') updateKeys(enCaps);
          else if (lang === 'ru') updateKeys(ruCaps);
        } else if (!capsLockOn && shiftOn) {
          if (lang === 'en') updateKeys(enShift);
          else if (lang === 'ru') updateKeys(ruShift);
        } else if (capsLockOn && shiftOn) {
          if (lang === 'en') updateKeys(enShiftCaps);
          else if (lang === 'ru') updateKeys(ruShiftCaps);
        }
      }
    });

    document.onkeydown = (event) => {
      if (event.key === 'Tab') {
        textArea.value += '\t';
      } else if (code === 'Backspace') textArea.value = textArea.value.slice(0, textArea.value.length - 1);
      else if (code === 'Enter') textArea.value += '\n';
      else if (code === 'Space') textArea.value += ' ';
      return (code === 'F5' || code === 'F12');
    };
  }

  body.classList.add('body');

  addFunctionalForKeyboard();

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('lang', lang);
  });
}
