export interface HobbyOrOther {
  name: string;
  logoUrl: string;
}

export interface HobbyCategory {
  category: string;
  items: HobbyOrOther[];
}

export interface HobbiesData {
  hobbies: HobbyCategory[];
}
