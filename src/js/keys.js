export default {
   keysOrder: {
      en: [
         ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', ['BACKSPACE', 'Backspace']],
         [['TAB', 'Tab'], 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
         [['CAPSLOCK', 'CapsLock'], 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', ['ENTER', 'Enter']],
         [['SHIFT', 'ShiftLeft'], 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', ['SHIFT', 'ShiftRight'], ['↑', 'ArrowUp']],
         [['CTRL', 'ControlLeft'], ['WIN', 'MetaLeft'], ['ALT', 'AltLeft'], ['SPACE', 'Space'], ['ALT', 'AltRight'], ['WIN', 'MetaRight'], ['CONT', 'ContextMenu'], ['CTRL', 'ControlRight'], ['←', 'ArrowLeft'], ['↓', 'ArrowDown'], ['→', 'ArrowRight']],
      ],
      ru: [
         ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', ['BACKSPACE', 'Backspace']],
         [['TAB', 'Tab'], 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
         [['CAPSLOCK', 'CapsLock'], 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', ['ENTER', 'Enter']],
         [['SHIFT', 'ShiftLeft'], 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', ['SHIFT', 'ShiftRight'], ['↑', 'ArrowUp']],
         [['CTRL', 'ControlLeft'], ['WIN', 'MetaLeft'], ['ALT', 'AltLeft'], ['SPACE', 'Space'], ['ALT', 'AltRight'], ['WIN', 'MetaRight'], ['CONT', 'ContextMenu'], ['CTRL', 'ControlRight'], ['←', 'ArrowLeft'], ['↓', 'ArrowDown'], ['→', 'ArrowRight']],
      ],
      
      enDefault: '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./',
      enCaps: '`1234567890-=QWERTYUIOP[]\\ASDFGHJKL;\'ZXCVBNM,./',
      enShift: '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?',
      enShiftCaps: '~!@#$%^&*()_+qwertyuiop{}|asdfghjkl:"zxcvbnm<>?',

      ruDefault: 'ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.',
      ruCaps: 'Ё1234567890-=ЙЦУКЕНГШЩЗХЪ\\ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ.',
      ruShift: 'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,',
      ruShiftCaps: 'ё!"№;%:?*()_+йцукенгшщзхъ/фывапролджэячсмитьбю,',
   }
}