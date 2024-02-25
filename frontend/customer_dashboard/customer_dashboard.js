document.addEventListener('DOMContentLoaded', function() {
    fetchCars();
});

function fetchCars() {
    fetch('/api/customer/cars')
        .then(response => response.json())
        .then(cars => {
            const carList = document.getElementById('carList');
            carList.innerHTML = ''; // Clear the list
            cars.forEach(car => {
                carList.appendChild(createCarCard(car));
            });
        })
        .catch(error => console.error('Error fetching cars:', error));
}

function createCarCard(car) {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';

    carCard.innerHTML = `
        <img src="${car.imagePath}" alt="Image of ${car.brand} ${car.model}" class="car-image">
        <div class="car-info">
            <h2>${car.brand} - ${car.model}</h2>
            <p>Price: $${car.price}</p>
            <p>Color: ${car.color}</p>
            <p>Transmission: ${car.transmission}</p>
            <p>Type: ${car.type}</p>
            <p>Year: ${car.year}</p>
            <button onclick="bookCar(${car.id})">Book</button>
        </div>
    `;

    return carCard;
}

function bookCar(carId) {
    console.log(`Booking car with ID: ${carId}`);
}
