// DON'T CHANGE THIS LINE
const myBadAssGarage = window.myBadAssGarage;
// //////////////////////


// //////////////////////
// Pseudo-code
// //////////////////////

// ✅ 0. Add the data-controller in the HTML!

// ///
// Get all the cars
// ///

// ✅ 1. Select the car list div (Stimulus Target)

// ✅ 2. No event listener, we get the car when the refresh (= connect)
// Create a method getCars in the controller

// ✅ 2.5 Fetch the wagon-garage API (get array of cars)

// ✅ 3. For each cars, insert a car cards into the car list div

// ///
// Add a new car
// ///

// ✅ 1. Select 4 inputs (maybe the add a car?) (Stimulus Target)

// ✅ 2. Listen to a click on "add a car" (Stimulus Action)

// ✅ 2.5 POST request to add the car in the garage API

// ✅ Display the cars: do the "Get all the cars" step!

// //////////////////////
// Code
// //////////////////////
// Tips: use 'sch' shortcut to build the controller
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = [ 'sickGarage', 'brand', 'model', 'owner', 'plate' ]

  connect() {
    this.url = `https://wagon-garage-api.herokuapp.com/${myBadAssGarage}/cars`;
    console.log('Hello from garage_controller.js')
    console.log(this.sickGarageTarget)
    this.getCars();
  }

  getCars() {
    console.log("getCars");
    fetch(this.url)
      .then(response => response.json())
      .then((data) => {
        console.log(data); // an array of objects
        this.displayCars(data);
      })
  }

  addCar(event) {
    event.preventDefault()
    const car = {
      brand: this.brandTarget.value,
      model: this.modelTarget.value,
      owner: this.ownerTarget.value,
      plate: this.plateTarget.value
    };

    const options = { 
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    }

    fetch(this.url, options)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        // display all cars
        this.sickGarageTarget.innerHTML = "";
        this.getCars();
      })
  }

  displayCars(cars) {
    cars.forEach((car) => {
      this.sickGarageTarget.insertAdjacentHTML(
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
    });
  }
}