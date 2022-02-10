// DON'T CHANGE THIS LINE
const myBadAssGarage = "vindiesel-mod-shop";
if (myBadAssGarage) document.querySelector("#garage-name").innerText = myBadAssGarage.replace(/-/g, " ");
// //////////////////////

// //////////////////////
// Pseudo-code
// //////////////////////

// ✅ Initiatize a Stimulus controller
// ✅ Initialize a data-controller in HTML

// SHOW CARS

// ✅ 1. Target some elements (cars-list)
// ✅ 2. We don't listen to any event! load the cars at refresh
// ✅ 2.5 Fetch the cars from our garage API
// ✅ 3. Insert the cars inside our cars-list

// ADD NEW CAR

// ✅ 1. Target some elements (4 inputs, 1 button)
// ✅ 2. Listen to a click on the button
// ✅ 2.5 POST a new car to the garage API
// ✅ 3. SHOW CARS

// //////////////////////
// Code
// //////////////////////
// Tips: use 'sjc' shortcut to build the controller
import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ 'carsList', 'brand', 'owner', 'plate','model', 'submit' ]

  connect() {
    console.log('Hello from garage_controller.js')
    console.log(this.carsListTarget)
    this.getCars();
  }

  getCars() {
    const url = `https://wagon-garage-api.herokuapp.com/${myBadAssGarage}/cars`
    fetch(url)
      .then(response => response.json())
      .then((data => {
        console.log(data)
        this.displayCars(data);
      }))
  }

  displayCars(cars) {
    this.carsListTarget.innerHTML = ''
    cars.forEach((car) => {
      this.carsListTarget.insertAdjacentHTML(
        "beforeend",
        `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong>${car.owner}</p>
            <p><strong>Plate:</strong>${car.plate}</p>
          </div>
        </div>`
      );
    })
  }

  addCar(event) {
    event.preventDefault()
    console.log(event)
    const url = `https://wagon-garage-api.herokuapp.com/${myBadAssGarage}/cars`
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "brand": this.brandTarget.value,
        "model": this.modelTarget.value,
        "owner": this.ownerTarget.value,
        "plate": this.plateTarget.value
      })
    })
      .then(response => response.json())
      .then((data => {
        console.log(data)
        this.getCars();
      }))
  }
}