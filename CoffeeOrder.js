const coffeeUL = document.getElementById("coffeeUL")
const emailTextBox = document.getElementById("emailTextBox")
const saveBtn = document.getElementById("saveBtn")
const sizeTextBox = document.getElementById("sizeTextBox")
const priceTextBox = document.getElementById("priceTextBox")
const deleteBtn = document.getElementById("deleteBtn")
const coffeeTypeTextBox = document.getElementById("coffeeTypeTextBox")

saveBtn.addEventListener('click', function () {
    const email = emailTextBox.value
    const type = coffeeTypeTextBox.value
    const price = priceTextBox.value
    const size = sizeTextBox.value


    let orderRequest = new XMLHttpRequest()
    orderRequest.open("post", "https://troubled-peaceful-hell.glitch.me/orders")
    orderRequest.setRequestHeader("Content-Type", "application/json")
    orderRequest.addEventListener('load', function () {
        console.log(this.responseText)
        const coffee = JSON.parse(this.responseText)
        coffeeItem = `<li>${coffee.email}</li>`
        coffeeUL.insertAdjacentHTML('beforeend', coffeeItem)
        console.log(coffee)
    })

    const body = {
        email: email,
        type: type,
        price: price,
        size: size
    }

    orderRequest.send(JSON.stringify(body))
})
function getAllUsers(orderLoaded) {

    let orderRequest = new XMLHttpRequest()
    orderRequest.open('GET', 'https://troubled-peaceful-hell.glitch.me/orders?page=1')
    orderRequest.send()

    orderRequest.addEventListener('load', function () {
        const orderResult = JSON.parse(this.responseText)
        const coffee = orderResult.data
        orderLoaded(coffee)
    })
}

function displayUsers(coffee) {
    const userItems = coffee.map(function (coffee) {
        return `<li>
        <label>${coffee.email}</label>
        <label>${coffee.type}</label>
        <label>${coffee.price}</label>
        <label>${coffee.size}</label>

    </li>`
    })
    coffeeUL.innerHTML = userItems.join("")

}
