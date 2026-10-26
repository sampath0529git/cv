export interface Author {
  name: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: 'ATS Guide' | 'CV Tips' | 'Interviews' | 'Career Growth' | 'Graduate & School Leaver';
  readTime: string;
  date: string;
  datePublished: string;
  dateModified: string;
  author: Author;
  image: string;
  keywords: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
    }[];
    conclusion: string;
    ctaText: string;
    ctaLink: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === slug);
}
