export interface GlobalNavProps {
  onWhy: () => void;
  onRetail: () => void;
  onDining: () => void;
  onAttractions: () => void;
  onPlanVisit: () => void;
}

export type NavKey = "why" | "retail" | "dining" | "attractions";

export interface NavItem {
  label: string;
  key: NavKey;
}
