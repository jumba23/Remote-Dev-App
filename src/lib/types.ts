export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  date: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyLogoURL: string;
  companyURL: string;
};

export type SortBy = "relevant" | "recent";
export type PageDirection = "previous" | "next";
