import React, { useState } from 'react';
import { Image, Send, Sparkles } from 'lucide-react';
import { ModelProps } from '../types';

export default function ImageModel({ onSubmit, result, loading, error }: ModelProps) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await onSubmit(input);
    setInput('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
            placeholder="Describe the image you want to generate in detail..."
            rows={4}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {input.length}/1000
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-pink-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              <span>Creating Masterpiece...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Image</span>
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
        <div className="overflow-hidden rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-pink-50 p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-4">Generated Image</h3>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <img
              src={result}
              alt="AI Generated"
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <a
              href={result}
              download="generated-image.png"
              className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700"
            >
              Download Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
}