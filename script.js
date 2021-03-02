var canvas; // canvas要素(HTMLCanvasElement)
var ctx; // 2Dコンテキスト(CanvasRenderingContext2D)
var canvasW = Math.min(screen.width * 0.6,screen.height * 0.8); // canvas要素の横幅(px)
var canvasH = screen.height * 0.8; // canvas要素の縦幅(px)
var oX; // 中心Ｏのx座標
var oY; // 中心Ｏのy座標
var mouseX; // 最後にクリックされた位置のx座標
var mouseY; // 最後にクリックされた位置のy座標

window.onload = function() {
  // canvas要素を取得し、サイズ設定
  canvas = document.getElementById('axisCanvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  oX = Math.ceil(canvasW / 2);
  oY = Math.ceil(canvasH / 2);

  // 描画のために2Dコンテキスト取得
  ctx = canvas.getContext('2d');

  // 座標軸の初期化
  drawInit();
  drawParabola(1,1,1);


  
  // クリックイベントの登録
  canvas.onclick = function(e) {

    return;
    // 座標軸の初期化
    drawInit();


    // クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）
    var rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - Math.floor(rect.left) - 2;
    mouseY = e.clientY - Math.floor(rect.top) - 2;

    ctx.fillStyle = "#000";

    // クリック位置を中心に円を描画
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2, false);
    ctx.fill();

    // 2次元座標系での座標値を計算（y座標は上方向を正とするため正負を逆にする）
    var x = mouseX - oX;
    var y = -(mouseY - oY);
    // 座標の表示テキストを描画
    var maxWidth = 100;
    ctx.textAlign = 'right';
    ctx.fillText('( ' + x + ', ' + y + ' )', canvasW - 20, canvasH - 20, maxWidth);
  }
 
};

function drawInit() {
  // 一度描画をクリア
  ctx.clearRect(0, 0, canvasW, canvasH);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#999";
  ctx.fillStyle = "#999";

  // x座標軸を描画
  ctx.beginPath();
  ctx.moveTo(0, oY);
  ctx.lineTo(canvasW, oY);
  ctx.stroke();

  var n = 5;
  var m = 2 * n + 1;

  for(var i = 0;i < m;++i){
    ctx.beginPath();
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1;
    ctx.moveTo(0, Math.floor(oY + (canvasH / 2 | 0) * ((i - n) / n )));
    ctx.lineTo(canvasW, Math.floor(oY + (canvasH / 2 | 0) * ((i - n) / n )));
    ctx.stroke();
  }
 for(var i = 0;i < m;++i){
    ctx.beginPath();
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1;
    ctx.moveTo(Math.floor(oY + (canvasW / 2 | 0) * ((i - n) / n )), 0);
    ctx.lineTo(Math.floor(oY + (canvasW / 2 | 0) * ((i - n) / n )), canvasH);
    ctx.stroke();
  }
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#999";
   

  // x座標軸の矢印を描画
  ctx.beginPath();
  ctx.moveTo(canvasW, oY);
  ctx.lineTo(canvasW - 10, oY - 7);
  ctx.lineTo(canvasW - 10, oY + 7);
  ctx.fill();

  // y座標軸を描画
  ctx.beginPath();
  ctx.moveTo(oX, 0);
  ctx.lineTo(oX, canvasH);
  ctx.stroke();
  // y座標軸の矢印を描画
  ctx.beginPath();
  ctx.moveTo(oX, 0);
  ctx.lineTo(oX - 7, 10);
  ctx.lineTo(oX + 7, 10);
  ctx.fill();

  // 原点を表す文字「Ｏ」を描画
  ctx.beginPath();
  var maxWidth = 100;
  var delta = 15;
  ctx.font = "12px 'Verdana'";
  ctx.textAlign = 'right';
  ctx.fillText('Ｏ', oX - 5, oY + 15, maxWidth);

  ctx.beginPath();
  var maxWidth = 100;
  var delta = 15;
  ctx.font = "12px 'Verdana'";
  ctx.textAlign = 'right';
  ctx.fillText('x', oX + (canvasW/2 | 0) + delta, oY , maxWidth);
  ctx.fillText('y', oX, oY + (canvasH/2 | 0) + delta, maxWidth);
}

function drawParabola(a, b, c) {
  
  //座標を定義
  let start = {x:-90, y:-100}; //始点 
  let cp = {x:0, y:300}; //始点 
  let end = {x:90, y:-100}; //始点 

  //二次曲線
  ctx.beginPath();
  ctx.moveTo(start.x + oX, start.y + oY);  // 始点まで移動
  ctx.quadraticCurveTo(cp.x + oX, cp.y + oY, end.x + oX, end.y + oY);   // 2次ベジュ曲線を描画
  ctx.strokeStyle = "Orange";   // 線の色
  ctx.lineWidth = 5;            // 線の太さ
  ctx.stroke();

} 

 
