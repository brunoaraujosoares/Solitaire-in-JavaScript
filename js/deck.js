function build_deck(){ // create one deck of cards
	var suit   = ['&spades;','&hearts;','&clubs;','&diams;'];
	var	faces  = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
	var cartas = [];
	for(i = 0; i < suit.length ; i++){ for(z = 0; z < faces.length ; z++){ cartas.push(suit[i]+","+faces[z]); } }
	return cartas;
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