import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CreditCardIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import PromoCode from '../components/PromoCode';
import ISOTimeFormat from '../libraries/ISOTimeformat';
import toast from 'react-hot-toast';
import { t } from '../libraries/i18n';

const Checkout = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get show data
  useEffect(() => {
    const foundShow = dummyShowsData.find((show) => show._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  // Get selected seats and time from localStorage (or you can pass via state)
  useEffect(() => {
    const savedSeats = localStorage.getItem('selectedSeats');
    const savedTime = localStorage.getItem('selectedTime');
    
    if (savedSeats) {
      setSelectedSeats(JSON.parse(savedSeats));
    }
    if (savedTime) {
      setSelectedTime(JSON.parse(savedTime));
    }
  }, []);

  // Calculate total amount
  useEffect(() => {
    if (show && selectedSeats.length > 0) {
      const basePrice = 12; // Base price per seat
      const total = selectedSeats.length * basePrice;
      setFinalAmount(total - discountAmount);
    }
  }, [show, selectedSeats, discountAmount]);

  const handleDiscountApplied = (discount, final) => {
    setDiscountAmount(discount);
    setFinalAmount(final);
  };

  const handlePayment = async () => {
    if (!selectedSeats.length) {
      toast.error('Please select seats first');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate successful payment
    toast.success('Payment successful! Booking confirmed.');
    
    // Clear localStorage
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('selectedTime');
    
    // Navigate to bookings page
    navigate('/mybookings');
  };

  if (!show) {
    return <div className="flex items-center justify-center min-h-screen text-2xl text-white">{t('loading')}</div>;
  }

  const basePrice = 12;
  const subtotal = selectedSeats.length * basePrice;

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6 md:px-16 lg:px-40">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            {t('backToSeats')}
          </button>
          <h1 className="text-3xl font-bold">{t('checkout')}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 border border-purple-600 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{t('orderSummary')}</h2>
              
              {/* Movie Info */}
              <div className="flex gap-4 mb-6">
                <img
                  src={show.movie.poster_path}
                  alt={show.movie.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{show.movie.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {show.movie.genres.map(genre => genre.name).join(', ')}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {selectedTime && ISOTimeFormat(selectedTime.time)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      Screen 1
                    </div>
                  </div>
                </div>
              </div>

              {/* Seats */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">{t('selectedSeats')}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600 rounded-full text-sm"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Seats ({selectedSeats.length} × {t('currency')}{basePrice})</span>
                  <span>{t('currency')}{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>{t('discount')}</span>
                    <span>-{t('currency')}{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-2 flex justify-between font-semibold text-lg">
                  <span>{t('final')}</span>
                  <span>{t('currency')}{finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <PromoCode 
              totalAmount={subtotal} 
              onDiscountApplied={handleDiscountApplied} 
            />
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-purple-600 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">{t('payment')}</h2>
              
              <div className="space-y-4">
                <div className="text-center">
                  <CreditCardIcon className="w-12 h-12 mx-auto mb-2 text-purple-400" />
                  <p className="text-sm text-gray-400">{t('securePaymentProcessing')}</p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder={t('cardNumber')}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder={t('cardholderName')}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing || selectedSeats.length === 0}
                  className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {isProcessing ? t('processing') : `${t('pay')} ${t('currency')}${finalAmount.toFixed(2)}`}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  {t('termsAndConditions')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
