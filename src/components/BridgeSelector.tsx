import React from 'react';
import { bridgeDataService, RealBridgeProfile } from '@/services/bridgeDataService';
import { MapPin, Search } from 'lucide-react';

interface BridgeSelectorProps {
  selectedBridge: RealBridgeProfile;
  onSelectBridge: (bridge: RealBridgeProfile) => void;
}

export const BridgeSelector: React.FC<BridgeSelectorProps> = ({
  selectedBridge,
  onSelectBridge,
}) => {
  const bridges = bridgeDataService.getBridges();

  return (
    <div className="w-full bg-[#2f2116] border-y border-[#4f3622] py-4 px-6 md:px-10 font-mono">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Title & Selector Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center space-x-2 text-legal-oryzo text-[#fee197]">
            <MapPin className="w-4 h-4 text-[#fee197]" />
            <span className="font-medium">SELECT BRIDGE (CSV ARCHIVE):</span>
          </div>

          <div className="relative">
            <select
              value={selectedBridge.id}
              onChange={(e) => {
                const b = bridgeDataService.setSelectedBridge(e.target.value);
                onSelectBridge(b);
              }}
              className="bg-[#2f2116] border border-[#4f3622] text-[#ffebd0] text-legal-oryzo px-4 py-1.5 focus:outline-none focus:border-[#fee197]"
            >
              {bridges.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} — {b.name} ({b.county}, {b.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Bridge Quick Context Bar */}
        <div className="flex flex-wrap items-center gap-4 text-legal-oryzo text-[#ffebd0]/80">
          <div>
            <span className="text-[#987f61]">AGE:</span> <span className="text-[#ffebd0] font-medium">{selectedBridge.bridgeAge} YRS</span>
          </div>
          <div>
            <span className="text-[#987f61]">ADT:</span> <span className="text-[#ffebd0] font-medium">{selectedBridge.trafficADT.toLocaleString()} VEH</span>
          </div>
          <div>
            <span className="text-[#987f61]">COND:</span> <span className="text-[#fee197] font-medium">{selectedBridge.condition}</span>
          </div>
          <div>
            <span className="text-[#987f61]">COORDS:</span> <span className="text-[#ffebd0] font-mono">{selectedBridge.latitude.toFixed(4)}, {selectedBridge.longitude.toFixed(4)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
