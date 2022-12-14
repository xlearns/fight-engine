<script setup>
import { onMounted } from "vue";
let canvas, ctx, ch, cw, bg;
let h = 380;
let g = 8;
let jump = false;
let speed = 4;
let jspeed = 10;
let vx = 0,
  vy = 0,
  y = 0;
let hero_config = {
  x: 0,
  y: 0,
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
  drawRect({
    x: hero_config.x,
    y: ch - h + 80 + hero_config.y,
    w: 50,
    h: 20,
    c: "red",
  });
}

function background() {
  ctx.drawImage(bg, 0, 0, cw, ch, 0, 0, cw, ch);
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
  if (keys[" "]) {
    jump = true;
  }
  if (jump) {
    if (y > 120) {
      y = 120;
      jump = false;
    } else {
      y += jspeed;
    }
  } else {
    y -= g;
    if (y <= 0) {
      y = 0;
    }
  }
  hero_config.x += vx;
  hero_config.y += vy;
  vx = 0;
  vy = 0;
  //限制
  if (hero_config.x <= 0) {
    hero_config.x = 0;
  }
  if (hero_config.x >= cw - 50) {
    hero_config.x = cw - 50;
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
  bg = document.querySelector("img");
  ctx = canvas.getContext("2d");
  ch = canvas.height;
  cw = canvas.width;
  update();
});

let keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});
</script>

<template>
  <img src="./assets/sly.png" v-show="false" />
  <img src="./assets/sly.png" v-show="false" />
  <canvas width="800" height="600" />
</template>
