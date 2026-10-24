import React, { useState } from 'react';
import { X, Check, Server, Globe, Laptop, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getApiBaseUrl, setApiBaseUrl, API_ENDPOINTS } from '../api/hiringApi';

export default function ApiConfigModal({ isOpen, onClose, onApiChanged }) {
  const [selectedUrl, setSelectedUrl] = useState(getApiBaseUrl());
  const [testingStatus, setTestingStatus] = useState(null);
  const [testMessage, setTestMessage] = useState('');

  if (!isOpen) return null;

  const handleSelect = (url) => {
    setSelectedUrl(url);
    setTestingStatus(null);
  };

  const handleSave = () => {
    if (!selectedUrl) return;
    setApiBaseUrl(selectedUrl);
    if (onApiChanged) onApiChanged(selectedUrl);
    onClose();
  };

  const handleTestConnection = async () => {
    if (!selectedUrl) return;

    setTestingStatus('testing');
    setTestMessage('Checking connection to BXC server...');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(`${selectedUrl}/api/hiring/roles`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        setTestingStatus('success');
        setTestMessage(`Connected successfully! Server status: ${res.status}`);
      } else {
        setTestingStatus('success');
        setTestMessage(`Server reached (Status ${res.status}). Ready for submissions.`);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setTestingStatus('error');
        setTestMessage('Connection timed out after 6 seconds.');
      } else {
        setTestingStatus('error');
        setTestMessage(`Failed: ${err.message}. Ensure backend is running.`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black border border-neutral-800 flex items-center justify-center text-[#ccf141]">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-black text-base text-white uppercase tracking-wide">
                API Environment
              </h3>
              <p className="text-[11px] text-neutral-400">Target backend server</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Options */}
        <div className="space-y-2.5 mb-5">
          {/* Live */}
          <div
            onClick={() => handleSelect(API_ENDPOINTS.LIVE)}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              selectedUrl === API_ENDPOINTS.LIVE
                ? 'bg-[#ccf141]/10 border-[#ccf141] text-white'
                : 'bg-black border-neutral-800 text-neutral-300 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#ccf141]" />
              <div>
                <div className="text-xs font-bold flex items-center gap-2">
                  <span>Production (Live)</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#ccf141]/20 text-[#ccf141] font-mono">
                    HTTPS
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  https://api.boxandcross.com
                </div>
              </div>
            </div>
            {selectedUrl === API_ENDPOINTS.LIVE && <Check className="w-4 h-4 text-[#ccf141]" />}
          </div>

          {/* Local */}
          <div
            onClick={() => handleSelect(API_ENDPOINTS.LOCAL)}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              selectedUrl === API_ENDPOINTS.LOCAL
                ? 'bg-[#ccf141]/10 border-[#ccf141] text-white'
                : 'bg-black border-neutral-800 text-neutral-300 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <Laptop className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-xs font-bold flex items-center gap-2">
                  <span>Local Development</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-500/20 text-amber-400 font-mono">
                    PORT 5000
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  http://localhost:5000
                </div>
              </div>
            </div>
            {selectedUrl === API_ENDPOINTS.LOCAL && <Check className="w-4 h-4 text-[#ccf141]" />}
          </div>
        </div>

        {/* Test Connection Button */}
        <div className="mb-5 p-3 rounded-xl bg-black border border-neutral-800 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-neutral-400 font-medium">Connectivity Ping:</span>
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testingStatus === 'testing'}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#ccf141] text-[11px] font-bold text-neutral-200 hover:text-white flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3 h-3 ${testingStatus === 'testing' ? 'animate-spin' : ''}`} />
              <span>Test Ping</span>
            </button>
          </div>

          {testingStatus && (
            <div className={`text-[11px] p-2 rounded-lg flex items-start gap-1.5 ${
              testingStatus === 'success' 
                ? 'bg-[#ccf141]/10 text-[#ccf141] border border-[#ccf141]/30' 
                : testingStatus === 'error'
                ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                : 'bg-neutral-900 text-neutral-300'
            }`}>
              {testingStatus === 'success' && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
              {testingStatus === 'error' && <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
              <span>{testMessage}</span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3.5 border-t border-neutral-800">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#ccf141] hover:bg-[#d9f560] text-black text-xs font-black uppercase tracking-wider shadow-volt-glow"
          >
            Save Setting
          </button>
        </div>

      </div>
    </div>
  );
}
