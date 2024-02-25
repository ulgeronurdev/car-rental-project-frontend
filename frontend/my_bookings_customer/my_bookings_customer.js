document.addEventListener('DOMContentLoaded', function() {
    fetchBookings();
});

function fetchBookings() {
    const userId = 'theUserId'; // This is just a placeholder
    fetch(`/api/customer/car/bookings/${userId}`)
        .then(response => response.json())
        .then(bookings => {
            const bookingList = document.getElementById('bookingList');
            bookingList.innerHTML = ''; // Clear previous entries
            bookings.forEach(booking => {
                bookingList.appendChild(createBookingEntry(booking));
            });
        })
        .catch(error => console.error('Error fetching bookings:', error));
}

function createBookingEntry(booking) {
    const bookingEntry = document.createElement('div');
    bookingEntry.className = 'booking-entry';

    bookingEntry.innerHTML = `
        <div class="booking-date">
            <span>From: ${booking.fromDate}</span>
            <span>To: ${booking.toDate}</span>
        </div>
        <div class="booking-days">
            <span>${booking.days} Days</span>
        </div>
        <div class="booking-price">
            <span>Price: $${booking.price}</span>
        </div>
        <div class="booking-status">
            <span>Status: ${booking.status}</span>
        </div>
    `;

    return bookingEntry;
}
