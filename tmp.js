<!-- 放物線・曲線を描く -->
<CANVAS id="axisCanvas" width="540" height="540"></CANVAS>
<BR>
<TABLE id="parallel_tbl"><TR>
	<TD>　　<I>n</I><span class="parallel_sans18"> 次式のグラフ</span><BR>
　 &#x25A3;　<I>a</I>　=　<span id="parabola_a"></span><BR>
　 &#x25A3;　<I>n</I>　=　<span id="parabola_n"></span><BR>
<DIV style="height: 3px;"></DIV>
　　<I>y</I> = <I>ax<SUP>n</SUP></I><span class="parallel_sans18"> の頂点の座標 </span>(<I>p</I>, <I>q</I>)<BR>
　 &#x25A3;　<I>p</I>　=　<span id="parallel_p"></span><BR>
　 &#x25A3;　<I>q</I>　=　<span id="parallel_q"></span><BR>
</TD>
	<TD>　　<span class="parallel_sans18">関数の選択</span><BR>
<FORM name="para" id="parabola_form">　<INPUT type="radio" name="bola" onclick="setParabolaCurve(0)">　<I>y</I> = <I>ax<SUP>n</SUP></I><BR>
　<INPUT type="radio" name="bola" onclick="setParabolaCurve(1)">　<I>y</I> = <I>a</I> ( <I>x</I> - <I>p</I> )<SUP><I>n</I></SUP> + <I>q</I><BR>
　<INPUT type="radio" name="bola" onclick="setParabolaCurve(2)">　<I>y</I> = <I>x</I><SUP>3</SUP> + <I>x</I><SUP>2</SUP> + <I>x</I><BR>
　<INPUT type="radio" name="bola" onclick="setParabolaCurve(3)">　<I>y</I> = <I>x</I><SUP>3</SUP> - <I>x</I><SUP>2</SUP> - <I>x</I></FORM>
</TD>
</TR></TABLE>
<SCRIPT>
// CANVAS 基本設定
function funcParaCanvas() {
	this.cvs = document.getElementById('parabola_canvas');
	this.pen = this.cvs.getContext('2d');
	this.w = this.cvs.width;
	this.h = this.cvs.height;
	this.x = this.w/2;
	this.y = this.h/2;
	this.z = this.w/12;
	this.g = this.z/10;
}
var newParaCanvas = new funcParaCanvas();

	funcParabola();

function funcParabola() {
var i = 0;
var str = '<SELECT id="parabolaA" onChange="drawParaCurve(0)">';
	for (i=-10; i<=10; i++) {
		str += '<OPTION value="' + i + '">' + i + '</OPTION>';
	}
	document.getElementById('parabola_a').innerHTML = str + '</SELECT>';
	document.getElementById('parabolaA').selectedIndex = 11;

	str = '<SELECT id="parabolaN" onChange="drawParaCurve(0)">';
	for (i=-5; i<=5; i++) {
		str += '<OPTION value="' + i + '">' + i + '</OPTION>';
	}
	document.getElementById('parabola_n').innerHTML = str + '</SELECT>';
	document.getElementById('parabolaN').selectedIndex = 7;

	str = '<SELECT id="parallelP" onChange="drawParaCurve(1)">';
	for (i=-5; i<=5; i++) {
		str += '<OPTION value="' + i + '">' + i + '</OPTION>';
	}
	document.getElementById('parallel_p').innerHTML = str + '</SELECT>';
	document.getElementById('parallelP').selectedIndex = 8;

	str = '<SELECT id="parallelQ" onChange="drawParaCurve(1)">';
	for (i=-5; i<=5; i++) {
		str += '<OPTION value="' + i + '">' + i + '</OPTION>';
	}
	document.getElementById('parallel_q').innerHTML = str + '</SELECT>';
	document.getElementById('parallelQ').selectedIndex = 2;

	drawParaCurve(0);
}

// 座標グリッド描線（全自動）
function drawGrid(pen, g, w, h) {
var i = 0;

	// Canvas 全体をクリア
	pen.clearRect(0, 0, w, h);

	// 座標グリッド y 軸
	pen.lineWidth = 0.5;
	pen.strokeStyle = 'lightgray';
	for(i=g;i<w;i+=g) {
		pen.beginPath();
		pen.moveTo(i, 0);
		pen.lineTo(i, h);
		pen.stroke();
	}
	pen.strokeStyle = 'darkgray';
	for(i=5*g;i<w;i+=5*g) {
		pen.beginPath();
		pen.moveTo(i, 0);
		pen.lineTo(i, h);
		pen.stroke();
	}
	pen.strokeStyle = 'gray';
	for(i=10*g;i<w;i+=10*g) {
		pen.beginPath();
		pen.moveTo(i, 0);
		pen.lineTo(i, h);
		pen.stroke();
	}

	// 座標グリッド x 軸
	pen.lineWidth = 0.5;
	pen.strokeStyle = 'lightgray';
	for(i=g;i<h;i+=g) {
		pen.beginPath();
		pen.moveTo(0, i);
		pen.lineTo(w, i);
		pen.stroke();
	}
	pen.strokeStyle = 'darkgray';
	for(i=5*g;i<h;i+=5*g) {
		pen.beginPath();
		pen.moveTo(0, i);
		pen.lineTo(w, i);
		pen.stroke();
	}
	pen.strokeStyle = 'gray';
	for(i=10*g;i<h;i+=10*g) {
		pen.beginPath();
		pen.moveTo(0, i);
		pen.lineTo(w, i);
		pen.stroke();
	}
}

