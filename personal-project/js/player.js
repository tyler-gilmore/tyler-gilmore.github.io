class Player {
  get aspectRatio() {
    const img = new Image();
    img.src = '../assets/images/player.png';
    return img.onload = function() {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      return aspectRatio;
    }
  }
}