import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { useStore } from '../hooks/useStore';

export default function ContactPage({
  onBackToHome: propOnBackToHome,
  onOpenWhatsAppConcierge: propOnOpenWhatsAppConcierge,
  studioInfo: propStudioInfo,
  onSubmitInquiry: propOnSubmitInquiry
}) {
  const store = useStore();
  const onBackToHome = propOnBackToHome ?? store.navigateHome;
  const onOpenWhatsAppConcierge = propOnOpenWhatsAppConcierge ?? (() => store.openWhatsAppOrder(null));
  const studioInfo = propStudioInfo ?? store.studioInfo;
  const onSubmitInquiry = propOnSubmitInquiry ?? store.submitInquiry;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Custom Furniture / Bespoke Sizing',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      if (onSubmitInquiry) {
        onSubmitInquiry(formData);
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiryType: 'Custom Furniture / Bespoke Sizing',
          message: ''
        });
      }, 4000);
    }
  };

  return (
    <div className="bg-[#FAFAF9] min-h-screen text-[#141414] animate-fadeIn pb-20">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-wider font-light border-b border-[#EAE8E4] pb-4">
          <button onClick={onBackToHome} className="hover:text-black cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-black font-medium">Contact Us</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Page Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C7A58] font-semibold block mb-2">
            Get In Touch // تواصل معنا
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#141414] tracking-[-0.01em]">
            Contact HUJRAH Studio
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#666] font-light leading-relaxed">
            Whether you are inquiring about custom dimensions, material samples, commercial trade collaborations, or private showroom viewings, our team is at your disposal.
          </p>
        </div>

        {/* 2-Column Grid: Form & Studio Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Minimal Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#EAE8E4] rounded-sm shadow-xs">
            <h2 className="text-lg font-normal text-[#141414] mb-1">
              Send an Inquiry
            </h2>
            <p className="text-xs text-[#736E67] font-light mb-6">
              Fill in your details below and a design consultant will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3 bg-[#F8F7F4] rounded-sm border border-[#EAE8E4]">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-medium text-[#141414]">Inquiry Received</h3>
                <p className="text-xs text-[#666] max-w-sm mx-auto">
                  Thank you for contacting HUJRAH. Our studio concierge has received your request and will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#141414] font-medium mb-1.5">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Salem Al Nuaimi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAFAF9] border border-[#DDD8CF] px-3.5 py-2.5 text-xs text-[#141414] focus:outline-none focus:border-black rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#141414] font-medium mb-1.5">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. client@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAFAF9] border border-[#DDD8CF] px-3.5 py-2.5 text-xs text-[#141414] focus:outline-none focus:border-black rounded-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#141414] font-medium mb-1.5">
                      Phone Number (WhatsApp)
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+971 50 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAFAF9] border border-[#DDD8CF] px-3.5 py-2.5 text-xs text-[#141414] focus:outline-none focus:border-black rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#141414] font-medium mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#FAFAF9] border border-[#DDD8CF] px-3.5 py-2.5 text-xs text-[#141414] focus:outline-none focus:border-black rounded-xs cursor-pointer"
                    >
                      <option>Custom Furniture / Bespoke Sizing</option>
                      <option>Commercial Trade & Hospitality</option>
                      <option>Delivery & Shipping Inquiries</option>
                      <option>Private Showroom Appointment</option>
                      <option>Material Swatch Request</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#141414] font-medium mb-1.5">
                    Your Message / Specifications
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your space, dimensions, or the pieces you are interested in..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAFAF9] border border-[#DDD8CF] px-3.5 py-2.5 text-xs text-[#141414] focus:outline-none focus:border-black rounded-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#141414] hover:bg-neutral-800 text-white text-xs uppercase tracking-[0.2em] font-semibold py-3.5 rounded-full transition-colors cursor-pointer shadow-xs mt-2"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Instant WhatsApp, Showrooms, Phone */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout */}
            <div className="bg-[#FAF9F6] p-6 border border-[#EAE8E4] rounded-sm">
              <span className="text-[10px] uppercase tracking-wider text-[#25D366] font-semibold block mb-1">
                Instant Response
              </span>
              <h3 className="text-base font-normal text-[#141414] mb-2">
                Chat Directly on WhatsApp
              </h3>
              <p className="text-xs text-[#666] font-light leading-relaxed mb-4">
                For immediate pricing, fabric photos, or custom order consultations, connect directly with our studio team on WhatsApp.
              </p>
              
              <button
                onClick={onOpenWhatsAppConcierge}
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-medium px-5 py-2.5 rounded-full shadow-2xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </button>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-6 border border-[#EAE8E4] rounded-sm space-y-4">
              <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#141414]">
                Direct Contacts
              </h3>

              <div className="space-y-3 text-xs text-[#555] font-light">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>{studioInfo?.phone || '+971 50 123 4567'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>{studioInfo?.email || 'info@hujrah.ae'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>{studioInfo?.workingHours || 'Saturday – Thursday: 10:00 AM – 8:00 PM (GST)'}</span>
                </div>
              </div>
            </div>

            {/* Showroom Addresses */}
            <div className="bg-white p-6 border border-[#EAE8E4] rounded-sm space-y-4">
              <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#141414]">
                Showroom & Workshop
              </h3>

              <div className="space-y-3 text-xs text-[#555] font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#141414] font-medium block">Al Ain Studio & Atelier</strong>
                    <span>{studioInfo?.alAinAddress || 'Industrial Area, Al Ain, United Arab Emirates'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#F0EEE9]">
                  <MapPin className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#141414] font-medium block">Dubai Design District (d3)</strong>
                    <span>{studioInfo?.dubaiAddress || 'Building 6, Dubai, UAE (By Private Appointment)'}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

