document.addEventListener('DOMContentLoaded', function() {
    fetchCars();
});

function fetchCars() {
    fetch('/api/cars')
        .then(response => response.json())
        .then(cars => {
            const carList = document.getElementById('car-list');
            carList.innerHTML = ''; // Clear the list
            cars.forEach(car => {
                carList.appendChild(createCarItem(car));
            });
        })
        .catch(error => console.error('Error fetching cars:', error));
}

function createCarItem(car) {
    const carItem = document.createElement('div');
    carItem.className = 'car-item';

    carItem.innerHTML = `
        <div class="car-details">
            <img src="${car.image}" class="car-image" alt="${car.make} ${car.model}">
            <div class="car-info">
                <h3>${car.make} - ${car.model}</h3>
                <p>${car.description}</p>
                <p>Price: $${car.price} - Color: ${car.color} - Transmission: ${car.transmission} - Type: ${car.type} - Year: ${car.year}</p>
            </div>
        </div>
        <div class="car-actions">
            <button onclick="updateCar(${car.id})">Update</button>
            <button onclick="deleteCar(${car.id})">Delete</button>
        </div>
    `;

    return carItem;
}

function updateCar(id) {
    window.location.href = `/update-car.html?id=${id}`;
}

function deleteCar(id) {
    fetch(`/api/car/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) throw new Error('Problem deleting car');
            return response.json();
        })
        .then(() => {
            fetchCars();
        })
        .catch(error => console.error('Error deleting car:', error));
}

document.getElementById('logout').addEventListener('click', function() {
    window.location.href = '/login.html';
});
