export interface VideoPlayerProps {
  videoPlaying: boolean;
  videoUrl: string;
  controls: boolean;
  onDurationTime?: (time: number) => void;
}
