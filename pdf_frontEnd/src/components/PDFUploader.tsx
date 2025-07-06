import { useState } from 'react';
import api from '../api/backend';

function PDFUploader({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/upload', formData);
      setMessage('✅ Uploaded!');
      onUploaded(res.data.filename);
    } catch {
      setMessage('❌ Upload failed.');
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold text-gray-700">Choose a PDF</label>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3 w-full text-sm"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl transition"
      >
        Upload
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}

export default PDFUploader;
