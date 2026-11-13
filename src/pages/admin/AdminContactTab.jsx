import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Check,
  MessageCircle,
  Trash2,
  Mail,
  Phone,
  Search,
  Eye,
  X
} from 'lucide-react';
import { useStore } from '../../hooks/useStore';

const INQUIRY_STATUSES = ['New', 'In Progress', 'Replied', 'Archived'];

export default function AdminContactTab({
  studioInfo: propStudioInfo,
  onUpdateStudioInfo: propOnUpdateStudioInfo,
  inquiries: propInquiries,
  onUpdateInquiryStatus: propOnUpdateInquiryStatus,
  onDeleteInquiry: propOnDeleteInquiry
}) {
  const store = useStore();
  const studioInfo = propStudioInfo ?? store.studioInfo;
  const onUpdateStudioInfo = propOnUpdateStudioInfo ?? store.updateStudioInfo;
  const inquiries = propInquiries ?? store.inquiries;
  const onUpdateInquiryStatus = propOnUpdateInquiryStatus ?? store.updateInquiryStatus;
  const onDeleteInquiry = propOnDeleteInquiry ?? store.deleteInquiry;

  const [formInfo, setFormInfo] = useState(studioInfo);
  const [savedNotice, setSavedNotice] = useState(false);
  const [inquiryFilter, setInquiryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleSaveInfo = (e) => {
    e.preventDefault();
    // API-READY: Later replace with await fetch('/api/settings', { method: 'PUT', body: JSON.stringify(formInfo) })
    onUpdateStudioInfo({
      ...formInfo,
      freeDeliveryThresholdAED: Number(formInfo.freeDeliveryThresholdAED) || 1500
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      if (inquiryFilter !== 'All' && inq.status !== inquiryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          inq.name.toLowerCase().includes(q) ||
          (inq.email && inq.email.toLowerCase().includes(q)) ||
          (inq.phone && inq.phone.toLowerCase().includes(q)) ||
          (inq.inquiryType && inq.inquiryType.toLowerCase().includes(q)) ||
          (inq.message && inq.message.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [inquiries, inquiryFilter, searchQuery]);

  const buildMailtoHref = (inq) => {
    const subject = `Re: ${inq.inquiryType || 'HUJRAH Studio Inquiry'}`;
    const body = `Hello ${inq.name},\n\nThank you for reaching out to HUJRAH // حجره Studio regarding "${inq.inquiryType}".\n\n`;
    return `mailto:${inq.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const buildWhatsAppHref = (inq) => {
    const cleanPhone = (inq.phone || '').replace(/\D/g, '');
    if (!cleanPhone) return null;
    const msg = `Hello ${inq.name},\n\nThank you for reaching out to HUJRAH // حجره Studio regarding "${inq.inquiryType}".\n\nHow may our design team assist you further?`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top: Client Inquiries Table */}
      <div className="bg-white border border-[#EAE8E4] rounded-sm overflow-hidden">
        <div className="p-5 border-b border-[#EAE8E4] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-medium text-[#141414]">Client Inquiries</h3>
            <p className="text-[11px] text-neutral-400 font-light mt-0.5">
              Click any client email to open your mail box, or click their phone number to open WhatsApp ({inquiries.length} total)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search client, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-8 pr-3 py-1.5 bg-[#FAFAF9] border border-[#DDD8CF] rounded-full text-xs text-[#141414] focus:outline-none focus:border-black"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['All', ...INQUIRY_STATUSES].map(st => (
                <button
                  key={st}
                  onClick={() => setInquiryFilter(st)}
                  className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full cursor-pointer transition-colors whitespace-nowrap ${
                    inquiryFilter === st
                      ? 'bg-[#141414] text-white font-medium'
                      : 'bg-[#F4F2EE] text-[#555] hover:bg-[#EAE6DE]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-h-[420px] overflow-auto">
          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-[#F0EEE9]">
            {filteredInquiries.map(inq => {
              const waHref = buildWhatsAppHref(inq);
              return (
                <div key={inq.id} className="p-3.5 space-y-2.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-medium text-[#141414] truncate">{inq.name}</div>
                      <div className="text-[10px] uppercase tracking-wider text-[#8C7A58] font-semibold">
                        {inq.inquiryType}
                      </div>
                    </div>
                    <select
                      value={inq.status}
                      onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value)}
                      className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-[#DDD8CF] bg-white text-[#141414] font-medium shrink-0"
                    >
                      {INQUIRY_STATUSES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-neutral-600 font-light line-clamp-2">{inq.message}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {inq.email && (
                        <a
                          href={buildMailtoHref(inq)}
                          className="inline-flex items-center gap-1 text-[11px] bg-[#FAFAF9] border border-[#EAE8E4] px-2.5 py-1 rounded-full text-[#141414]"
                        >
                          <Mail className="w-3 h-3 text-neutral-500" />
                          <span>Mail</span>
                        </a>
                      )}
                      {waHref && (
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-emerald-800"
                        >
                          <MessageCircle className="w-3 h-3 text-[#25D366]" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="p-1.5 text-neutral-500 border border-[#EAE8E4] rounded-full cursor-pointer"
                        aria-label="View inquiry"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteInquiry(inq.id)}
                        className="p-1.5 text-red-500 border border-red-200/70 rounded-full cursor-pointer"
                        aria-label="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <table className="hidden md:table w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-[#FAFAF9]">
              <tr className="border-b border-[#EAE8E4] text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                <th className="py-3.5 px-4 font-semibold">Client</th>
                <th className="py-3.5 px-4 font-semibold">Email (Mail Box)</th>
                <th className="py-3.5 px-4 font-semibold">Phone (WhatsApp)</th>
                <th className="py-3.5 px-4 font-semibold">Inquiry & Message</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EEE9] text-xs">
              {filteredInquiries.map(inq => {
                const waHref = buildWhatsAppHref(inq);
                return (
                  <tr key={inq.id} className="hover:bg-[#FAFAF9] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#141414]">{inq.name}</div>
                      <div className="text-[10px] font-mono text-neutral-400">#{inq.id}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      {inq.email ? (
                        <a
                          href={buildMailtoHref(inq)}
                          className="inline-flex items-center gap-1.5 text-[#141414] hover:text-blue-700 hover:underline font-medium transition-colors"
                          title={`Open mail box for ${inq.email}`}
                        >
                          <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span>{inq.email}</span>
                        </a>
                      ) : (
                        <span className="text-neutral-400">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {waHref ? (
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#141414] hover:text-[#25D366] hover:underline font-medium transition-colors"
                          title={`Open WhatsApp chat with ${inq.phone}`}
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                          <span>{inq.phone}</span>
                        </a>
                      ) : (
                        <span className="text-neutral-400">No phone</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-[10px] uppercase tracking-wider text-[#8C7A58] font-semibold mb-0.5">
                        {inq.inquiryType}
                      </div>
                      <p className="text-neutral-600 font-light truncate" title={inq.message}>
                        {inq.message}
                      </p>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value)}
                        className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#DDD8CF] bg-white text-[#141414] font-medium cursor-pointer focus:outline-none focus:border-black"
                      >
                        {INQUIRY_STATUSES.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-2 text-neutral-500 hover:text-black hover:bg-[#F4F2EE] rounded-full transition-colors cursor-pointer"
                          title="View full inquiry"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {inq.email && (
                          <a
                            href={buildMailtoHref(inq)}
                            className="p-2 text-neutral-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                            title="Open mail box"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                        {waHref && (
                          <a
                            href={waHref}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-[#25D366] hover:bg-emerald-50 rounded-full transition-colors"
                            title="Open WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => onDeleteInquiry(inq.id)}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredInquiries.length === 0 && (
            <div className="py-12 text-center text-xs text-neutral-500">
              No client inquiries match your filter.
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Studio Contact & Showroom Settings */}
      <div className="bg-white border border-[#EAE8E4] rounded-sm p-6 space-y-5">
        <div>
          <h3 className="text-base font-medium text-[#141414]">Studio Contact Info</h3>
          <p className="text-[11px] text-neutral-400 font-light mt-0.5">
            Updates made here reflect live in the Footer and Contact Us page.
          </p>
        </div>

        <form onSubmit={handleSaveInfo} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                Phone Display
              </label>
              <input
                type="text"
                value={formInfo.phone}
                onChange={(e) => setFormInfo({ ...formInfo, phone: e.target.value })}
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3 py-2 rounded-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                WhatsApp Digits (wa.me)
              </label>
              <input
                type="text"
                value={formInfo.whatsappNumber}
                onChange={(e) => setFormInfo({ ...formInfo, whatsappNumber: e.target.value })}
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3 py-2 rounded-xs font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={formInfo.email}
                onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })}
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3 py-2 rounded-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                Free Delivery Threshold (AED)
              </label>
              <input
                type="number"
                value={formInfo.freeDeliveryThresholdAED}
                onChange={(e) => setFormInfo({ ...formInfo, freeDeliveryThresholdAED: e.target.value })}
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3 py-2 rounded-xs focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                Working Hours
              </label>
              <input
                type="text"
                value={formInfo.workingHours}
                onChange={(e) => setFormInfo({ ...formInfo, workingHours: e.target.value })}
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3 py-2 rounded-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                Al Ain Studio Address
              </label>
              <input
                type="text"
                value={formInfo.alAinAddress}
                onChange={(e) => setFormInfo({ ...formInfo, alAinAddress: e.target.value })}
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3 py-2 rounded-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                Dubai Showroom Address
              </label>
              <input
                type="text"
                value={formInfo.dubaiAddress}
                onChange={(e) => setFormInfo({ ...formInfo, dubaiAddress: e.target.value })}
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3 py-2 rounded-xs focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                value={formInfo.instagramUrl}
                onChange={(e) => setFormInfo({ ...formInfo, instagramUrl: e.target.value })}
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3 py-2 rounded-xs focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                TikTok URL
              </label>
              <input
                type="text"
                value={formInfo.tiktokUrl}
                onChange={(e) => setFormInfo({ ...formInfo, tiktokUrl: e.target.value })}
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3 py-2 rounded-xs focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-[#141414] hover:bg-neutral-800 text-white px-7 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {savedNotice ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Contact Info Saved</span>
                </>
              ) : (
                <span>Save Contact Info</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Inquiry Detail Modal (via Portal above fixed navbar & sidebar) */}
      {selectedInquiry && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="bg-white w-full max-w-lg max-h-[85vh] flex flex-col rounded-md shadow-2xl border border-[#EAE8E4] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shrink-0 px-6 py-4 bg-[#FAFAF9] border-b border-[#EAE8E4] flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-[#141414]">{selectedInquiry.name}</h3>
                <p className="text-[11px] text-[#8C7A58] uppercase tracking-wider font-semibold mt-0.5">
                  {selectedInquiry.inquiryType} • #{selectedInquiry.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 text-neutral-400 hover:text-black hover:bg-[#EAE8E4]/50 rounded-full transition-colors cursor-pointer"
                aria-label="Close inquiry modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={buildMailtoHref(selectedInquiry)}
                  className="p-3.5 border border-[#EAE8E4] hover:border-black rounded-sm flex items-center gap-2.5 transition-colors"
                >
                  <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Open Mail Box</span>
                    <span className="font-medium text-[#141414] truncate block">{selectedInquiry.email}</span>
                  </div>
                </a>

                {selectedInquiry.phone && (
                  <a
                    href={buildWhatsAppHref(selectedInquiry)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 border border-[#EAE8E4] hover:border-[#25D366] rounded-sm flex items-center gap-2.5 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Open WhatsApp</span>
                      <span className="font-medium text-[#141414] truncate block">{selectedInquiry.phone}</span>
                    </div>
                  </a>
                )}
              </div>

              <div className="bg-[#FAFAF9] border border-[#EAE8E4] rounded-sm p-4">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                  Client Message
                </span>
                <p className="text-neutral-700 font-light leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>

            <div className="shrink-0 px-6 py-4 bg-[#FAFAF9] border-t border-[#EAE8E4] flex flex-wrap items-center justify-end gap-2.5">
              {selectedInquiry.email && (
                <a
                  href={buildMailtoHref(selectedInquiry)}
                  className="bg-[#141414] hover:bg-neutral-800 text-white py-2.5 px-4 rounded-full text-xs uppercase tracking-wider font-medium inline-flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Mail Box</span>
                </a>
              )}
              {buildWhatsAppHref(selectedInquiry) && (
                <a
                  href={buildWhatsAppHref(selectedInquiry)}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded-full text-xs uppercase tracking-wider font-medium inline-flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Open WhatsApp</span>
                </a>
              )}
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2.5 border border-[#DDD8CF] bg-white hover:border-black rounded-full text-xs uppercase tracking-wider text-neutral-700 hover:text-black cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
