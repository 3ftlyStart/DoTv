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
  { 
    id: 'r1', 
    title: 'The Silent Sea', 
    category: 'Sci-Fi', 
    image: 'https://picsum.photos/seed/sci1/400/600', 
    year: 2021, 
    service: 'Netflix', 
    genre: 'Sci-Fi', 
    description: 'During a perilous 24-hour mission on the moon, space explorers attempt to retrieve samples from an abandoned research facility steeped in classified secrets.', 
    rating: 7.5, 
    quality: '4K', 
    parentalRating: 'PG-13',
    director: 'Choi Hang-yong',
    cast: ['Bae Doona', 'Gong Yoo', 'Lee Joon', 'Kim Sun-young'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  { 
    id: 'r2', 
    title: 'Dark Matter', 
    category: 'Thriller', 
    image: 'https://picsum.photos/seed/thr1/400/600', 
    year: 2024, 
    service: 'Prime Video', 
    genre: 'Thriller', 
    description: 'A physicist is abducted into an alternate version of his life; to get back to his true family, he should embark on a harrowing journey.', 
    rating: 8.2, 
    quality: '4K', 
    parentalRating: 'PG-13',
    director: 'Blake Crouch',
    cast: ['Joel Edgerton', 'Jennifer Connelly', 'Alice Braga', 'Jimmi Simpson'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  { 
    id: 'r3', 
    title: 'Our Planet', 
    category: 'Documentary', 
    image: 'https://picsum.photos/seed/doc1/400/600', 
    year: 2019, 
    service: 'Netflix', 
    genre: 'Nature', 
    description: 'Experience our planet\'s natural beauty and examine how climate change impacts all living creatures in this ambitious documentary.', 
    rating: 9.3, 
    quality: '4K', 
    parentalRating: 'G',
    director: 'Alastair Fothergill',
    cast: ['David Attenborough'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  { 
    id: 'r4', 
    title: 'The Last Dance', 
    category: 'Sports', 
    image: 'https://picsum.photos/seed/spr1/400/600', 
    year: 2020, 
    service: 'Netflix', 
    genre: 'Sports', 
    description: 'This docuseries chronicles the rise of the 1990s Chicago Bulls, led by Michael Jordan, one of the most notable icons in sports history.', 
    rating: 9.1, 
    quality: 'HD', 
    parentalRating: 'PG',
    director: 'Jason Hehir',
    cast: ['Michael Jordan', 'Scottie Pippen', 'Phil Jackson', 'Dennis Rodman'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  { 
    id: 'r5', 
    title: 'Stranger Things', 
    category: 'Horror', 
    image: 'https://picsum.photos/seed/sup1/400/600', 
    year: 2022, 
    service: 'Netflix', 
    genre: 'Horror', 
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.', 
    rating: 8.7, 
    quality: '4K', 
    parentalRating: 'PG-13',
    director: 'The Duffer Brothers',
    cast: ['Winona Ryder', 'David Harbour', 'Finn Wolfhard', 'Millie Bobby Brown'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  { 
    id: 'r6', 
    title: 'The Bear', 
    category: 'Drama', 
    image: 'https://picsum.photos/seed/dra1/400/600', 
    year: 2023, 
    service: 'Disney+', 
    genre: 'Drama', 
    description: 'A young chef from the fine dining world comes home to Chicago to run his family\'s sandwich shop after a heartbreaking death in his family.', 
    rating: 8.8, 
    quality: '4K', 
    parentalRating: 'R',
    director: 'Christopher Storer',
    cast: ['Jeremy Allen White', 'Ebon Moss-Bachrach', 'Ayo Edebiri', 'Lionel Boyce'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  { 
    id: 'r7', 
    title: 'Interstellar', 
    category: 'Sci-Fi', 
    image: 'https://picsum.photos/seed/sci2/400/600', 
    year: 2014, 
    service: 'Prime Video', 
    genre: 'Sci-Fi', 
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers.', 
    rating: 8.7, 
    quality: '4K', 
    parentalRating: 'PG-13',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  { 
    id: 'r8', 
    title: 'The Office', 
    category: 'Comedy', 
    image: 'https://picsum.photos/seed/com1/400/600', 
    year: 2005, 
    service: 'Netflix', 
    genre: 'Comedy', 
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.', 
    rating: 9.0, 
    quality: 'HD', 
    parentalRating: 'PG-13',
    director: 'Greg Daniels',
    cast: ['Steve Carell', 'Rainn Wilson', 'John Krasinski', 'Jenna Fischer'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  { 
    id: 'r9', 
    title: 'Inception', 
    category: 'Action', 
    image: 'https://picsum.photos/seed/act1/400/600', 
    year: 2010, 
    service: 'HBO Max', 
    genre: 'Action', 
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 
    rating: 8.8, 
    quality: '4K', 
    parentalRating: 'PG-13',
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  { 
    id: 'r10', 
    title: 'Succession', 
    category: 'Drama', 
    image: 'https://picsum.photos/seed/dra2/400/600', 
    year: 2018, 
    service: 'HBO Max', 
    genre: 'Drama', 
    description: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.', 
    rating: 8.9, 
    quality: '4K', 
    parentalRating: 'R',
    director: 'Jesse Armstrong',
    cast: ['Brian Cox', 'Jeremy Strong', 'Sarah Snook', 'Kieran Culkin'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
];

export const FEATURED_CONTENT = [
  {
    id: 'f1',
    title: 'STELAR DRIFT',
    category: 'Epic Sci-Fi',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1280&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'A pioneer expedition travels beyond this galaxy to discover whether mankind has a future among the stars.',
    director: 'Aria Thorne',
    cast: ['Marcus Jobe', 'Seraphina Vale', 'Kaelen Voss'],
    rating: 8.5,
    year: 2024,
    genre: 'Sci-Fi'
  },
  {
    id: 'f2',
    title: 'THE DEPTHS',
    category: 'Mystery Thriller',
    image: 'https://images.unsplash.com/photo-1518112166137-8590956982fa?w=1280&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'When a experimental deep-sea research station loses contact, a rescue team discovers something that was never meant to be found.',
    director: 'Silas Vane',
    cast: ['Elena Graves', 'Dante Orion', 'Julian Marsh'],
    rating: 7.9,
    year: 2024,
    genre: 'Thriller'
  },
  {
    id: 'f3',
    title: 'NEON NIGHTS',
    category: 'Cyberpunk Action',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1280&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'In a city where memory can be downloaded, a detective hunts a killer who can rewrite reality.',
    director: 'Liza Ray',
    cast: ['Jax Neon', 'Mila Vector', 'Cyrus Bit'],
    rating: 8.1,
    year: 2023,
    genre: 'Cyberpunk'
  }
];

export const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Sports', 'Nature'];
export const SERVICES = ['Netflix', 'Prime Video', 'Disney+', 'HBO Max', 'YouTube'];
export const YEARS = [2024, 2023, 2022, 2021, 2020, 2019];
export const QUALITIES = ['HD', '4K'];
export const PARENTAL_RATINGS = ['G', 'PG', 'PG-13', 'R'];
export const MIN_RATINGS = [0, 5, 7, 8, 9];

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
  { id: 'p1', name: 'DoTv Pro 65"', price: '£899', image: 'https://picsum.photos/seed/tvpro/800/450', category: 'Smart TV' },
  { id: 'p2', name: 'DoDrop Stick 4K', price: '£49', image: 'https://picsum.photos/seed/stick/800/450', category: 'Streaming' },
  { id: 'p3', name: 'Do Remote Pro', price: '£29', image: 'https://picsum.photos/seed/remote/800/450', category: 'Accessory' },
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
