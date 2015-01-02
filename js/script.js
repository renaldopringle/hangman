/*********************************************************************************************************************
This file contains all the backend features needed to make the game function.

Workflow:
1. The game master enters the word that the victim must guess correctly.
3. The game master is prompt to enter the number of hints he wishes to give the victim.
4. The hints are entered by the game master.
5. The victim must guess the word or he will be hanged.
6. If a letter is correct, then it cannot be entered again.
7. If a letter is incorrect, then the hangman will be drawn until it is complete.
/********************************************************************************************************************/

$(document).ready(function() {
	$('input[type="button"]').innerHTML = "Hello :)";
});