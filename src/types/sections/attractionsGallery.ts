export interface AttractionCard {
  eyebrow: string;
  title: string;
  titleEm: string;
  desc: string;
  number: string;
  img: string;
}

export interface AttractionsGallerySectionProps {
  onReady: (setActive: (v: boolean) => void, animateIn: () => void) => void;
  onBackEdge: () => void;
  onForwardEdge?: () => void;
}
