// js/grid.js
import { getRandomTileType } from './tileTypes.js';

export const grid = [];
export const gridWidth = 500;
export const gridHeight = 500;

export function createGrid(container) {
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const type = getRandomTileType();

      // Skip creating the tile if it's void
      if (type === "void") {
        grid.push(null); // still reserve space in grid
        continue;
      }

      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.x = x;
      tile.dataset.y = y;
      tile.dataset.type = type;
      tile.dataset.mined = "false";
      container.appendChild(tile);
      grid.push(tile);
    }
  }
}

// ✅ This must be outside the createGrid function
export function getTile(x, y) {
  if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) return null;
  const index = y * gridWidth + x;
  return grid[index] || null;
}
