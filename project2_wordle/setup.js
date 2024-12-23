/*
    create_board function sets up the Wordle board before the start
    of each game, allowing for 6 guesses of 5-letter words
*/
function create_board() {

    // grab whole board
    const board_whole = document.getElementById('board-grid');

    for (let row = 0; row <= 5; row++) {
        // create a row in the board with class board-row
        const board_line = document.createElement('div');
        board_line.className = "board-row";

        for (let column = 0; column <= 4; column++) {
            // add five cells to each row in the board
            const board_cell = document.createElement('div');
            board_cell.classList = "board-letter " + row + "-" + column;
            board_cell.id = row + "-" + column;
            board_line.appendChild(board_cell);
        }
        // add newly created row to the board
        board_whole.appendChild(board_line);
    }

    console.log("Success: Wordle Board created.")
}

/*
    create_letter_options sets up the used letters board before each
    game. The used letters board is three rows, set up to mimic 
    the standard keyboard layout of letters
*/
async function create_letter_options() {

    // holds keyboard order of letters
    let string = "QWERTYUIOPASDFGHJKLZXCVBNM";

    // create each keyboard row of letters
    create_letter_row(string, 0, 10, 1);
    create_letter_row(string, 10, 19, 2);
    create_letter_row(string, 19, 26, 3);

    console.log("Success: Used Letters Board created.")
}   

/*
    create_letter_row creates one row of the used letters board,
    based on the provided inputs. Start and end determine which 
    letters in the string will be added to the row, so that the rows 
    mimic a standard keyboard layout correctly
*/
function create_letter_row(string, start, end, row_num) {

    let letters_row = document.getElementById("letter-row-" + row_num);

    // add required letters from string one by one as cells in the
    // current row
    for (let i = start; i < end; i++) {
        const letters_cell = document.createElement('div');

        letters_cell.classList = "letters-cell " + i;
        letters_cell.id = "letters-cell-" + i;
        letters_cell.textContent = string[i];

        // add new cell to the row
        letters_row.appendChild(letters_cell);
    }
}