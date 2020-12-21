

var aktualny=false;
var tab = new Array(9);
var l_k=0;
var l_krz=0;
var pl=1;
var krzyzyk, kolko;
var block=0;

var end = new Audio("end_game.wav");
var pick = new Audio("draw.wav");
var selected = new Audio("select.wav");

//window.onload = start();

function game(nr,pla){
if(pla==true) selected.play();
aktualny=false;
l_k=0;
l_krz=0;
var nc="#a82727";
var nf="#a16f03";
var nb="#a82727";

var pc = "#9c4803";
var pf = "#f5903d";
var pb = "#473322";

document.getElementById("lv"+pl).style.backgroundColor = nc;
document.getElementById("lv"+pl).style.fontcolor = nf;
document.getElementById("lv"+pl).style.borderColor = nb;

document.getElementById("lv"+nr).style.backgroundColor = pc;
document.getElementById("lv"+nr).style.fontcolor = pf;
document.getElementById("lv"+nr).style.borderColor = pb;

if(nr==1) document.getElementById("subtitle").innerHTML = '<a href=" https://www.youtube.com/watch?v=FyolUDzR7Ok " target="_blank" alt="My Website"> by MichalB </a> [Player1 vs Player2]';
if(nr==2) document.getElementById("subtitle").innerHTML = '<a href=" https://www.youtube.com/watch?v=FyolUDzR7Ok " target="_blank" alt="My Website"> by MichalB </a> [Player vs Bot - Easy]';
if(nr==3) document.getElementById("subtitle").innerHTML = '<a href=" https://www.youtube.com/watch?v=FyolUDzR7Ok " target="_blank" alt="My Website"> by MichalB </a> [Player vs Bot - Impossible]';

document.getElementById("point1").innerHTML = l_krz;
document.getElementById("point2").innerHTML = l_k;

if(nr==1) {kolko="Player2"; krzyzyk="Player1";}
else {kolko="Bot"; krzyzyk="Player";}

pl=nr;
start();
}

function start(){
	for(var i=0;i<9;i++) tab[i]=0;
	
	if(!aktualny) document.getElementById("move").innerHTML = "Now " + krzyzyk;
	else document.getElementById("move").innerHTML = "Now " + kolko;
	var zawartosc = '';
	for(var i=1;i<=9;i++){
		zawartosc+= '<div class="okienko" onclick="press('+i+');" id="p'+i+'"></div>';
		if(i%3==0) zawartosc+='<div style="clear:both"></div>';
	}
	document.getElementById("leftS").innerHTML = zawartosc;
}

function press(nr){
	if(!block){
	var icon;
	var sizeq;
	var nextmove;
	if(!aktualny) {icon="icon-cancel"; sizeq="800%"; nextmove=kolko; aktualny=true;}
	else {icon="icon-circle-empty"; sizeq="800%"; nextmove=krzyzyk; aktualny=false;}
	
	pick.play();
	document.getElementById("move").innerHTML = 'Now '+nextmove;
	document.getElementById('p'+nr).innerHTML = '<i class='+icon+'> </i>';
	document.getElementById('p'+nr).style.cursor= "default";
	document.getElementById('p'+nr).setAttribute("onclick",";");
	
	if(aktualny==true) tab[nr-1]=1;
	else tab[nr-1]=2;
	check();
	if((pl==2||pl==3)&&aktualny==true){
	block=1;
		setTimeout("moveBot(pl)",1000);
	}
}}

function moveBot(level){
	var remember=-1;
	var naj=-2;
	if(level==2) {
		var ok = easyBot();
		block=0;
		press(ok);
	}
	else{
	for(var i=0;i<9;i++) if(tab[i]==0) {
		var w = rek(tab[0],tab[1],tab[2],tab[3],tab[4],tab[5],tab[6],tab[7],tab[8], i+1, 1);
		if(w>naj)
		{
			naj=w;
			remember = i;
		}
		
		}
		block=0;
	press(remember+1);
	}
}

function spr(i){
	var g = -1;
	if(tab[0]==tab[1] && tab[1]==tab[2] && tab[0]!=0) g = i+1;
	if(tab[3]==tab[4] && tab[4]==tab[5] && tab[5]!=0) g = i+1;
	if(tab[6]==tab[7] && tab[7]==tab[8] && tab[8]!=0) g = i+1;
	
	if(tab[0]==tab[3] && tab[3]==tab[6] && tab[0]!=0) g = i+1;
	if(tab[1]==tab[4] && tab[4]==tab[7] && tab[7]!=0) g = i+1;
	if(tab[2]==tab[5] && tab[5]==tab[8] && tab[8]!=0) g = i+1;
	
	if(tab[0]==tab[4] && tab[4]==tab[8] && tab[8]!=0) g = i+1;
	if(tab[2]==tab[4] && tab[4]==tab[6] && tab[6]!=0) g = i+1;
	return g;
}

