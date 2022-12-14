# The Game of Life

The Problem

Do an implementation of Conway's Game of Life.

Rules

The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells,
each of which is in one of two possible states, live or dead (or populated and unpopulated,
respectively). Every cell interacts with its eight neighbors, which are the cells that are
horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions
occur:
1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
These rules, which compare the behavior of the automaton to real life, can be condensed into
the following:
1. Any live cell with two or three live neighbors survives.
2. Any dead cell with three live neighbors becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

The initial pattern constitutes the seed of the system. The first generation is created by applying
the above rules simultaneously to every cell in the seed, live or dead; births and deaths occur
simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each
generation is a pure function of the preceding one. The rules continue to be applied repeatedly
to create further generations.

Expected Outcome

You should create a web page where users can play with Game of Life.
Users should be asked to set the:
- Size of the grid
- Initial pattern (seed)
Then by clicking a button a tick in the universe should happen and the grid should be updated
accordingly. Note: If an object is partially outside the grid, it should be treated as if the grid was
infinite.
If you find it useful you can add any other functionality on top of the required one.

Resources

Wikipedia page: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
YouTube video with many different shapes: https://www.youtube.com/watch?v=C2vgICfQawE
