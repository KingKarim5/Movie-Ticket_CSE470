export function buildReceiptHtml({ booking, show, movie, user }) {
  const bookedSeats = Array.isArray(booking.bookedseats) ? booking.bookedseats.join(', ') : '';
  const amount = Number(booking.amount || 0);
  const showDate = new Date(show.showDateTime);
  const showDateDhaka = showDate.toLocaleDateString('en-US', {
    timeZone: 'Asia/Dhaka',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const showTimeDhaka = showDate.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit'
  });
  const amountBDT = `৳ ${amount.toLocaleString('en-US')}`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:auto;border:1px solid #eee;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
    <div style="background:#6b21a8;color:#fff;padding:18px 22px;">
      <h2 style="margin:0;font-size:20px;">🎟️ QuickShow — Payment Confirmed</h2>
      <p style="margin:6px 0 0;font-size:12px;opacity:0.9;">Dhaka Standard Time (Asia/Dhaka)</p>
    </div>

    <div style="padding:22px 22px 8px;">
      <p style="margin:0 0 10px;">Hello ${user?.firstName || user?.name || ''},</p>
      <p style="margin:0 0 14px;">Thank you for your purchase. Your booking has been confirmed.</p>

      <div style="background:#faf5ff;border:1px solid #eadcff;border-radius:8px;padding:14px 16px;margin:14px 0;">
        <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:6px;">
          <span style="color:#6b21a8;font-weight:600;">Movie</span>
          <span style="font-weight:600;">${movie?.title || movie?.originalTitle || ''}</span>
        </div>
        <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:6px;">
          <span style="color:#6b21a8;font-weight:600;">Date</span>
          <span>${showDateDhaka}</span>
        </div>
        <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:6px;">
          <span style="color:#6b21a8;font-weight:600;">Time</span>
          <span>${showTimeDhaka}</span>
        </div>
        <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:6px;">
          <span style="color:#6b21a8;font-weight:600;">Seats</span>
          <span>${bookedSeats || 'N/A'}</span>
        </div>
        <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:6px;">
          <span style="color:#6b21a8;font-weight:600;">Amount Paid</span>
          <span style="font-weight:700;">${amountBDT}</span>
        </div>
        <div style="display:flex;justify-content:space-between;gap:10px;">
          <span style="color:#6b21a8;font-weight:600;">Booking ID</span>
          <span>${booking._id}</span>
        </div>
      </div>

      <p style="color:#475569;font-size:12px;margin:10px 0 0;">Venue timezone: Asia/Dhaka (GMT+6)</p>
    </div>

    <div style="background:#f8fafc;color:#475569;padding:14px 18px;font-size:12px;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0 0 6px;">Need help? Contact support at <a href="mailto:support@quickshow.com" style="color:#6b21a8;text-decoration:none;">support@quickshow.com</a></p>
      <p style="margin:0;">© ${new Date().getFullYear()} QuickShow — Dhaka, Bangladesh</p>
    </div>
  </div>`;
}


