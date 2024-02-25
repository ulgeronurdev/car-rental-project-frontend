document.addEventListener('DOMContentLoaded', function() {
    // Assume the car's ID is provided as a query parameter, e.g., updateCar.html?id=1
    const queryParams = new URLSearchParams(window.location.search);
    const carId = queryParams.get('id');

    var form = document.getElementById('updateCarForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(form);

        // Append other form data here as necessary

        // Check if an image file is provided, if not, we don't append it to the FormData
        var imageInput = document.getElementById('image');
        if(imageInput.files.length > 0) {
            formData.append('image', imageInput.files[0]);
        }

        fetch(`/api/car/${carId}`, {
            method: 'PUT',
            body: formData
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Car updated successfully');
                // Redirect or handle the UI update
                // window.location.href = '/dashboard.html'; // For example, redirect to dashboard
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error updating car');
            });
    });

    // Load existing car data here and populate the form fields
    // fetch(`/api/car/${carId}`)...
});
