import React, { useState } from 'react';
import { X, Phone, Check, AlertCircle, MessageCircle } from 'lucide-react';
import { ContactPreference } from '../../types';
import { leadService } from '../../services/leadService';
import { BUSINESS_CONFIG, buildWhatsAppLink } from '../../config/business';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contactPref, setContactPref] = useState<ContactPreference>('WhatsApp');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Please provide a valid name and 10-digit phone number.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await leadService.submitCallback({
        name: name.trim(),
        phone: phone.trim(),
        contactPreference: contactPref,
        message: message.trim() || undefined,
      });
      setSubmittedWhatsappUrl(res.whatsappUrl);
      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to prepare request. Please message Ram directly on WhatsApp.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-cream-50 rounded-2xl shadow-2xl border border-cream-200 overflow-hidden p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cream-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-cream-100 border border-cream-200 flex items-center justify-center text-gold-dark">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-charcoal-900">
                Request a Callback
              </h3>
              <p className="text-xs text-charcoal-500">Ram will connect with you directly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-charcoal-500 hover:text-charcoal-900 rounded-full hover:bg-cream-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h4 className="font-display text-xl font-semibold text-charcoal-900">
              Request Formatted for WhatsApp ✓
            </h4>
            <p className="text-xs text-charcoal-600 max-w-xs mx-auto leading-relaxed">
              Your callback request has been prepared for Ram. If WhatsApp didn't open automatically, click below to send your request.
            </p>
            <div className="pt-2 flex flex-col space-y-2">
              <a
                href={submittedWhatsappUrl || buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Open WhatsApp with Ram</span>
              </a>
              <button
                onClick={onClose}
                className="w-full px-6 py-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-800 text-xs font-semibold border border-cream-300"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1.5">
                Preferred Contact Method *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['WhatsApp', 'Phone Call', 'Either'] as const).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setContactPref(pref)}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                      contactPref === pref
                        ? 'bg-charcoal-900 text-cream-50 border-charcoal-900'
                        : 'bg-white border-cream-200 text-charcoal-700 hover:bg-cream-100/60'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                Short Note (Optional)
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Wedding in December, need mandap setup"
                className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] disabled:opacity-50 text-white font-semibold text-xs tracking-wider transition-all shadow active:scale-95 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>{isSubmitting ? 'Preparing...' : 'Request Callback via WhatsApp'}</span>
            </button>

            <p className="text-[11px] text-charcoal-400 text-center">
              Or call Ram directly at{' '}
              <a href={BUSINESS_CONFIG.phoneTel} className="font-semibold text-charcoal-900 underline">
                {BUSINESS_CONFIG.phone}
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
