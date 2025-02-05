import React, { useState } from 'react';
import { MessageSquare, Send, Copy, Check } from 'lucide-react';
import { ModelProps } from '../types';

const cleanText = (text: string) => {
  // Remove unwanted characters (e.g., '*', '#', etc.)
  return text.replace(/[*#]/g, '').trim();
};

export default function TextModel({ onSubmit, result, loading, error }: ModelProps) {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await onSubmit(input);
    setInput('');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            placeholder="Enter your prompt..."
            rows={4}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {input.length}/1000
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-5 h-5" />
              <span>Generate Text</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {result && (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-900">Generated Text</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto bg-white rounded-lg p-4 shadow-inner">
            <p className="whitespace-pre-wrap text-gray-800">{cleanText(result)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
