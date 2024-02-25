document.addEventListener('DOMContentLoaded', function() {

    const queryParams = new URLSearchParams(window.location.search);
    const carId = queryParams.get('carId');


    document.getElementById('carImage').src = 'path-to-car-image.jpg';
    document.getElementById('carTitle').innerText = 'VOLVO - S60';
    document.getElementById('carDetails').innerText = 'Price: $200 - Color: Silver - Transmission: Automatic - Type: Hybrid - Year: 2023'; // Replace with fetched data

    var form = document.getElementById('bookingForm');
    form.onsubmit = function(event) {
        event.preventDefault();

        var bookingData = {
            carId: carId,
            fromDate: form.fromDate.value,
            toDate: form.toDate.value
        };

        fetch('/api/customer/cars/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.json();
            })
            .then(() => {
                alert('Car booked successfully!');

            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error booking car');
            });
    };
});
