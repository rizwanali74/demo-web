import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Send, 
  ShieldCheck 
} from 'lucide-react';

export default function WhatsAppOrderModal({ product, formatPrice, onClose }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Dubai');

  // Client WhatsApp number
  const CLIENT_WHATSAPP_NUMBER = '971508821971';

  const handleOpenWhatsApp = () => {
    let message = '';
    if (product) {
      message = `Hello HUJRAH // حجره Concierge,

I would like to order:
• Piece: ${product.name}
• Ref: ${product.sku || product.id}
• Price: AED ${product.priceAED.toLocaleString()}
• Name: ${name || 'Client'}
• City: ${city}

Please confirm delivery & dispatch availability.`;
    } else {
      message = `Hello HUJRAH // حجره Concierge,

I am inquiring about furniture pieces, custom sizing, and delivery in ${city}.
• Name: ${name || 'Client'}`;
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CLIENT_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] w-full max-w-md rounded-sm shadow-2xl border border-[#D5CEBE] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#25D366] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h3 className="text-sm font-semibold">Order via WhatsApp</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Piece preview */}
          {product && (
            <div className="bg-[#F2ECE1] p-3 rounded-sm border border-[#E0D5C1] flex items-center gap-3">
              <img 
                src={product.image} 
                alt="" 
                className="w-12 h-12 object-cover rounded-sm border border-[#D5CEBE]"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-[#8C6D32] font-semibold block uppercase">
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

          {/* 2 Simple Inputs */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#6B655D] mb-1 font-medium">Your Name</label>
              <input 
                type="text" 
                placeholder="e.g. Fatima Al Maktoum"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-[#D5CEBE] rounded-sm bg-white px-3 py-2 text-[#1C1A17] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#6B655D] mb-1 font-medium">Delivery City</label>
              <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-[#D5CEBE] rounded-sm bg-white px-3 py-2 text-[#1C1A17] focus:outline-none cursor-pointer"
              >
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Ajman">Ajman</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                <option value="Fujairah">Fujairah</option>
                <option value="Umm Al Quwain">Umm Al Quwain</option>
              </select>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-sm font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Order to WhatsApp</span>
            </button>
            <p className="text-center text-[10px] text-[#8C8476] mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#25D366]" />
              <span>Direct communication with gallery founder for White Glove delivery</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
