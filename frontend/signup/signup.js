document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('signupForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var userData = {
            email: form.email.value,
            username: form.username.value,
            password: form.password.value
        };

        fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(text => { throw new Error(text) });
                }
            })
            .then(data => {
                document.getElementById('message').textContent = 'Signup successful';
                // Redirect user to login page or dashboard
                // window.location.href = '/login.html';
            })
            .catch((error) => {
                console.error('Error:', error);
                document.getElementById('message').textContent = error.message;
            });
    });
});
