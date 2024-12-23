/*
    get_random_word is an asynchronous function responsible for calling
    the free word API, and grabbing the 5-letter word that the API provides,
    which will be used as the Wordle word for the next Wordle game
*/
async function get_random_word() {

    try {
        // make API call
        const data = await $.ajax({
            url: 'https://random-word-api.vercel.app/api?words=1&length=5',
            method: 'GET'
        });

        // return 5-letter word
        return data[0];
    } catch (error) {

        // print error message if there is an issue with retrieving 5-letter word
        console.error("Error: ", error);
        throw error;
    }
}

/*
    error_message is responsible for printing an error message, when
    the guess provided is not five letters long, or contains invalid characters
*/
function error_message(guess) {

    let error_message = document.getElementById('error-message');

    // fill error_message span with corresponding text, and color
    // text red
    error_message.textContent = "Your guess of \"" + guess + "\" is " +
                                "either not 5 letters long, or contains " +
                                "non-alphabetical characters. Please give " +
                                "a 5 letter word.";
    error_message.style.color = "red";

}

/*
    remove_error is a helper function responsible for removing an error message 
    once it is no longer needed
*/
function remove_error() {

    let error_message = document.getElementById('error-message');
    error_message.textContent = "";
}

/*
    set_background_color is a helper function used to set the color of the 
    background and border of a cell
*/
function set_background_border(color, cell) {

    cell.style.backgroundColor = color;
    cell.style.borderColor = color;

}

/*
    display_new_game takes no parameters and makes the "new game" button visible
*/
function display_new_game() {

    document.getElementById("new-game").style.visibility = "visible";

}
