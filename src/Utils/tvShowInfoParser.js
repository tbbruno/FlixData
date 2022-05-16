// Star Trek: The Next Generation: Season 2: Manhunt (Episode 19)
const tvShowRegex1 =
  /(?<showName>.+): Season (?<seasonNumber>\d+): (?<episodeName>.+) \(Episode (?<episodeNumber>\d+)\)/;

// Unorthodox: Limited Series: Part 3 (Episode 3)
// Tales of the City: Limited Series: Three of Cups (Episode 10)
const tvShowRegex2 =
  /(?<showName>.+): Limited Series: (?<episodeName>.+) \(Episode (?<episodeNumber>\d+)\)/;

// Taco Chronicles: Volume 1: Carnitas (Episode 2)
// Love, Death & Robots: Volume 1: THE SECRET WAR (Episode 18)
// Tiny House Nation: Volume 2: A Firefighter Rebuilds (Episode 3)
const tvShowRegex3 =
  /(?<showName>.+): Volume (?<seasonNumber>\d+): (?<episodeName>.+) \(Episode (?<episodeNumber>\d+)\)/;

// Sex Education: Season 3: Episode 8
const tvShowRegex4 =
  /(?<showName>.+): Season (?<seasonNumber>\d+): Episode (?<episodeNumber>\d+)/;

// Follow This: Part 1: Intersex (Episode 3)
const tvShowRegex5 =
  /(?<showName>.+): Part (?<seasonNumber>\d+): (?<episodeName>.+) \(Episode (?<episodeNumber>\d+)\)/;

// Avatar: The Last Airbender: Book 1: The Waterbending Scroll (Episode 9)
// Avatar: The Last Airbender: Book 1: Winter Solstice: Part 2: Avatar Roku (Episode 8)
// Avatar: The Last Airbender: Book 3: Sozin's Comet: Part 4: Avatar Aang (Episode 21)
const tvShowRegex6 =
  /(?<showName>.+): Book (?<seasonNumber>\d+): (?<episodeName>.+) \(Episode (?<episodeNumber>\d+)\)/;

// The World's Most Extraordinary Homes: Season 2 Part B: Spain (Episode 1)
// The World's Most Extraordinary Homes: Season 2 Part A: Japan (Episode 4)
const tvShowRegex7 =
  /(?<showName>.+): Season (?<seasonNumber>\d+) Part (?<seasonSubPart>.+): (?<episodeName>.+) \(Episode (?<episodeNumber>\d+)\)/;

const tvShowRegexes = [
  tvShowRegex7,
  tvShowRegex6,
  tvShowRegex5,
  tvShowRegex4,
  tvShowRegex3,
  tvShowRegex2,
  tvShowRegex1,
];

const extractTVShowInfoIfPossible = (title) => {
  for (let i = 0; i < tvShowRegexes.length; i++) {
    const regex = tvShowRegexes[i];
    const match = regex.exec(title);
    if (match) {
      return match.groups;
    }
  }
  return null;
};

export { extractTVShowInfoIfPossible };
