import { generate } from "random-words";

const punctuationMarks = [".", ",", "!", "?", ";", ":"] as const;

export type Difficulty = "easy" | "hard";

// Common short English words — curated for natural typing flow, similar to MonkeyType's default pool.
const easyWords = [
  // core function words
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
  "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
  "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
  "an", "will", "my", "one", "all", "would", "there", "their", "what", "so",
  "up", "out", "if", "about", "who", "get", "which", "go", "me", "when",
  "make", "can", "like", "time", "no", "just", "him", "know", "take", "come",
  "could", "now", "than", "look", "only", "its", "over", "think", "also", "back",
  "after", "use", "two", "how", "our", "work", "first", "well", "way", "even",
  "new", "want", "day", "most", "us", "good", "give", "some", "them", "very",
  "need", "has", "tell", "high", "keep", "try", "same", "ask", "men", "run",
  "own", "help", "line", "turn", "move", "live", "find", "long", "part", "made",
  "old", "here", "many", "sit", "end", "did", "call", "home", "hand", "show",
  "big", "set", "put", "read", "next", "few", "head", "land", "add", "name",
  "play", "must", "lot", "kind", "food", "year", "last", "let", "may", "eye",
  "far", "real", "life", "why", "man", "any", "both", "see", "off", "down",
  "still", "more", "then", "had", "was", "are", "been", "left", "open", "side",
  "seem", "each", "got", "too", "small", "top", "much", "door", "best", "soon",
  "room", "knew", "love", "sure", "yet", "done", "full", "air", "less", "dark",
  "car", "cut", "low", "face", "idea", "city", "once", "felt", "boy", "girl",
  "true", "till", "away", "plan", "fact", "bit",
  // everyday nouns
  "book", "tree", "water", "dog", "cat", "sun", "moon", "star", "rain", "fire",
  "rock", "fish", "bird", "milk", "rice", "cake", "ring", "king", "road", "hill",
  "lake", "snow", "wind", "leaf", "ship", "bear", "deer", "wolf", "lamp", "bell",
  "farm", "gate", "wall", "roof", "desk", "pen", "bag", "hat", "shoe", "coat",
  "bed", "cup", "box", "map", "key", "ball", "game", "song", "film", "park",
  "shop", "bank", "club", "team", "town", "boat", "bus", "path", "seed", "bone",
  "dust", "gold", "iron", "salt", "wood", "clay", "silk", "coin", "flag", "rope",
  "soap", "tape", "wire", "tire", "pipe", "port", "wave", "pool", "cave", "mine",
  // everyday verbs
  "go", "run", "sit", "eat", "see", "ask", "try", "buy", "pay", "win",
  "fly", "hit", "cut", "lie", "die", "fit", "fix", "mix", "tie", "dig",
  "drop", "pull", "push", "pick", "draw", "fill", "hang", "hold", "jump", "kick",
  "kiss", "lift", "lock", "mark", "miss", "open", "pack", "pour", "rest", "ride",
  "roll", "rush", "save", "shut", "sing", "slip", "sort", "step", "stop", "swim",
  "talk", "test", "toss", "wake", "walk", "wash", "wear", "wish", "wrap", "burn",
  "cook", "deal", "earn", "fail", "feed", "feel", "gain", "grab", "grow", "hate",
  "heal", "hear", "hunt", "join", "lead", "lend", "lift", "link", "list", "load",
  "lose", "note", "pace", "pass", "plug", "pray", "rank", "rely", "ring", "risk",
  "rule", "sail", "seek", "sell", "send", "sign", "slam", "spin", "spot", "stir",
  // everyday adjectives
  "big", "old", "new", "hot", "cold", "fast", "slow", "hard", "soft", "long",
  "wide", "deep", "thin", "warm", "cool", "flat", "dark", "pale", "rich", "poor",
  "safe", "wild", "calm", "bold", "dull", "fair", "fine", "firm", "glad", "keen",
  "kind", "loud", "mild", "neat", "nice", "rare", "raw", "ripe", "rude", "slim",
  "sore", "tall", "tiny", "vast", "weak", "wise", "bare", "blue", "busy", "cute",
  "dry", "easy", "free", "full", "gray", "lean", "pink", "pure", "sick", "tidy",
  // common adverbs & short words
  "also", "away", "back", "down", "ever", "here", "home", "hope", "into", "near",
  "soon", "such", "sure", "then", "thus", "upon", "well", "west", "east", "north",
  "south", "able", "done", "gone", "late", "left", "past", "self", "side", "along",
  "among", "early", "maybe", "never", "often", "quite", "since", "where", "while",
];

const uniqueEasyWords = [...new Set(easyWords)];

function shuffleInPlace(words: string[]): void {
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
}

function pickEasyWordsWithoutReplacement(count: number): string[] {
  const pool = uniqueEasyWords;
  const out: string[] = [];
  let deck = [...pool];
  shuffleInPlace(deck);
  let i = 0;

  while (out.length < count) {
    if (i >= deck.length) {
      const prev = out[out.length - 1];
      deck = [...pool];
      shuffleInPlace(deck);
      i = 0;
      if (prev !== undefined && deck[0] === prev && deck.length > 1) {
        const swapIdx = 1 + Math.floor(Math.random() * (deck.length - 1));
        [deck[0], deck[swapIdx]] = [deck[swapIdx], deck[0]];
      }
    }
    out.push(deck[i]!);
    i += 1;
  }

  return out;
}

export function generateWords(
  count: number,
  options?: { punctuation?: boolean; numbers?: boolean; difficulty?: Difficulty },
): string[] {
  let raw: string[];

  if (options?.difficulty === "easy") {
    raw = pickEasyWordsWithoutReplacement(count);
  } else if (options?.difficulty === "hard") {
    raw = generate({ exactly: count, minLength: 5, maxLength: 12 }) as string[];
  } else {
    raw = generate({ exactly: count, minLength: 2, maxLength: 8 }) as string[];
  }

  return raw.map((word) => {
    // Optionally replace ~15% of words with a number
    if (options?.numbers && Math.random() < 0.15) {
      return String(Math.floor(Math.random() * 10000));
    }

    if (!options?.punctuation) return word;

    const rand = Math.random();
    if (rand < 0.1) {
      return word + punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
    } else if (rand < 0.15) {
      return `"${word}"`;
    } else if (rand < 0.2) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });
}
