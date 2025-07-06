import { useState } from 'react';
import PDFUploader from '../components/PDFUploader';
import QuestionBox from '../components/QuestionBox';

function UploadPage() {
  const [filename, setFilename] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">PDF Q&A Assistant</h2>
        <PDFUploader onUploaded={setFilename} />
        {filename && <QuestionBox filename={filename} />}
      </div>
    </div>
  );
}

export default UploadPage;
