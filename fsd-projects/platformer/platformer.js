$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // Enable the Grid
    toggleGrid();


    // Create Platforms
    function createTrench(xStart, yStart) {
      const PLATFORM_WIDTH = 100;
      const PLATFORM_HEIGHT = 10;
      let x = xStart;
      let y = yStart;

      createPlatform(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
      
      x += PLATFORM_WIDTH;
      y -= PLATFORM_WIDTH;
      createPlatform(x, y, PLATFORM_HEIGHT, PLATFORM_WIDTH); // swapped width and height for vertical wall

      createPlatform(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT);

      x += PLATFORM_WIDTH;
      createPlatform(x, y, PLATFORM_HEIGHT, PLATFORM_WIDTH); // swapped width and height for vertical wall
    }

    for (let i = 0; i < 5; i++) {
      createTrench(100 + i * 200, 600);
    }

    createPlatform(100, 0, 10, 600); // left wall blocking center zone

    ///// vertical platforming shaft /////
    createPlatform(1100, 100, 10, 400); // left wall
    createPlatform(1400, 100, 10, 400); // right wall

    // right platforms
    createPlatform(1300, 625, 100, 10);
    createPlatform(1300, 425, 100, 10);
    createPlatform(1300, 225, 100, 10);

    // left platforms
    createPlatform(1100, 525, 100, 10);
    createPlatform(1100, 325, 100, 10);
    createPlatform(1100, 125, 100, 10);
    //////////////////////////////////////

    // TODO 3 - Create Collectables
    for (let i = 0; i < 5; i++) {
      createCollectable('diamond', 240 + i * 200, 510);
    }
    for (let i = 0; i < 5; i++) {
      createCollectable('database', 140 + i * 200, 510);
    }
    
    // TODO 4 - Create Cannons
    createCannon('right', 750, 2000);
    createCannon('top', 1310, 2000);
    createCannon('left', 380, 2000);

    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
