import React, { useState } from 'react';
import { Video, Send } from 'lucide-react';
import { ModelProps } from '../types';

export default function VideoModel({ onSubmit, result, loading, error }: ModelProps) {
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
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
            placeholder="Describe the video you want to generate..."
            rows={4}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {input.length}/500
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 px-6 rounded-xl hover:from-red-700 hover:to-rose-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              <span>Generating Video...</span>
            </>
          ) : (
            <>
              <Video className="w-5 h-5" />
              <span>Generate Video</span>
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
        <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-100">
          <h3 className="text-lg font-semibold text-red-900 mb-4">Generated Video</h3>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
            <video controls className="w-full h-full">
              <source src={result} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
          <div className="mt-4 flex justify-end">
            <a
              href={result}
              download="generated-video.mp4"
              className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
            >
              Download Video
            </a>
          </div>
        </div>
      )}
    </div>
  );
}