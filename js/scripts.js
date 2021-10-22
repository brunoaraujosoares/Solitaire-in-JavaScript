/* scripts.js
 * Funções do jogo Paciência Beta
 * @author: Bruno Araujo - brunoaraujosoares@gmail.com
 * Criado em: 13/02/2020
 */

 
 // BUG na função de comparar quando reinicia o cava 
 // BUG quando solta uma carta do repositório no repositório
 // BUG zindex quando manda quando solta uma carta do deposito dos naipes
 
 // criar função com desfazer de até 3 níveis
 
 //  carregar as cartas abaixo da atual nas colunas
 
 
function constroiBaralho(){ // cria as cartas
	var naipes = ['&spades;','&hearts;','&clubs;','&diams;'];
	var	faces  = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
	var cartas = [];

	for(i = 0; i < naipes.length ; i++){
		for(z = 0; z < faces.length ; z++){
			cartas.push(naipes[i]+","+faces[z])
		}
	}
	return cartas;
} // FIM constroiBaralho

function embaralha(array) { // embaralha as cartas
	var m = array.length, t, i;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);
		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
} // FIM DE embaralha

function destroiBaralho(){
	lista = [
			'coluna1',
			'coluna2',
			'coluna3',
			'coluna4',
			'coluna5',
			'coluna6',
			'coluna7',
			'repositorio',
			'dispositorio',
			'deposito1',
			'deposito2',
			'deposito3',
			'deposito4'
		];
	for( i = 0; i < lista.length ; i++){
		if (lista[i] != 'dispositorio'){
			document.getElementById(lista[i]).innerHTML = ''
		} else {
			document.getElementById(lista[i]).innerHTML = '<div id="carta_vazia" onclick="reiniciaCava()" class="lightgreen">X</div>'
		}
	}
			
}


function exibeCartas(){
	destroiBaralho()
	var cartas = embaralha(constroiBaralho());
	var mesa = document.getElementById("mesa");
	var coluna1 = document.getElementById("coluna1");
	var coluna2 = document.getElementById("coluna2");
	var coluna3 = document.getElementById("coluna3");
	var coluna4 = document.getElementById("coluna4");
	var coluna5 = document.getElementById("coluna5");
	var coluna6 = document.getElementById("coluna6");
	var coluna7 = document.getElementById("coluna7");
	var carta_vazia = document.getElementById("carta_vazia");
	carta_vazia.innerHTML = "0";
	
	for (i = 0; i < cartas.length ; i++){
		var carta = document.createElement('div')
		carta.style.zIndex = i;
		
		var hgroup = document.createElement('hgroup') // container para o naipe e o valor da carta
		var naipe = document.createElement('h2') // naipe da carta
		var face  = document.createElement('h3') // valor da carta
		var desenho = document.createElement('div') // quantidade de imagens do naipe

		// coloca a classe red ou black, a depender do naipe, para o "texto" ficar vermelho ou preto a depender do naipe
		if (cartas[i].indexOf('&hearts;') != -1 || cartas[i].indexOf('&diams;') != -1 ) { classe = 'red' }
		else {classe = 'black' }
		
		// constroi a carta
		carta_atual = cartas[i].split(',')
		face.innerHTML = carta_atual[1];
		hgroup.appendChild(face)
		naipe.innerHTML = carta_atual[0];
		hgroup.appendChild(naipe)
		carta.appendChild(hgroup)
		desenho.className = "desenho"
		
		if (!isNaN(carta_atual[1])){ // preenche o número de figuras da carta no corpo da carta
			for( z = 0 ; z < carta_atual[1]; z++){
				desenho.innerHTML += carta_atual[0] + " "
			}
		} else {
				desenho.innerHTML += carta_atual[1]
		}
		
		carta.appendChild(desenho)
		
		// define as cartas que ficam com as faces viradas para o jogador
		if(i == 6 || i == 12 || i == 17 || i == 21 || i == 24 ||i == 26 || i == 27   ){
			carta.className = "carta " + classe
			carta.setAttribute("draggable", "true"); // permite arrastar a carta		
		} else { carta.className = "carta " + classe + " virada" ; }
		
		// coloca a carta na mesa
		carta.setAttribute("id", "c_"+i)
		if( i > 27) {
			dispositorio.appendChild(carta) // o cava
		} else {

		// define as posições das cartas nas colunas
		
			if (i < 7) { // posiciona as cartas da sétima coluna
				
				carta.style.marginTop = i * 10 + 'px'
				coluna7.appendChild(carta); 
			}
			if (i > 6 && i < 13) { // posiciona as cartas da sexta fileira
				carta.style.marginTop = (i - 7) * 10 + 'px'
				coluna6.appendChild(carta); 
			}
			if (i > 12 && i < 18) { // posiciona as cartas da quinta fileira
				carta.style.marginTop = (i - 13) * 10 + 'px'
				coluna5.appendChild(carta); 
			}
			if (i > 17 && i < 22) { // posiciona as cartas da quarta fileira
				carta.style.marginTop = (i - 18) * 10 + 'px'
				coluna4.appendChild(carta); 
			}
			if (i > 21 && i < 25) { // posiciona as cartas da terceira fileira
				carta.style.marginTop = (i - 22) * 10 + 'px'
				coluna3.appendChild(carta); 
			}
			if (i > 24 && i < 27) { // posiciona as cartas da segunda fileira
				carta.style.marginTop = (i - 25) * 10 + 'px'
				coluna2.appendChild(carta); 
			}

			if (i > 26 && i < 28) { // posiciona as cartas da primeira fileira
				carta.style.marginTop = (i - 27) * 10 + 'px'
				coluna1.appendChild(carta); 
			}			
		}
		
		carta.onclick = function(){

			// se estiver embaixo de outra carta com a face para cima não vira
			//if((parseInt(this.style.zIndex) < parseInt(this.parentElement.lastChild.style.zIndex)) & this.className.indexOf('virada') != -1) {			
			if(parseInt(this.style.zIndex) < parseInt(this.parentElement.lastChild.style.zIndex)) {
				return;
			}
			
			if(this.classList.contains('virada')){  // faz virar a carta com a face voltada para a mesa quando clica sobre ela
				this.className = this.className.substr(0,this.className.indexOf(' virada'));
				this.setAttribute("draggable", "true");	// permite arrastar a carta	
			}
			
			// se estiver no "cava" vai para o lado
			if(this.parentElement.id == "dispositorio"){
				repositorio = document.getElementById("repositorio")
				quantas_tem = repositorio.childElementCount // pega o ultimo div
				this.style.zIndex = quantas_tem
				repositorio.appendChild(this)
			}
		
		}
		
		carta.ondragstart=  function (){ drag(event) }
	}

	var cols = document.querySelectorAll('.carta');
	[].forEach.call(cols, function(col) {
		col.addEventListener('dragstart', handleDragStart, false);
		
	});
}

