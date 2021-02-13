export function upload(selector, options = {}) {
    const input = document.querySelector(selector)

    const open = document.createElement('button')
    open.classList.add('btn')
    open.textContent = 'Открыть'

    if(options.multi) {
        input.setAttribute('multiple', true)
    }

    if(options.accept && Array.isArray(options.accept)) {
        //значение данного атрибута строка через запятую
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', open)

    const triggerInput = () => input.click()
    const changeHandler = event => {
        //если не выбрали ни одного файла
        if(event.target.files.length === 0){
            return
        }

        const files = Array.from(event.target.files)
        //ES6 const {files} = event.target и что ВАЖНО FILES НЕ ЯВЛЯЕТСЯ МАССИВОМ НО МЕТОД FROM()
        //ГЛОБАЛЬНОГО КЛАССА ARRAY ПРИВОДИТ FILES К МАССИВУ
        files.forEach(file => {
            if(!file.type.match('image')) {
                return
            }

            const reader = new FileReader()

            reader.onload = event => {
                console.log(event.target.result)
                input.insertAdjacentHTML('afterend', `<img src="${event.target.result}">`)
            }

            reader.readAsDataURL(file)
        })

    }

    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
}