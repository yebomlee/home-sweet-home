const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 50) {
  collisionsMap.push(collisions.slice(i, 50 + i));
}

const boundaries = [];
const offset = {
  x: -600,
  y: -1340,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 31075)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const iconCollisionsMap = [];
for (let i = 0; i < iconsCollisions.length; i += 50) {
  iconCollisionsMap.push(iconsCollisions.slice(i, 50 + i));
}

iconCollisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 31080)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './img/home.png';

const foregroundImage = new Image();
foregroundImage.src = './img/foreground.png';

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png';

// 아이콘 정보를 배열에 정의
const iconConfigs = [
  { name: 'entrance', src: './img/iconLeft.png', x: 16, y: 25, frames: 6 },
  { name: 'guestRoom', src: './img/iconRight.png', x: 6.5, y: 25, frames: 6 },
  {
    name: 'friendLeft',
    src: './img/friendLeft.png',
    x: 7.8,
    y: 24.5,
    frames: 6,
  },
  {
    name: 'friendRight',
    src: './img/friendRight.png',
    x: 5.2,
    y: 24.5,
    frames: 6,
  },
  { name: 'bed', src: './img/iconLeft.png', x: 8, y: 1.5, frames: 6 },
  { name: 'jammanbo', src: './img/jammanbo.png', x: 9, y: 1.8, frames: 6 },
  { name: 'TV', src: './img/iconRight.png', x: 17, y: 6, frames: 6 },
  { name: 'gift', src: './img/iconLeft.png', x: 23, y: 3, frames: 6 },
  { name: 'leftAmplifier', src: './img/amplifier.png', x: 25, y: 9, frames: 3 },
  {
    name: 'rightAmplifier',
    src: './img/amplifier.png',
    x: 30,
    y: 9,
    frames: 3,
  },
  { name: 'dumbbell', src: './img/iconRight.png', x: 24, y: 14.3, frames: 6 },
  { name: 'baseball', src: './img/iconLeft.png', x: 35.5, y: 8.3, frames: 6 },
  { name: 'washer', src: './img/iconRight.png', x: 35.5, y: 4.5, frames: 6 },
  { name: 'fridge', src: './img/fridge.png', x: 39, y: 1, frames: 7 },
  { name: 'cooking', src: './img/iconLeft.png', x: 46, y: 2.8, frames: 6 },
  { name: 'cake', src: './img/iconRight.png', x: 44, y: 13, frames: 6 },
  { name: 'flowerBed', src: './img/iconRight.png', x: 44, y: 20.5, frames: 6 },
  {
    name: 'swimmingPool',
    src: './img/iconLeft.png',
    x: 42,
    y: 24.8,
    frames: 6,
  },
  { name: 'computer', src: './img/iconLeft.png', x: 27.2, y: 20.3, frames: 6 },
  { name: 'bookcase', src: './img/iconLeft.png', x: 25, y: 27, frames: 6 },
];

// 헬퍼 함수로 Image+Sprite 생성
function createIcon({ name, src, x, y, frames }) {
  const img = new Image();
  img.src = src;
  const sprite = new Sprite({
    position: { x: 64 * x + offset.x, y: 64 * y + offset.y },
    image: img,
    frames: { max: frames },
    sprites: { down: img },
  });
  sprite.moving = true;
  return [name, sprite];
}

// 데이터를 순회하며 아이콘 생성 & 변수에 담기
const icons = Object.fromEntries(iconConfigs.map((cfg) => createIcon(cfg)));

// 기존 변수명으로 접근할 수 있도록 별칭 설정
const {
  entrance,
  guestRoom,
  friendLeft,
  friendRight,
  bed,
  jammanbo,
  TV,
  gift,
  leftAmplifier,
  rightAmplifier,
  dumbbell,
  baseball,
  washer,
  fridge,
  cooking,
  cake,
  flowerBed,
  swimmingPool,
  computer,
  bookcase,
} = icons;

// 아이콘 애니메이션 활성화
const allIcons = [
  bed,
  washer,
  TV,
  gift,
  dumbbell,
  baseball,
  guestRoom,
  cooking,
  cake,
  computer,
  bookcase,
  flowerBed,
  swimmingPool,
  entrance,
  jammanbo,
  fridge,
  leftAmplifier,
  rightAmplifier,
  friendLeft,
  friendRight,
];

