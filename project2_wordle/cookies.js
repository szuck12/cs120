/*
    get_cookies grabs all cookies from past Wordle games, and returns
    them so that the cookies can be analyzed later
*/
function get_cookies() {

    const cookies = document.cookie.split(";");
    const all_cookies = [];
    
    // add value of each cookies to all_cookies;
    cookies.forEach(cookie => {
        const [name, value] = cookie.split("=");
    
        all_cookies.push(decodeURIComponent(value.trim()));
    })

    return all_cookies;
}
    
/*
    delete_cookies is responsible for deleting a cookie by its name. This function 
    was only used when testing that cookies save correctly over multiple browser sessions
*/
function delete_cookie(name) {
    
    // set an expiration date that has already occurred
    const past_expiration = "expires=Sat, 01 Jan 2000 00:00:00 UTC";
    
    let past_cookie = name + "; " + past_expiration + "; path=/";
    
    // overwrite cookie with an expired date
    document.cookie = past_cookie;
}

/*
    analyze_cookies completes a series of steps after the end of a
    Wordle game. It adds a new cookie from the previous Wordle game,
    grabs all cookies, and then computes some information about 
    previous Wordle games the user has played
*/
function analyze_cookies(cookie_name) {

    // create new cookie for most recent Wordle game
    create_cookie(cookie_name, 100);

    // grab all cookies
    all_cookies = get_cookies();

    num_cookies = all_cookies.length;

    let num_guesses = ["1", "2", "3", "4", "5", "6"];

    // calculate information based on cookies
    let successful_games = all_cookies.filter(cookie => num_guesses.includes(cookie));
    let failed_games = all_cookies.filter(cookie => cookie === "N");
    let total_games = successful_games.length + failed_games.length;

    // calculate average number of guesses
    let sum = successful_games.reduce((curr_sum, string) => curr_sum + Number(string), 0);
    let average = (sum / successful_games.length).toFixed(2);

    // returns information that will be displayed to user
    return [average, successful_games.length, total_games];
}

/*
    create_cookie creates a new cookie after a game has been
    completed. The value saved in the cookie is the number of guesses
    it took for the user to guess to word, or "N" if the user failed
    to guess it
*/
function create_cookie(name, days) {

    let expiration = "";

    // set date of expiration
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 3600 * 1000);
        expiration = date.toUTCString();
    }

    // create cookie with necessary parameters
    document.cookie = name + "=" + guess_object.guess_count + "; expires=" + 
                        expiration + "; path=/";
}