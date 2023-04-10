# Probability Games
### Table of Contents: 
1. [Monty Hall Problem](#Monty-Hall-Problem)
2. [Weighted Coin Flip](#Coin-Flip)
3. [Weighted Dice Roll](#Dice-Roll)
4. [2-12 Card Game](#2-12-Card-Game)
5. [Buffon's Needles](#Buffon's-Needles)
---
## Monty Hall Problem
### How to Play
- Materials:
		- Three Closed Doors
		- Two Goats (or unwanted outcome)
		- One Car (or desired outcome)
- Instructions:
	1. Pick a starting door
	2. A different door than the chosen will be opened revealing a goat 
	3. A prompt will then appear asking the player if they want to stay with their orginal door or switch to the other unopened door
	4. After the player finalizes their door selection all the doors will be opened and a win or lose screen will show
	5. The player then has the option to play again or simulate the game or to reset the statistics    
### Features
- Counts the statistics which include:
	- Number of overall games played
	- Number of overall games won
	- Number of overall games lost
	- Number of games where door was kept
	- Number of games won when door was kept
	- Number of games lost when door was kept
	- Number of games where door was switched
	- Number of games won when door was switched
	- Number of games lost when door was switched
- Doors that dissapear and reveal whats behind them
- Modals that pop up with prompts for the user
- The abilty to simulate the game
### Backlog

## Weighted Coin Flip
### How to Play
- Instructions
	1. The player can flip the coin as many times as they'd like
	2. The results of the amount of times each side (heads or tails) was landed on will display
	3. The player must then guess if the coin is weighted or not weighted based on the results
### Features
### Backlog

## Weighted Dice Roll
### How to Play
- Instructions
	1. The player can flip the dice as many times as they'd like
	2. The results of the amount of times each side (1-6) was landed on will display
	3. The player must then guess if the dice is weighted or not weighted based on the results
### Features
### Backlog

## 2-12 Card Game
### How to Play
- Materials:
		- 20 Chips (10 Chips per player)
		- Two Standard Dice
		- 11 Cards labeled from 2-12
- Instructions:
	1. Player 1 adds a chip to a card.
	2. Player 2 adds a chip to a card.
	3. Repeat Steps 1-2 until both players have no chips remaining.
	4. Player 1 rolls the two dice and adds the sum of the dice.
		  - If: Player 1 has a chip on the card equal to the sum of the dice remove the chip and get a point.
		  - Else: Remove no chips from the cards and get no points.
	5. Player 2 rolls the two dice and adds the sum of the dice.
		  - If: Player 2 has a chip on the card equal to the sum of the dice remove the chip and get a point.
		  - Else: Remove no chips from the cards and get no points.
	6. Repeat steps 4 - 5 until either Player 1 or 2 reach 10
		   points and Win the Game.

### Features
- Moving chips with click of card
- Disappearing chips if dice roll equal to a card value of player's chip
- Incrementing score value after player lands a roll on a card
- Win Screen after player reaches 10 points
- Animated Dice upon click of roll button
### Backlog
 - [ ] Graph to display results of the game
 - [ ] How to play button on the page
 - [ ] Replay Button
 - [ ] Information about the game and statistics
## Buffon's Needles
There is a gird of parallel horizontal lines that needles of a certain length are dropped in random spaces with a random angle. 
The length of the needles, the grid space, the number of needles that cross a line and the total number of needles drop can be used to estimate Pi.
The lengths we use is pixels but on the game we put units because the kids might not know what a pixel is and it's not that important that they do. 
How to Play: Buffon's Needles
Required

   - Enter How Many Needles To Drop
   - Press Enter or Click "Drop Needles" To Drop Needles
   - After You Dropped Enough Needles Click "Estimate Pi"
   - Follow The Provided Formula To Estimate Your Value of PI
   - See How Accurate You Were and Play Again!

Optional Settings

    Needle Length:

    Needle Length is a percentage of the distance between grid lines.
    Automatically the Needle Length is 90% the distance between grid lines.
    Drop Type:

    Drop Type Refers to what happens to the screen after you Click "Drop Needles".
    Singular Means each time you click "Drop Needles" The Previous Drop is Cleared
    Cumulative Means each time you click "Drop Needles" The Previous Drop is Added To
    Number of Gird Lines

    This allows you to change the amount of grid lines that appear on the screen, there can be between 2-9 grid lines.


### Backlog
 - [ ]  Drop down menus for needle length and grid lines 
 - [ ]  Can drop needle with enter in the estimate Pi screen (bug)
 - [ ]  Define terms and write as a more formal formula 
 - [ ] Readme for users is a unit is a pixel 
 - [ ] Make all the values they need for the formula on the estimate pi screen
 - [ ] Fix the bug for going back to dropping needles 
 - [ ] Read me file (how to play)


