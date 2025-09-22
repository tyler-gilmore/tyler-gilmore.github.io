export class Settings {
  get playerAspectRatio() {
    const img = new Image();
    img.src = '../assets/images/player.png';
    return img.onload = function() {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      return aspectRatio;
    }
  }
  constructor(board) {
    this.relativeSpriteSize = 0.10; // size relative to screen size
    this.updateScreenSize(board);
  }
  updateScreenSize(board) {
    this.boardWidth = board.width();
    this.boardHeight = board.height();

    updatePlayerSize(boardWidth, boardHeight);
  }
  updatePlayerSize(newBoardWidth, newBoardHeight) {
    
  }
}