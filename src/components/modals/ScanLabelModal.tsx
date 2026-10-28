import React, { useState } from 'react';
import { X, Scan, Camera, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { InventoryItem } from '../../types/rescue';

interface ScanLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanResult: (scannedItem: Partial<InventoryItem>) => void;
}

export const ScanLabelModal: React.FC<ScanLabelModalProps> = ({
  isOpen,
  onClose,
  onScanResult,
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  if (!isOpen) return null;

  const sampleLabels = [
    {
      title: 'Cooked Brown Rice Batch #B-412',
      category: 'Prepared Dishes' as const,
      quantity: 4.2,
      unit: 'kg',
      location: 'Fridge (Chiller 1)',
      expiryUrgency: 'today' as const,
      expiryLabel: 'End of Day',
      storageProtocol: 'Walk-in Chiller (< 4°C)',
      tempRequirement: 'Must maintain < 4°C',
      currentTemp: '3.1°C',
      useItUpIdea: 'Fried rice staff special, soup thickener base.',
      rescueWindowHours: 4,
      image:
        'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Artisan Pain au Chocolat (14 pcs)',
      category: 'Bakery & Breads' as const,
      quantity: 14,
      unit: 'pcs',
      location: 'Bakery Display / Counter',
      expiryUrgency: 'today' as const,
      expiryLabel: 'Expires Tonight',
      storageProtocol: 'Ambient Bakery Counter',
      useItUpIdea: 'Chocolate croissant pudding or staff morning perk.',
      rescueWindowHours: 8,
      image:
        'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Farm Spinach & Herb Salad (3.0 kg)',
      category: 'Produce & Greens' as const,
      quantity: 3.0,
      unit: 'kg',
      location: 'Crisper Drawer (Bin B)',
      expiryUrgency: '2days' as const,
      expiryLabel: 'In 2 Days',
      storageProtocol: 'Chilled Storage (3°C)',
      useItUpIdea: 'Green smoothie base or sauteed garlic spinach side.',
      rescueWindowHours: 48,
      image:
        'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const currentPreset = sampleLabels[selectedPresetIndex];

  const handleSimulateScan = () => {
    setIsScanning(true);
    setHasScanned(false);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 1200);
  };

  const handleApply = () => {
    onScanResult({
      name: currentPreset.title,
      shortName: currentPreset.title.slice(0, 18) + '...',
      category: currentPreset.category,
      quantity: currentPreset.quantity,
      unit: currentPreset.unit,
      location: currentPreset.location,
      batchTimestamp: 'Batch: Today 11:30 AM',
      expiryUrgency: currentPreset.expiryUrgency,
      expiryLabel: currentPreset.expiryLabel,
      storageProtocol: currentPreset.storageProtocol,
      tempRequirement: currentPreset.tempRequirement,
      currentTemp: currentPreset.currentTemp,
      useItUpIdea: currentPreset.useItUpIdea,
      rescueWindowHours: currentPreset.rescueWindowHours,
      status: 'in_kitchen',
      allergens: [],
      image: currentPreset.image,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-[#e5eada] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f1f6e6] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#2f3923] text-white flex items-center justify-center">
              <Scan className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-[17px] text-[#181d14]">
                Simulated OCR Label Scanner
              </h2>
              <p className="text-[11px] text-[#55624b]">
                Optical recognition for commercial kitchen prep tags
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

        {/* Camera Viewfinder Mockup */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 aspect-4/3 flex items-center justify-center border-2 border-[#2f3923]">
          <img
            src={currentPreset.image}
            alt="Camera stream"
            className="w-full h-full object-cover opacity-60"
          />

          {/* Scanner Overlay */}
          <div className="absolute inset-6 border-2 border-dashed border-emerald-400/80 rounded-xl flex flex-col justify-between p-3 pointer-events-none">
            <div className="flex justify-between items-center text-[10px] text-emerald-400 font-mono font-bold tracking-wider">
              <span>WISEBITE-OCR v2.4</span>
              <span>PAR CODE ACTIVE</span>
            </div>
            {isScanning && (
              <div className="w-full h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-bounce"></div>
            )}
            <div className="text-[10px] text-center text-white/90 bg-black/60 py-1 px-2 rounded-md backdrop-blur-xs">
              {isScanning
                ? 'Parsing lot expiration & cold-chain holding...'
                : hasScanned
                ? '✓ Label Recognized!'
                : 'Align commercial prep tag within frame'}
            </div>
          </div>
        </div>

        {/* Sample tag switcher */}
        <div>
          <label className="block text-[11px] font-semibold text-[#55624b] uppercase tracking-wider mb-1.5">
            Select Commercial Tag Sample to Scan:
          </label>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            {sampleLabels.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setHasScanned(false);
                }}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedPresetIndex === idx
                    ? 'bg-[#2f3923] text-white border-[#2f3923] font-semibold'
                    : 'bg-[#f4efe6] text-[#181d14] border-[#c6c7bd]/50 hover:bg-[#ebf0e0]'
                }`}
              >
                <span className="block truncate text-[11px]">{sample.title}</span>
                <span className="text-[10px] opacity-80">{sample.quantity} {sample.unit}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scan Results Card if scanned */}
        {hasScanned && (
          <div className="bg-[#f1f6e6] rounded-2xl p-3 border border-[#d8e0ce] space-y-1.5 text-xs">
            <div className="flex items-center space-x-1.5 text-[#2f3923] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Extracted Kitchen Metadata</span>
            </div>
            <p className="font-heading font-bold text-[14px] text-[#181d14]">
              {currentPreset.title}
            </p>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-[#55624b]">
              <span>Storage: {currentPreset.storageProtocol}</span>
              <span>Shelf Window: {currentPreset.expiryLabel}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-1 flex space-x-2">
          {!hasScanned ? (
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="w-full py-3 px-4 bg-[#2f3923] hover:bg-[#404434] text-white rounded-full font-heading font-semibold text-[14px] flex items-center justify-center space-x-2 shadow-xs cursor-pointer transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span>{isScanning ? 'Analyzing Tag...' : 'Scan Prep Label'}</span>
            </button>
          ) : (
            <button
              onClick={handleApply}
              className="w-full py-3 px-4 bg-[#2f3923] hover:bg-[#404434] text-white rounded-full font-heading font-semibold text-[14px] flex items-center justify-center space-x-2 shadow-xs cursor-pointer transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Import to Kitchen Inventory</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