function reiniciaCava(){

	var disp = document.getElementById("dispositorio")
	var rep  = document.getElementById("repositorio")
	
/*
  <div id="dispositorio"><div id="carta_vazia" onclick="reiniciaCava()" class="lightgreen">X</div></div>
  <div id="repositorio"></div>
 */	
 
	disp.innerHTML = rep.innerHTML
	rep.innerHTML = "";
		
	for (z = 0; z < disp.childNodes.length ; z++){
		disp.childNodes[z].className += " virada"
		disp.childNodes[z].style.zIndex = disp.childNodes.length - z
		disp.childNodes[z].setAttribute("draggable", "false")
		disp.childNodes[z].onclick = function (){ 
			
			if(this.classList.contains('virada')){ 
				this.className = this.className.substr(0,this.className.indexOf(' virada'));
				this.setAttribute("draggable", "true");	// permite arrastar a carta	
			}
			
			if(document.getElementById(this.id).parentElement.id == "dispositorio"){
				repositorio = document.getElementById("repositorio")
				quantas_tem = repositorio.childElementCount // pega o ultimo div
				this.style.zIndex = quantas_tem
				repositorio.appendChild(this)
			}
		}
		disp.childNodes[z].ondragstart=  function (){ drag(event) }
	}	
}

function handleDragStart(e) {
  
  //this.style.opacity = '0.4';  // this / e.target is the source node.
  
}