// 座標の中心軸
function funcCrossLine(pen, x, y, w, h) {
	pen.beginPath();
	pen.moveTo(x, 0);
	pen.lineTo(x, h);
	pen.moveTo(0, y);
	pen.lineTo(w, y);
	pen.stroke();
}

// グラフのグリッドを描く
function funcParabolaGrid() {
var pen = newParaCanvas.pen;
var z = newParaCanvas.z;
var g = z / 10;
var w = z * 12;
var h = z * 12;
var x = w/2;
var y = h/2;

	// 座標グリッド描線（全自動）
	drawGrid(pen, g, w, h);

	// 座標の中心軸
	pen.strokeStyle = 'darkslategray';
	pen.lineWidth = 1.5;
	funcCrossLine(pen, x, y, w, h);

	// 数字を記入する
	pen.fillStyle = 'navy';
	pen.font = '20px Arial';
	pen.fillText('- 5', 35, 295);
	pen.fillText('5', 491, 295);
	pen.fillText('5', 250, 53);
	pen.fillText('- 5', 239, 502);

	pen.strokeStyle = 'steelblue';
	pen.lineWidth = 2;
	return pen;
}

// 3 次関数のグラフを描く
function setParabolaCurve(PlusMinus) {
var i = 0;

	switch (PlusMinus) {
	case 0:
		drawParaCurve(0);
		break;
	case 1:
		drawParaCurve(1);
		break;
	default:
		var pen = funcParabolaGrid();
		var z = newParaCanvas.z;
		var w = z * 12;
		var h = z * 12;
		// ペン軸の座標基準点を描画エリアの中心に移動する
		pen.translate(w/2, h/2);

		pen.beginPath();
		if(PlusMinus == 2) {
			// 3 次関数のグラフを描く（プラス式）
			pen.moveTo(z * -6, -z * (Math.pow(-6, 3) + Math.pow(-6, 2) + 6));
			for (i=-6; i<=6; i+=0.1) {
				pen.lineTo(z * i, -z * (Math.pow(i, 3) + Math.pow(i, 2) + i));
			}
		} else {
			// 3 次関数のグラフを描く（マイナス式）
			pen.moveTo(z * -6, -z * (Math.pow(-6, 3) - Math.pow(-6, 2) - 6));
			for (i=-6; i<=6; i+=0.1) {
				pen.lineTo(z * i, -z * (Math.pow(i, 3) - Math.pow(i, 2) - i));
			}
		}
		pen.stroke();

		// ペン軸の座標基準点を描画エリアの左上に戻す
		pen.translate(-w/2, -h/2);
		break;
	}
}

// 放物線・平行移動・曲線のグラフを描く
function drawParaCurve(para) {
var pen = funcParabolaGrid();
var z = newParaCanvas.z;
var w = z * 12;
var h = z * 12;
var a = document.getElementById('parabolaA').value/1;
var n = document.getElementById('parabolaN').value/1;

	// ペン軸の座標基準点を描画エリアの中心に移動する
	pen.translate(w/2, h/2);

	// n 次関数のグラフを描く
	pen.beginPath();
	pen.moveTo(z * -6, -z * Math.pow(-6, n) * a);
	for (var i=-5.9; i<=6; i+=0.1) {
		pen.lineTo(z * i, -z * Math.pow(i, n) * a);
	}
	pen.stroke();
	if(para == 0) {
		document.para.bola[0].checked = true;
	} else {
	var p = document.getElementById('parallelP').value/1;
	var q = document.getElementById('parallelQ').value/1;
		document.para.bola[1].checked = true;
		pen.strokeStyle = 'darkmagenta';
		pen.beginPath();
		pen.moveTo(z * (-10 + p), -z * (a * Math.pow(-10, n) + q));
		for (var i=-9.9; i<=10; i+=0.1) {
			pen.lineTo(z * (i + p), -z * (a * Math.pow(i, n) + q));
		}
		pen.stroke();
	}

	// ペン軸の座標基準点を描画エリアの左上に戻す
	pen.translate(-w/2, -h/2);
}
</SCRIPT>
<STYLE>
#parabola_canvas {
	margin: 20px 25px;
	background-color: white;
	border: 3px solid seagreen;
}
#parallel_tbl TD {
	padding-left: 40px;
	line-height: 2em;
	font-family: Times New Roman;
	font-size: 21px;
}
#parabolaA, #parabolaN, #parallelP, #parallelQ {
	font-family: Century;
	font-size: 17px;
}
.parallel_sans18 {
	font-size: 18px;
	font-family: sans-serif;
}
</STYLE>
<BR>
