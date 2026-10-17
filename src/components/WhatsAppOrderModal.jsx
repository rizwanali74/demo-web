import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Copy, 
  Check, 
  Send, 
  MapPin, 
  User, 
  Phone,
  FileText,
  ShieldCheck
} from 'lucide-react';

export default function WhatsAppOrderModal({ product, formatPrice, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Dubai');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Client WhatsApp number (UAE format)
  const CLIENT_WHATSAPP_NUMBER = '971508821971';

  // Generate luxury concierge message
  const generateMessage = () => {
    if (product) {
      return `السلام عليكم ورحمة الله وبركاته
Hello AL-ATHAR Concierge,

I would like to order the following collectible piece:
• Piece: ${product.name} (${product.arabicName})
• Ref: ${product.sku}
• Origin: ${product.originLabel}
• Price: AED ${product.priceAED.toLocaleString()}

Customer Information:
• Name: ${name || '[Not specified]'}
• Contact: ${phone || '[My WhatsApp]'}
• Delivery Emirate: ${city}
• Special Notes: ${notes || 'None'}

Please confirm availability and coordinate the white glove delivery schedule with me.`;
    }

    return `السلام عليكم ورحمة الله وبركاته
Hello AL-ATHAR Concierge,

I am inquiring about bespoke collectible furniture and interior decor commissions in the UAE.

• Client Name: ${name || '[Customer]'}
• Emirate: ${city}
• Request Details: ${notes || 'Interested in private viewing and bespoke commissions'}`;
  };

  const messageText = generateMessage();

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(messageText);
    const url = `https://wa.me/${CLIENT_WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] w-full max-w-lg rounded-sm shadow-2xl border border-[#D5CEBE] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#25D366] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5" />
            <div>
              <h3 className="text-sm font-semibold tracking-wide">AL-ATHAR WhatsApp Concierge</h3>
              <span className="text-[11px] text-white/90">Direct communication with gallery founder</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Product Pill if specific piece */}
          {product && (
            <div className="bg-[#F2ECE1] p-3 rounded-sm border border-[#E0D5C1] flex items-center gap-3">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-12 h-12 object-cover rounded-sm border border-[#D5CEBE]"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-[#8C6D32] uppercase tracking-wider font-semibold block">
                  {product.originLabel}
                </span>
                <h4 className="text-xs font-semibold text-[#1C1A17] truncate">
                  {product.name}
                </h4>
                <span className="text-xs font-mono font-bold text-[#1C1A17]">
                  {formatPrice(product.priceAED)}
                </span>
              </div>
            </div>
          )}

          {/* User Input Fields */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#6B655D] mb-1 font-medium">Your Name / الاسم</label>
              <div className="flex items-center border border-[#D5CEBE] rounded-sm bg-white px-3 py-2">
                <User className="w-3.5 h-3.5 text-[#8C8476] mr-2" />
                <input 
                  type="text" 
                  placeholder="e.g. Fatima Al Nuaimi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-[#1C1A17]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#6B655D] mb-1 font-medium">Phone / WhatsApp</label>
                <div className="flex items-center border border-[#D5CEBE] rounded-sm bg-white px-3 py-2">
                  <Phone className="w-3.5 h-3.5 text-[#8C8476] mr-2" />
                  <input 
                    type="text" 
                    placeholder="+971 50 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-[#1C1A17]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#6B655D] mb-1 font-medium">Emirate / الإمارة</label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-[#D5CEBE] rounded-sm bg-white px-3 py-2 text-[#1C1A17] focus:outline-none"
                >
                  <option value="Dubai">Dubai (دبي)</option>
                  <option value="Abu Dhabi">Abu Dhabi (أبوظبي)</option>
                  <option value="Sharjah">Sharjah (الشارقة)</option>
                  <option value="Ajman">Ajman (عجمان)</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah (رأس الخيمة)</option>
                  <option value="Fujairah">Fujairah (الفجيرة)</option>
                  <option value="Umm Al Quwain">Umm Al Quwain (أم القيوين)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#6B655D] mb-1 font-medium">Delivery Notes / ملاحظات التوصيل</label>
              <textarea 
                rows="2"
                placeholder="Specific floor, gate code, or preferred delivery timing..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-[#D5CEBE] rounded-sm bg-white px-3 py-2 text-[#1C1A17] focus:outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Pre-generated Message Preview */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-[#8C8476] mb-1">
              <span>Automated Message Preview:</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1 text-[#8C6D32] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-[#25D366]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="bg-[#EDE8DE] p-3 rounded-sm text-[11px] text-[#554E44] font-sans whitespace-pre-wrap max-h-32 overflow-y-auto border border-[#DDD6C8]">
              {messageText}
            </pre>
          </div>

          {/* Send Button */}
          <div className="pt-2">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-sm font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Directly to Gallery via WhatsApp</span>
            </button>
            <p className="text-center text-[10px] text-[#8C8476] mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#25D366]" />
              <span>Our founder personally reviews and coordinates all white glove deliveries</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
