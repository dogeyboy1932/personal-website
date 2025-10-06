export interface PageData {
  hero: Hero;
  mainContent: ContentSection;
  additionalContent: ContentSection;
}

interface Hero {
  tagline: string;
  title: string;
  description: string;
  image: Image;
}

interface Image {
  src: string;
  alt: string;
  caption: string;
}

interface ContentSection {
  title: string;
  items: ContentItem[];
}

interface ContentItem {
  title: string;
  subtitle: string;
  secondarySubtitle?: string;
  description: string;
}
