function build_deck(){ // create one deck of cards
	var suit   = ['&spades;','&hearts;','&clubs;','&diams;'];
	var	faces  = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
	var cartas = [];
	for(i = 0; i < suit.length ; i++){ for(z = 0; z < faces.length ; z++){ cartas.push(suit[i]+","+faces[z]); } }
	return cartas;
} // end build_deck

function shuffle_deck(array) { // embaralha as cartas
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
} // end shuffle_deck
