document.addEventListener('DOMContentLoaded', function() {
    fetchBookings();
});

function fetchBookings() {
    fetch('/api/customer/car/bookings')
        .then(response => response.json())
        .then(bookings => {
            const bookingsContainer = document.getElementById('bookings');
            bookingsContainer.innerHTML = ''; // Clear the container
            bookings.forEach(booking => {
                bookingsContainer.appendChild(createBookingRow(booking));
            });
        })
        .catch(error => console.error('Error fetching bookings:', error));
}

function createBookingRow(booking) {
    const row = document.createElement('div');
    row.className = 'booking-row';

    row.innerHTML = `
        <div>${booking.from}</div>
        <div>${booking.to}</div>
        <div>${booking.days}</div>
        <div>${booking.price}</div>
        <div>${booking.status}</div>
        <div>
            <button onclick="updateBookingStatus(${booking.id}, 'APPROVED')">Approve</button>
            <button onclick="updateBookingStatus(${booking.id}, 'REJECTED')">Reject</button>
        </div>
    `;

    return row;
}

function updateBookingStatus(bookingId, status) {
    // Call your API to update the booking status
    fetch(`/api/customer/car/bookings/update/${bookingId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status })
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to update booking status.');
            return response.json();
        })
        .then(() => {
            alert(`Booking status updated to ${status}.`);
            fetchBookings(); // Refresh the list of bookings
        })
        .catch(error => {
            console.error('Error updating booking status:', error);
        });
}
