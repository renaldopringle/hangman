/*********************************************************************************************************************
This file contains all the backend features needed to make the game function.

Workflow:
1. The game master enters the word that the victim must guess correctly.
*2. The game master is prompt to enter the number of hints he wishes to give the victim.
3. The hints are entered by the game master.
4. The victim must guess the word or he will be hanged.
5. If a letter is correct, then it cannot be entered again.
6. If a letter is incorrect, then the hangman will be drawn until it is complete.
/********************************************************************************************************************/

$(document).ready(function() {
	var word = document.getElementById("word");
	var wordenter = document.getElementById("word-enter");
	var hint = document.getElementById("hint");
	var res = document.getElementById("result");
	
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
	
	lettercheck = function(l) {
		if (wordval.indexOf(l) !== -1) {
			//letter not found in word
			return false;
		} else {
			//letter found in word
			return true;
		}
	};
	
	collectguess = function(guessval) {
		if (guessval.length > 1 && guessval === wordval) {
			//You guessed it
		} else {
			if (lettercheck(guessval)) {
				//guess is correct
			} else {
				//guess is wrong
			}
		}
	};
	
	$("input[type='button']").click(function() {
		$("#head").attr("class","st0 toggle");
		$("#torso").attr("class","st0 toggle");
		$("#left-arm").attr("class","st0 toggle");
		$("#right-arm").attr("class","st0 toggle");
		$("#left-leg").attr("class","st0 toggle");
		$("#right-leg").attr("class","st0 toggle");
	});

	
	
	/******************************************** Other Stuff *********************************************************/
	function stickyfoo() {
        var height = window.innerHeight;
        var minheight = height - 174;
        console.log(height);
        $('#container').css("min-height", minheight + "px");
        console.log($('#container').css("min-height"));
    }
    stickyfoo();
});