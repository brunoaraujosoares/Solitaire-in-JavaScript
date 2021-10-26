/* scripts.js
 * Funções do jogo Paciência Beta
 * @author: Bruno Araujo - brunoaraujosoares@gmail.com
 * Criado em: 13/02/2020
 */
 
// bug when drag more than one card
// bug when turns the pile: undo stops working
// add points
// add time
// make double click function works

/* undo variables */
var card_variables  = [] // card that goes back to the original position
						 // variables: id, className, zIndex, marginTop, parendNode.id

function undo(card){
	if(card_variables.length > 0 ){
		//console.log(undo_vars)
		undo_vars = card_variables[card_variables.length-1]
		undo_card = document.getElementById(undo_vars[0])
		undo_card.parentNode.removeChild(undo_card)
		undo_card.className       = undo_vars[1]
		undo_card.style.zIndex    = undo_vars[2]
		undo_card.style.marginTop = undo_vars[3]
		old_repository = old_repository = document.getElementById(undo_vars[4])
		old_repository.appendChild(undo_card)
		card_variables.pop(); // removes the last undo variables
	}	
} // end of undo

/*
function send_to_deck_deposit(card){
	console.log(card.id)
	deposit = document.getElementById('deposits').getElementsByTagName("div")
	for (i = 0 ; i < deposit.length ; i++){
		console.log(i)
	}
	console.log(deposits.getElementsByTagName("div").length)
	/* variables to undo function * /
	card_variables.push([
		card.id,
		card.className,
		card.style.zIndex,
		card.style.marginTop,
		card.parentElement.id
	]);
/*	
	if(repositorio.childNodes.length == 0) {  // deposit is empty
		
		// first card must be an Ace
		if(valorcarta != 1) { 
			movimento = false; 
			erro = 'First card must be an ACE!'
		} else { // add card to deposit
			carta.style.zIndex = 0;
			repositorio.appendChild(carta);
			ev.preventDefault();
			return;
		}
		
	} else { // if deposit is not empty
		if(repositorio.childNodes[0].childNodes[0].childNodes[1].innerHTML != carta.childNodes[0].childNodes[1].innerHTML){
			movimento = false;	
		}
		
		valorCartaAnterior = get_card_value(repositorio.lastChild)
		if(valorcarta != (valorCartaAnterior + 1)){
			movimento = false;	
		}
		
		if( movimento === true) { // add card to deposit
			carta.style.zIndex = parseInt(repositorio.lastChild.style.zIndex) + 1;
			repositorio.appendChild(carta);
			ev.preventDefault();
			return;
		}
	}
* /	
} */

function destroy_deck(){ // to refactor !!!
	var card_variables  = [] // reset variables to undo
	list = [
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
	for( i = 0; i < list.length ; i++){
		if (list[i] != 'dispositorio'){
			document.getElementById(list[i]).innerHTML = ''
		} else {
			document.getElementById(list[i]).innerHTML = '<div id="carta_vazia" onclick="reset_pile()" class="lightgreen">X</div>'
		}
	}	
}

function start_game(){
	destroy_deck()
	var cartas = shuffle_deck(build_deck());
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

		// set className "red" or "black", depending on card suit, so card text will be red or black.
		if (cartas[i].indexOf('&hearts;') != -1 || cartas[i].indexOf('&diams;') != -1 ) { classe = 'red' }
		else {classe = 'black' }
		
		// build card
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
			dispositorio.appendChild(carta) // the pile
		} else {

		// define as posições das cartas nas colunas
		    distance = 25
		
			if (i < 7) { // posiciona as cartas da sétima coluna
				
				carta.style.marginTop = i * distance + 'px'
				coluna7.appendChild(carta); 
			}
			if (i > 6 && i < 13) { // posiciona as cartas da sexta fileira
				carta.style.marginTop = (i - 7) * distance + 'px'
				coluna6.appendChild(carta); 
			}
			if (i > 12 && i < 18) { // posiciona as cartas da quinta fileira
				carta.style.marginTop = (i - 13) * distance + 'px'
				coluna5.appendChild(carta); 
			}
			if (i > 17 && i < 22) { // posiciona as cartas da quarta fileira
				carta.style.marginTop = (i - 18) * distance + 'px'
				coluna4.appendChild(carta); 
			}
			if (i > 21 && i < 25) { // posiciona as cartas da terceira fileira
				carta.style.marginTop = (i - 22) * distance + 'px'
				coluna3.appendChild(carta); 
			}
			if (i > 24 && i < 27) { // posiciona as cartas da segunda fileira
				carta.style.marginTop = (i - 25) * distance + 'px'
				coluna2.appendChild(carta); 
			}

			if (i > 26 && i < 28) { // posiciona as cartas da primeira fileira
				carta.style.marginTop = (i - 27) * distance + 'px'
				coluna1.appendChild(carta); 
			}			
		}
		
		carta.onclick = function(){ click_card(this) }
		
		carta.ondragstart = function (){ 
			drag(event)
			/* variables to undo function */
			card_variables.push([
				this.id,
				this.className,
				this.style.zIndex,
				this.style.marginTop,
				this.parentElement.id
			]);
		}
		
		// carta.ondblclick = function() { send_to_deck_deposit(this) };  
	}
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) { // bug when drag one or more than three cards
	ev.dataTransfer.setData("Text", ev.target.id);

	column = document.getElementById(ev.target.id).parentElement
	// check to see if the card is in a Tableau column 
	if (column.id.indexOf('coluna') != -1){	
		
		// get actual card
		card = document.getElementById(ev.target.id)
		// get cards with zIndex greater than the actual card
		temp_div = document.createElement('div')
		temp_div.id = 'temp_div'
		temp_div.style.margin = '0px'
		temp_div.style.padding = '0px'
		temp_div.style.position = 'absolute'
		temp_div.style.top = '0px'
		temp_div.style.left = '0px'
		
		card_list = []
		for (cards = 0; cards < column.childNodes.length ; cards++) {
			// console.log(column.childNodes[cards])
			if(column.childNodes[cards] != 'undefined'){
				if(parseInt(card.style.zIndex) <  + parseInt(column.childNodes[cards].style.zIndex)){
					temp_div.appendChild(column.childNodes[cards])
					
				}
			}
		}
		// console.log(card_list.length)
		if(card_list.length > 0){ 
			card.appendChild(temp_div)
		}
	}
}

