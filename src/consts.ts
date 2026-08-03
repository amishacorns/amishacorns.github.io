import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Jordan Dotzel",
  DESCRIPTION: "AI researcher and agent architect writing about agents, AGI safety, and the future they create.",
  AUTHOR: "Jordan Dotzel",
}

// Work Page
export const WORK: Page = {
  TITLE: "Research",
  DESCRIPTION: "Research on efficient neural systems, agents, and the path to AGI.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Musings",
  DESCRIPTION: "Short essays on artificial intelligence, philosophy, safety, and technological progress.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all musings by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Research", 
    HREF: "/research", 
  },
  { 
    TEXT: "Musings", 
    HREF: "/musings", 
  },
  { 
    TEXT: "Travel", 
    HREF: "/travel", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "jordandotzel@gmail.com",
    HREF: "mailto:jordandotzel@gmail.com",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "amishacorns",
    HREF: "https://github.com/amishacorns"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "dotzel",
    HREF: "https://www.linkedin.com/in/dotzel",
  },
  { 
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "AmishAcorns",
    HREF: "https://x.com/AmishAcorns",
  },
]

