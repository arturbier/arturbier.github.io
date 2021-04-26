function addJavaScript(src, type) {
    return new Promise(resolve => {
        let script = document.createElement('script')
        script.src = src

        if (type)
            script.type = type

        script.addEventListener('load', function() {
            resolve()
        })

        document.head.appendChild(script)
    })
}

function Timer(seconds) {
    let self = this
    self.seconds = seconds
    self.isCompleted = false
    self._timer = setInterval(() => {
        self.seconds -= 1

        if (self.seconds <= 0) {
            self.seconds = 0
            self.isCompleted = true
            clearInterval(self._timer)
        }
    }, 1000)
}