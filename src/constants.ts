export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export const DEFAULT_PROFILES: UserProfile[] = [
  { id: 'u1', name: 'Alex', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', color: 'from-blue-500 to-indigo-600' },
  { id: 'u2', name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', color: 'from-purple-500 to-pink-600' },
  { id: 'u3', name: 'Kids', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kids', color: 'from-orange-400 to-yellow-500' },
];

export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: string;
  schedule: Program[];
}

export interface Program {
  id: string;
  title: string;
  startTime: string; // ISO string
  durationMinutes: number;
  description: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Watchlist', href: '#watchlist' },
  { name: 'Continue', href: '#continue-watching' },
  { name: 'Live', href: '#live-guide' },
  { name: 'Store', href: '#ogle-drop' },
];

export const PARTNERS: Partner[] = [
  { id: '1', name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { id: '2', name: 'Prime Video', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg' },
  { id: '3', name: 'Disney+', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg' },
  { id: '4', name: 'YouTube', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' },
  { id: '5', name: 'HBO Max', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg' },
];

export const RECOMMENDATIONS = [
  { id: 'r1', title: 'The Silent Sea', category: 'Sci-Fi', image: 'https://picsum.photos/seed/sci1/400/600', year: 2021, service: 'Netflix', genre: 'Sci-Fi', description: 'During a perilous 24-hour mission on the moon, space explorers attempt to retrieve samples from an abandoned research facility steeped in classified secrets.' },
  { id: 'r2', title: 'Dark Matter', category: 'Thriller', image: 'https://picsum.photos/seed/thr1/400/600', year: 2024, service: 'Prime Video', genre: 'Thriller', description: 'A physicist is abducted into an alternate version of his life; to get back to his true family, he should embark on a harrowing journey.' },
  { id: 'r3', title: 'Our Planet', category: 'Documentary', image: 'https://picsum.photos/seed/doc1/400/600', year: 2019, service: 'Netflix', genre: 'Nature', description: 'Experience our planet\'s natural beauty and examine how climate change impacts all living creatures in this ambitious documentary.' },
  { id: 'r4', title: 'The Last Dance', category: 'Sports', image: 'https://picsum.photos/seed/spr1/400/600', year: 2020, service: 'Netflix', genre: 'Sports', description: 'This docuseries chronicles the rise of the 1990s Chicago Bulls, led by Michael Jordan, one of the most notable icons in sports history.' },
  { id: 'r5', title: 'Stranger Things', category: 'Horror', image: 'https://picsum.photos/seed/sup1/400/600', year: 2022, service: 'Netflix', genre: 'Horror', description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.' },
  { id: 'r6', title: 'The Bear', category: 'Drama', image: 'https://picsum.photos/seed/dra1/400/600', year: 2023, service: 'Disney+', genre: 'Drama', description: 'A young chef from the fine dining world comes home to Chicago to run his family\'s sandwich shop after a heartbreaking death in his family.' },
  { id: 'r7', title: 'Interstellar', category: 'Sci-Fi', image: 'https://picsum.photos/seed/sci2/400/600', year: 2014, service: 'Prime Video', genre: 'Sci-Fi', description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers.' },
  { id: 'r8', title: 'The Office', category: 'Comedy', image: 'https://picsum.photos/seed/com1/400/600', year: 2005, service: 'Netflix', genre: 'Comedy', description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.' },
  { id: 'r9', title: 'Inception', category: 'Action', image: 'https://picsum.photos/seed/act1/400/600', year: 2010, service: 'HBO Max', genre: 'Action', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' },
  { id: 'r10', title: 'Succession', category: 'Drama', image: 'https://picsum.photos/seed/dra2/400/600', year: 2018, service: 'HBO Max', genre: 'Drama', description: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.' },
];

export const FEATURED_CONTENT = [
  {
    id: 'f1',
    title: 'STELAR DRIFT',
    category: 'Epic Sci-Fi',
    image: 'https://picsum.photos/seed/stellar/1280/720',
    description: 'A pioneer expedition travels beyond this galaxy to discover whether mankind has a future among the stars.'
  },
  {
    id: 'f2',
    title: 'THE DEPTHS',
    category: 'Mystery Thriller',
    image: 'https://picsum.photos/seed/depths/1280/720',
    description: 'When a experimental deep-sea research station loses contact, a rescue team discovers something that was never meant to be found.'
  },
  {
    id: 'f3',
    title: 'NEON NIGHTS',
    category: 'Cyberpunk Action',
    image: 'https://picsum.photos/seed/neon/1280/720',
    description: 'In a city where memory can be downloaded, a detective hunts a killer who can rewrite reality.'
  }
];

export const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Sports', 'Nature'];
export const SERVICES = ['Netflix', 'Prime Video', 'Disney+', 'HBO Max', 'YouTube'];
export const YEARS = [2024, 2023, 2022, 2021, 2020, 2019];

const now = new Date();
const getFutureTime = (minutes: number) => new Date(now.getTime() + minutes * 60000).toISOString();

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Ogle TV Pro 65"', price: '£899', image: 'https://picsum.photos/seed/tvpro/800/450', category: 'Smart TV' },
  { id: 'p2', name: 'Ogle Drop Stick 4K', price: '£49', image: 'https://picsum.photos/seed/stick/800/450', category: 'Streaming' },
  { id: 'p3', name: 'Ogle Remote Pro', price: '£29', image: 'https://picsum.photos/seed/remote/800/450', category: 'Accessory' },
];
export const CHANNELS: Channel[] = [
  {
    id: 'c1',
    name: 'BBC News',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/62/BBC_News_2022.svg',
    category: 'News',
    schedule: [
      { id: 'p1', title: 'Global News Podcast', startTime: now.toISOString(), durationMinutes: 60, description: 'The latest news from around the world.' },
      { id: 'p2', title: 'Context', startTime: getFutureTime(60), durationMinutes: 60, description: 'The stories that matter today.' },
      { id: 'p3', title: 'HardTalk', startTime: getFutureTime(120), durationMinutes: 30, description: 'In-depth interviews with global figures.' },
    ]
  },
  {
    id: 'c2',
    name: 'Sky Sports',
    logo: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Sky_Sports_logo_2021.svg',
    category: 'Sports',
    schedule: [
      { id: 'p4', title: 'Live: Premier League', startTime: now.toISOString(), durationMinutes: 120, description: 'Manchester City vs Chelsea.' },
      { id: 'p5', title: 'Sports Center', startTime: getFutureTime(120), durationMinutes: 60, description: 'Daily sports wrap up.' },
    ]
  },
  {
    id: 'c3',
    name: 'National Geo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/National_Geographic_logo.svg',
    category: 'Education',
    schedule: [
      { id: 'p6', title: 'Great Migrations', startTime: now.toISOString(), durationMinutes: 45, description: 'Following the journey of caribou.' },
      { id: 'p7', title: 'Mars Origins', startTime: getFutureTime(45), durationMinutes: 60, description: 'How the red planet was formed.' },
    ]
  }
];
