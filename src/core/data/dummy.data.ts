const favoriteGenres: Genre[] = ['Action', 'Comedy', 'SciFi']; // my personal preferences
const dislikedGenres: Genre[] = ['Horror']; // my personal preferences

export const dummyUser: UserDto = {
  username: 'Rishabh',
  preferences: { dislikedGenres, favoriteGenres },
  watchHistory: [],
};

// dummy data of 5 movies
export const dummyMovies: MovieDto[] = [
  {
    id: 'm1',
    title: 'Top Gun: Maverick',
    description:
      'After more than two decades of service as one of the Navy\'s top aviators, Pete "Maverick" Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.',
    genres: ['Action', 'Drama'],
    releaseDate: new Date(2022, 10, 12),
    director: 'Joseph Kosinski',
    actors: ['Tom Cruise', 'Miles Teller', 'Jennifer Connelly'],
  },
  {
    id: 'm2',
    title: 'Elvis',
    description:
      'The story of the rock and roll king from his early days as a charismatic performer to his ascent as a global icon.',
    genres: ['Drama'],
    releaseDate: new Date(2023, 8, 5),
    director: 'Baz Luhrmann',
    actors: ['Austin Butler', 'Tom Hanks', 'Olivia DeJonge'],
  },
  {
    id: 'm3',
    title: 'Jurassic World Dominion',
    description:
      'Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world.',
    genres: ['Action', 'SciFi'],
    releaseDate: new Date(2023, 1, 25),
    director: 'Colin Trevorrow',
    actors: ['Chris Pratt', 'Bryce Dallas Howard', 'Laura Dern'],
  },
  {
    id: 'm4',
    title: 'The Batman',
    description:
      'When Gotham City is shrouded in corruption, a vigilante known as The Batman emerges from the shadows.',
    genres: ['Action'],
    releaseDate: new Date(2024, 2, 11),
    director: 'Matt Reeves',
    actors: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano'],
  },
  {
    id: 'm5',
    title: 'Lightyear',
    description:
      'The story of Buzz Lightyear, the legendary Space Ranger who inspired Andy to reach for the stars.',
    genres: ['Action'],
    releaseDate: new Date(2022, 5, 27),
    director: 'Angus MacLane',
    actors: ['Chris Evans', 'Keke Palmer', 'Peter Sohn'],
  },
  {
    id: 'm6',
    title: 'Doctor Strange in the Multiverse of Madness',
    description:
      'Dr. Stephen Strange casts a forbidden spell that opens a portal to the multiverse.',
    genres: ['Action', 'Fantasy'],
    releaseDate: new Date(2023, 9, 26),
    director: 'Sam Raimi',
    actors: ['Benedict Cumberbatch', 'Elizabeth Olsen', 'Chiwetel Ejiofor'],
  },
  {
    id: 'm7',
    title: 'The Adam Project',
    description:
      'After crash-landing in 2022, a time-traveling fighter pilot teams up with his younger self and his late father to come to terms with his past while saving the future.',
    genres: ['Action', 'Comedy'],
    releaseDate: new Date(2021, 4, 5),
    director: 'Shawn Levy',
    actors: ['Ryan Reynolds', 'Mark Ruffalo', 'Jennifer Garner'],
  },
];

// dummy data of 5 tv shows
export const dummyTvShows: TVShowDto[] = [
  {
    id: 's1',
    title: 'Stranger Things',
    description:
      'When a young boy disappears, a small town uncovers a mystery involving secret government experiments, terrifying supernatural forces and one very strange little girl.',
    genres: ['SciFi', 'Horror', 'Drama'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date(2016, 6, 15),
        director: 'The Duffer Brothers',
        actors: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date(2016, 6, 16),
        director: 'The Duffer Brothers',
        actors: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
      },
      {
        episodeNumber: 3,
        seasonNumber: 1,
        releaseDate: new Date(2016, 6, 17),
        director: 'The Duffer Brothers',
        actors: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
      },
    ],
  },
  {
    id: 's2',
    title: 'The Office (US)',
    description:
      'A mockumentary on the everyday work lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.',
    genres: ['Comedy'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date(2005, 3, 24),
        director: 'Ken Kwapis',
        actors: ['Steve Carell', 'Rainn Wilson', 'John Krasinski'],
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date(2005, 3, 25),
        director: 'Ken Kwapis',
        actors: ['Steve Carell', 'Rainn Wilson', 'John Krasinski'],
      },
      {
        episodeNumber: 3,
        seasonNumber: 1,
        releaseDate: new Date(2005, 3, 26),
        director: 'Ken Kwapis',
        actors: ['Steve Carell', 'Rainn Wilson', 'John Krasinski'],
      },
      {
        episodeNumber: 1,
        seasonNumber: 2,
        releaseDate: new Date(2005, 5, 14),
        director: 'Ken Kwapis',
        actors: ['Steve Carell', 'Rainn Wilson', 'John Krasinski'],
      },
      {
        episodeNumber: 2,
        seasonNumber: 2,
        releaseDate: new Date(2005, 5, 15),
        director: 'Ken Kwapis',
        actors: ['Steve Carell', 'Rainn Wilson', 'John Krasinski'],
      },
    ],
  },
  {
    id: 's3',
    title: 'Breaking Bad',
    description:
      "A high school chemistry teacher diagnosed with terminal cancer teams up with a former student to produce and sell meth in order to secure his family's financial future.",
    genres: ['Drama'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date(2008, 1, 20),
        director: 'Bryan Cranston',
        actors: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
      },
    ],
  },
  {
    id: 's4',
    title: 'Game of Thrones',
    description:
      'Nine noble families fight for control of the continent of Westeros, while an ancient enemy awakens in the farthest north.  Meanwhile, a queen arrives from the east with a vast army and seeks vengeance.',
    genres: ['Fantasy', 'Drama'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date(2011, 4, 17),
        director: 'Tim Van Patten',
        actors: ['Emilia Clarke', 'Peter Dinklage', 'Kit Harington'],
      },
    ],
  },
  {
    id: 's5',
    title: 'The Mandalorian',
    description:
      'After the fall of the Empire, a lone Mandalorian bounty hunter travels the outer reaches of the galaxy, far from the authority of the New Republic.',
    genres: ['Action', 'SciFi'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date(2019, 11, 12),
        director: 'Dave Filoni',
        actors: ['Pedro Pascal', 'Gina Carano', 'Carl Weathers'],
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date(2019, 11, 15),
        director: 'Dave Filoni',
        actors: ['Pedro Pascal', 'Gina Carano', 'Carl Weathers'],
      },
    ],
  },
];
