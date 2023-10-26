export interface markerI {
  type: string;
  start: number;
  duration: number;
  content: string;
  link?: string;
}

export interface episodeI {
  id: string;
  audio: string;
  name: string;
  markers: markerI[];
}

export interface contextProps {
  episodes: episodeI[];
  setEpisodes: React.Dispatch<React.SetStateAction<episodeI[]>>;
}

export interface markerI {
  type: string;
  start: number;
  duration: number;
  content: string;
  link?: string;
}