/*
var cols = document.querySelectorAll('.carta');
[].forEach.call(cols, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
});
*/

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("Text", ev.target.id);
  var conteudo = document.getElementById(ev.target.id).parentElement
  var filhas = []

   // Transporta as cartas para a coluna  
  if(conteudo.id.indexOf("coluna") != -1)   {
	// testa se existem divs com zIndex maior que a carta selecionada
    for ( cartas = 0; cartas < conteudo.childNodes.length; cartas++){
	    if(conteudo.childNodes[cartas].style.zIndex > ev.target.style.zIndex ){
          filhas .push(conteudo.childNodes[cartas])        
		}
	}
    if (filhas.length > 0 ){
		// cria uma div para carregar as cartas que estão abaixo da arrastada
		var novadiv = document.createElement('div')
		novadiv.style.marginTop="10px"
		novadiv.style.border="1px solid #000000"
		novadiv.style.position="absolute"
		novadiv.style.position="absolute"
		novadiv.style.zIndex = conteudo.style.zIndex + 1 + "px"			
		ev.target.appendChild(novadiv)
		//alert(filhas.length + " \n" + ev.target.innerHTML)
		
	}
  } 
}

function valorCarta(carta){ // bug quando reinicia o cava
  //alert(carta.innerHTML)
  if(carta.childNodes[1].innerHTML == "A"){
	  valorcarta = 1;
  } else if(carta.childNodes[1].innerHTML == "J") {
	  valorcarta = 11;
  } else if(carta.childNodes[1].innerHTML == "Q") {
	  valorcarta = 12;
  } else if(carta.childNodes[1].innerHTML == "K") {
	  valorcarta = 13;
  } else {
	  valorcarta = parseInt(carta.childNodes[0].childNodes[0].innerHTML);
  }
  return valorcarta;
}

function drop(ev,repositorio) {
  var erro = '';
  var data = ev.dataTransfer.getData("Text");
  var carta = document.getElementById(data)
  
  var valorcarta = valorCarta(carta);
  marginTopAntes = carta.style.marginTop
  carta.style.marginTop = "0px"
  
  var movimento = true // verifica se o movimento é possível para exibir a mensagem.
  
  if(repositorio.id.indexOf('deposito') != -1){ // coloca cartas nos depositos dos naipes 
	if(repositorio.childNodes.length == 0) { // o repositorio tem que  ser preenchido primeir com uma carta ás de qualquer naipe  
	  if(valorcarta != 1) { // pega o conteudo do h3 e testa se é uma carta ÁS
		movimento = false;
	  }
	} else { 
	  if(repositorio.childNodes[0].childNodes[0].childNodes[1].innerHTML != carta.childNodes[0].childNodes[1].innerHTML){
		movimento = false;	
	  }
	  valorCartaAnterior = valorCarta(repositorio.lastChild)
	  if(valorcarta != (valorCartaAnterior + 1)){
		movimento = false;	
	  }
	}
  }
  
  if(repositorio.id.indexOf('coluna') != -1){ // coloca as cartas na coluna
    //alert(repositorio.childNodes.length)
	if(repositorio.childNodes.length == 0 & valorcarta !=13) {  // se a coluna estiver vazia, só pode aceitar o Rei
		erro = 'A primeira carta de uma coluna deve ser necessariamente um Rei!';
		movimento = false;
	} 
	if(repositorio.childNodes.length != 0) {
	  valorCartaAnterior = valorCarta(repositorio.lastChild);
	  classeCarta = carta.className;
	  classeCartaAnterior = repositorio.lastChild.className;
	  
	   if ( classeCartaAnterior.indexOf(" virada") != -1 ) {
		erro = "Não é possível colocar uma carta sobre outra carta virada!";
		movimento = false;			
      }
	  else if( valorcarta !=  parseInt(valorCartaAnterior - 1)) {
		erro = "A próxima carta da coluna deve ter valor inferior!";
		movimento = false;	
	  }  else if ( classeCartaAnterior == classeCarta ) {
		erro = "A próxima carta da coluna deve ter uma cor diferente!";
		movimento = false;			
	  } else {
				
		carta.style.marginTop = parseInt(repositorio.lastChild.style.marginTop.substr(0,repositorio.lastChild.style.marginTop.indexOf('p'))) + 25 + 'px';
		carta.style.zIndex = parseInt(repositorio.lastChild.style.zIndex) + 1;
	    // muda o zIndex para o anterior + 1
        // muda a o margin-top para o anterior mais 10
	  }
	}
	
  }

  if(movimento == false) {
	  alert('Movimento não permitido! \n' + erro);
      carta.style.marginTop = marginTopAntes
	  return;
  }
  
  carta.style.position = 'absolute'
  repositorio.appendChild(carta);
  ev.preventDefault();
}
