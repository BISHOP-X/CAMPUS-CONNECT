import { useState } from "react";
import { DownloadAppModal } from "./DownloadAppModal";
import { Download } from "lucide-react";

export function DownloadAppButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition"
        onClick={() => setOpen(true)}
      >
        <Download className="w-4 h-4" /> Download App
      </button>
      <DownloadAppModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
