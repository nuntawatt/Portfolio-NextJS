// ข้อมูลการตั้งค่าและรายละเอียดต่างๆ ของเว็บไซต์ (Metadata และค่าคงที่สำหรับใช้งานในเว็บ)
export const siteConfig = {
  name: "Portfolio",
  description: "Modern portfolio of Morgorn, Backend and Fullstack Developer",
  url: "https://morgorn.skllracademy.com",
  ogImage: "/og.png",
  links: {
    github: "https://github.com/nuntawatt?tab=repositories",
    linkedin: "https://www.linkedin.com/in/nuntawat-saehuam-91a88341a",
    facebook: "https://www.facebook.com/nuntawat.morgorn",
    cv: "https://nuntawatt.github.io/my-cv",
    project: "https://nanthawat-github-io.vercel.app"
  },
  contact: {
    email: "morgorn.wk@gmail.com"
  },
  animations: {
    loading: "/animation/anime-loading.gif",
    success: "/animation/anime-succes.gif",
    welcome: "/animation/anime-welcome.gif",
  }
} as const;

