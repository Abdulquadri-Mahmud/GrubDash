'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const showAnimatedToast = (type, message) => {
  toast.custom(
    (t) => (
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`max-w-sm w-full rounded-xl px-4 py-3 shadow-lg flex items-start gap-3 ${
          type === "success"
            ? "bg-white border-l-4 border-emerald-400"
            : "bg-white border-l-4 border-rose-400"
        }`}
      >
        <div className="mt-0.5">{type === "success" ? <Check className="text-emerald-500" /> : <X className="text-rose-500" />}</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <button onClick={() => toast.dismiss(t.id)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
      </motion.div>
    ),
    { position: "top-right", duration: 4000 }
  );
};

export default showAnimatedToast;