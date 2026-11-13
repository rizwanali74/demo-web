import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '../hooks/useStore';

export default function PrivacyPolicyPage({ onBackToHome: propOnBackToHome, studioInfo: propStudioInfo }) {
  const store = useStore();
  const onBackToHome = propOnBackToHome ?? store.navigateHome;
  const studioInfo = propStudioInfo ?? store.studioInfo;

  const contactEmail = studioInfo?.email || 'info@hujrah.ae';
  const contactPhone = studioInfo?.phone || '+971 50 123 4567';

  const sections = [
    {
      title: '1. Information We Collect',
      body: 'When you browse HUJRAH // حجره, place an order, or submit a bespoke furniture consultation inquiry, we collect only the details necessary to fulfill your request — including your name, phone number, email address, UAE delivery address, and project specifications.'
    },
    {
      title: '2. How We Use Your Information',
      body: 'Your contact and order details are used solely to process purchases, coordinate White Glove UAE room placement and delivery, respond to custom sizing or material inquiries, and provide after-sales support. We never sell or rent your personal data to third parties.'
    },
    {
      title: '3. Payment & Checkout Security',
      body: 'Payments processed through Apple Pay or direct concierge channels are handled via encrypted, industry-standard payment gateways. HUJRAH does not store full credit or debit card numbers on its servers.'
    },
    {
      title: '4. Cookies & Local Preferences',
      body: 'We use essential browser storage to remember your shopping bag items and display preferences so your browsing experience remains seamless across visits.'
    },
    {
      title: '5. Data Retention & Your Rights',
      body: 'You may request access to, correction of, or deletion of your personal contact and inquiry records at any time by reaching out to our studio team directly.'
    },
    {
      title: '6. Contact Our Privacy Team',
      body: `For any privacy-related questions or requests, please contact HUJRAH Studio at ${contactEmail} or ${contactPhone}.`
    }
  ];

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500 hover:text-black transition-colors cursor-pointer mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white border border-[#EAE8E4] rounded-sm p-6 sm:p-10 space-y-8">
          <div className="border-b border-[#EAE8E4] pb-6">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C7A58] font-semibold block mb-2">
              HUJRAH // حجره Legal
            </span>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#141414]">
              Privacy Policy
            </h1>
            <p className="text-xs text-neutral-400 mt-1.5 font-light">
              Last updated: November 2026 • United Arab Emirates
            </p>
          </div>

          <div className="space-y-6">
            {sections.map(sec => (
              <section key={sec.title} className="space-y-2">
                <h2 className="text-sm font-medium text-[#141414]">{sec.title}</h2>
                <p className="text-xs sm:text-[13px] text-[#555] font-light leading-relaxed">
                  {sec.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

