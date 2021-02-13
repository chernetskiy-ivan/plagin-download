export function upload(selector) {
    const input = document.querySelector(selector)

    const open = document.createElement('button')
    open.classList.add('btn')
    open.textContent = 'Открыть'

    input.insertAdjacentElement('afterend', open)
}