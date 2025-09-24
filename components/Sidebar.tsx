
import React from 'react';
import type { AspectRatio, GeneratedImage } from '../types';
import { AppMode } from '../types';
import { SparklesIcon, EditIcon } from './icons';

interface SidebarProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  handleGenerate: () => void;
  handleRefine: () => void;
  isLoading: boolean;
  selectedImageForRefine: GeneratedImage | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const aspectRatios: AspectRatio[] = ["16:9", "1:1", "9:16", "4:3", "3:4"];

const Sidebar: React.FC<SidebarProps> = ({
  mode,
  setMode,
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  handleGenerate,
  handleRefine,
  isLoading,
  selectedImageForRefine,
  handleFileChange,
}) => {
  const isGenerateDisabled = isLoading || prompt.trim().length < 10;
  const isRefineDisabled = isLoading || prompt.trim().length < 10 || !selectedImageForRefine;

  const renderGenerateTab = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Design Prompt
        </label>
        <textarea
          id="prompt"
          rows={5}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="e.g., A futuristic electric GT sports car, aggressive front fascia, sleek aerodynamic lines..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">Describe the vehicle concept in detail.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
        <div className="grid grid-cols-5 gap-2">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio}
              onClick={() => setAspectRatio(ratio)}
              className={`px-2 py-2 text-sm rounded-md transition-colors ${
                aspectRatio === ratio
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleGenerate}
        disabled={isGenerateDisabled}
        className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        Generate Concept
      </button>
    </div>
  );

  const renderRefineTab = () => (
    <div className="space-y-6">
       <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Selected Image</label>
        <div className="h-40 bg-gray-900 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
            {selectedImageForRefine ? (
                <img src={selectedImageForRefine.src} alt="Selected for refinement" className="max-h-full max-w-full object-contain rounded-md" />
            ) : (
                <p className="text-gray-500 text-sm text-center px-4">Select an image from the gallery or upload one to refine.</p>
            )}
        </div>
       </div>
       <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">
            Or Upload Image
          </label>
          <input id="file-upload" name="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>
       <div>
        <label htmlFor="refine-prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Refinement Instruction
        </label>
        <textarea
          id="refine-prompt"
          rows={4}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="e.g., Change the color to matte black, add a carbon fiber spoiler..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <button
        onClick={handleRefine}
        disabled={isRefineDisabled}
        className="w-full flex items-center justify-center py-3 px-4 bg-green-600 text-white font-bold rounded-lg transition-all duration-300 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
      >
        <EditIcon className="w-5 h-5 mr-2" />
        Refine Design
      </button>
    </div>
  );

  return (
    <aside className="bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 w-96 p-6 flex flex-col space-y-6 h-full overflow-y-auto">
      <div className="flex bg-gray-900 p-1 rounded-lg">
          <button onClick={() => setMode(AppMode.GENERATE)} className={`w-1/2 py-2.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-colors ${mode === AppMode.GENERATE ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
            <SparklesIcon className="w-5 h-5" /> Generate
          </button>
          <button onClick={() => setMode(AppMode.REFINE)} className={`w-1/2 py-2.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-colors ${mode === AppMode.REFINE ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
            <EditIcon className="w-5 h-5" /> Refine
          </button>
      </div>

      {mode === AppMode.GENERATE ? renderGenerateTab() : renderRefineTab()}
    </aside>
  );
};

export default Sidebar;
