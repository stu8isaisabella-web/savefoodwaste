import React, { useState } from 'react';
import {
  X,
  QrCode,
  CheckCircle2,
  Building2,
  Thermometer,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { RescueBatch } from '../../types/rescue';

interface HandoverModalProps {
  isOpen: boolean;
  batch: RescueBatch | null;
  onClose: () => void;
  onConfirmHandoff: (batchId: string) => void;
}

export const HandoverModal: React.FC<HandoverModalProps> = ({
  isOpen,
  batch,
  onClose,
  onConfirmHandoff,
}) => {
  const [tempVerified, setTempVerified] = useState(true);
  const [identityVerified, setIdentityVerified] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !batch) return null;

  const handleConfirm = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onConfirmHandoff(batch.id);
      setIsSuccess(false);
      onClose();
    }, 1100);
  };

  const volunteerName = batch.reservedBy?.volunteer || 'Marcus D.';
  const volunteerId = batch.reservedBy?.volunteerId || '#HC-882';
  const shelterName = batch.reservedBy?.shelterName || 'Hope Community Food Bank';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-[#e5eada] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f1f6e6] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#2f3923] text-white flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-[17px] text-[#181d14]">
                Volunteer Handover Verification
              </h2>
              <p className="text-[11px] text-[#55624b]">
                Stage 3 Dispatch & Custody Transfer
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

        {/* QR Code Scanner Visualizer */}
        <div className="bg-[#f7fbeb] rounded-2xl p-4 border border-[#e5eada] flex flex-col items-center text-center space-y-3">
          <div className="w-36 h-36 bg-white rounded-2xl p-2.5 shadow-sm border border-[#c6c7bd]/50 flex items-center justify-center relative">
            {/* Stylized QR Code SVG */}
            <svg
              className="w-full h-full text-[#2f3923]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm10-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm-6-8h2v2h-2V7zm2 2h2v2h-2V9zm2-2h2v2h-2V7zm-2 4h2v2h-2v-2zm-4 0h2v2h-2v-2zm2 2h2v2h-2v-2z" />
            </svg>
            <div className="absolute inset-x-2 top-1/2 h-0.5 bg-emerald-500 animate-pulse"></div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#76786f]">
              DIGITAL CUSTODY TOKEN
            </span>
            <p className="font-mono text-[12px] font-semibold text-[#181d14]">
              WB-DISPATCH-{batch.batchNumber || 'B-408'}
            </p>
          </div>
        </div>

        {/* Batch & Shelter Info */}
        <div className="bg-[#f1f6e6] rounded-2xl p-3 border border-[#d8e0ce] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-heading font-semibold text-[13px] text-[#181d14]">
              {batch.title}
            </span>
            <span className="text-[11px] font-bold text-[#2f3923] bg-[#d8e8c9] px-2 py-0.5 rounded-full">
              {batch.quantityUnits}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[12px] text-[#55624b] pt-1">
            <Building2 className="w-3.5 h-3.5 text-[#455038]" />
            <span>{shelterName} • {volunteerName} ({volunteerId})</span>
          </div>
        </div>

        {/* Verification Checkpoints */}
        <div className="space-y-2 text-xs">
          <label className="flex items-center space-x-2.5 p-2.5 bg-[#f7fbeb] rounded-xl border border-[#e5eada] cursor-pointer">
            <input
              type="checkbox"
              checked={identityVerified}
              onChange={(e) => setIdentityVerified(e.target.checked)}
              className="rounded text-[#2f3923] focus:ring-[#2f3923]"
            />
            <span className="text-[12px] text-[#181d14] font-medium">
              Verified volunteer ID and charity vehicle badge
            </span>
          </label>

          <label className="flex items-center space-x-2.5 p-2.5 bg-[#f7fbeb] rounded-xl border border-[#e5eada] cursor-pointer">
            <input
              type="checkbox"
              checked={tempVerified}
              onChange={(e) => setTempVerified(e.target.checked)}
              className="rounded text-[#2f3923] focus:ring-[#2f3923]"
            />
            <span className="text-[12px] text-[#181d14] font-medium">
              Food handover temp logged and compliant packaging intact
            </span>
          </label>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <button
            onClick={handleConfirm}
            disabled={!identityVerified || !tempVerified || isSuccess}
            className={`w-full py-3.5 px-4 rounded-full font-heading font-semibold text-[14px] flex items-center justify-center space-x-2 shadow-xs transition-colors cursor-pointer active:scale-[0.99] ${
              identityVerified && tempVerified && !isSuccess
                ? 'bg-[#2f3923] hover:bg-[#404434] text-white'
                : isSuccess
                ? 'bg-emerald-700 text-white'
                : 'bg-[#c6c7bd] text-white/80 cursor-not-allowed'
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-bounce" />
                <span>Handover Verified & Archived!</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Handover & Archive Receipt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
