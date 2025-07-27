// filepath: c:\Users\Shreeyansh\Desktop\skillmatch\Resume_v1\frontend\src\components\templates\TemplatePreviewModal.jsx
import React from "react";

const TemplatePreviewModal = ({ open, onClose, template }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <button className="absolute top-2 right-2" onClick={onClose}>Close</button>
        <h2 className="text-xl font-bold mb-4">{template?.name || "Template Preview"}</h2>
        {/* Render your template preview here */}
        <div>
          <img src={template?.preview} alt={template?.name} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;