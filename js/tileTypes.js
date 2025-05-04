export function getRandomTileType() {
  const rand = Math.random();

  if (rand < 0.01) return "diamond";   // 1%
  if (rand < 0.04) return "gold";      // 3%
  if (rand < 0.09) return "silver";    // 5%
  if (rand < 0.17) return "ore";       // 8%
  if (rand < 0.27) return "stone";     // 10%
  if (rand < 0.39) return "clay";      // 12%
  if (rand < 0.51) return "bone";      // 12%
  if (rand < 0.66) return "dirt";      // 15%
  return "rock";                       // 34%
}
