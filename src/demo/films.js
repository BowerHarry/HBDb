// Fictional films used by demo mode (VITE_DEMO=1). None of these exist.
// Poster art is generated from `colors` and `motif` by posterPlugin.js.

export const films = [
  {
    id: 101, imdb_id: 'tt9900101', title: 'The Salt Road', release_date: '2019-03-08', runtime: 124,
    genres: ['Drama', 'Adventure'], popularity: 88, colors: ['#e9b872', '#8c3b2a'], motif: 'sun',
    overview: 'A cartographer hired to redraw a disputed desert border walks the old caravan route alone, and finds the maps she was given were wrong on purpose.',
    ratings: { imdb: 7.6, letterboxd: 3.9, tomatoes: 91 },
  },
  {
    id: 102, imdb_id: 'tt9900102', title: 'Low Tide', release_date: '2021-09-17', runtime: 98,
    genres: ['Thriller', 'Mystery'], popularity: 81, colors: ['#1f4e5f', '#0b1d26'], motif: 'waves',
    overview: 'When the sea pulls back further than anyone has seen, a harbour town discovers a second pier under the water and a ledger of names nobody will admit to recognising.',
    ratings: { imdb: 7.1, letterboxd: 3.6, tomatoes: 84 },
  },
  {
    id: 103, imdb_id: 'tt9900103', title: 'Paper Lanterns', release_date: '2016-11-25', runtime: 107,
    genres: ['Romance', 'Drama'], popularity: 74, colors: ['#f2a65a', '#772f1a'], motif: 'dots',
    overview: 'Two night-shift workers at a printing press leave each other notes in the margins of misprinted pages for a year before they finally meet.',
    ratings: { imdb: 7.4, letterboxd: 4.0, tomatoes: 93 },
  },
  {
    id: 104, imdb_id: 'tt9900104', title: 'Northbound', release_date: '2023-02-03', runtime: 131,
    genres: ['Science Fiction', 'Drama'], popularity: 93, colors: ['#3a506b', '#0b132b'], motif: 'rings',
    overview: 'The last sleeper train across a frozen continent keeps running because nobody has told the driver that the cities at either end have gone quiet.',
    ratings: { imdb: 8.0, letterboxd: 4.1, tomatoes: 95 },
  },
  {
    id: 105, imdb_id: 'tt9900105', title: 'The Quiet Orchard', release_date: '2014-06-20', runtime: 112,
    genres: ['Drama'], popularity: 62, colors: ['#8fb339', '#2f4a1c'], motif: 'hills',
    overview: 'Three siblings return to sell the family orchard and find their late father had been grafting a tree for each of them for thirty years.',
    ratings: { imdb: 7.2, letterboxd: 3.7, tomatoes: 88 },
  },
  {
    id: 106, imdb_id: 'tt9900106', title: 'Glass Harbour', release_date: '2022-10-14', runtime: 116,
    genres: ['Crime', 'Thriller'], popularity: 85, colors: ['#5bc0be', '#1c2541'], motif: 'bars',
    overview: 'A customs inspector with a perfect record is asked to look away from one container, once, and spends a week working out who is asking.',
    ratings: { imdb: 7.3, letterboxd: 3.5, tomatoes: 79 },
  },
  {
    id: 107, imdb_id: 'tt9900107', title: 'Small Hours', release_date: '2018-01-12', runtime: 94,
    genres: ['Comedy', 'Drama'], popularity: 70, colors: ['#c9ada7', '#4a4e69'], motif: 'sun',
    overview: 'An all-night radio host takes one caller too seriously and ends up driving across the city to return a lost dog before the breakfast show starts.',
    ratings: { imdb: 6.9, letterboxd: 3.4, tomatoes: 76 },
  },
  {
    id: 108, imdb_id: 'tt9900108', title: 'Kestrel', release_date: '2020-08-28', runtime: 103,
    genres: ['Adventure', 'Family'], popularity: 77, colors: ['#f4d35e', '#ee964b'], motif: 'hills',
    overview: 'A girl who cannot fly a kite to save her life nurses an injured falcon through one windy summer on the moor.',
    ratings: { imdb: 7.0, letterboxd: 3.6, tomatoes: 90 },
  },
  {
    id: 109, imdb_id: 'tt9900109', title: 'Seven Floors Up', release_date: '2024-04-19', runtime: 109,
    genres: ['Comedy'], popularity: 90, colors: ['#ef476f', '#7a1c38'], motif: 'bars',
    overview: 'The lift breaks on the day of the tenants\' meeting, and the residents of a tower block hold it in the stairwell, one landing at a time.',
    ratings: { imdb: 6.8, letterboxd: 3.3, tomatoes: 72 },
  },
  {
    id: 110, imdb_id: 'tt9900110', title: 'Ember & Ash', release_date: '2017-10-06', runtime: 138,
    genres: ['Fantasy', 'Adventure'], popularity: 83, colors: ['#ff7b00', '#3d0c02'], motif: 'rings',
    overview: 'A lamplighter in a city that has outlawed fire is the only person who notices when the stars begin going out in order.',
    ratings: { imdb: 7.5, letterboxd: 3.8, tomatoes: 86 },
  },
  {
    id: 111, imdb_id: 'tt9900111', title: 'The Understudy', release_date: '2015-05-01', runtime: 101,
    genres: ['Drama', 'Music'], popularity: 58, colors: ['#9d4edd', '#240046'], motif: 'dots',
    overview: 'After eleven years of waiting in the wings, a second violinist gets one night in the first chair and has to decide what to play.',
    ratings: { imdb: 7.3, letterboxd: 3.9, tomatoes: 89 },
  },
  {
    id: 112, imdb_id: 'tt9900112', title: 'Meridian', release_date: '2025-01-24', runtime: 127,
    genres: ['Science Fiction', 'Mystery'], popularity: 96, colors: ['#48cae4', '#03045e'], motif: 'waves',
    overview: 'A survey ship crossing the date line records the same day twice, and only the navigator remembers the first one.',
    ratings: { imdb: 7.8, letterboxd: 4.0, tomatoes: 92 },
  },
];

export const initialWatchlist = [104, 112, 103, 106, 108];

// TMDB stores ratings out of 10; the UI shows them as half-stars out of 5.
export const initialRatings = { 101: 9, 102: 7, 105: 8, 110: 6, 111: 8, 107: 5 };
