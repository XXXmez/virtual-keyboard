import keyBtns from './data';
import '../styles/style.scss';

const body = document.querySelector('body');

let langKeybord = 'eng',
    capsLock = false,
    langBtns = [],
    mouselangBtns = [],
    shiftKeyActiv = false;

class GenerateBtn {
    constructor(containerTextarea, containerKeybord, keyNameClass, keyEngCode, keyRusCode, keyCapsEngCode, keyCapsRusCode){
        this.containerTextarea = containerTextarea;
        this.containerKeybord = containerKeybord;
        this.keyNameClass = keyNameClass;
        this.keyEngCode = keyEngCode;
        this.keyRusCode = keyRusCode;
        this.keyCapsEngCode = keyCapsEngCode;
        this.keyCapsRusCode = keyCapsRusCode;
    }
    generat() {
        const btn = document.createElement('div');
        btn.className = `keyboard-key ${this.keyNameClass}`;
        btn.innerHTML = `
            <span class='eng'>${this.keyEngCode}</span>
            <span class='rus hidden-key'>${this.keyRusCode}</span>
            <span class='capsEng hidden-key'>${this.keyCapsEngCode}</span>
            <span class='capsRus hidden-key'>${this.keyCapsRusCode}</span>
        `;
        document.addEventListener('keydown', (e) => {
            const butBtn = (e.code != 'CapsLock' && e.code != 'ControlLeft' 
                && e.code != 'AltLeft' && e.code != 'ShiftLeft' 
                && e.code != 'Backspace' && e.code != 'Tab'
                && e.code != 'MetaLeft' && e.code != 'AltRight'
                && e.code != 'ControlRight' && e.code != 'ShiftRight'
                && e.code != 'Enter' && e.code != 'Delete');
            e.preventDefault();
            if (e.code == this.keyNameClass && butBtn) {
                btnTap(btn, this.containerTextarea);
            }
            if (e.code == this.keyNameClass && e.code === 'Backspace') {
                backspaceTap(btn, this.containerTextarea)
            }
            if (e.code == this.keyNameClass && e.code === 'Tab') {
                tabTap(btn, this.containerTextarea)
            }
            if (e.code == this.keyNameClass && e.code === 'Enter') {
                enterTap(btn, this.containerTextarea)
            }
            if (e.code == this.keyNameClass && e.code === 'Delete') {
                deleteTap(btn, this.containerTextarea);
            }
            if (e.code == this.keyNameClass && e.code === 'CapsLock') {
                capsLockTap(btn)
            }
            if (e.code == this.keyNameClass && e.code === 'ControlLeft' || e.code == this.keyNameClass && e.code === 'AltLeft' || e.code == this.keyNameClass && e.code === 'ControlRight' || e.code == this.keyNameClass && e.code === 'AltRight') {
                keyboardLang(e, btn)
            }
            if (e.code == this.keyNameClass && e.code === 'ShiftLeft' || e.code == this.keyNameClass && e.code === 'ShiftRight') {
                shiftTap(e, btn)
            }
            if (e.code == this.keyNameClass && e.code === 'MetaLeft') {
                btn.classList.add('active');
            }
        });
        document.addEventListener('keyup', (e) => {
            const butBtn = (e.code != 'CapsLock' && e.code != 'ControlLeft' 
                && e.code != 'AltLeft' && e.code != 'ShiftLeft' 
                && e.code != 'Backspace' && e.code != 'Tab'
                && e.code != 'MetaLeft' && e.code != 'AltRight'
                && e.code != 'ControlRight' && e.code != 'ShiftRight'
                && e.code != 'Enter' && e.code != 'Delete');
            e.preventDefault();
            if (e.code == this.keyNameClass && butBtn) {
                btn.classList.remove('active');
            }
            if (e.code == this.keyNameClass && e.code === 'ControlLeft' || e.code == this.keyNameClass && e.code === 'AltLeft' || e.code == this.keyNameClass && e.code === 'ControlRight' || e.code == this.keyNameClass && e.code === 'AltRight') {
                if (e.repeat) return;
                btn.classList.remove('active');
                langBtns.pop();
            }
            if (e.code == this.keyNameClass && e.code === 'ShiftLeft' || e.code == this.keyNameClass && e.code === 'ShiftRight') {
                btn.classList.remove('active');
                if (capsLock) { capsLock = false}
                else {capsLock = true}
                btnLangCaps(langKeybord, capsLock, 0)
                if (shiftKeyActiv) shiftKeyActiv = false;
            }
            if (e.code == this.keyNameClass && e.code === 'Backspace') {
                btn.classList.remove('active');
            }
            if (e.code == this.keyNameClass && e.code === 'Tab') {
                btn.classList.remove('active');
            }
            if (e.code == this.keyNameClass && e.code === 'MetaLeft') {
                btn.classList.remove('active');
            }
            if (e.code == this.keyNameClass && e.code === 'Enter') {
                btn.classList.remove('active');
            }
            if (e.code == this.keyNameClass && e.code === 'Delete') {
                btn.classList.remove('active');
            }
        });
        btn.addEventListener('click', (e) => {
            mouseClick(e, this.keyNameClass, this.containerTextarea)
        });
        this.containerKeybord.append(btn);
    }
}
function createKeybord(link) {
    const container = document.createElement('div');
    container.className = 'container';
    const containerTitle = document.createElement('h1');
    containerTitle.className = 'container-title';
    containerTitle.innerText = 'Virtual keyboard';
    const containerTextarea = document.createElement('textarea');
    containerTextarea.className = 'container-textarea';
    containerTextarea.rows = 10;
    const containerKeybord = document.createElement('div');
    containerKeybord.className = 'container-keybord';
    const containerDescription = document.createElement('p');
    containerDescription.className = 'container-description';
    containerDescription.innerText = 'The keyboard was created in the Windows operating system';
    const containerLanguage = document.createElement('p');
    containerLanguage.className = 'container-language';
    containerLanguage.innerText = 'To switch the language, the combination is: ctrl + alt';
    container.append(containerTitle);
    container.append(containerTextarea);
    container.append(containerKeybord);
    container.append(containerDescription);
    container.append(containerLanguage);
    keyBtns.forEach((e) => {
        new GenerateBtn(containerTextarea, containerKeybord, e.class, e.eng, e.rus, e.capsEng, e.capsRus).generat()
    })
    link.append(container)
}
createKeybord(body)
function btnLangCaps(lang, caps, num) {
    const btnEng = document.querySelectorAll('.eng'),
        btnRus = document.querySelectorAll('.rus'),
        btnCapsEng = document.querySelectorAll('.capsEng'),
        btnCapsRus = document.querySelectorAll('.capsRus');
    if (caps) {
        if (lang == 'eng') {
            btnEng.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
            btnRus.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
            btnCapsRus.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
            btnCapsEng.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.remove('hidden-key')})
        } else if (lang == 'rus') {
            btnEng.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
            btnRus.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
            btnCapsRus.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.remove('hidden-key')})
            btnCapsEng.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
        }
    } else {
        if (lang == 'eng') {
            btnEng.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.remove('hidden-key')})
            btnRus.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
            btnCapsRus.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
            btnCapsEng.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
        } else if (lang == 'rus') {
            btnEng.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
            btnRus.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.remove('hidden-key')})
            btnCapsRus.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
            btnCapsEng.forEach ((e,i) => {if(i == 0 || i >= num) e.classList.add('hidden-key')})
        }
    }
}
function btnTap(button, textarea) {
    button.classList.add('active');
    let start = textarea.selectionStart,
        strStart = textarea.value.slice(0, textarea.selectionStart),
        strEnd = textarea.value.slice(textarea.selectionStart, textarea.value.length);
    [...button.children].forEach(e => {
        if (!e.classList.contains('hidden-key')) {
            textarea.value = strStart + e.textContent + strEnd;
        }
    });
    textarea.selectionEnd = textarea.selectionStart = +(start + 1);
    textarea.focus();
}
function backspaceTap(button, textarea) {
    button.classList.add('active');
    let start = textarea.selectionStart == 0 ? 0 : textarea.selectionStart - 1,
        strStart = textarea.value.slice(0, start),
        strEnd = textarea.value.slice(textarea.selectionStart, textarea.value.length);
    textarea.value = strStart + strEnd;
    textarea.selectionEnd = textarea.selectionStart = start;
    textarea.focus();
}
function tabTap(button, textarea) {
    button.classList.add('active');
    let start = textarea.selectionStart,
        strStart = textarea.value.slice(0, textarea.selectionStart),
        strEnd = textarea.value.slice(textarea.selectionStart, textarea.value.length);
    textarea.value = strStart + '    ' + strEnd;
    textarea.selectionEnd = textarea.selectionStart = start + 4;
    textarea.focus();
}
function enterTap(button, textarea) {
    button.classList.add('active');
    let start = textarea.selectionStart,
        strStart = textarea.value.slice(0, textarea.selectionStart),
        strEnd = textarea.value.slice(textarea.selectionStart, textarea.value.length);
    textarea.value = strStart + '\n' + strEnd;
    textarea.selectionEnd = textarea.selectionStart = start + 1;
    textarea.focus();
}
function deleteTap(button, textarea) {
    button.classList.add('active');
    let start = textarea.selectionStart,
        strStart = textarea.value.slice(0, textarea.selectionStart),
        strEnd = textarea.value.slice(textarea.selectionStart + 1, textarea.value.length);
    textarea.value = strStart + strEnd;
    textarea.selectionEnd = textarea.selectionStart = start;
    textarea.focus();
}
function keyboardLang(event, button) {
    if (event.repeat) return;
    button.classList.add('active');
    langBtns.push(event.code);
    if (langBtns.includes('ControlLeft') && langBtns.includes('AltLeft') || langBtns.includes('ControlRight') && langBtns.includes('AltRight')) {
        if (langKeybord === 'eng') langKeybord = 'rus'
        else langKeybord = 'eng'
        btnLangCaps(langKeybord, capsLock, 0);
    }
    if (langBtns.length == 2) {
        langBtns = [];
    };
    setLang(langKeybord);
}
function keyboardLangMouseClick(eventCode, button) {
    button.classList.add('active');
    langBtns.push(eventCode);
    mouselangBtns.push(button);
    if (langBtns.includes('ControlLeft') && langBtns.includes('AltLeft') || langBtns.includes('ControlRight') && langBtns.includes('AltRight')) {
        if (langKeybord === 'eng') langKeybord = 'rus'
        else langKeybord = 'eng';
        btnLangCaps(langKeybord, capsLock, 0);
    }
    if (langBtns.length == 2) {
        langBtns = [];
        mouselangBtns.forEach(e => e.classList.remove('active'))
        mouselangBtns = [];
    };

}
function shiftTap(event, button) {
    if (!shiftKeyActiv) {
        if (event.repeat) return;
        button.classList.add('active');
        if (capsLock) { capsLock = false}
        else {capsLock = true}
        btnLangCaps(langKeybord, capsLock, 0);
        shiftKeyActiv = true;
    }
}
function shiftTapMouseClick(button) {
    let shiftK = [document.querySelector('.ShiftLeft'), document.querySelector('.ShiftRight')];
    if (!button.classList.contains('active')) {
        shiftK.forEach(e => e.classList.add('active'));
        if (capsLock) { capsLock = false}
        else {capsLock = true}
        btnLangCaps(langKeybord, capsLock, 0);
    } else {
        shiftK.forEach(e => e.classList.remove('active'));
        if (capsLock) { capsLock = false}
        else {capsLock = true}
        btnLangCaps(langKeybord, capsLock, 0);
    }
}
function capsLockTap(button) {
    if (!button.classList.contains('active')) {
        button.classList.add('active');
        if (capsLock) { capsLock = false}
        else {capsLock = true}
        btnLangCaps(langKeybord, capsLock , 14)
    } else {
        button.classList.remove('active');
        if (capsLock) { capsLock = false}
        else {capsLock = true}
        btnLangCaps(langKeybord, capsLock, 14)
    }
}
function mouseClick(event, key, textarea){
    const butBtn = (event.currentTarget.classList[1] != 'CapsLock' && event.currentTarget.classList[1] != 'ControlLeft' 
                && event.currentTarget.classList[1] != 'AltLeft' && event.currentTarget.classList[1] != 'ShiftLeft' 
                && event.currentTarget.classList[1] != 'Backspace' && event.currentTarget.classList[1] != 'Tab'
                && event.currentTarget.classList[1] != 'MetaLeft' && event.currentTarget.classList[1] != 'AltRight'
                && event.currentTarget.classList[1] != 'ControlRight' && event.currentTarget.classList[1] != 'ShiftRight'
                && event.currentTarget.classList[1] != 'Enter' && event.currentTarget.classList[1] != 'Delete');
    if (event.currentTarget.classList[1] == key && butBtn) {
        btnTap(event.currentTarget, textarea)
        event.currentTarget.classList.remove('active');
    }
    if (event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'Backspace') {
        backspaceTap(event.currentTarget, textarea)
        event.currentTarget.classList.remove('active');
    }
    if (event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'Tab') {
        tabTap(event.currentTarget, textarea);
        event.currentTarget.classList.remove('active');
    }
    if (event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'Enter') {
        enterTap(event.currentTarget, textarea);
        event.currentTarget.classList.remove('active');
    }
    if (event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'Delete') {
        deleteTap(event.currentTarget, textarea);
        event.currentTarget.classList.remove('active');
    }
    if (event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'CapsLock') {
        capsLockTap(event.currentTarget);
    }
    if (event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'ControlLeft' || event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'AltLeft' || event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'ControlRight' || event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'AltRight') {
        keyboardLangMouseClick(event.currentTarget.classList[1], event.currentTarget);
    }
    if (event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'ShiftLeft' || event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'ShiftRight') {
        shiftTapMouseClick(event.currentTarget)
    }
    if (event.currentTarget.classList[1] == key && event.currentTarget.classList[1] === 'MetaLeft') {
        alert('Let\'s pretend it\'s the start menu 😉')
    }
};
function setLang(lang){
    localStorage.setItem('langKeyboard', lang);
};
function getLang(lang){
    if (lang) {
        langKeybord = lang;
        btnLangCaps(langKeybord, capsLock, 0);
        console.log(`Save lang ${langKeybord}`);
    } else {
        console.log('No saved language yet!!!');
    }
    
};
getLang(localStorage.getItem('langKeyboard'));