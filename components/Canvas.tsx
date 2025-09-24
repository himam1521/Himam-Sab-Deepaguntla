
import React from 'react';
import type { GeneratedImage } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface CanvasProps {
  activeImage: GeneratedImage | null;
  isLoading: boolean;
  loadingMessage: string;
}

const Canvas: React.FC<CanvasProps> = ({ activeImage, isLoading, loadingMessage }) => {
  return (
    <main className="flex-1 bg-gray-900 flex items-center justify-center p-8 relative">
      {isLoading && <LoadingSpinner message={loadingMessage} />}
      <div className="w-full h-full border-2 border-dashed border-gray-700 rounded-2xl flex items-center justify-center bg-black/20 overflow-hidden">
        {activeImage ? (
          <img
            src={activeImage.src}
            alt={activeImage.prompt}
            className="max-w-full max-h-full object-contain transition-opacity duration-500"
          />
        ) : (
          <div className="text-center text-gray-500">
            <h2 className="text-2xl font-semibold">Welcome to AutoDesign AI</h2>
            <p className="mt-2">Use the controls on the left to generate your first automotive concept.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Canvas;
