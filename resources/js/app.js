const register = document.getElementById("register");
const registerIcon = document.getElementById("register_icon");
const login = document.getElementById("login");
const isLoggedIn = localStorage.getItem("isLoggedIn");
const logoutBtn = document.getElementById("logout-btn");
const profile = document.getElementById("profile");

// Register Button Effect
register.addEventListener('mouseover', function() {
    registerIcon.src = './resources/img/register_light.png';
});

register.addEventListener('mouseout', function() {
    registerIcon.src = './resources/img/register_dark.png';
});

// show n hide login/register buttons
function showbtns() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (isLoggedIn === "true") {
        login.style.display = "none";
        register.style.display = "none";
        profile.style.display = "flex";
    } else {
        login.style.display = "flex";
        register.style.display = "flex";
        profile.style.display = "none";
    }
}

// Subscribe Function
const subscribeForm = document.getElementById("subscribe-form");

subscribeForm.addEventListener("submit", (e) => {
    const email = subscribeForm.subscribeEmail.value;
    alert("Thank You For Subscribing Us.")
});

// show all rental cars
function fetchData() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    fetch('../data/cars.json')
    .then(response => response.json())
    .then(cars => {
        const carsContainer = document.getElementById("cars-container");
        cars.forEach(car => {
            const carDiv = document.createElement("div");
            carDiv.classList.add('car');
        
            carDiv.innerHTML = `
                <div class="details">
                    <img src="${car.img}" alt="${car.name}" id="details-car-img">
                    <h4>${car.name}</h4>
                    <hr/>
                    <div class="spec1">
                        <p class="detail-text2"><img src="./resources/img/user.png"/> ${car.capacity}</p>
                        <p class="detail-text2"><img src="./resources/img/air-con.png"/>  A/C</p>
                        <p class="detail-text1"><img src="./resources/img/model.png"/> ${car.model}</p>
                        <p class="detail-text2"><img src="./resources/img/engine.png"/>  ${car.engine}</p>
                        <p class="detail-text2"> <img src="./resources/img/location.png"/> ${car.location} </p>
                    </div>
                    <p class="price-text">$ ${car.price} <span>/day</span></p>
                    ${
                        isLoggedIn === "true" 
                        ? `<a href="details.html?id=${car.id}" class="rent-btn">Rent Now</a>` 
                        : `<a href="login.html" class="rent-btn">Rent Now</a>`
                    }
                </div>
            `;
            carsContainer.appendChild(carDiv);
        });
    }).catch(error => {
        console.error('Error loading the JSON file:', error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showbtns();
   
    if (document.body.classList.contains("rentals-page")) {  
        fetchData();
    } else if(document.body.classList.contains("details-page")) { 
        async function getCar() {
            const params = new URLSearchParams(window.location.search);

            // return params.get('id');
            const carId = params.get('id');
            const response = await fetch('../data/cars.json');
            const cars = await response.json();
            const car = cars.find(car_1 => car_1.id == carId);
            return car;
        }

        function showCarDetails() { // search car with the id and display car's details
            const carDetails = document.getElementById("car-details");
            getCar().then(car => {
                if (car) {            
                    const detailDiv = document.createElement("div");
                    detailDiv.classList.add("detail")
    
                    // show the car details
                    document.getElementById("car-title").innerHTML = `
                            <h2>${car.name}</h2>
                            `
                    detailDiv.innerHTML = `
                        <img src="${car.img}" alt="${car.name}" class="car-details-img">
                        <div>
                            <div id = "specification">
                                <h3> Specifications </h3>
                                <hr/>
                                <div class="spec-details">
                                    <p class="detail-text1"><img src="./resources/img/air-con.png"/> A/C</p>
                                    <p class="detail-text1"><img src="./resources/img/engine.png"/> ${car.engine}</p>
                                    <p class="detail-text1"><img src="./resources/img/user.png"/>  ${car.capacity}</p>
                                    <p class="detail-text1"><img src="./resources/img/model.png"/> ${car.model}</p>
                                    <p class="detail-text1"><img src="./resources/img/car-door.png"/> ${car.doors}</p>
                                    <p class="detail-text1"><img src="./resources/img/location.png"/> ${car.location}</p>
                                </div>
                                <p>$ ${car.price}/day</p>
                            </div>
                             <div class="desc">
                                <h3>Description</h3>
                                <hr/>
                                <p>${car.desc}</p>
                            </div>
                            <div class="services">
                                <div class="services-title">
                                    <h3>Price Includes</h3>
                                </div>
                                <hr/>
                                <div class="services-details">
                                    <p>
                                        <img src="../resources/img/check.png" alt="">Free Cancelliation(24h)
                                    </p>
                                    <p>
                                        <img src="../resources/img/check.png" alt="">Covered for damages
                                    </p>
                                    <p>
                                        <img src="../resources/img/check.png" alt="">
                                        Fuel Policy: same-to-same
                                    </p>
                                    <p>
                                        <img src="../resources/img/check.png" alt="">
                                        Unlimited mileage
                                    </p>
                                    <p><img src="../resources/img/check.png" alt="">
                                        Basic Cleaning
                                    </p>
                                    <p>
                                        <img src="../resources/img/check.png" alt="">
                                        Car Seats for Kids
                                    </p>
                                </div>
                            </div>
                        </div>
                       
                    `;
                    carDetails.appendChild(detailDiv);
                } else {
                    document.getElementById('car-details').innerHTML = '<h3>Car not found</h3>';
                } 
            });     
        }
        showCarDetails();

        // Cancel Button Event Listener
        const cancelButton = document.querySelector("#cancel-btn");
        cancelButton.addEventListener("click", (e) => {
            localStorage.removeItem("car");
            alert("Successfully cancelled the booking.");
            window.location.href = 'rentals.html';
        });

        const bookingForm = document.querySelector("#booking-form-input");
        bookingForm.addEventListener("submit", (e) => {
            const car = localStorage.getItem('car');
            

            e.preventDefault();
            // Get the all value from the user input.
            const firstName = bookingForm.firstName.value;
            const lastName = bookingForm.lastName.value;
            const age = bookingForm.age.value
            const license = bookingForm.license.value;
            const day = bookingForm.day.value;
            const location = bookingForm.locations.value;
            const pickUp = bookingForm.pickUp.value;
            const pickUpTime = bookingForm.pickUpTime.value;

            if(age < 20) {
                alert("Under age to rent a car. Call your parents.");
                return
            }

            // Check if the pickup date is at least tomorrow
            const today = new Date();
            const selectedDate = new Date(pickUp);

            // Add one day to today to get tomorrow's date
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            if (selectedDate < tomorrow) {
                const id = new URLSearchParams(window.location.search);
                alert("Please select a pickup date that is tomorrow or later.");
                window.location.href = `details.html?${id}`         
                return      
            }  
            if (car) {
                const id = new URLSearchParams(window.location.search);
                alert("You already book one car if you want to book another one you need to cancel the first one first.");
                window.location.href = `details.html?${id}`;
                return             
            }

            getCar().then(car => {
                if(car) {
                    localStorage.setItem('car', car.name);    
                    localStorage.setItem('carPrice', car.price);
                    localStorage.setItem("carID", car.id);

                    const price = localStorage.getItem("carPrice");
                    const subtotal = price * day;
                    const serviceFee = 20;
                    const deliFee = 50;
                    const total = serviceFee + deliFee + subtotal;
                    console.log(subtotal);
                    
                    localStorage.setItem("total", total);
                }
            })

            // Save at the local storage
            localStorage.setItem("name", firstName + " " +lastName);
            localStorage.setItem("age", age);
            localStorage.setItem("license", license)

            localStorage.setItem('selectedDay', day);
            localStorage.setItem('location', location);
            localStorage.setItem('date', pickUp);
            localStorage.setItem('time', pickUpTime);
        
            
            localStorage.setItem("pay", false);
            alert("Successfully Booked a car.");
            window.location.href = 'payment.html';
        });
    } else if (document.body.classList.contains("payment-page"))  {
        
        const orderInfo = document.getElementById("order-info");

        // Get the data from local storage
        const name = localStorage.getItem("name");
        const age = localStorage.getItem("age");
        const license = localStorage.getItem("license");
        const email = localStorage.getItem("email");

        const day = localStorage.getItem('selectedDay');
        const pickUpDay = localStorage.getItem('date');
        const pickUptime = localStorage.getItem('time');
        const location = localStorage.getItem("location");

        const price = localStorage.getItem("carPrice");
        const car = localStorage.getItem('car');

        // Check day and location to show user' booking details
        if (day) {
            orderInfo.innerHTML = `
                <p class="car-name">${car}</p>
                <p class="full-name"><span>Full Name: </span>${name}</p>
                <p class="age"><span>Age: </span>${age}</p>
                <p class="license"><span>License Number: </span>${license}</p>

                <p class="email"><span>Email: </span>${email}</p>

                <p class="day-num"><span>Number of Day:</span> ${day} <span>Days</span></p>
                <p class="location"><span>Pick Up Location:</span> ${location} </p>
                <p class="location"><span>Pick Up Date:</span> ${pickUpDay}  ${pickUptime}</p>
            `;
        }

        // Price Details
        const totalPrice = document.getElementById("total-price");
        const total = localStorage.getItem("total");
  
        totalPrice.innerHTML = `
            <div class="price-details">
                <div class="price-detail-header">
                    <p>Car</p>
                    <p>Price</p>
                    <p>Days</p>
                    <p>Total</p>
                </div>
                <div class="price-details-body">
                    <p>${car}</p>
                    <p>$ ${price}</p>
                    <p>${day}</p>
                    <p>$ ${price * day}</p>
                </div>
            </div>
            <br/>
            <hr/>
            <div class="other-fees">
                <div class="total">
                    <h4>Service Fee</h4>
                    <h4>$ 50</h4>
                </div><div class="total">
                    <h4>Delivery Fee</h4>
                    <h4>$ 20</h4>
                </div>
                <br/>
                <div class="total">
                    <h4>Total</h4>
                    <h4>$ ${total} </h4>
                </div>
            </div>
                
        `

        // payment form function
        const paymentForm = document.querySelector(".billing-forms");

        const officePaymentBtn = document.querySelector("#office-payment-btn");
        const carID = localStorage.getItem("carID");

        // cancel btn 
        officePaymentBtn.addEventListener("click", (e) => {
            alert("You have to go to office to make payment.");
            localStorage.setItem("total", total);
            localStorage.setItem("pay", false);
            window.location.href = `details.html?id=${carID}`;
        });

        // payment btn
        paymentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            localStorage.setItem("total", total);
            localStorage.setItem("pay", true);
            alert("Payment Succeed.");
            window.location.href = "profile.html"
        });

    } else if (document.body.classList.contains("profile-page")) {

        const profileInfo = document.getElementById("profile-info");
        // get info from localstorage
        const name = localStorage.getItem("name");
        const email =  localStorage.getItem("email");

        const total = localStorage.getItem("total");

        profileInfo.innerHTML =    `
            <p class="profile-name">Name: ${name} </p>
            <p class="profile-email">Email: ${email} </p>
        `
        logoutBtn.addEventListener("click", () => {
            alert("Logout Successfully.")
            window.location.href = 'index.html';
            localStorage.setItem("isLoggedIn", false);
        });
        const car = localStorage.getItem("car");
        const day = localStorage.getItem('selectedDay');
        const pickUpDay = localStorage.getItem('date');
        const pickUptime = localStorage.getItem('time');
        const location = localStorage.getItem('location');

        const bookings = document.getElementById("bookings");
        const isPaid = localStorage.getItem("pay");

        if(day && car) {
            bookings.innerHTML = `
                 <p class="profile-car-name">${car}</p>
                        <p class="profile-day-num"><span>Number of Day:</span> ${day} <span>Days</span></p>
                        <p class="profile-location"><span>Pick Up Location:</span> ${location} </p>
                        <p class="profile-location"><span>Pick Up Date:</span> ${pickUpDay}  ${pickUptime}</p>
                        <p class="total"><span>Total:</span> ${total}</p>
                        ${
                            isPaid === "true" 
                            ? `<p class="isPaid">Made Payment</p>` 
                            : `<p class="isPaid">Haven't made Payment.
                                <a href="payment.html">Make Payment</a></p>`
                        }
                        <button id="cancel-booking-profile" onClick=cancelBooking()>Cancel Booking</button>
            `;
        } else {
            bookings.innerHTML = `
                <h3 class="profile-title">You Have No Booking</h3>
            `
        }
    } else if (document.body.classList.contains("about-page")) {
        console.log("About Page");
        const form = document.querySelector(".git-form");
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const name = form.name.value;
            const email = form.email.value;
            const msg = form.comment.value;

            if (name && email && msg) {
                alert("Thank You, " + name  + " for contacting us.")
            }
            
        })
    }
});


function support() {
    alert("This function is not working.");
}

// cancel the booking
const cancelBooking = () => {
    alert("successfully cancelled the booking. We will contact you shortly.");
    location.reload();
    localStorage.removeItem("car");
    localStorage.setItem("pay", false);
    localStorage.removeItem("selectedDay");
    localStorage.removeItem("total");
    localStorage.removeItem("time");
    localStorage.removeItem("age");
    localStorage.removeItem("license");
    localStorage.removeItem("location");
    localStorage.removeItem("date");
    localStorage.removeItem("carID");
    localStorage.removeItem("carPrice");
    localStorage.removeItem("car");
    return;
}