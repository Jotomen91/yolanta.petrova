// number of rows
const rows = parseInt(prompt("Please enter the count of rows:", "40"));
// number or columns
const cols = parseInt(prompt("Please enter the count of columns:", "40"));

// current generation
let current_generation = [rows];
// next generation
let next_generation = [rows];

// set to true when user starts the game
let is_game_started = false;

// timer to control evolving
let timer;

// evolving speed
let speed = 1000;

// Create current and next generation arrays
function createGenerationArrays() {
    for (let i = 0; i < rows; i++) {
        current_generation[i] = new Array(cols);
        next_generation[i] = new Array(cols);
    }
}

// Init current and next generation arrays
function initGenerationArrays() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            current_generation[i][j] = 0;
            next_generation[i][j] = 0;
        }
    }
}

// Create Game world
function createGameWorld() {
    let game_world = document.querySelector('#game-world');

    // create table
    let tbl = document.createElement('table');
    tbl.setAttribute('id', 'game-table');

    // create rows and columns for the table
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', i + '-' + j);

            // set all cells to be dead at first
            cell.setAttribute('class', 'dead-cell');

            // add event listener to cell
            cell.addEventListener('click', singleCellClick);

            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    game_world.appendChild(tbl);
}

// Make cell dead or alive
function singleCellClick() {
    let location = this.id.split("-");
    let row = Number(location[0]);
    let col = Number(location[1]);

    // make cell alive or dead
    if (this.className === 'alive-cell') {
        this.setAttribute('class', 'dead-cell');
        current_generation[row][col] = 0;
    } else {
        this.setAttribute('class', 'alive-cell');
        current_generation[row][col] = 1;
    }
}

// Calculate count of neighbours
function getNeighboursCount(row, col) {
    let count = 0;

    let num_rows = Number(row);
    let num_cols = Number(col);

    // not the first row
    if (num_rows - 1 >= 0) {
        // check the neighbour on top
        if (current_generation[num_rows - 1][num_cols] === 1) {
            count++;
        }
    }
    // not the first cell
    if (num_rows - 1 >= 0 && num_cols - 1 >= 0) {
        // check the neighbour on top left corner
        if (current_generation[num_rows - 1][num_cols - 1] === 1) {
            count++;
        }
    }
    // not the first row last cell
    if (num_rows - 1 >= 0 && num_cols + 1 < cols) {
        // check the neighbour top right corner
        if (current_generation[num_rows - 1][num_cols + 1] === 1) {
            count++;
        }
    }
    // not the first column
    if (num_cols - 1 >= 0) {
        // check the neighbour on the left
        if (current_generation[num_rows][num_cols - 1] === 1) {
            count++;
        }
    }
    // not the last column
    if (num_cols + 1 < cols) {
        // check the neighbour on the left
        if (current_generation[num_rows][num_cols + 1] === 1) {
            count++;
        }
    }
    // not the bottom left corner
    if (num_rows + 1 < rows && num_cols - 1 >= 0) {
        // check the neighbour on bottom left
        if (current_generation[num_rows + 1][num_cols - 1] === 1) {
            count++;
        }
    }
    // not the bottom right corner
    if (num_rows + 1 < rows && num_cols + 1 < cols) {
        // check the neighbour on bottom right
        if (current_generation[num_rows + 1][num_cols + 1] === 1) {
            count++;
        }
    }
    // not the last row
    if (num_rows + 1 < rows) {
        // check the bottom neighbour
        if (current_generation[num_rows + 1][num_cols] === 1) {
            count++;
        }
    }

    return count;
}

// Create next generation
function createNextGeneration() {
    for (row in current_generation) {
        for (col in current_generation[row]) {
            let all_neighbours = getNeighboursCount(row, col);
            // if the cell is alive
            if (current_generation[row][col] === 1) {
                // if there are fewer than 2 neighbors
                if (all_neighbours < 2) {
                    next_generation[row][col] = 0;
                    // if the neighbors are 2 or 3
                } else if (all_neighbours === 2 || all_neighbours === 3) {
                    next_generation[row][col] = 1;
                    // if the neighbors are more than 3
                } else if (all_neighbours > 3) {
                    next_generation[row][col] = 0;
                }
                // if cell is dead or empty
            } else if (current_generation[row][col] === 0) {
                // if the neighbors are 3
                if (all_neighbours === 3) {
                    next_generation[row][col] = 1;
                }
            }
        }
    }
}

// Update current generation
function updateCurrentGeneration() {
    for (row in current_generation) {
        for (col in current_generation[row]) {
            // update the current generation
            current_generation[row][col] = next_generation[row][col];
            // reset next generation
            next_generation[row][col] = 0;
        }
    }
}

// Update game world
function updateGameWorld() {
    let cell = "";

    for (row in current_generation) {
        for (col in current_generation[row]) {
            cell = document.getElementById(row + '-' + col);
            if (current_generation[row][col] === 0) {
                cell.setAttribute('class', 'dead-cell');
            } else {
                cell.setAttribute('class', 'alive-cell');
            }
        }
    }
}

// Evolve
function evolve() {
    // create next generation
    createNextGeneration();
    // update current generation
    updateCurrentGeneration();
    // update world
    updateGameWorld();

    // if game is started then start and timer
    if (is_game_started) {
        timer = setTimeout(evolve, speed);
    }
}

// Start ot stop game
function startOrStopGame() {
    let start_or_stop_button = document.querySelector('#button-start-stop');

    if (!is_game_started) {
        is_game_started = true;
        start_or_stop_button.value = "Stop";
        evolve();

    } else {
        is_game_started = false;
        start_or_stop_button.value = "Start";
        clearTimeout(timer);
    }
}

// Reset the game world
function resetGameWorld() {
    location.reload();
}
