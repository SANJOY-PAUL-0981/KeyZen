// Common English words used for typing tests (top 200)
export const commonWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "great", "between", "need", "large", "under", "never", "each", "right", "hand", "high",
  "place", "found", "live", "where", "long", "own", "still", "point", "old", "number",
  "world", "home", "man", "real", "another", "down", "hold", "could", "might", "develop",
  "just", "and", "world", "home", "say", "into", "make", "child", "also", "should",
  "have", "order", "little", "play", "group", "since", "begin", "course", "set", "form",
  "hold", "fact", "never", "last", "let", "thought", "city", "tree", "cross", "farm",
  "hard", "start", "might", "story", "saw", "far", "sea", "draw", "left", "late",
  "run", "while", "press", "close", "night", "real", "life", "few", "north", "open",
  "seem", "together", "next", "white", "children", "begin", "got", "walk", "example", "ease",
  "paper", "group", "always", "music", "those", "both", "mark", "often", "letter", "until",
  "mile", "river", "car", "feet", "care", "second", "book", "carry", "took", "rain",
  "eat", "room", "friend", "began", "idea", "fish", "mountain", "stop", "once", "base",
  "hear", "horse", "cut", "sure", "watch", "color", "face", "wood", "main", "enough",
  "plain", "girl", "usual", "young", "ready", "above", "ever", "red", "list", "though",
  "feel", "talk", "bird", "soon", "body", "dog", "family", "direct", "pose", "leave",
  "song", "measure", "door", "product", "black", "short", "numeral", "class", "wind", "question",
  "happen", "complete", "ship", "area", "half", "rock", "fire", "problem", "piece", "told",
  "knew", "pass", "king", "top", "whole", "king", "space", "heard", "best", "hour",
] as const;

const punctuationMarks = [".", ",", "!", "?", ";", ":", "'", '"'] as const;

export function generateWords(
  count: number,
  options?: { punctuation?: boolean },
): string[] {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    let word: string = commonWords[Math.floor(Math.random() * commonWords.length)];
    if (options?.punctuation) {
      const rand = Math.random();
      if (rand < 0.1) {
        // ~10% chance to append punctuation
        word +=
          punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
      } else if (rand < 0.15) {
        // ~5% chance to wrap in quotes
        word = `"${word}"`;
      } else if (rand < 0.2) {
        // ~5% chance to capitalize first letter
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
    }
    words.push(word);
  }
  return words;
}
