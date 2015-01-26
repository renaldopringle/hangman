/*********************************************************************************************************************
This file contains all the backend features needed to make the game function.

Workflow:
1. The game master enters the word that the victim must guess correctly.
*2. The game master is prompt to enter the number of hints he wishes to give the victim.
3. The hints are entered by the game master.
4. The victim must guess the word or he will be hanged.
5. If a letter is correct, then it cannot be entered again.
6. If a letter is incorrect, then the hangman will be drawn until it is complete.
7. After the game is completed, prompt the user to restart the game.
/********************************************************************************************************************/

$(document).ready(function() {
	var word = document.getElementById("word");
	var hint = document.getElementById("hint");
	var wordenter = document.getElementById("word-enter");
	var guess = document.getElementById("guess");
	var guessenter = document.getElementById("guess-enter");
	var res = document.getElementById("result");
	var title = document.getElementById("title");
	
	/******************************************** Hangman ***********************************************************/
	hangman = ['head','torso','left-arm','right-arm','left-leg','right-leg'];
	incorrectguess = [];
	correctguess = [];
	
	gmasterSubmit = function() {
		wordval = word.value;
		hintval = hint.value;
		if (wordval !== "" && wordval.length >= 3) {
			$("#game-master").css("display","none");
			$("#victim").css("display","block");
			document.getElementById("victim-hint").innerHTML = "Hint: " + hintval;
		} else {
			$("#word").css({"border-color":"rgba(255, 0, 0, 0.7)", "outline":"0"});
		}
	};
	
	$('#word-enter').click(function() {
		gmasterSubmit();
	});
	
	$("input[type='text']#word").keyup(function(e) {
		if (e.keyCode == 13) {
			gmasterSubmit();
		}
	});
	
	$("input[type='text']#hint").keyup(function(e) {
		if (e.keyCode == 13) {
			gmasterSubmit();
		}
	});
	
	victimSubmit = function() {
		var guessval = guess.value;
		if (guessval === "") {
			$("#guess").css({"border-color":"rgba(255, 0, 0, 0.7)", "outline":"0"});
		} else {
			collectguess(guessval);
			//reset guess
			resetGuess();
		}
	}
	
	resetGuess = function() {
		//reset
		guess.value = "";
		$("#guess").css({"border":"1px solid #113768", "outline":"0"});
	}
	
	$("#guess-enter").click(function() {
		victimSubmit();
	});
	
	$("input[type='text']#guess").keyup(function(e) {
		if (e.keyCode == 13) {
			victimSubmit();
		}
	});
	
	lettercheck = function(l) {						//FIX
		if (wordval.indexOf(l) !== -1) {
			//letter not found in word
			return true;
		} else {
			//letter found in word
			return false;
		}
	};
	
	collectguess = function(guessval) {
		if (guessval.length > 1 && guessval === wordval) {
			//You guessed it
			$('#victim').css({"display":"none"});
			title.innerHTML = ("You guessed it! :)");
			$('header').css({"color":"#00AEEF"});
		} else {
			if (lettercheck(guessval)) {
				//check if guess is already entered
				if (!duplicate(guessval)) {
					//guess is correct
					
					//add to correctguess array
					correctguess.push(guessval);
				} else {
					resetGuess();
				}
			} else {
				//guess is wrong
				
				//determine what body part should be drawn and take it out of the 'hangman' array
				var part = hangman.shift();
				//add to incorrectguess array
				incorrectguess.push(guessval);
				//draw body part
				$('#' + part).attr("class","st0 toggle");
				endgame();
			}
		}
	};
	
	duplicate = function(guessval) {
		for (var i = 0; i < correctguess.length; i++) {
			if (correctguess[i] === guessval) {
				return true;
			}
		}
		return false;
	}
	
	endgame = function() {
		if (hangman.length === 0) {
			//Game Over
			title.innerHTML = "Game Over";
			$('header').css({
				"background-color":"red",
				"color":"black"
			});
			$('#victim').css({"display":"none"})
		}
	}
	
	/*$("input[type='button']").click(function() {
		$("#head").attr("class","st0 toggle");
		$("#torso").attr("class","st0 toggle");
		$("#left-arm").attr("class","st0 toggle");
		$("#right-arm").attr("class","st0 toggle");
		$("#left-leg").attr("class","st0 toggle");
		$("#right-leg").attr("class","st0 toggle");
	});*/

	
	/******************************************** Other Stuff *********************************************************/
	stickyfoo = function() {
        var height = window.innerHeight;
        var minheight = height - 174;
        $('#container').css({"min-height" : minheight + "px"});
    }
    stickyfoo();
});