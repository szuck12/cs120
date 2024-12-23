/*
    display_guess function is responsible for displaying each 5-letter
    guess visually in the Wordle board
*/
function display_guess() {

    // add letter to corresponding cell in Wordle grid in a guess
    Array.from(guess_object.guess).forEach((char, i) => {
        let cell = document.getElementById((guess_object.guess_count - 1) + "-" + i);
        cell.textContent = char;
    });

    // utilize check_guess to determine what letters are in the 
    // correct location, the wrong location, or not in the word at all
    guessed_correct = check_guess();

    // if statement to check if the user has lost the game
    if (guess_object.guess_count >= 6 && !guessed_correct) {

        console.log("Game Completed: User has failed to guess word correctly. " + 
                    "Displaying Game Over screen now.");

        // indicates the user has lost the game, and did not guess the word correctly
        guess_object.guess_count = "N";

        // add new cookie, and then analyze this cookie and all 
        // previous cookies
        lowercase_answer = guess_object.answer.toLowerCase()
        past_results = analyze_cookies(lowercase_answer);

        // share information about average score and past games,
        // using setTimeout to ensure guess shows visually first
        setTimeout(() => {

            console.log("Success: Cookies have been retrieved and analyzed, past " +
                        "games data will be displayed to user.");

            alert("Game Over! The correct answer was \"" + lowercase_answer + 
                    "\". It has taken you an average of " + past_results[0] + 
                    " guesses to guess the word correctly. You have been successful " +
                    "in guessing the word correctly within six guesses in " + 
                    past_results[1] + " out of " + past_results[2] + " games.");

            display_new_game();
        }, 100);
    }
}

/* 
    check_guess is responsible for comparing the guessed word to the answer, 
    and telling the user which letters are correct, in the wrong position or 
    not in the word at all
*/
function check_guess() {

    guess_object.incorrect_letters =  new Array(5).fill("");
    guess_object.missed_letters =  new Array(5).fill("");

    // colors correct letters green
    num_correct = green_letters();

    // enters if user has guessed the word correctly
    if (num_correct == 5) {

        adjust_letters_board();

        console.log("Game Completed: User has guessed word correctly. " + 
                    "Displaying winning screen now.");

        // add new cookie, and then analyze this cookie and all previous cookies
        lowercase_answer = guess_object.answer.toLowerCase()
        past_results = analyze_cookies(lowercase_answer);

        // share information about average score and past games, using setTimeout 
        // to ensure guess shows visually first
        setTimeout(() => {

            console.log("Success: Cookies have been retrieved and analyzed, past " +
                        "games data will be displayed to user.");

            alert("You win! It has taken you an average of " + past_results[0] + 
                " guesses to guess the word correctly. You have been successful " +
                "in guessing the word correctly within six guesses in " + 
                past_results[1] + " out of " + past_results[2] + " games.");

            display_new_game();
        }, 100);

        return true;
    }

    // determine if non-correct letters should be yellow or gray
    other_letters();
    
    // responsible for changing colors of letters on keyboard
    adjust_letters_board();

    console.log("Success: Changes to Wordle Board and Used Letters Board have " + 
                "been made after incorrect guess of " + guess_object.guess + ".");

    return false;
}

/* 
    green_letters determines which letters are correct and should
    be colored green
*/
function green_letters() {

    let num_correct = 0;

    // check each letter in guess, and determine if any are correct
    for (let i = 0; i < guess_object.guess.length; i++) {

        let cell = document.getElementById((guess_object.guess_count - 1) + "-" + i);

        // this means guess[i] is correct, and should be green
        if (guess_object.guess[i] == guess_object.answer[i]) {
            num_correct += 1;
            set_background_border("#008000", cell);
            guess_object.letters_result[guess_object.guess[i]] = "#008000";
        } else {
            // if not green, add to two arrays
            guess_object.incorrect_letters[i] = guess_object.guess[i];
            guess_object.missed_letters[i] = guess_object.answer[i];
        }
    }
    return num_correct;
}

/*  
    other_letters determines if letters should be yellow or gray
*/
function other_letters() {
    
    for (let j = 0; j < guess_object.incorrect_letters.length; j++) {
        if (guess_object.incorrect_letters[j] !== "") {
            // if letter should be yellow, color yellow and check
            // next letter
            if (yellow_letters(j)) {
                continue;
            }
            // otherwise, color letter gray
            gray_letters(j);
        }
    }
}

