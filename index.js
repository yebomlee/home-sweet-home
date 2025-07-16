const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const MAP_ROW_LENGTH = 70;
const TILE_SIZE = 64; // 16*4
const MOVE_SPEED = 7;
const SPEED_PPS = MOVE_SPEED * 60;
const OFFSET_X = -1250;
const OFFSET_Y = -1800;
const COLLISION_SYMBOL = 31075;
const ICON_COLLISION_SYMBOL = 31080;

function arrayToMatrix(array, rowLength) {
  const matrix = [];
  for (let i = 0; i < array.length; i += rowLength) {
    matrix.push(array.slice(i, i + rowLength));
  }
  return matrix;
}

function addBoundariesFromMap(map, matchValue, boundariesArr, offset) {
  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === matchValue) {
        boundariesArr.push(
          new Boundary({
            position: {
              x: colIndex * TILE_SIZE + offset.x,
              y: rowIndex * TILE_SIZE + offset.y,
            },
          })
        );
      }
    });
  });
}

const collisionsMap = arrayToMatrix(collisions, MAP_ROW_LENGTH);
const iconCollisionsMap = arrayToMatrix(iconsCollisions, MAP_ROW_LENGTH);

const boundaries = [];
const offset = {
  x: OFFSET_X,
  y: OFFSET_Y,
};

addBoundariesFromMap(collisionsMap, COLLISION_SYMBOL, boundaries, offset);
addBoundariesFromMap(
  iconCollisionsMap,
  ICON_COLLISION_SYMBOL,
  boundaries,
  offset
);

function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

const image = loadImage('./img/home.png');
const foregroundImage = loadImage('./img/foreground.png');
const playerDownImage = loadImage('./img/playerDown.png');
const playerUpImage = loadImage('./img/playerUp.png');
const playerLeftImage = loadImage('./img/playerLeft.png');
const playerRightImage = loadImage('./img/playerRight.png');

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 384 / 6 / 2, // 이미지 가로
    y: canvas.height / 2 - 96 / 2, // 이미지 세로
  },
  image: playerDownImage,
  frames: {
    max: 6,
  },
  sprites: {
    down: playerDownImage,
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const { icons, iconsArr } = iconsConfig.reduce(
  (acc, { name, src, x, y, frames }) => {
    const img = loadImage(src);
    const sprite = new Sprite({
      position: { x: 64 * x + offset.x, y: 64 * y + offset.y },
      image: img,
      frames: { max: frames },
      sprites: { down: img },
    });
    sprite.moving = true;
    acc.icons[name] = sprite;
    acc.iconsArr.push(sprite);
    return acc;
  },
  {
    icons: {},
    iconsArr: [],
  }
);

function isColliding({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  ArrowUp: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowRight: { pressed: false },
};

let lastKey = null;

const backgroundIcons = iconsArr.slice(0, 3);
const restIcons = iconsArr.slice(3);

const render = [
  background,
  ...boundaries,
  ...backgroundIcons,
  player,
  foreground,
  ...restIcons,
];

const movables = [background, ...boundaries, ...iconsArr, foreground];

const movementVectors = {
  w: { dx: 0, dy: 1, img: player.sprites.up },
  ArrowUp: { dx: 0, dy: 1, img: player.sprites.up },
  a: { dx: 1, dy: 0, img: player.sprites.left },
  ArrowLeft: { dx: 1, dy: 0, img: player.sprites.left },
  s: { dx: 0, dy: -1, img: player.sprites.down },
  ArrowDown: { dx: 0, dy: -1, img: player.sprites.down },
  d: { dx: -1, dy: 0, img: player.sprites.right },
  ArrowRight: { dx: -1, dy: 0, img: player.sprites.right },
};

function attemptMove({ dx, dy, img }) {
  player.moving = true;
  player.image = img;
  const playerNextHitBox = {
    ...player,
    position: {
      x: player.position.x - dx,
      y: player.position.y - dy,
    },
  };
  const blocked = boundaries.some((b) =>
    isColliding({ rectangle1: playerNextHitBox, rectangle2: b })
  );
  if (!blocked) {
    movables.forEach((o) => {
      o.position.x += dx;
      o.position.y += dy;
    });
  }
}

let lastTime = 0;
function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  window.requestAnimationFrame(animate);
  render.forEach((s) => s.draw());
  const direction = movementVectors[lastKey];
  if (direction && keys[lastKey].pressed) {
    const distance = SPEED_PPS * (deltaTime / 1000);
    attemptMove({
      dx: direction.dx > 0 ? distance : direction.dx < 0 ? -distance : 0,
      dy: direction.dy > 0 ? distance : direction.dy < 0 ? -distance : 0,
      img: direction.img,
    });
  } else {
    player.moving = false;
  }
}
requestAnimationFrame(animate);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && dialogueState.messages) {
    e.preventDefault();
    continueDialogue();
    return;
  }

  if (e.key in keys) {
    keys[e.key].pressed = true;
    lastKey = e.key;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key in keys) {
    keys[e.key].pressed = false;
  }
});

const dialogueState = {
  iconKey: null,
  messages: null,
  idx: 0,
};

const box = document.querySelector('.box-container');
const guideBox = document.querySelector('.guide-box');
const dialogueBox = document.querySelector('.dialogue-box');

function showBox(text) {
  dialogueBox.innerText = text;
  box.classList.add('active');
  guideBox && (guideBox.style.display = 'none');
  dialogueBox && (dialogueBox.style.display = 'flex');
}
function hideBox() {
  dialogueBox.innerText = '';
  box.classList.remove('active');
  guideBox && (guideBox.style.display = 'flex');
  dialogueBox && (dialogueBox.style.display = 'none');
}
if (dialogueBox && guideBox && box) {
  if (!dialogueBox.innerText.trim()) {
    box.classList.remove('active');
    guideBox.style.display = 'flex';
    dialogueBox.style.display = 'none';
  }
}

function getIconKeyAtPosition(x, y) {
  for (const key in icons) {
    const sprite = icons[key];
    const frameWidth = sprite.image.width / sprite.frames.max;
    const frameHeight = sprite.image.height;
    const { x: posX, y: posY } = sprite.position;
    const withinX = x >= posX && x <= posX + frameWidth;
    const withinY = y >= posY && y <= posY + frameHeight;
    if (withinX && withinY) {
      return key;
    }
  }
  return null;
}

function openDialogue(key) {
  dialogueState.iconKey = key;
  dialogueState.messages = dialogues[key];
  dialogueState.idx = 0;
  showBox(dialogueState.messages[dialogueState.idx]);
}

function continueDialogue() {
  dialogueState.idx++;
  if (dialogueState.idx < dialogueState.messages.length) {
    showBox(dialogueState.messages[dialogueState.idx]);
  } else {
    hideBox();
    dialogueState.iconKey = null;
    dialogueState.messages = null;
    dialogueState.idx = 0;
  }
}

canvas.addEventListener('click', (e) => {
  const { left, top } = canvas.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;
  const iconKey = getIconKeyAtPosition(x, y);
  if (!dialogueState.messages) {
    if (iconKey && dialogues[iconKey]) {
      openDialogue(iconKey);
    }
    return;
  }
  if (iconKey && dialogues[iconKey] && iconKey !== dialogueState.iconKey) {
    openDialogue(iconKey);
  } else {
    continueDialogue();
  }
});
