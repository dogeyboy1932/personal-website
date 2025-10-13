import type { HobbiesData, MorePageData } from "../types";

export const more: MorePageData = {
  title: "More About Me",
  subtitle: "Beyond the code",
  bio: "I'm someone who loves movies and TV shows. I enjoy racquet sports (tennis, table tennis, badminton, pickleball) and chess, + board/card games. I like exploring new experiences and picking up new hobbies (recently, I've been learning how to roller skate). \n\n\t Beyond my usual interests, I enjoy travel. Going abroad in Singapore was one of the best months of my life, where I immersed myself into an entirely different cultural perspective. I try to keep that same spirit of curiosity and openness in everything I do.",
  
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
    "Studied abroad in Singapore - fell in love with the hawker centers and late-night exploring",
    "Competitive chess player on Lichess (username: trashboatsr) - always looking for my next opponent",
    "Eagle Scout - learned leadership and outdoor skills through years of camping and hiking",
    "Love exploring new cities through food - my travel bucket list is basically a restaurant list",
    "Racquet sports enthusiast - tennis doubles, learning table tennis, badminton, and pickleball",
    "Can solve a Rubik's cube in under 2 minutes (working on getting faster!)",
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
