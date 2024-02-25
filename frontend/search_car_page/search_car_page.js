document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('searchCarForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var searchCriteria = {
            brand: form.brand.value,
            type: form.type.value,
            color: form.color.value,
            transmission: form.transmission.value
        };

        fetch('/car/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchCriteria)
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.json();
            })
            .then(cars => {
                const searchResults = document.getElementById('searchResults');
                searchResults.innerHTML = '';

                cars.forEach(car => {
                    const carCard = document.createElement('div');
                    carCard.className = 'car-card';
                    carCard.innerHTML = `
                    <img src="${car.imagePath}" alt="${car.brand} ${car.model}" class="car-image">
                    <div class="car-details">
                        <h2>${car.brand} - ${car.model}</h2>
                        <p>Price: $${car.price}</p>
                        <p>Color: ${car.color}</p>
                        <p>Transmission: ${car.transmission}</p>
                        <p>Type: ${car.type}</p>
                        <p>Year: ${car.year}</p>
                    </div>
                `;
                    searchResults.appendChild(carCard);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error searching cars');
            });
    });
});
