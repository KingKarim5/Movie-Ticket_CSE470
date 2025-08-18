import React, { useState } from 'react';
import { TagIcon, CheckIcon, XIcon, PercentIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { t } from '../libraries/i18n';

// Sample promo codes (in real app, this would come from backend)
const VALID_PROMO_CODES = {
  'WELCOME10': { discount: 10, type: 'percentage', minAmount: 50 },
  'SAVE20': { discount: 20, type: 'percentage', minAmount: 100 },
  'FLAT15': { discount: 15, type: 'fixed', minAmount: 30 },
  'MOVIE25': { discount: 25, type: 'percentage', minAmount: 75 },
  'NEWUSER': { discount: 5, type: 'percentage', minAmount: 25 }
};

const PromoCode = ({ totalAmount, onDiscountApplied }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const validatePromoCode = (code) => {
    const upperCode = code.toUpperCase();
    return VALID_PROMO_CODES[upperCode];
  };

  const calculateDiscount = (code, amount) => {
    const promo = VALID_PROMO_CODES[code.toUpperCase()];
    if (!promo) return 0;

    if (amount < promo.minAmount) {
      return 0;
    }

    if (promo.type === 'percentage') {
      return (amount * promo.discount) / 100;
    } else {
      return Math.min(promo.discount, amount);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error(t('enterPromoCode'));
      return;
    }

    setIsValidating(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const promo = validatePromoCode(promoCode);
    
    if (!promo) {
      toast.error(t('invalidPromoCode'));
      setIsValidating(false);
      return;
    }

    if (totalAmount < promo.minAmount) {
      toast.error(`${t('minimumPurchaseRequired')} ${t('currency')}${promo.minAmount} ${t('required')}`);
      setIsValidating(false);
      return;
    }

    const discountAmount = calculateDiscount(promoCode, totalAmount);
    const finalAmount = totalAmount - discountAmount;

    setAppliedCode({
      code: promoCode.toUpperCase(),
      discount: discountAmount,
      finalAmount: finalAmount,
      type: promo.type,
      percentage: promo.discount
    });

    onDiscountApplied(discountAmount, finalAmount);
    toast.success(`${t('promoCodeApplied')} ${t('currency')}${discountAmount.toFixed(2)}`);
    setIsValidating(false);
  };

  const handleRemovePromo = () => {
    setAppliedCode(null);
    setPromoCode('');
    onDiscountApplied(0, totalAmount);
    toast.success(t('promoCodeRemoved'));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyPromo();
    }
  };

  return (
    <div className="bg-gray-900 border border-purple-600 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <TagIcon className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">{t('promoCode')}</h3>
      </div>

      {!appliedCode ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('enterPromoCode')}
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              disabled={isValidating}
            />
            <button
              onClick={handleApplyPromo}
              disabled={isValidating || !promoCode.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isValidating ? t('applying') : t('apply')}
            </button>
          </div>
          
          {/* Available Promo Codes Hint */}
          <div className="text-sm text-gray-400">
            <p className="mb-2">{t('availableCodes')}</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(VALID_PROMO_CODES).map((code) => (
                <span
                  key={code}
                  className="px-2 py-1 bg-gray-800 rounded text-xs cursor-pointer hover:bg-gray-700"
                  onClick={() => setPromoCode(code)}
                >
                  {code}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-900/30 border border-green-600 rounded-md p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-400 font-semibold">
                  {appliedCode.code} {t('applied')}
                </p>
                <p className="text-sm text-gray-300">
                  {appliedCode.type === 'percentage' 
                    ? `${appliedCode.percentage}% off` 
                    : `${t('currency')}${appliedCode.percentage} off`
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleRemovePromo}
              className="text-red-400 hover:text-red-300"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-300">
            <p>{t('original')}: {t('currency')}{totalAmount.toFixed(2)}</p>
            <p className="text-green-400">
              {t('discount')}: -{t('currency')}{appliedCode.discount.toFixed(2)}
            </p>
            <p className="font-semibold text-white">
              {t('final')}: {t('currency')}{appliedCode.finalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCode;