function easyBot(){
for(var j=2;j>=1;j--){
for(var i=0;i<9;i++){
	if(tab[i]==0){
	tab[i]=j;
	var good = spr(i);
	tab[i]=0;
	if(good!=-1) return good;
	}
}}
//alert("dzialam");
//for(var i=0;i<9;i++) alert(tab[i]);
for(var i=0;i<9;i++) if(tab[i]==0){
	tab[i]=2;
	var good = spr(i);
	if(good!=-1) { tab[i]=0; return good; }
	for(var j=0;j<9;j++) if(tab[j]==0){
	tab[j]=2;
	good = spr(i);
	if(good!=-1) {
		
		tab[i]=0;
		tab[j]=0;
		return good;
		}
	for(var k=0;k<9;k++) if(tab[k]==0){
			tab[k]=2;
			good=spr(i);
			//alert(good);
			if(good!=-1) {
				
				tab[i]=0;
				tab[j]=0;
				tab[k]=0;
				return good;
				
				}
			tab[k]=0;
	}
	tab[j]=0;
	}
	tab[i]=0;
	//alert("hmm");
}
//alert("zjebany zbyszek");
for(var i=0;i<9;i++) if(tab[i]==0) return i+1;
	
}

function rek(n1,n2,n3,n4,n5,n6,n7,n8,n9, wybrany, jaki){
	
	if(wybrany==1) n1=jaki+1;
	if(wybrany==2) n2=jaki+1;
	if(wybrany==3) n3=jaki+1;
	
	if(wybrany==4) n4=jaki+1;
	if(wybrany==5) n5=jaki+1;
	if(wybrany==6) n6=jaki+1;
	
	if(wybrany==7) n7=jaki+1;
	if(wybrany==8) n8=jaki+1;
	if(wybrany==9) n9=jaki+1;

	
	if(n1==n2 && n2==n3 && n1!=0) if(jaki) return 1; else return -1;
	if(n4==n5 && n5==n6 && n5!=0) if(jaki) return 1; else return -1;
	if(n7==n8 && n8==n9 && n9!=0) if(jaki) return 1; else return -1;
	
	if(n1==n4 && n4==n7 && n7!=0) if(jaki) return 1; else return -1;
	if(n2==n5 && n5==n8 && n8!=0) if(jaki) return 1; else return -1;
	if(n3==n6 && n6==n9 && n9!=0) if(jaki) return 1; else return -1;
	
	if(n1==n5 && n5==n9 && n1!=0) if(jaki) return 1; else return -1;
	if(n3==n5 && n5==n7 && n7!=0) if(jaki) return 1; else return -1;

	if(n1!=0 && n2!=0 && n3!=0 && n4!=0 && n5!=0 && n6!=0 && n7!=0 && n8!=0 && n9!=0) return 0 ;
	
	var wyniki = new Array(10);
	var naj;
	if(!jaki) naj=-10; else naj=10;
	if(!jaki) for(var i=0;i<=9;i++) wyniki[i]=-2;
	else for(var i=0;i<=9;i++) wyniki[i]=2;
	
	if(n1==0) wyniki[1] = rek(n1,n2,n3,n4,n5,n6,n7,n8,n9, 1, !jaki) ;
	if(n2==0) wyniki[2] = rek(n1,n2,n3,n4,n5,n6,n7,n8,n9, 2, !jaki) ;
	if(n3==0) wyniki[3] = rek(n1,n2,n3,n4,n5,n6,n7,n8,n9, 3, !jaki) ;
	
	if(n4==0) wyniki[4] = rek(n1,n2,n3,n4,n5,n6,n7,n8,n9, 4, !jaki) ;
	if(n5==0) wyniki[5] = rek(n1,n2,n3,n4,n5,n6,n7,n8,n9, 5, !jaki) ;
	if(n6==0) wyniki[6] = rek(n1,n2,n3,n4,n5,n6,n7,n8,n9, 6, !jaki) ;
	
	if(n7==0) wyniki[7] = rek(n1,n2,n3,n4,n5,n6,n7,n8,n9, 7, !jaki) ;
	if(n8==0) wyniki[8] = rek(n1,n2,n3,n4,n5,n6,n7,n8,n9, 8, !jaki) ;
	if(n9==0) wyniki[9] = rek(n1,n2,n3,n4,n5,n6,n7,n8,n9, 9, !jaki) ;
	
	for(var i=1;i<=9;i++) {
		if(!jaki && wyniki[i]>naj) naj = wyniki[i];
		else if(jaki && wyniki[i]<naj) naj = wyniki[i];
	}
	return naj;
	
}

