function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes == 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

const element = (tag, classes = [],content) => {
    const node = document.createElement(tag)

    if(classes.length) {
        node.classList.add(...classes)
    }

    if(content) {
        node.textContent = content
    }

    return node
}

function noop() {}

export function upload(selector, options = {}) {
    let files = []
    const onUpload = options.onUpload ?? noop
    const input = document.querySelector(selector)
    const preview = element('div',['preview'])
    const open = element('button', ['btn'], 'Открыть')
    const upload = element('button', ['btn','primary'], 'Загрузить')
    //по умолчанию не видна
    upload.style.display = 'none'

    if(options.multi) {
        input.setAttribute('multiple', true)
    }

    if(options.accept && Array.isArray(options.accept)) {
        //значение данного атрибута строка через запятую
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', upload)
    input.insertAdjacentElement('afterend', open)

    const triggerInput = () => input.click()
    const changeHandler = event => {
        //если не выбрали ни одного файла
        if(event.target.files.length === 0){
            return
        }

        files = Array.from(event.target.files)
        //ES6 const {files} = event.target и что ВАЖНО FILES НЕ ЯВЛЯЕТСЯ МАССИВОМ НО МЕТОД FROM()
        //ГЛОБАЛЬНОГО КЛАССА ARRAY ПРИВОДИТ FILES К МАССИВУ
        preview.innerHTML = ''
        upload.style.display = 'inline'
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
        files = files.filter(file => file.name !== name)

        if(!files.length) {
            upload.style.display = 'none'
        }

        const block = document.querySelector(`[data-name="${name}"]`).closest('.preview-image')
        block.classList.add('removing')
        setTimeout( () => block.remove(), 300)
    }

    const clearBlock = el => {
        //чтобы строка состояния уже стояла на месте(внизу)
        el.style.bottom = '0px'
        el.innerHTML = '<div class="preview-info-progress"></div>'
    }

    const uploadHandler = () => {
        preview.querySelectorAll('.preview-remove').forEach(e => e.remove())
        const previewInfo = preview.querySelectorAll('.preview-info')
        previewInfo.forEach(clearBlock)
        onUpload(files, previewInfo)
    }

    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
    preview.addEventListener('click', removeHandler)
    upload.addEventListener('click', uploadHandler)
}