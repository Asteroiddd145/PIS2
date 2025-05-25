window.addEventListener("load", () => {
    fetch("/api/user/services")
        .then(res => {
            if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`)
            return res.json()
        })
        .then(data => {
            const container = document.getElementById("content")
            container.innerHTML = ""
            data.services.forEach(service => {
                const div = document.createElement("div")
                div.className = "service"
                const h2 = document.createElement("h2")
                h2.textContent = service.name
                div.appendChild(h2)
                container.appendChild(div)
            })
        })
        .catch(err => {
            const container = document.getElementById("content")
            container.innerHTML = `<p class="message" style="color: red;">Ошибка: ${err.message}</p>`
        })
})