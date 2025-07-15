// ============================
// 1) Canvas & Context 설정
// ============================
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = 1024; // 캔버스 가로 크기
canvas.height = 576; // 캔버스 세로 크기

// 배경 흰색 채우기
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

// ============================
// 2) 상수 정의
// ============================
const MAP_ROW_LENGTH = 50; // 맵 행렬 가로 길이
const TILE_SIZE = 64; // 타일(스프라이트) 크기
const MOVE_SPEED = 3; // 플레이어 이동 속도
const OFFSET_X = -600; // 전체 월드 X 오프셋
const OFFSET_Y = -1340; // 전체 월드 Y 오프셋
const COLLISION_SYMBOL = 31075; // 충돌 경계를 나타내는 값
const ICON_COLLISION_SYMBOL = 31080; // 아이콘 충돌 경계를 나타내는 값

// ============================
// 3) 데이터 → 2D 매트릭스 변환
// ============================
function arrayToMatrix(array, rowLength) {
  const matrix = [];
  for (let i = 0; i < array.length; i += rowLength) {
    matrix.push(array.slice(i, i + rowLength));
  }
  return matrix;
}

// ============================
// 4) 경계 객체 생성 헬퍼
//    map: 2D 배열, matchValue: 검사할 값,
//    boundariesArr: 결과를 담을 배열,
//    offset: 월드 오프셋
// ============================
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

// 경계 데이터 매트릭스로 변환
const collisionsMap = arrayToMatrix(collisions, MAP_ROW_LENGTH);
const iconCollisionsMap = arrayToMatrix(iconsCollisions, MAP_ROW_LENGTH);

// 경계 배열 초기화
const boundaries = [];
const offset = {
  x: OFFSET_X,
  y: OFFSET_Y,
};

// 경계 추가 호출
addBoundariesFromMap(collisionsMap, COLLISION_SYMBOL, boundaries, offset);
addBoundariesFromMap(
  iconCollisionsMap,
  ICON_COLLISION_SYMBOL,
  boundaries,
  offset
);

// ============================
// 5) 이미지 로드 헬퍼
// ============================
function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// 이미지 리소스 로드
const image = loadImage('./img/home.png');
const foregroundImage = loadImage('./img/foreground.png');
const playerDownImage = loadImage('./img/playerDown.png');
const playerUpImage = loadImage('./img/playerUp.png');
const playerLeftImage = loadImage('./img/playerLeft.png');
const playerRightImage = loadImage('./img/playerRight.png');

// ============================
// 6) Sprite 객체 생성
// ============================
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 384 / 6 / 3,
    y: canvas.height * 0.6,
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

// ============================
// 7) 아이콘 스프라이트 생성
//    iconsConfig 배열을 reduce로 순회
// ============================
const { icons, iconsArr } = iconsConfig.reduce(
  (acc, { name, src, x, y, frames }) => {
    const img = loadImage(src);

    const sprite = new Sprite({
      position: { x: 64 * x + offset.x, y: 64 * y + offset.y },
      image: img,
      frames: { max: frames },
      sprites: { down: img },
    });

    sprite.moving = true; // 애니메이션 활성화
    acc.icons[name] = sprite; // 이름→Sprite 매핑
    acc.iconsArr.push(sprite); // 배열 담기

    return acc;
  },
  {
    icons: {},
    iconsArr: [],
  }
);

// ============================
// 8) AABB 충돌 판정 함수
// ============================
function isColliding({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

// ============================
// 9) 키 입력 상태 저장 객체
// ============================
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

let lastKey = null; // 마지막으로 눌린 키를 저장

// ============================
// 10) 그리기 순서 배열 및 이동 대상
// ============================s
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

// ============================
// 11) 키 입력 ↔ 이동 정보 매핑
// ============================
const movementVectors = {
  w: { dx: 0, dy: 3, img: player.sprites.up },
  ArrowUp: { dx: 0, dy: 3, img: player.sprites.up },
  a: { dx: 3, dy: 0, img: player.sprites.left },
  ArrowLeft: { dx: 3, dy: 0, img: player.sprites.left },
  s: { dx: 0, dy: -3, img: player.sprites.down },
  ArrowDown: { dx: 0, dy: -3, img: player.sprites.down },
  d: { dx: -3, dy: 0, img: player.sprites.right },
  ArrowRight: { dx: -3, dy: 0, img: player.sprites.right },
};

// ============================
// 12) 이동 시도 함수
// ============================
function attemptMove({ dx, dy, img }) {
  player.moving = true;
  player.image = img;

  // 충돌 검사용 플레이어의 테스트 사각형
  const playerNextHitBox = {
    ...player,
    position: {
      x: player.position.x - dx,
      y: player.position.y - dy,
    },
  };

  // 어떤 경계와도 겹치지 않을 때만 이동
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

// ============================
// 13) 애니메이션 루프
// ============================
function animate() {
  window.requestAnimationFrame(animate);

  render.forEach((s) => s.draw());

  // 이전처럼 키를 검사하는 대신
  const direction = movementVectors[lastKey];
  if (direction && keys[lastKey].pressed) {
    attemptMove(direction);
  } else {
    player.moving = false;
  }
}
animate();

// ============================
// 14) 키 이벤트 처리
//    - 방향키: keys 객체 갱신 & lastKey 저장
//    - Enter   : 대화 진행 (dialogueState.messages 존재 시)
// ============================
window.addEventListener('keydown', (e) => {
  // 이동 키 처리
  if (e.key in keys) {
    keys[e.key].pressed = true;
    lastKey = e.key;
  }
  // Enter 키로 대사 넘기기
  if (e.key === 'Enter' && dialogueState.messages) {
    e.preventDefault();
    continueDialogue();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key in keys) {
    keys[e.key].pressed = false;
  }
});

// ============================
// 15) 대화 상태 객체화
// ============================
const dialogueState = {
  iconKey: null, // 현재 대화중인 아이콘 key
  messages: null, // 현재 대사 배열
  idx: 0, // 인덱스
};

// ============================
// 16) UI 제어 (대화창 show/hide)
// ============================
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
// 초기 상태
if (dialogueBox && guideBox && box) {
  if (!dialogueBox.innerText.trim()) {
    box.classList.remove('active');
    guideBox.style.display = 'flex';
    dialogueBox.style.display = 'none';
  }
}

// ============================
// 17) 아이콘 클릭 → key 반환
// ============================
function getIconKeyAtPosition(x, y) {
  // icons: { [key: string]: Sprite }
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

// ============================
// 18) 대화 열기 & 진행
// ============================
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

// ============================
// 19) 클릭 이벤트로 대화 시작/전환/진행
// ============================
canvas.addEventListener('click', (e) => {
  const { left, top } = canvas.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;
  const iconKey = getIconKeyAtPosition(x, y);

  // 대화 중이 아닐 때: 새 대화 시작
  if (!dialogueState.messages) {
    if (iconKey && dialogues[iconKey]) {
      openDialogue(iconKey);
    }
    return;
  }

  // 대화 중일 때
  if (iconKey && dialogues[iconKey] && iconKey !== dialogueState.iconKey) {
    // 다른 아이콘 클릭 → 대화 전환
    openDialogue(iconKey);
  } else {
    // 같은 아이콘 클릭 or 아이콘 아닌 곳 클릭 → 다음 대사
    continueDialogue();
  }
});
