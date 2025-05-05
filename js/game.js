// js/game.js
import { createGrid, gridWidth, gridHeight } from './grid.js';
import { player } from './player.js';
import { mineTile } from './mining.js';
import { getTile } from './grid.js';


let mineTimeout = null;

export function initGame() {
  const gameContainer = document.getElementById("game");
  const oreDisplay = document.getElementById("ore-count");




  // Reset state
  player.ore = 0;
  oreDisplay.textContent = "0";
  gameContainer.innerHTML = "";

  createGrid(gameContainer);
  updatePlayerPosition();
  centerCameraOnPlayer();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}

function updatePlayerPosition() {
  // Remove old player marker
  document.querySelectorAll(".player").forEach((el) => el.classList.remove("player"));

  // Add .player class to the tile the player is on
  const tile = document.querySelector(`.tile[data-x="${player.x}"][data-y="${player.y}"]`);
  if (tile) tile.classList.add("player");
}

function centerCameraOnPlayer() {
  const tile = document.querySelector(`.tile[data-x="${player.x}"][data-y="${player.y}"]`);
  if (tile) {
    tile.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
  }
}

/* PLAYER MOVEMENT CONTROLS */

let moveInterval = null;
let heldDirection = null;
let lastMoveTime = 0;
const moveCooldown = 200; // in milliseconds

function movePlayer(key) {
  const now = Date.now();
  if (now - lastMoveTime < moveCooldown) return; // 🚫 Still cooling down

  let newX = player.x;
  let newY = player.y;
  player.stepsLeft--; // 👣 Simple step reduction
  updateStepDisplay();

  switch (key) {
    case "arrowup":
    case "w":
      newY--;
      break;
    case "arrowdown":
    case "s":
      newY++;
      break;
    case "arrowleft":
    case "a":
      newX--;
      break;
    case "arrowright":
    case "d":
      newX++;
      break;
    default:
      return; // do nothing if non-movement key
  }

  const nextTile = getTile(newX, newY);
  if (!nextTile || nextTile.dataset.type === "rock") return;

  player.x = newX;
  player.y = newY;
  lastMoveTime = now; // ✅ Reset cooldown
  updatePlayerPosition();
  centerCameraOnPlayer();
}


/* PLAYER HOLD BUTTON MOVEMENT CONTROLS */

function handleKeyDown(e) {
  const key = e.key.toLowerCase();

  // Prevent stacking intervals or repeats
  if (e.repeat || moveInterval) return;

  // Only react to movement keys
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
    heldDirection = key;
    movePlayer(heldDirection); // 👈 move once immediately
    moveInterval = setInterval(() => {
      movePlayer(heldDirection);
    }, 250); // then continue stepping
  }

  // Mining still works
  if (key === " ") {
    if (!mineTimeout) {
      mineTimeout = setTimeout(() => {
        mineTile(player.x, player.y);
        mineTimeout = null;
      }, 1000);
    }
  }
}

function handleKeyUp(e) {
  if (e.key.toLowerCase() === heldDirection) {
    clearInterval(moveInterval);
    moveInterval = null;
    heldDirection = null;
  }

  if (e.key === " " && mineTimeout) {
    clearTimeout(mineTimeout);
    mineTimeout = null;
  }

export function updateStepDisplay() {
  const el = document.getElementById("step-count");
  if (el) el.textContent = player.stepsLeft;
}

}

