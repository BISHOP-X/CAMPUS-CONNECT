import { motion } from "framer-motion";
import { X, Share, Plus, Home } from "lucide-react";
import { useState } from "react";

interface IOSInstallInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IOSInstallInstructions({ isOpen, onClose }: IOSInstallInstructionsProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold text-white">CC</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Install Campus Connect</h2>
                <p className="text-sm text-gray-600">Add to Home Screen</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Install Campus Connect on your iPhone for the best experience. Just follow these simple steps:
            </p>
          </div>

          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-semibold text-sm">1</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-2">Tap the Share button</h3>
              <p className="text-sm text-gray-600 mb-3">
                Look for the Share button in Safari's toolbar (bottom of the screen)
              </p>
              <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-center">
                <div className="bg-blue-500 rounded-md p-2">
                  <Share className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-semibold text-sm">2</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-2">Find "Add to Home Screen"</h3>
              <p className="text-sm text-gray-600 mb-3">
                Scroll down in the share menu until you see this option
              </p>
              <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                <div className="bg-gray-300 rounded-md p-2">
                  <Plus className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Add to Home Screen</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-semibold text-sm">3</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-2">Tap "Add"</h3>
              <p className="text-sm text-gray-600 mb-3">
                Confirm the installation by tapping "Add" in the top right
              </p>
              <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-center">
                <div className="bg-blue-500 rounded-md px-4 py-2">
                  <span className="text-white font-medium text-sm">Add</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Home className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-green-900">You're all set!</h4>
                <p className="text-sm text-green-700">
                  Campus Connect will appear on your home screen and work just like a native app.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-100 p-6 pt-4">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white py-3 px-4 rounded-xl font-medium
                       hover:from-[#1d4ed8] hover:to-[#1e40af] transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
