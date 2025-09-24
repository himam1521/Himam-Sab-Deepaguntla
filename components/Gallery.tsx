
import React from 'react';
import type { GeneratedImage } from '../types';

interface GalleryProps {
  images: GeneratedImage[];
  onSelectImage: (image: GeneratedImage) => void;
  activeImageId: string | null;
}

const Gallery: React.FC<GalleryProps> = ({ images, onSelectImage, activeImageId }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border-t border-gray-700 h-48 p-4">
      <h3 className="text-lg font-semibold mb-3 text-white">Design History</h3>
      {images.length === 0 ? (
         <div className="flex items-center justify-center h-full text-gray-500 text-sm">No concepts generated yet.</div>
      ) : (
        <div className="flex space-x-4 overflow-x-auto h-[130px] pb-3">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => onSelectImage(image)}
              className={`relative flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 transform hover:scale-105 ${activeImageId === image.id ? 'ring-4 ring-blue-500' : 'ring-2 ring-transparent hover:ring-blue-400'}`}
            >
              <img src={image.src} alt={image.prompt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                 <p className="text-white text-xs text-center line-clamp-3">{image.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
