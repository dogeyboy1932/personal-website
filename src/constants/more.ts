import type { MorePageData } from "../types";

export const more: MorePageData = {
  title: "More About Me",
  identityWords: [
    "a movie guy",
    "a chess player",
    "a rollerblader",
    "a cheese lover",
    "a tennis player",
    "an explorer",
    "a ping pong player",
    "a big brother",
    "a flannel guy",
  ],

  // bio:
  //   "Born in India, raised in New Jersey, college in Illinois, a semester in Singapore, now Chicago. Seven countries so far, and the perspective was the point.\n\n" +
  //   "Outside of engineering I read economics and statistics for fun — I minored in stats, and it quietly changed how I argue about everything else. The rest of the time I'm on a court, at a table with cards out, or three episodes deep into something I'll have opinions about later",

  // Count-up band. Deliberately four: any more and it stops reading as a hook.
  stats: [
    { value: 7, label: "Countries" },
    { value: 10, suffix: "K+", label: "Movie/TV hours" },
    { value: 15, suffix: "+", label: "Clubs" },
    { value: 4, label: "Racquet Sports" },
  ],

  travel: {
    path: [
      { place: "India", note: "born" },
      { place: "New Jersey", note: "raised" },
      { place: "Illinois", note: "college" },
      { place: "Singapore", note: "semester at NUS" },
      { place: "Chicago", note: "now" },
    ],
    countries: [
      { flag: "🇺🇸", name: "USA", note: "Born & brought up. Currently based in Chicago" },
      { flag: "🇮🇳", name: "India", note: "Where I was born. Immigrated when I was 2" },
      { flag: "🇸🇬", name: "Singapore", note: "A semester abroad at NUS exploring new cuisines and perspectives. Great times" },
      { flag: "🇮🇩", name: "Indonesia", note: "Went to Bali. Motorbiking + Jetskiing. *10/10 milkshakes*" },
      { flag: "🇲🇾", name: "Malaysia", note: "Great food. Great place to go on a shopping spree" },
      { flag: "🇹🇭", name: "Thailand", note: "Islands, white sand, and a lot of walking" },
      { flag: "🇰🇭", name: "Cambodia", note: "Angkor Wat at sunrise, worth the 4am" },
    ],
  },

  interests: [
    {
      emoji: "🤖",
      name: "Claude-maxing",
      detail:
        "Running as much of my life through Claude as I can. If I want something done, I tend to 'Claude' it out",
    },
    {
      emoji: "📊",
      name: "Economics & Statistics",
      detail:
        "Favorite topics outside CS. Majored in CS & Econ. I minored in statistics. Super fun",
    },
    {
      emoji: "⛓️",
      name: "Blockchain",
      detail:
        "Traded crypto and NFTs, and shipped on-chain for a while. Found a good community around it",
    },
    {
      emoji: "🧹",
      name: "Organizing",
      detail:
        "I tidy and systematize things to a fault. It is genuinely a hobby and occasionally a problem",
    },
    {
      emoji: "♟️",
      name: "Chess",
      detail:
        "I played over the years...pretty decent at it. @trashboatsr on Lichess — the live rating is at the bottom of this page",
    },
    {
      emoji: "🎲",
      name: "Board & Card Games",
      detail: "I don't know why...they are just addicting",
    },
    {
      emoji: "🃏",
      name: "Poker",
      detail:
        "Recently picked it up. Good vibe, but I don't gamble aggressively",
    },
    {
      emoji: "🎾",
      name: "Racquet Sports",
      detail: "Tennis, badminton, pickleball, and learning table tennis. Four racquets, one bag",
    },
    {
      emoji: "🛼",
      name: "Rollerblading",
      detail: "A recent pickup. It's fun, and I'm still learning",
    },
    {
      emoji: "🎬",
      name: "Movies & TV",
      detail:
        "HUUUGE TV/Moview guy. I can watch any genre, and I read film lore for fun. The 10,000+ hours is NOT a typo",
    },
    {
      emoji: "🧀",
      name: "Cheese",
      detail: "Yes",
    },
  ],

  leadership: [
    {
      org: "AI Alignment @ Illinois",
      role: "VP, Founding Team",
      tenure: "Alumni Advisor",
      summary:
        "Helped build UIUC's first AI safety community while it was still getting off the ground. Now 400+ members, 20 core, and 7+ research projects running. Co-ran an 8-week fellowship on RLHF, interpretability, and scalable oversight",
      link: "https://aialignmentillinois.org/",
    },
    {
      org: "CollegeDAO",
      role: "Core Team",
      summary:
        "Connecting students in the web3 space. Built a MVP for Latent, an AI-powered hiring platform",
      link: "https://collegedao.io/",
    },
    {
      org: "Illini Blockchain",
      role: "VP Partnerships",
      tenure: "Project Lead",
      summary:
        "Ran technical teams and external partnerships for UIUC's blockchain organization",
      link: "https://linktr.ee/illiniblockchain",
    },
  ],
  clubs: [
    { name: "Sigma Phi Delta (ΣΦΔ)" },
    { name: "ACM", tagline: "SIGMobile · SIGGLUG" },
    { name: "Chess Club" },
    { name: "Economics Club" },
    { name: "Intramural Tennis" },
    { name: "Virtual Reality Club" },
    { name: "Cheese Club" },
    { name: "Euchre League" },
    { name: "Illini Insomniacs" },
    { name: "Singapore Students Association" },
    { name: "Sanskrit Network" },
  ],


  honors: [
    {
      placement: "2nd Place",
      event: "OnionDAO Solana Hackathon",
      detail: "$1,500 — built StakeShack solo in 48 hours",
      kind: "win",
    },
    { placement: "2nd Place", event: "Raise Your Hack", kind: "win" },
    { placement: "Track Win", event: "Keywords AI", kind: "win" },
    { placement: "Track Win", event: "ETH Denver '25", kind: "win" },
    {
      placement: "Eagle Scout",
      event: "Boy Scouts of America",
      kind: "rank",
    },
  ],

  socials: [
    { label: "Instagram", handle: "@trashboatsr", href: "https://instagram.com/trashboatsr", icon: "instagram" },
    { label: "Lichess", handle: "@trashboatsr", href: "https://lichess.org/@/trashboatsr", icon: "lichess" },
    { label: "Discord", handle: "@dogeyboy19", href: "https://discord.com/users/dogeyboy19", icon: "discord" },
    { label: "Email", handle: "vagogineni@gmail.com", href: "mailto:vagogineni@gmail.com", icon: "mail" },
  ],


  lichess: {
    username: "trashboatsr",
    label: "Lichess",
  },
};

// export const hobbyData: HobbiesData = {
//   hobbies: [
//     {
//       category: "Social",
//       items: [
//         { name: "Public Speaking", logoUrl: "" },
//         { name: "Leadership", logoUrl: "" },
//         { name: "Communication", logoUrl: "" },
//         { name: "Team Building", logoUrl: "" },
//         { name: "Project Management", logoUrl: "" },
//       ],
//     },
//     },
//   ],
// };
