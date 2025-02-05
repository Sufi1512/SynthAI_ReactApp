import React, { useState } from 'react';
import { Code2, Send, Copy, Check } from 'lucide-react';
import { ModelProps } from '../types';

export default function CodeModel({ onSubmit, result, loading, error }: ModelProps) {
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
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
            placeholder="Describe the code you want to generate..."
            rows={4}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {input.length}/1000
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              <span>Generating Code...</span>
            </>
          ) : (
            <>
              <Code2 className="w-5 h-5" />
              <span>Generate Code</span>
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
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-green-900">Generated Code</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-green-600 hover:bg-green-50 transition-colors"
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
          <div className="relative">
            <pre className="max-h-96 overflow-y-auto rounded-lg bg-gray-900 p-4 text-sm font-mono text-gray-100 shadow-inner">
              <code className="block whitespace-pre-wrap">{result}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}