function check(){
	if(tab[0]==tab[1] && tab[1]==tab[2] && tab[0]!=0) endGame(tab[0], 1);
	if(tab[3]==tab[4] && tab[4]==tab[5] && tab[5]!=0) endGame(tab[5], 2);
	if(tab[6]==tab[7] && tab[7]==tab[8] && tab[8]!=0) endGame(tab[8], 3);
	
	if(tab[0]==tab[3] && tab[3]==tab[6] && tab[0]!=0) endGame(tab[0], 4);
	if(tab[1]==tab[4] && tab[4]==tab[7] && tab[7]!=0) endGame(tab[7], 5);
	if(tab[2]==tab[5] && tab[5]==tab[8] && tab[8]!=0) endGame(tab[8], 6);
	
	if(tab[0]==tab[4] && tab[4]==tab[8] && tab[8]!=0) endGame(tab[8], 7);
	if(tab[2]==tab[4] && tab[4]==tab[6] && tab[6]!=0) endGame(tab[6], 8);
	if(ko()) endGame(0,0);
}

function ko(){
	for(var i=0;i<9;i++) if(tab[i]==0) return false;
	return true;
}

function endGame(nr, row){
	aktualny=false;
	end.play();
	if(nr==1) {
	document.getElementById("move").innerHTML = krzyzyk + " Won!";	
	l_krz++;
	
	}
	else if(nr==2) {
	document.getElementById("move").innerHTML = kolko + " Won!";	
	l_k++;
	
	}
	else {
	document.getElementById("move").innerHTML = "We have a draw!";	
	setTimeout("zm()",2000);
	setTimeout("zn()",2500);
	setTimeout("start()",2500);
	}
	if(nr==1||nr==2){
	for(var i=1;i<=9;i++) {document.getElementById('p'+i).style.cursor= "default"; document.getElementById('p'+i).setAttribute("onclick",";");}
	var color_r = "#0261fa";
	var color_s = "#09419c";
	if(row== 1 || row==4 || row==7) {document.getElementById("p" + 1).style.backgroundColor = color_r; document.getElementById("p" + 1).style.borderColor = color_s;}
	if(row== 1 || row==5 ) {document.getElementById("p" + 2).style.backgroundColor = color_r; document.getElementById("p" + 2).style.borderColor = color_s;}
	if(row== 1 || row==6 || row==8) {document.getElementById("p" + 3).style.backgroundColor = color_r; document.getElementById("p" + 3).style.borderColor = color_s;}
	
	if(row== 2 || row==4) {document.getElementById("p" + 4).style.backgroundColor = color_r; document.getElementById("p" + 4).style.borderColor = color_s;}
	if(row== 2 || row==5 || row==7 || row==8) {document.getElementById("p" + 5).style.backgroundColor = color_r; document.getElementById("p" + 5).style.borderColor = color_s;}
	if(row== 2 || row==6) {document.getElementById("p" + 6).style.backgroundColor = color_r; document.getElementById("p" + 6).style.borderColor = color_s;}
	
	if(row== 3 || row==4 || row==8) {document.getElementById("p" + 7).style.backgroundColor = color_r; document.getElementById("p" + 7).style.borderColor = color_s;}
	if(row== 3 || row==5) {document.getElementById("p" + 8).style.backgroundColor = color_r; document.getElementById("p" + 8).style.borderColor = color_s;}
	if(row== 3 || row==6 || row==7) {document.getElementById("p" + 9).style.backgroundColor = color_r; document.getElementById("p" + 9).style.borderColor = color_s;}
	setTimeout("zm()",2000);
	setTimeout("zn()",2500);
	setTimeout("start()", 2500);
	}
}

function zm(){
	$("#leftS").fadeOut(500);
	$("#point1").fadeOut(500);
	$("#point2").fadeOut(500);
}

function zn(){
	document.getElementById("point1").innerHTML = l_k;
	document.getElementById("point2").innerHTML = l_krz;
	$("#leftS").fadeIn(500);
	$("#point1").fadeIn(500);
	$("#point2").fadeIn(500);
}