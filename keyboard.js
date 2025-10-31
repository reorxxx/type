function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    if (!keyboard) return;
    keyboard.innerHTML = ''; // Clear existing keyboard

    const keysLayout = [
        [{ code: 'Backquote', text: '`' }, { code: 'Digit1', text: '1' }, { code: 'Digit2', text: '2' }, { code: 'Digit3', text: '3' }, { code: 'Digit4', text: '4' }, { code: 'Digit5', text: '5' }, { code: 'Digit6', text: '6' }, { code: 'Digit7', text: '7' }, { code: 'Digit8', text: '8' }, { code: 'Digit9', text: '9' }, { code: 'Digit0', text: '0' }, { code: 'Minus', text: '-' }, { code: 'Equal', text: '=' }, { code: 'Backspace', text: 'Backspace', flexGrow: 2 }],
        [{ code: 'Tab', text: 'Tab', flexGrow: 1.5 }, { code: 'KeyQ', text: 'Q' }, { code: 'KeyW', text: 'W' }, { code: 'KeyE', text: 'E' }, { code: 'KeyR', text: 'R' }, { code: 'KeyT', text: 'T' }, { code: 'KeyY', text: 'Y' }, { code: 'KeyU', text: 'U' }, { code: 'KeyI', text: 'I' }, { code: 'KeyO', text: 'O' }, { code: 'KeyP', text: 'P' }, { code: 'BracketLeft', text: '[' }, { code: 'BracketRight', text: ']' }, { code: 'Backslash', text: '\\', flexGrow: 1.5 }],
        [{ code: 'CapsLock', text: 'CapsLock', flexGrow: 1.75 }, { code: 'KeyA', text: 'A' }, { code: 'KeyS', text: 'S' }, { code: 'KeyD', text: 'D' }, { code: 'KeyF', text: 'F' }, { code: 'KeyG', text: 'G' }, { code: 'KeyH', text: 'H' }, { code: 'KeyJ', text: 'J' }, { code: 'KeyK', text: 'K' }, { code: 'KeyL', text: 'L' }, { code: 'Semicolon', text: ';' }, { code: 'Quote', text: "'" }, { code: 'Enter', text: 'Enter', flexGrow: 2.25 }],
        [{ code: 'ShiftLeft', text: 'Shift', flexGrow: 2.25 }, { code: 'KeyZ', text: 'Z' }, { code: 'KeyX', text: 'X' }, { code: 'KeyC', text: 'C' }, { code: 'KeyV', text: 'V' }, { code: 'KeyB', text: 'B' }, { code: 'KeyN', text: 'N' }, { code: 'KeyM', text: 'M' }, { code: 'Comma', text: ',' }, { code: 'Period', text: '.' }, { code: 'Slash', text: '/' }, { code: 'ShiftRight', text: 'Shift', flexGrow: 2.75 }],
        [{ code: 'ControlLeft', text: 'Ctrl', flexGrow: 1.25 }, { code: 'AltLeft', text: 'Alt', flexGrow: 1.25 }, { code: 'Space', text: ' ', flexGrow: 6.25 }, { code: 'AltRight', text: 'Alt', flexGrow: 1.25 }, { code: 'ControlRight', text: 'Ctrl', flexGrow: 1.25 }]
    ];

    keysLayout.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('keyboard-row');
        row.forEach(keyInfo => {
            const keyElement = document.createElement('div');
            keyElement.classList.add('key');
            keyElement.innerText = keyInfo.text;
            keyElement.setAttribute('data-code', keyInfo.code);
            keyElement.setAttribute('data-key', keyInfo.text.toLowerCase());
            keyElement.style.flexGrow = keyInfo.flexGrow || 1;
            rowElement.appendChild(keyElement);
        });
        keyboard.appendChild(rowElement);
    });
}
