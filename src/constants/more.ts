import type { HobbiesData, MorePageData } from "../types";

/**
 * /more page content.
 *
 * Sourced from the back half of GitHub_README_config/README.md — the
 * "On My Break", "Leadership" and "Honors" sections — but deliberately
 * EXPANDED rather than copied: the GitHub profile is the compacted version of
 * this, so anything that reads like a table row there gets a real sentence
 * here. Keep that rule when editing.
 *
 * Voice: direct, concrete, faintly wry. Numbers where there are numbers.
 * No résumé-speak.
 */
export const more: MorePageData = {
  title: "More About Me",
  subtitle: "Beyond the code",

  // FX:flip-words — cycles under the page title. Each should complete the
  // sentence "Off the clock, I'm ___".
  identityWords: [
    "a movie guy",
    "a chess player",
    "a rollerblader",
    "a Sanskrit dabbler",
    "a cheese apologist",
    "four racquets deep",
  ],

  bio:
    "Born in India, raised in New Jersey, college in Illinois, a semester in Singapore, now Chicago. Seven countries so far, and the perspective was the point.\n\n" +
    "Outside of engineering I read economics and statistics for fun — I minored in stats, and it quietly changed how I argue about everything else. The rest of the time I'm on a court, at a table with cards out, or three episodes deep into something I'll have opinions about later.",

  // Count-up band. Deliberately four: any more and it stops reading as a hook.
  stats: [
    { value: 7, label: "Countries" },
    { value: 10, suffix: "K+", label: "TV hours" },
    { value: 4, label: "Racquets" },
    { value: 14, label: "Clubs" },
  ],

  travel: {
    // In order. This is the through-line the whole section hangs on.
    path: [
      { place: "India", note: "born" },
      { place: "New Jersey", note: "raised" },
      { place: "Illinois", note: "college" },
      { place: "Singapore", note: "semester at NUS" },
      { place: "Chicago", note: "now" },
    ],
    // FX:flowing-menu — one row each, note shows in the marquee panel.
    countries: [
      { flag: "🇺🇸", name: "United States", note: "Home base — New Jersey, then Illinois, now Chicago" },
      { flag: "🇮🇳", name: "India", note: "Where I was born. Still go back" },
      { flag: "🇸🇬", name: "Singapore", note: "A semester at NUS studying CS and blockchain" },
      { flag: "🇲🇾", name: "Malaysia", note: "A weekend trip that turned into a favourite" },
      { flag: "🇹🇭", name: "Thailand", note: "Islands, street food, and a lot of walking" },
      { flag: "🇰🇭", name: "Cambodia", note: "Angkor Wat at sunrise, worth the 4am" },
      { flag: "🇮🇩", name: "Indonesia", note: "The last stop of the Singapore semester" },
    ],
  },

  // FX:flip-card — front is emoji + name, back is `detail`. Keep details to
  // roughly two lines so the back doesn't overflow the card.
  interests: [
    {
      emoji: "🤖",
      name: "Claude-maxing",
      detail:
        "Running as much of my life through Claude as I can. Custom MCP servers, automated workflows, whatever I can wire up before it stops being a shortcut.",
    },
    {
      emoji: "📊",
      name: "Economics & Statistics",
      detail:
        "My favourite things to read about outside engineering. I minored in statistics, and it changed how I argue about basically everything.",
    },
    {
      emoji: "⛓️",
      name: "Blockchain",
      detail:
        "Traded crypto and NFTs, and shipped on-chain for a while. Two of my hackathon placements came out of it.",
    },
    {
      emoji: "🧹",
      name: "Organizing",
      detail:
        "I tidy and systematize things to a fault. It is genuinely a hobby and occasionally a problem.",
    },
    {
      emoji: "♟️",
      name: "Chess",
      detail:
        "Longtime player. @trashboatsr on Lichess — the live rating is at the bottom of this page.",
    },
    {
      emoji: "🎲",
      name: "Board & Card Games",
      detail: "Always down for a table. Euchre league alum, which is a very Illinois sentence.",
    },
    {
      emoji: "🃏",
      name: "Poker",
      detail:
        "Recently picked it up. Currently at the stage where I know just enough to lose confidently.",
    },
    {
      emoji: "🎾",
      name: "Racquet Sports",
      detail: "Tennis, badminton, pickleball, and learning table tennis. Four racquets, one bag.",
    },
    {
      emoji: "🛼",
      name: "Rollerblading",
      detail: "A recent pickup. It's fun, and I am not good at it yet.",
    },
    {
      emoji: "🎬",
      name: "Movies & TV",
      detail:
        "I'm a movie guy — every genre, and I read film lore for fun. The 10,000+ hours up top is not a typo.",
    },
    {
      emoji: "🧀",
      name: "Cheese",
      detail: "Yes.",
    },
  ],

  // Orgs where I actually held a role. Everything else stays a club chip.
  leadership: [
    {
      org: "AI Alignment @ Illinois",
      // Not co-founder — joined while the group was still emerging and served
      // as VP on the founding team. Corrected from the GitHub README, which
      // overstated it.
      role: "VP, Founding Team",
      tenure: "Now Alumni Advisor",
      summary:
        "Helped build UIUC's first AI safety community while it was still getting off the ground. Now 400+ members, 20 core, and 7+ research projects running. Co-ran an 8-week fellowship on RLHF, interpretability, and scalable oversight.",
      link: "https://aialignmentillinois.org/",
    },
    {
      org: "Illini Blockchain",
      role: "VP Partnerships",
      tenure: "Project Lead",
      summary:
        "Ran technical teams and external partnerships for UIUC's blockchain organization.",
      link: "https://linktr.ee/illiniblockchain",
    },
    {
      org: "Sigma Phi Delta (ΣΦΔ)",
      role: "Brother",
      summary: "International social-professional fraternity for engineers.",
      link: "https://sigphis.org/",
    },
  ],

  honors: [
    {
      placement: "2nd Place",
      event: "OnionDAO Solana Hackathon",
      detail: "$1,500 — built StakeShack solo in 48 hours",
      kind: "competition",
    },
    { placement: "2nd Place", event: "Raise Your Hack", kind: "competition" },
    { placement: "Track Win", event: "Keywords AI", kind: "competition" },
    { placement: "Track Win", event: "ETH Denver '25", kind: "competition" },
    {
      placement: "Eagle Scout",
      event: "Boy Scouts of America",
      detail: "The highest rank in Scouting",
      kind: "rank",
    },
  ],

  // FX:share-button — Discord has no linkable profile, so it copies instead.
  socials: [
    { label: "Instagram", handle: "@trashboatsr", href: "https://instagram.com/trashboatsr", icon: "instagram" },
    { label: "Lichess", handle: "@trashboatsr", href: "https://lichess.org/@/trashboatsr", icon: "lichess" },
    { label: "Discord", handle: "@dogeyboy19", icon: "discord" },
    { label: "Email", handle: "vagogineni@gmail.com", href: "mailto:vagogineni@gmail.com", icon: "mail" },
  ],

  /* ---- superseded by the sections above, kept so a revert has something to
     fall back on. funFacts is now covered by honors + travel; hobbies by
     interests. ---- */
  funFacts: [
    "Studied abroad in Singapore (NUS) — loved the traveling and cultural perspective",
    "Eagle Scout",
  ],

  hobbies: [
    { name: "Chess", note: "Competitive player on Lichess - pattern recognition and strategic planning" },
    { name: "Racquet Sports", note: "Tennis doubles, learning table tennis, badminton, and pickleball" },
    { name: "Travel & Culture", note: "Study abroad in Singapore, exploring new cuisines and perspectives" },
    { name: "Movies / TV", note: "Very immersed in various genres and storytelling styles. I try to watch something new regularly" },
  ],

  lichess: {
    username: "trashboatsr",
    label: "Lichess",
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