function drop(ev,repositorio) {
	var erro = '';
	var data = ev.dataTransfer.getData("Text");
	var carta = document.getElementById(data);
	var valorcarta = get_card_value(carta);
	marginTopAntes = carta.style.marginTop;
	carta.style.marginTop = "0px";
  
	var movimento = true // verifica se o movimento é possível para exibir a mensagem.
      
	if(repositorio.id.indexOf('deposito') != -1){ // if the card is moved to suit deposit
		if(repositorio.childNodes.length == 0) {  // deposit is empty
			
			// first card must be an Ace
			if(valorcarta != 1) { 
				movimento = false; 
				erro = 'First card must be an ACE!'
			} else { // add card to deposit
				carta.style.zIndex = 0;
				repositorio.appendChild(carta);
				ev.preventDefault();
				return;
			}
			
		} else { // if deposit is not empty
			if(repositorio.childNodes[0].childNodes[0].childNodes[1].innerHTML != carta.childNodes[0].childNodes[1].innerHTML){
				movimento = false;	
			}
			
			valorCartaAnterior = get_card_value(repositorio.lastChild)
			if(valorcarta != (valorCartaAnterior + 1)){
				movimento = false;	
			}
			
			if( movimento === true) { // add card to deposit
				carta.style.zIndex = parseInt(repositorio.lastChild.style.zIndex) + 1;
				repositorio.appendChild(carta);
				ev.preventDefault();
				return;
			}
		}
	} 
  
	if(repositorio.id.indexOf('coluna') != -1){ // coloca as cartas na coluna
		if(repositorio.childNodes.length == 0 & valorcarta !=13) {  // se a coluna estiver vazia, só pode aceitar o Rei
			erro = 'A primeira carta de uma coluna deve ser necessariamente um Rei!';
			movimento = false;
		}
		if(repositorio.childNodes.length != 0) {
			valorCartaAnterior = get_card_value(repositorio.lastChild);
			classeCarta = carta.className;
			classeCartaAnterior = repositorio.lastChild.className;
	  
			if ( classeCartaAnterior.indexOf(" virada") != -1 ) {
				erro = "Não é possível colocar uma carta sobre outra carta virada!";
				movimento = false;			
			}
			else if( valorcarta !=  parseInt(valorCartaAnterior - 1)) {
				erro = "A próxima carta da coluna deve ter valor inferior!";
				movimento = false;	
			} 
			else if ( classeCartaAnterior == classeCarta ) {
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
		alert('Movement not allowed! \n' + erro);
		carta.style.marginTop = marginTopAntes
		return;
	}
  
	carta.style.position = 'absolute'
	repositorio.appendChild(carta);
	ev.preventDefault();
	
	
	/* Remove temp div after moving the cards */
	temp_div = document.getElementById("temp_div");
	if (temp_div){  
		for (card = 0 ; card < temp_div.childElementCount; card++) {
			temp_div.childNodes[card].style.marginTop = parseInt(repositorio.lastChild.style.marginTop.substr(0,repositorio.lastChild.style.marginTop.indexOf('p'))) + 30 + 'px';
			temp_div.childNodes[card].style.zIndex = parseInt(repositorio.lastChild.style.zIndex) + 1;
			repositorio.appendChild(temp_div.childNodes[card])
		}
		document.getElementById(temp_div.parentElement.id).removeChild(temp_div)  
	}
}

function click_card(card){
	// se estiver embaixo de outra carta com a face para cima não vira
	if(parseInt(card.style.zIndex) < parseInt(card.parentElement.lastChild.style.zIndex)) {
		return;
	} else {

		if(card.classList.contains('virada')){  // faz virar a carta com a face voltada para a mesa quando clica sobre ela
			classNameBefore = card.className
			card.className = card.className.substr(0,card.className.indexOf(' virada'));
			card.setAttribute("draggable", "true");	// permite arrastar a carta	
			
			/* variables to undo function */
			card_variables.push([
				card.id,
				classNameBefore,
				card.style.zIndex,
				card.style.marginTop,
				card.parentElement.id
			]);
		}
		
		// if the card is in the pile , goes to de side pile
		if(card.parentElement.id == "dispositorio"){
			repositorio = document.getElementById("repositorio")
			quantas_tem = repositorio.childElementCount // pega o ultimo div
			card.style.zIndex = quantas_tem
			repositorio.appendChild(card)

		}
	}	
}