/*
    returns true if letter should be yellow, and false if it 
    should not be yellow
*/
function yellow_letters(j) {

    for (let k = 0; k < guess_object.missed_letters.length; k++) {
        // if any letters in missed_letters match with the current 
        // letter in incorrect_letters, color the letter yellow
        if (guess_object.missed_letters[k] == guess_object.incorrect_letters[j]) {
            let cell = document.getElementById((guess_object.guess_count - 1) + "-" + j);
            set_background_border("#FFF200", cell);
                    
            // if keyboard letters color needs to be changed,
            // adds key-value pair of letter and color to letters_result
            if (guess_object.letters_result[guess_object.incorrect_letters[j]] === undefined && 
                guess_object.incorrect_letters[j] !== "") {
                guess_object.letters_result[guess_object.incorrect_letters[j]] = "#FFF200";
            }

            // removed matched letters from arrays
            guess_object.missed_letters[k] = "";
            guess_object.incorrect_letters[j] = "";
            return true;
        }
    }
    // if no match is found
    return false;
}

/*
    gray_letters colors letters gray that are not in the word at all
*/
function gray_letters(j) {

    // if incorrect letter at index j has no matching letter
    // in missing_letters array, then this letter should be gray
    if (guess_object.incorrect_letters[j] !== "") {
        let cell = document.getElementById((guess_object.guess_count - 1) + "-" + j);
        set_background_border("#808080", cell);

        // if keyboard letters color needs to be changed,
        // adds key-value pair of letter and color to letters_result
        if (guess_object.letters_result[guess_object.incorrect_letters[j]] == undefined) {
            guess_object.letters_result[guess_object.incorrect_letters[j]] = "#808080";
        }
    }
}

/* 
    adjust_letters_board function is responsible for changing the 
    color of letters in the used letter board
*/
function adjust_letters_board() {

    // holds keyboard order of letters
    let string = "QWERTYUIOPASDFGHJKLZXCVBNM";

    // determine if each letter in letters_result should be changed to a different
    // color in the used letter board, and if so, change it
    Object.entries(guess_object.letters_result).forEach(([key, value]) => {

        for (let i = 0; i < string.length; i++) {

            if (string[i] == key) {

                let letter_id = "letters-cell-" + i;
                let cell = document.getElementById(letter_id);

                // get background color of cell, after all changes to its color have been made
                let background_color = window.getComputedStyle(cell).backgroundColor;

                // determines if color of letter should be changed,
                // and if so, changes it
                if (background_color =  "rgba(0, 0, 0, 0)" || "rgb(128, 128, 128)" ||
                                        "rgb(211, 211, 211)" || "rgb(255, 242, 0)") {
                    
                    set_background_border(value, cell);
                                        
                } else if (background_color = "rgb(0, 255, 0)" && value == "#008000") {

                    set_background_border(value, cell);

                }
            }
        }
    });
}

/*
    reset_board is responsible for resetting the cells in the Wordle
    board and the used letters board when a new game is started
*/
function reset_board() {

    // reset the background, border and text at each cell in the 
    // Wordle board
    for (let row = 0; row <= 5; row++) {
        for (let column = 0; column <= 4; column++) {
            let cell = document.getElementById(row + "-" + column);
            cell.style.backgroundColor = "white";
            cell.style.borderColor = "#D3D3D3";
            cell.textContent = "";
        }
    }

    // reset used letters board
    for (let i = 0; i < 26; i++) {
        let cell = document.getElementById("letters-cell-" + i)
        cell.style.backgroundColor = "#D3D3D3";
    }

    console.log("Success: World Board has been reset.")
}

/*
    reset_guess_object is responsible for reinitializing all variables in
    guess_object in preparation for a new game of Wordle to be played
*/
function reset_guess_object() {

    guess_object.answer = "";
    guess_object.guess = "";
    guess_object.guess_count = 0;
    guess_object.incorrect_letters = new Array(5).fill("");
    guess_object.missed_letters = new Array(5).fill("");
    guess_object.letters_result = new Object();
    guess_object.has_reset = true;

}