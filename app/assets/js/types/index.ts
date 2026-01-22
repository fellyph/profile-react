export interface Job {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  thumbnail_url: string;
}

export interface ThumbProps {
  imageUrl: string;
  imageAlt: string;
  imageCaption?: string;
}

export interface PortfolioItemProps {
  imageUrl: string;
  imageAlt: string;
  imageCaption?: string;
  title: string;
  content?: string;
}

export interface PortfolioListProps {
  jobs?: Job[];
}

export interface BlogItemProps {
  imageUrl: string;
  imageAlt: string;
  imageCaption?: string;
  title: string;
  content?: string;
}

export interface AppState {
  jobs: Job[];
  source: string;
}
