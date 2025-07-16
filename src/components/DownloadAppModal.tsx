import { useState } from "react";
import { IOSInstallInstructions } from "./IOSInstallInstructions";
import { usePWAInstall } from "../hooks/usePWAInstall";

export function DownloadAppModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { installApp } = usePWAInstall();
  const [showIOS, setShowIOS] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs relative">
        <button className="absolute top-2 right-2 text-slate-400 hover:text-slate-700" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-bold mb-4 text-center">Download Campus Connect</h2>
        <div className="space-y-4">
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => { installApp(); onClose(); }}
          >
            Download for Android / Windows
          </button>
          <button
            className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition"
            onClick={() => setShowIOS(true)}
          >
            Download for iOS
          </button>
        </div>
        {showIOS && (
          <IOSInstallInstructions isOpen={true} onClose={() => { setShowIOS(false); onClose(); }} />
        )}
      </div>
    </div>
  );
}
