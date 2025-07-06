import { useState } from 'react';
import api from '../api/backend';

function QuestionBox({ filename }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;

    setLoading(true);
    try {
      const res = await api.post('/ask', { filename, question });
      setAnswer(res.data.answer);
    } catch {
      setAnswer('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="mt-6">
      <label className="block mb-2 font-semibold text-gray-700">Ask a Question</label>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="e.g. What is the project Koushik worked on?"
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleAsk}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-xl transition"
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      {answer && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border text-sm text-gray-800">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default QuestionBox;
