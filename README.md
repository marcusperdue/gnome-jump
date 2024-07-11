# Gnome Jump

Gnome Jump is a simple browser-based game where the player controls a gnome character to jump over various obstacles. The objective is to survive as long as possible, with the game getting progressively harder over time.

## Features

- **Double Jump**: The gnome can perform a double jump to avoid obstacles.

- **Dynamic Obstacles**: Different types of obstacles appear at random intervals.

- **Increasing Difficulty**: The game speed and obstacle frequency increase over time.

- **Score Tracking**: The player's score is based on the time survived and is stored in the browser's local storage.

- **Medieval Theme**: The game features a medieval gnome theme with appropriate graphics and sounds.

## Getting Started

### Prerequisites

To run this game, you'll need:

- A modern web browser (Google Chrome, Firefox, Safari, Edge, etc.)

### Installation

1\. **Clone the repository**:

   - `git clone https://github.com/yourusername/gnome-jump.git`

   - `cd gnome-jump`

2\. **Open `index.html`**:

   - You can simply double-click the `index.html` file, or

   - Open it using a web server (for example, using VS Code Live Server).

## Files and Structure

- `index.html`: The main HTML file containing the structure of the game.

- `styles.css`: The CSS file for styling the game elements.

- `script.js`: The JavaScript file containing the game logic.

- `images/`: Directory containing image assets for the game.

  - `background.png`: Background image for the game.

  - `run1.png`, `run2.png`, `run3.png`, `run4.png`: Running animation frames for the gnome character.

  - `jump1.png`, `jump2.png`: Jumping animation frames for the gnome character.

  - `rock.png`, `troll.png`, `mushroom.png`: Images for the obstacles.

- `sounds/`: Directory containing sound assets for the game.

  - `background-music.mp3`: Background music for the game.

  - `game-over-music.mp3`: Game over music.

  - `jump-sound.wav`: Sound effect for the first jump.

  - `second-jump-sound.wav`: Sound effect for the second jump.

  - `game-over-sound.wav`: Sound effect for the game over.

## Controls

- **Right Arrow / D**: Move the gnome to the right.

- **Left Arrow / A**: Move the gnome to the left.

- **Up Arrow / W / Space**: Jump / Double Jump.

## Gameplay

1\. **Starting the Game**:

   - Click the "Start Game" button on the start screen.

2\. **Playing the Game**:

   - Use the controls to avoid obstacles.

   - The game gets progressively harder over time, with obstacles appearing more frequently and moving faster.

3\. **Game Over**:

   - The game ends when the gnome collides with an obstacle.

   - The final score (time survived) is displayed.

   - The highest score is stored in the browser's local storage and displayed as the high score.

4\. **Restarting the Game**:

   - Click the "Restart Game" button on the game over screen to start a new game.

## Customization

- **Adding New Obstacles**:

  - Add new obstacle images to the `images/` directory.

  - Update the `obstacleTypes` array in `script.js` to include the new obstacle.

- **Adjusting Game Difficulty**:

  - Modify `obstacleSpeed` and `obstacleSpawnInterval` variables in `script.js` to adjust the difficulty.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Sound effects obtained from [freesound.org](https://freesound.org/).

- Game development tutorials from [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Games).

Feel free to customize this README further to suit your project needs.
