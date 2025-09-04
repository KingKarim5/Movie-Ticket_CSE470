import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { axios, getToken } = useAppContext();
  const [booking, setBooking] = useState(null);
  const [remainingMs, setRemainingMs] = useState(0);
  const [method, setMethod] = useState('bkash');
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [applying, setApplying] = useState(false);
  const [suggestedPromos, setSuggestedPromos] = useState([]);

  const minutes = useMemo(() => Math.max(0, Math.floor(remainingMs / 60000)), [remainingMs]);
  const seconds = useMemo(() => Math.max(0, Math.floor((remainingMs % 60000) / 1000)), [remainingMs]);

  const loadBooking = async () => {
    try {
      const { data } = await axios.get(`/api/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (!data.success) {
        toast.error(data.message || 'Booking not found');
        return navigate('/');
      }
      setBooking(data.booking);
      if (data.booking.expiresAt) {
        setRemainingMs(Math.max(0, new Date(data.booking.expiresAt).getTime() - Date.now()));
      }
      // Load promos that are valid for this amount
      try {
        const promosRes = await axios.get(`/api/booking/promos/active`, { params: { amount: data.booking.amount } });
        if (promosRes.data?.success) setSuggestedPromos(promosRes.data.promos);
      } catch {}
    } catch (e) {
      toast.error('Failed to load booking');
      navigate('/');
    }
  };

  useEffect(() => {
    loadBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  useEffect(() => {
    if (!booking) return;
    const timer = setInterval(() => {
      setRemainingMs((ms) => {
        const next = Math.max(0, ms - 1000);
        if (next === 0) {
          // best-effort mark as expired on server then redirect
          (async () => {
            try {
              await axios.post(
                `/api/booking/${bookingId}/cancel`,
                { reason: 'expired' },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
              );
            } catch {}
            toast.error('Payment window expired');
            navigate('/');
          })();
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [booking, navigate]);

  const handlePay = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/api/booking/${bookingId}/pay`,
        { method },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success('Payment successful');
        navigate('/mybookings');
      } else {
        toast.error(data.message || 'Payment failed');
      }
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPromo = async () => {
    try {
      if (!promoCode.trim()) return toast.error('Enter a code');
      setApplying(true);
      const { data } = await axios.post(
        `/api/booking/${bookingId}/apply-promo`,
        { code: promoCode },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success('Promo applied');
        await loadBooking();
      } else {
        toast.error(data.message || 'Promo failed');
      }
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    } finally {
      setApplying(false);
    }
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/api/booking/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success('Booking cancelled');
        navigate('/');
      } else {
        toast.error(data.message || 'Cancel failed');
      }
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading payment...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-16 lg:px-40 py-16 bg-black text-white">
      <div className="max-w-2xl mx-auto border border-purple-600 rounded-xl p-6 backdrop-blur-sm bg-white/5">
        <h1 className="text-2xl font-semibold mb-4">Complete Payment</h1>
        <p className="text-sm text-gray-300 mb-6">
          Please pay within 5 minutes. Your seats are held temporarily.
        </p>

        <div className="flex items-center justify-between bg-purple-900/30 border border-purple-700 rounded-lg p-4 mb-6">
          <div>
            <p className="text-sm text-gray-300">Amount</p>
            <p className="text-xl font-bold">BDT {booking.finalAmount ?? booking.amount}</p>
            {booking.discount > 0 && (
              <p className="text-xs text-green-400">Saved BDT {booking.discount} with {booking.promoCode}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300">Time remaining</p>
            <p className="text-xl font-bold tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-2">
          <input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Promo code"
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleApplyPromo}
            disabled={applying}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-60"
          >
            Apply
          </button>
        </div>
        {suggestedPromos.length > 0 && (
          <div className="mb-6 text-sm">
            <p className="text-gray-300 mb-2">Available promos</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPromos.map(p => (
                <button
                  key={p._id}
                  onClick={() => setPromoCode(p.code)}
                  className="px-3 py-1.5 rounded-full bg-black/30 border border-white/10 hover:bg-black/50 text-white"
                  title={`${p.type==='percent'?p.value+'%':'BDT '+p.value}${p.minAmount?` • min ${p.minAmount}`:''}`}
                >
                  {p.code}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <label className="block text-sm text-gray-300">Payment Method</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['bkash','nagad','visa','mastercard'].map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`py-3 rounded-lg border transition ${method===m ? 'bg-purple-600 border-purple-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePay}
            disabled={loading}
            className="px-5 py-3 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-60"
          >
            Pay Now
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-5 py-3 bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-60"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;


