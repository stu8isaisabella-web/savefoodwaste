import React from 'react';
import { X, Award, Download, Share2, CheckCircle2, Leaf, Globe2, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPdfView?: boolean;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  isPdfView = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto p-5 shadow-2xl border border-[#e5eada] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f1f6e6] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#fee9ce] text-[#784f22] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-[17px] text-[#181d14]">
                {isPdfView ? 'Impact Summary Document' : 'Official Sustainability Certificate'}
              </h2>
              <p className="text-[11px] text-[#55624b]">
                Verified by WiseBite Commercial Food Recovery Network
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1f6e6] hover:bg-[#e5eada] text-[#55624b] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Sheet Display */}
        <div className="bg-[#fbf9f5] border-2 border-[#d7c4aa] rounded-2xl p-5 text-center relative overflow-hidden shadow-inner space-y-3">
          {/* Subtle watermark / bg seal */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#fee9ce]/40 pointer-events-none flex items-center justify-center">
            <Leaf className="w-16 h-16 text-[#c1ac8f]/20" />
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#fee9ce] text-[#784f22] text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#d97706]" />
            <span>COMMERCIAL ZERO-WASTE EXCELLENCE</span>
          </div>

          <h3 className="font-heading font-bold text-[20px] text-[#2f3923] tracking-tight">
            Sunrise Café
          </h3>
          <p className="text-[11px] text-[#55624b]">
            Certificate of Community Food Recovery & Climate Diversion
          </p>

          <div className="py-2 border-y border-[#d7c4aa]/50 grid grid-cols-3 gap-2">
            <div>
              <span className="font-heading font-bold text-[18px] text-[#181d14] block">
                312
              </span>
              <span className="text-[10px] text-[#55624b]">Meals Rescued</span>
            </div>
            <div>
              <span className="font-heading font-bold text-[18px] text-[#181d14] block">
                156.4 kg
              </span>
              <span className="text-[10px] text-[#55624b]">Landfill Saved</span>
            </div>
            <div>
              <span className="font-heading font-bold text-[18px] text-[#181d14] block">
                391 kg
              </span>
              <span className="text-[10px] text-[#55624b]">CO₂e Avoided</span>
            </div>
          </div>

          <div className="text-[11px] text-[#55624b] text-left space-y-1 bg-white/70 rounded-xl p-3 border border-[#e5eada]">
            <p className="font-semibold text-[#181d14]">Audited Partners:</p>
            <p>• Hope Community Food Bank (180 meals)</p>
            <p>• Downtown Youth Shelter (92 meals)</p>
            <p>• St. Jude Community Table (40 meals)</p>
          </div>

          <div className="pt-2 flex items-center justify-between text-[10px] text-[#76786f]">
            <span>Registry ID: #WB-SF-8921-2026</span>
            <span className="font-semibold text-[#455038]">UN SDG Aligned (2, 12, 13)</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              window.print();
            }}
            className="w-full py-3 px-4 bg-[#2f3923] hover:bg-[#404434] text-white font-heading font-semibold text-[14px] rounded-full shadow-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isPdfView ? 'Print / Save PDF Report' : 'Download Certificate Badge'}</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-[#f1f6e6] hover:bg-[#e5eada] text-[#2f3923] font-semibold text-[13px] rounded-full transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
