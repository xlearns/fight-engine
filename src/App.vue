<script setup>
import { onMounted } from "vue";
let canvas, ctx, ch, cw, bg, bg1;
let debug = false;
const jumpHeight = 120;
const map = {
  width: 1360,
  x: 0,
  y: 0,
};
const screen = 800;
let h = 230;
let g = 8;
let jump = false;
let isOnFloor = true;
let speed = 4;
let jspeed = 10;
let vx = 0,
  vy = 0,
  y = 0;

let hero_config = {
  x: 156,
  y: 112,
};

function drawRect(config = {}) {
  let { x, y, w, h, c } = config;
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

function drawArc(config = {}) {
  let { x, y, w, h, c } = config;
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.arc(x, y, 25, 0, 2 * Math.PI);
  ctx.fill();
}

function footer() {
  drawRect({
    x: 0,
    y: ch - h,
    w: cw,
    h: h,
    c: "black",
  });
}

function hero() {
  drawRect({
    x: hero_config.x,
    y: ch - h + hero_config.y - y,
    w: 50,
    h: 80,
    c: "blue",
  });
  const _y = ch - h + 80 + hero_config.y;
  const _x = hero_config.x;
  // 光环
  // drawRect({
  //   x: _x,
  //   y: _y,
  //   w: 50,
  //   h: 0,
  //   c: "red",
  // });
  if (debug) {
    ctx.fillStyle = "#fff";
    ctx.fillText(
      `人物坐标：x:${_x},y:${_y},${
        !isOnFloor ? "正在跳跃跳跃坐标为：" + y : ""
      }`,
      _x - 28,
      _y + 10
    );

    ctx.fillText(`当前为调试模式`, 10, 65);
    ctx.fillText(`地图信息：x:${map.x},y:${map.y}`, 10, 85);
  }
}

function background() {
  ctx.drawImage(bg1, map.x, 0, cw, ch, 0, 88, cw, ch);

  ctx.drawImage(bg, map.x, 0, cw, ch, 0, 50, cw, ch);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background();
  // footer();
  hero();
  if (keys["d"]) {
    vx += speed;
  } else if (keys["a"]) {
    vx -= speed;
  } else if (keys["w"]) {
    vy -= speed;
  } else if (keys["s"]) {
    vy += speed;
  }
  if (keys[" "] && isOnFloor) {
    jump = true;
    isOnFloor = false;
  }
  if (jump) {
    if (y > jumpHeight) {
      y = jumpHeight;
      jump = false;
    } else {
      y += jspeed;
    }
  } else {
    y -= g;
    if (y <= 0) {
      isOnFloor = true;
      y = 0;
    }
  }
  if (
    (vx > 0 &&
      hero_config.x + 150 > screen &&
      map.x + hero_config.x + 150 < map.width) ||
    (vx < 0 && map.x > 0 && hero_config.x - 150 <= 0)
  ) {
    map.x += vx;
  } else {
    hero_config.x += vx;
    hero_config.y += vy;
  }

  if (map.x + hero_config.x >= map.width - 50) {
    hero_config.x = screen - 50;
    hero_config.y += vy;
  }
  vx = 0;
  vy = 0;

  if (hero_config.x <= 0 && map.x <= 0) {
    hero_config.x = 0;
  }
  if (hero_config.y >= h - 100) {
    hero_config.y = h - 100;
  }

  if (hero_config.y <= -80) {
    hero_config.y = -80;
  }

  window.requestAnimationFrame(update);
}
onMounted(() => {
  canvas = document.querySelector("canvas");
  bg = document.querySelectorAll("img")[0];
  bg1 = document.querySelectorAll("img")[1];
  ctx = canvas.getContext("2d");
  ch = canvas.height;
  cw = canvas.width;
  update();
});

let keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key == "F2") {
    debug = !debug;
  }
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});
</script>

<template>
  <img src="./assets/yg1.png" v-show="false" />
  <img src="./assets/yg2.png" v-show="false" />
  <canvas width="800" height="600" />
</template>
