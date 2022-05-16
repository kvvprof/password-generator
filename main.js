const passwordInput = document.querySelector('.password__input')
const passwordGenerateBtn = document.querySelector('.password__generate')
const passwordLengthInput = document.querySelector('.password__length')
const passwordLengthMinusBtn = document.querySelector('.password__minus')
const passwordLengthPlusBtn = document.querySelector('.password__plus')
const specialSybmolsBtn = document.querySelector('.password__symbols-btn')
const passwordStatus = document.querySelector('.password__status')

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const UPPER_CASE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const LOWER_CASE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const SYMBOLS = ['%', '*', ')', '(', '?', '@', '#', '$', '~', '&', '!', '+', '-', '_', ':', ';', '/']

let passwordLength
let symbolsChecked = true

window.onload = () => {
    passwordLengthInput.value = passwordLength = 12
    specialSybmolsBtn.innerHTML = '✓'
    createPassword()
}

passwordLengthMinusBtn.addEventListener('click', () => {
    if (passwordLength > 8) {
        passwordLength -= 1
        passwordLengthInput.value = passwordLength
    }
})

passwordLengthPlusBtn.addEventListener('click', () => {
    if (passwordLength < 20) {
        passwordLength += 1
        passwordLengthInput.value = passwordLength
    }
})

specialSybmolsBtn.addEventListener('click', () => {
    symbolsChecked = !symbolsChecked
    symbolsChecked === false ? specialSybmolsBtn.innerHTML = '' : specialSybmolsBtn.innerHTML = '✓'

})

passwordInput.addEventListener('click', () => {
    passwordInput.select()
    window.navigator.clipboard.writeText(passwordInput.value)
    passwordStatus.innerHTML = 'Пароль скопирован!'
})

// Тасование Фишера — Йетса
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const createPassword = () => {
    let index = 0
    const password = []
    passwordStatus.innerHTML = 'Нажмите на поле с паролем, чтобы его скопировать'
    if (symbolsChecked === true) {
        while (index < passwordLength / 4) {
            password.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)])
            password.push(UPPER_CASE[Math.floor(Math.random() * UPPER_CASE.length)])
            password.push(LOWER_CASE[Math.floor(Math.random() * LOWER_CASE.length)])
            password.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
            index++
        }
    } else {
        while (index < passwordLength / 3) {
            password.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)])
            password.push(UPPER_CASE[Math.floor(Math.random() * UPPER_CASE.length)])
            password.push(LOWER_CASE[Math.floor(Math.random() * LOWER_CASE.length)])
            index++
        }
    }
    shuffle(password)
    while (password.length !== passwordLength) {
        password.pop()
    }
    return passwordInput.value = password.join('')
}

passwordGenerateBtn.addEventListener('click', createPassword)

const hover = () => {
    passwordGenerateBtn.classList = 'password__generate'
}
const unHover = () => {
    passwordGenerateBtn.classList.add('password__generate--unhover')
}
