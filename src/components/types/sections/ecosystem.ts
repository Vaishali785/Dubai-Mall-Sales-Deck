export interface EcoLogo {
  t: string;
  c: string;
}

export interface EcoCategory {
  id: string;
  eyebrow: string;
  title: string;
  titleItalic: string;
  desc: string;
  stat: string;
  statLabel: string;
  catBg: string;
  logosBg: string;
  logos: EcoLogo[][];
}