allIcons.forEach((icon) => {
  icon.moving = true;
});

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

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  // 화살표 키 추가
  ArrowUp: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

const movables = [background, ...boundaries, ...allIcons, foreground];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  fridge.draw();
  friendLeft.draw();
  friendRight.draw();

  player.draw();
  foreground.draw();

  //* FIXME:
  bed.draw();
  washer.draw();
  TV.draw();
  gift.draw();
  dumbbell.draw();
  baseball.draw();
  guestRoom.draw();
  cooking.draw();
  cake.draw();
  computer.draw();
  bookcase.draw();
  flowerBed.draw();
  swimmingPool.draw();
  entrance.draw();
  jammanbo.draw();
  leftAmplifier.draw();
  rightAmplifier.draw();

  let moving = true;
  player.moving = false;
  if (
    (keys.w.pressed || keys.ArrowUp.pressed) &&
    (lastKey === 'w' || lastKey === 'ArrowUp')
  ) {
    player.moving = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (
    (keys.a.pressed || keys.ArrowLeft.pressed) &&
    (lastKey === 'a' || lastKey === 'ArrowLeft')
  ) {
    player.moving = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (
    (keys.s.pressed || keys.ArrowDown.pressed) &&
    (lastKey === 's' || lastKey === 'ArrowDown')
  ) {
    player.moving = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (
    (keys.d.pressed || keys.ArrowRight.pressed) &&
    (lastKey === 'd' || lastKey === 'ArrowRight')
  ) {
    player.moving = true;
    player.image = player.sprites.right;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;
    case 'ArrowUp':
      keys.ArrowUp.pressed = true;
      lastKey = 'ArrowUp';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      lastKey = 'ArrowLeft';
      break;
    case 'ArrowDown':
      keys.ArrowDown.pressed = true;
      lastKey = 'ArrowDown';
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      lastKey = 'ArrowRight';
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
    case 'ArrowUp':
      keys.ArrowUp.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowDown':
      keys.ArrowDown.pressed = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
  }
});

const dialogues = new Map([
  [
    entrance,
    [
      `안녕하세요? 만나서 반갑습니다.`,
      `우리 집에 와주셔서 감사합니다.`,
      `지금부터 집 구경을 하면서 
      제가 어떤 사람인지 조금만 소개해 드릴게요.`,
      `조금이긴 한데 엄청난 tmi들로 가득 찰 수도 있어요.
      (이렇게 넓고 쾌적한 집에서 살고 싶다 등..ㅎ)`,
      `기고 기고!!!!!!!!!!!!!!!!! 기고`,
    ],
  ],
  [
    guestRoom,
    [
      `저는 친구들이랑 수다 떨고
      함께 맛있는 거 먹는거 완전 정말 좋아합니다.`,
      `오랜 친구들과 어디 나가지 않고
      집에서 잠옷 입고 눕거나 앉아서 깔깔거리는 게 낙이에요.`,
      `했던 얘기 또 하고 또 하고 또 하고 또 하는데 
      언제까지 웃길는지 모르겠어요.ㅋㅋㅋㅋㅋ`,
    ],
  ],
  [
    bed,
    [
      `여기 오른쪽에 있는 사람은 
      하나뿐인 동거인이자 제 평생 베프입니다.`,
      `취미는 잠이고요, 특기도 잠이에요, 지금도 잡니다. 
      (주말엔 8시간만 깨어있는 것 같기도.. 흠)`,
      `처음엔 어디 아픈 거 아닌가 걱정했는데, 
      잠을 충분히 못 자면 더 아파해요;;`,
      `자자, 깨우지 말고 저희끼리 놀아요!!!
      (동거인 특: 본인 빼고 재미있게 노는 것 못 참는 편)`,
    ],
  ],
  [
    washer,
    [
      `여기를 왜 오게 하나 싶긴 한데, 
      그냥 세탁기가 보이길래 말하고 싶었어요.`,
      `건조기가 제 삶을 질을 바꿔 놓았다는 것을요. 
      누가 발명했는지 아주 정말 감사합니다.`,
      `매번 마대 포대자루 같은 큰 제 옷. 
      세탁하고 말리기 힘들었는데.. 너.무.좋.아.요.`,
      `바쁠 때는 청소를 자주 못해도 
      항상 정리되고 깔끔한 상태를 유지하려고 노력합니다.`,
    ],
  ],
  [
    TV,
    [
      `전 어릴 때부터 TV를 좋아했어요. 드라마, 다큐, 뉴스, 예능 등 
      장르는 가리지 않고 모두 흥미로워 합니다.`,
      `가끔 생로병사의 비밀과 같은 시사 프로그램에 꽂히면 
      그것만 계속 찾아보고요,
      다양한 사람들이 나오는 관찰 예능 좋아해요!`,
      `'우리 아이가 달라졌어요'를 제가 학생일 때 봤는데, 
      성인이 된 지금도 '금쪽같은 내 새끼'를 봅니다.`,
      `학창 시절 '짝'을 보며 사람 공부? 했는데, 
      아직도 '나는 솔로' 좋아합니다.`,
      `(그냥 도파민 중독인 것 같습니다.)`,
    ],
  ],
  [
    gift,
    [
      `현재는 무슨 계절인가요?
      제가 이 글을 쓰는 현시점은 여름입니다. 한여름`,
      `전 겨울을 좋아합니다.`,
      `밤이 긴 겨울에는 거리마다 
      반짝반짝 트리들을 볼 수 있어 좋아요.
      (저는 게을러서 집에서 만들 생각은 없거든요.)`,
      `귤도 많이 많이 까먹을 수 있어요. 붕어빵도 먹을 수 있고,
      호빵도 합법적으로 맛있게 먹을 수 있어요. 
      한 겨울에 먹는 호떡은 또 얼마나 맛있게요~`,
      `뭐, 어쩌다 보니 다 먹는 얘기인데 
      어차피 전 다른 계절에도 잘 먹긴 하네요, 많이.`,
    ],
  ],
  [
    dumbbell,
    [
      `운동은 안 좋아하는 것 같아요.
      아니, 좋아하지 않아요.`,
      `열심히 자기 관리 하시는 분들 너무 존경합니다.`,
      `그래도 그중에 바깥 풍경 보며 달리는 러닝을 좋아하는데,
      저도 언젠가 마라톤에 도전하고 싶습니다!!!
      (라고 n년 째 말만 하는 중입니다..) `,
    ],
  ],
  [
    baseball,
    [
      `어떤 스포츠 좋아하시나요? 
      전 야구 좋아합니다.`,
      `초등학생도 되기 전부터 가족들이랑 야구장에 많이 다녔어요.
      그로 인해 제 몸엔 항상 푸른 피가 흐르고 있습니다.`,
      `혹시 저랑 친해지고 싶으시면 작게 '엘도라도' 흥얼거려 주세요.
      그 뒤는 제가 알아서 할게요. ^_^`,
    ],
  ],
  [
    cooking,
    [
      `전 요리하는 것을 싫어하진 않지만 
      그렇다고 또 즐겨 하지도 않아요.`,
      `대신 설거지를 즐겨 합니다.`,
      `독립하고 직접 요리를 해보면서 느끼는 점은,
      매일 메뉴를 선정하고 요리해 주신 우리 엄마, 그저 GOAT!(하트)
      그땐 몰랐다.`,
      `전 그래도 요리를 좋아하는 짝꿍을 만나 
      다시 잘 먹게 되었습니다. 감사합니다.(하트)`,
    ],
  ],
  [
    cake,
    [
      `케이크`,
      `먹고 싶어서`,
      `식탁 한가운데 올려놨어요.`,
      `아까도 티라미수 홀케이크 한판 다 먹고 싶다고 외치다가 
      제지 당했습니다. 흑흑ㅠㅠ`,
    ],
  ],
  [
    computer,
    [
      `컴퓨터로 주로 무엇을 하시나요?`,
      `저는 일, 유튜브 시청, 가끔 공부, 종종 쇼핑합니다.
      게임은 즐겨 하지 않구요. 할 수 있는 게임이 별로 없어요.`,
      `동거인은 롤 감상이 유일한 취미? 인 것 같기도 한데, 
      전 룰도 모릅니다.`,
      `가끔 해설이 "쵸오오오오오오비이이이이이이이이" 외칠 때 
      그때만 신납니다.ㅋㅋㅋㅋㅋ`,
      `그렇지만 장범준의 실버판테온은 잘 부릅니다. 
      무슨 뜻인지는 아직도 몰라요.ㅋ`,
    ],
  ],
  [
    bookcase,
    [
      `요즘 책 읽기에 관심이 많습니다.`,
      `다독하고 싶은데 생각만큼 쉽지 않네요. 
      하루에 30분만 읽기도 잘 지켜지지 않습니다.`,
      `근데 도서관이랑 서점 가는 것은 좋아해요!`,
      `물론 오래 있지는 않지만요..;`,
    ],
  ],
  [
    flowerBed,
    [
      `저는 자연을 좋아합니다. 
      그래서 색깔도 초록색이 제일 좋나 봅니다.`,
      `자연은 좋은데, 벌레는 싫어합니다.
    왜 이렇게 모순이 많은지 저도 모르겠습니다.`,
      `한적하고 조용하고 
      새소리, 바람 소리 들을 수 있는 곳에서 살고 싶어요.`,
    ],
  ],
  [
    swimmingPool,
    [
      `저는 수영하는 것을 좋아합니다.
    물놀이보다 수영장에서 수영하는 것을 좋아해요.`,
      `수영 시즌엔 영법 유튜브 영상이
      제 알고리즘을 도배할 정도입니다.`,
      `어릴 때는 물개였는데 물범으로 진화했습니다.(살크업)`,
      `바다코끼리까지는 가고 싶지 않아요..(인정하고 싶지 않습니다.)`,
    ],
  ],
]);

// 1) 상태 변수
let currentSprite = null; // 현재 대화 대상 스프라이트
let currentMessages = null; // 현재 대사 배열
let idx = 0; // 인덱스

// 2) UI 제어
const box = document.querySelector('.box-container');
const guideBox = document.querySelector('.guide-box');
const dialogueBox = document.querySelector('.dialogue-box');

function showBox(text) {
  dialogueBox.innerText = text;
  box.classList.add('active');
  if (guideBox) guideBox.style.display = 'none';
  if (dialogueBox) dialogueBox.style.display = 'flex';
}
function hideBox() {
  dialogueBox.innerText = '';
  box.classList.remove('active');
  if (guideBox) guideBox.style.display = 'flex';
  if (dialogueBox) dialogueBox.style.display = 'none';
}
// 페이지 로드시 안내문구/대화창 표시 상태 초기화
if (dialogueBox && guideBox && box) {
  if (dialogueBox.innerText.trim() === '') {
    box.classList.remove('active');
    guideBox.style.display = 'flex';
    dialogueBox.style.display = 'none';
  } else {
    box.classList.add('active');
    guideBox.style.display = 'none';
    dialogueBox.style.display = 'flex';
  }
}

// 3) 클릭 하나로 모두 처리
canvas.addEventListener('click', (e) => {
  const { left, top } = canvas.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;

  // (A) 클릭된 아이콘 찾기
  let clickedSprite = null;
  let clickedMessages = null;
  for (const [spr, msgs] of dialogues) {
    const fw = spr.image.width / spr.frames.max;
    const fh = spr.image.height;
    const tx = spr.position.x;
    const ty = spr.position.y;
    if (x >= tx && x <= tx + fw && y >= ty && y <= ty + fh) {
      clickedSprite = spr;
      clickedMessages = msgs;
      break;
    }
  }

  // (B) 대화 중이 아닐 때 → 클릭된 아이콘 있으면 시작
  if (!currentMessages) {
    if (clickedSprite) {
      currentSprite = clickedSprite;
      currentMessages = clickedMessages;
      idx = 0;
      showBox(currentMessages[idx]);
    }
    return;
  }

  // (C) 대화 중일 때
  if (clickedSprite) {
    // C1: 같은 아이콘 클릭 → 다음 대사
    if (clickedSprite === currentSprite) {
      advance();
    }
    // C2: 다른 아이콘 클릭 → 새 아이콘 대화로 전환
    else {
      currentSprite = clickedSprite;
      currentMessages = clickedMessages;
      idx = 0;
      showBox(currentMessages[idx]);
    }
  } else {
    // D: 아이콘 외 클릭 → 다음 대사
    advance();
  }
});

// 4) Enter 키도 다음 대사
window.addEventListener('keydown', (e) => {
  if (!currentMessages || e.key !== 'Enter') return;
  e.preventDefault();
  advance();
});

// 5) 다음 대사 함수
function advance() {
  idx++;
  if (idx < currentMessages.length) {
    showBox(currentMessages[idx]);
  } else {
    hideBox();
    currentMessages = null;
    currentSprite = null;
  }
}
