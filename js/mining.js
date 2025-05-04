import { getTile } from './grid.js';
import { player } from './player.js';

function getMiningProperties(type) {
  switch (type) {
    case "diamond": return { time: 100, reward: 1 };
    case "gold":    return { time: 100, reward: 1 };
    case "silver":  return { time: 100, reward: 1 };
    case "ore":     return { time: 100, reward: 1 };
    case "stone":   return { time: 100, reward: 1 };
    case "clay":    return { time: 100, reward: 1 };
    case "bone":    return { time: 100, reward: 1 };
    case "dirt":    return { time: 100, reward: 1 };
    default:        return { time: 100, reward: 0 };
  }
}

export function mineTile(x, y) {
  const tile = getTile(x, y);
  if (!tile || tile.dataset.mined === "true") return;

  const type = tile.dataset.type;
  /* LOG */
  console.log("Mining tile type:", type);
  /* LOG */
  const { time, reward } = getMiningProperties(type);

  tile.classList.add("mining");

  requestAnimationFrame(() => {
    setTimeout(() => {
      tile.dataset.mined = "true";
      tile.classList.remove("mining");
      tile.classList.remove(type);
      tile.classList.add("mined");

      // ✅ Dynamically update player stat and HUD based on tile type
      if (player.hasOwnProperty(type)) {
        player[type] += reward;
        const display = document.getElementById(`${type}-count`);
        if (display) display.textContent = player[type];
      }

      console.log(`Mined ${type}. +${reward} ${type}`);
    }, time);
  });
}
