
import React, { useState, useCallback } from 'react';
import type { GeneratedImage, AspectRatio } from '../types';
import { AppMode } from '../types';
import { generateImageFromPrompt, refineImageWithPrompt } from '../services/geminiService';
import Header from './Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Gallery from './Gallery';

const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const mimeType = result.split(',')[0].split(':')[1].split(';')[0];
            const base64 = result.split(',')[1];
            resolve({ base64, mimeType });
        };
        reader.onerror = error => reject(error);
    });
};

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [mode, setMode] = useState<AppMode>(AppMode.GENERATE);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [activeImage, setActiveImage] = useState<GeneratedImage | null>(null);
  
  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;
    setIsLoading(true);
    setLoadingMessage('Generating AI concept...');
    try {
      const { base64, mimeType } = await generateImageFromPrompt(prompt, aspectRatio);
      const newImage: GeneratedImage = {
        id: new Date().toISOString(),
        src: `data:${mimeType};base64,${base64}`,
        prompt,
        mimeType,
      };
      setGeneratedImages(prev => [newImage, ...prev]);
      setActiveImage(newImage);
      setPrompt('');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, isLoading]);
  
  const handleRefine = useCallback(async () => {
    if (!prompt || !activeImage || isLoading) return;
    setIsLoading(true);
    setLoadingMessage('Refining design with AI...');
    try {
      const base64Data = activeImage.src.split(',')[1];
      const { base64, mimeType } = await refineImageWithPrompt(base64Data, activeImage.mimeType, prompt);
      const newImage: GeneratedImage = {
        id: new Date().toISOString(),
        src: `data:${mimeType};base64,${base64}`,
        prompt: `Refined: ${prompt}`,
        mimeType,
      };
      setGeneratedImages(prev => [newImage, ...prev]);
      setActiveImage(newImage);
      setPrompt('');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, activeImage, isLoading]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);
        setLoadingMessage('Processing uploaded image...');
        const { base64, mimeType } = await fileToBase64(file);
        const uploadedImage: GeneratedImage = {
            id: `upload-${new Date().toISOString()}`,
            src: `data:${mimeType};base64,${base64}`,
            prompt: 'Uploaded Image',
            mimeType,
        };
        setActiveImage(uploadedImage);
        setMode(AppMode.REFINE);
        // Do not add uploaded images to history to keep it clean with generated content
      } catch (error) {
          alert('Failed to process image file.');
          console.error(error);
      } finally {
        setIsLoading(false);
        // Reset file input to allow uploading the same file again
        event.target.value = '';
      }
    }
  };


  return (
    <div className="flex flex-col h-screen">
      <Header onLogout={onLogout} />
      <div className="flex flex-1 pt-16">
        <Sidebar
          mode={mode}
          setMode={(newMode) => {
            setMode(newMode);
            setPrompt(''); // Clear prompt when switching modes
          }}
          prompt={prompt}
          setPrompt={setPrompt}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          handleGenerate={handleGenerate}
          handleRefine={handleRefine}
          isLoading={isLoading}
          selectedImageForRefine={activeImage}
          handleFileChange={handleFileChange}
        />
        <div className="flex flex-1 flex-col">
          <Canvas activeImage={activeImage} isLoading={isLoading} loadingMessage={loadingMessage} />
          <Gallery images={generatedImages} onSelectImage={setActiveImage} activeImageId={activeImage?.id || null}/>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
