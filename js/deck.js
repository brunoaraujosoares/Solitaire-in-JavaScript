function build_deck(){ // create one deck of cards
	suit   = ['&spades;','&hearts;','&clubs;','&diams;'];
	faces  = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
	cards = [];
	for(i = 0; i < suit.length ; i++){ for(z = 0; z < faces.length ; z++){ cards.push(suit[i]+","+faces[z]); } }
	return cards;
} // end build_deck

function shuffle_deck(array) {
	var m = array.length, t, i;
	while (m) { // while there are remaining elements to shuffle
		i = Math.floor(Math.random() * m--); // Pick a random remaining element
		// and swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
} // end shuffle_deck

function get_card_value(card){
	if(     card.childNodes[1].innerHTML == "A"){ card_value = 1; }
	else if(card.childNodes[1].innerHTML == "J"){ card_value = 11;}
	else if(card.childNodes[1].innerHTML == "Q"){ card_value = 12;}
	else if(card.childNodes[1].innerHTML == "K"){ card_value = 13;}
	else { card_value = parseInt(card.childNodes[0].childNodes[0].innerHTML); }
	return card_value;
} // end get_card_value

function reset_pile(){
	disp = document.getElementById("dispositorio")
	rep  = document.getElementById("repositorio")
 	disp.innerHTML = rep.innerHTML
	rep.innerHTML = "";
		
	for (z = 0; z < disp.childNodes.length ; z++){
		disp.childNodes[z].className += " virada"
		disp.childNodes[z].style.zIndex = disp.childNodes.length - z
		disp.childNodes[z].setAttribute("draggable", "false")
		disp.childNodes[z].onclick = function(){ click_card(this) }
		disp.childNodes[z].ondragstart=  function (){ drag(event) }
	}

	carta_vazia = document.createElement('div');
	carta_vazia.innerHTML = '0'
	carta_vazia.className  = "lightgreen"
	carta_vazia.id = 'carta_vazia';
	carta_vazia.onclick = function() { reset_pile();}
	disp.appendChild(carta_vazia)	
} // end reset_pile