"use client";

import { useState } from "react";


interface CustomerNoteProps {
value: string;
onChange: (value: string) => void;
maxLength?: number;
}

export default function CustomerNote({
value,
onChange,
maxLength = 500,
}: CustomerNoteProps) {
const [focused, setFocused] = useState(false);

return (
    
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
         <div className="mb-3 flex items-center gap-2">
            


    <div>
      <h3 className="text-xs font-semibold text-gray-900">
         Help our technician prepare for your visit
      </h3>
      
    </div>
  </div>

  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    maxLength={maxLength}
    rows={focused || value ? 3 : 2}
    placeholder="Anything the technician should know? e.g. location of the issue, access instructions..."
    className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-2 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100"
  />

  <div className="mt-1 flex justify-end">
    <span className="text-xs text-gray-400">
      {value.length}/{maxLength}
    </span>
  </div>
</div>


);
}
