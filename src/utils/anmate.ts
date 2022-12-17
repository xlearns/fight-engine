/*
// 获取Canvas元素
var canvas = document.getElementById('myCanvas');

// 获取Canvas的2D上下文
var ctx = canvas.getContext('2d');

// 定义图像序列
var images = [  'image1.png',  'image2.png',  'image3.png'];

// 定义图像偏移量
var offsets = [  {x: 0, y: 0},  {x: 50, y: 50},  {x: 100, y: 100}];

// 定义当前帧
var currentFrame = 0;

// 每隔50毫秒更改帧
setInterval(function() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 获取当前帧的图像和偏移量
  var image = images[currentFrame];
  var offset = offsets[currentFrame];

  // 绘制图像
  ctx.drawImage(image, offset.x, offset.y);

  // 更新帧
  currentFrame = (currentFrame + 1) % images.length;
}, 50);



// 加载ZIP文件
JSZip.loadAsync('animation.zip')
  .then(function(zip) {
    // 获取ZIP文件中的图像文件
    var images = zip.file(/\.png$/i);

    // 获取Canvas元素
    var canvas = document.getElementById('myCanvas');

    // 获取Canvas的2D上下文
    var ctx = canvas.getContext('2d');

    // 定义当前帧
    var currentFrame = 0;

    // 每隔50毫秒更改帧
    setInterval(function() {
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 获取当前帧的图像
      var image = images[currentFrame];

      // 加载图像
      image.async('blob').then(function(blob) {
        var img = new Image();
        img.src = URL.createObjectURL(blob);

        // 绘制图像
        ctx.drawImage(img, 0, 0);
      });

      // 更新帧
      currentFrame = (currentFrame + 1) % images.length;
    }, 50);
  });

 */

export {};
