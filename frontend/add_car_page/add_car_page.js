document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('postCarForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(form);


        var imageInput = document.getElementById('image');
        if(imageInput.files.length > 0) {
            formData.append('image', imageInput.files[0]);
        }

        fetch('/api/car', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Car posted successfully');
                form.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error posting car');
            });
    });
});
