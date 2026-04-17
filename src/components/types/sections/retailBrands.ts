import type { ReactNode } from "react";

export interface BrandTile {
  id: string;
  isHero?: boolean;
  ambient: string;
  category: string;
  name: string;
  desc: string;
  tag: string;
  logo?: ReactNode;
}
