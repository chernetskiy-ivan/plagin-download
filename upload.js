function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes == 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

export function upload(selector, options = {}) {
    const input = document.querySelector(selector)
    const preview = document.createElement('div')

    preview.classList.add('preview')

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

    input.insertAdjacentElement('afterend', preview)
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
        preview.innerHTML = ''
        files.forEach(file => {
            if(!file.type.match('image')) {
                return
            }

            const reader = new FileReader()

            reader.onload = event => {
                const src = event.target.result
                preview.insertAdjacentHTML('afterbegin', `
                <div class="preview-image">
                <div class="preview-remove" data-name="${file.name}">&times;</div>
                    <img src="${src}" alt="${file.name}"/>
                    <div class="preview-info">
                        <span>${file.name}</span>
                        ${bytesToSize(file.size)}
                    </div>
                </div>
                `)
            }

            reader.readAsDataURL(file)
        })

    }

    const removeHandler = event => {
        if(!event.target.dataset.name) {
          return
        }

        const name = event.target.dataset.name
        console.log(name)
    }

    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
    preview.addEventListener('click', removeHandler)
}