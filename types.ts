
export interface GeneratedImage {
  id: string;
  src: string;
  prompt: string;
  mimeType: string;
}

export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export enum AppMode {
  GENERATE = 'GENERATE',
  REFINE = 'REFINE',
}
