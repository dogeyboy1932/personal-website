import type { HobbiesData, MorePageData } from "../types";

export const more: MorePageData = {
  title: "More About Me",
  subtitle: "Beyond the code",
  bio: "When I'm not locking in, I'd probably be watching TV/movies, playing a racquet sport, exploring new tech trends, or something else. I try to be organized & productive with the time I have, and I enjoy trying new things. More recently I've picked up a liking for travel and rollerblading.",
  
  studyAbroad: {
    role: "Study Abroad",
    company: "National University of Singapore (NUS)",
    duration: "Spring 2024",
    summary: "Studied CS and blockchain at Asia's top university. Immersed in Singapore's tech ecosystem.",
  },

  professionalIdentity: {
    title: "Professional Identity",
    points: [
      "Self-taught developer with versatile skills across full-stack, mobile, and automation",
      "Specialize in agentic AI systems and blockchain development (Solana, Ethereum)",
      "Focus on creating intelligent, autonomous systems for everyday utility",
      "Entrepreneurial mindset with a practical, get-things-done approach",
    ],
  },

  achievements: {
    title: "Achievements & Recognition",
    items: [
      { label: "Hackathons", value: "2nd Place - Solana University ($1,500), 2nd Place - Raise Your Hack, 3rd Place - SEBA Entrepreneurship" },
      { label: "Academic", value: "3.72 GPA in Master's CS at UIUC, Study Abroad at NUS" },
      { label: "Leadership", value: "Eagle Scout, VP Partnerships at Illini Blockchain" },
      { label: "Incubators", value: "Optimism Superchain Interop ($9,000), CollegeDAO Core Team" },
    ],
  },

  philosophy: {
    title: "My Approach",
    description: "I believe in putting my soul into every project, approaching challenges with both technical depth and entrepreneurial vision. I don't wait to be told what to do—I actively seek out what needs to be done. I love breaking new ground and starting with a blank slate, excelling in cooperative environments where innovation meets execution.",
  },

  funFacts: [
    "Studied abroad in Singapore (NUS)- loved the traveling and cultural perspective",
    "Avid chess player on Lichess (username: trashboatsr)",
    "Love racquet sports [tennis doubles, learning table tennis, badminton, and pickleball]",
    "Eagle Scout",
  ],

  hobbies: [
    { name: "Chess", note: "Competitive player on Lichess - pattern recognition and strategic planning" },
    { name: "Racquet Sports", note: "Tennis doubles, learning table tennis, badminton, and pickleball" },
    { name: "Travel & Culture", note: "Study abroad in Singapore, exploring new cuisines and perspectives" },
    { name: "Blockchain Gaming", note: "Following the intersection of Web3 and gaming economies" },
  ],

  lichess: {
    username: "trashboatsr",
    label: "Lichess Rating",
  },
};


export const hobbyData: HobbiesData = {
  hobbies: [
    {
      category: "Social",
      items: [
        { name: "Public Speaking", logoUrl: "" },
        { name: "Leadership", logoUrl: "" },
        { name: "Communication", logoUrl: "" },
        { name: "Team Building", logoUrl: "" },
        { name: "Project Management", logoUrl: "" },
      ],
    },
    {
      category: "Sports & Recreation",
      items: [
        { name: "Tennis", logoUrl: "" },
        { name: "Table Tennis", logoUrl: "" },
        { name: "Badminton", logoUrl: "" },
        { name: "Pickleball", logoUrl: "" },
        { name: "Chess", logoUrl: "" },
      ],
    },
  ],
};
