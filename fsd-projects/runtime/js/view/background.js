var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        let tree;
        let moon;
        let grass;
        let buildings = [];

        const GRASS_Y_OFFSET = 50;
      
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            const backgroundFill = draw.rect(canvasWidth,canvasHeight,'#181f2b');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            const STAR_COUNT = 200;
            for (let i = 0; i < STAR_COUNT; i++) {
                const star = draw.circle(3, 'white', 'LightGray', 2);
                star.x = canvasWidth * Math.random();
                star.y = canvasHeight * Math.random();
                background.addChild(star);
            }

            moon = draw.bitmap("img/moon.png");
            moon.x = canvasWidth * 0.6;
            moon.y = canvasHeight * 0.01;
            moon.scaleX = 0.3;
            moon.scaleY = 0.3;
            background.addChild(moon);

            // Add grass
            grass = draw.rect(canvasWidth, canvasHeight - groundY + GRASS_Y_OFFSET, '#1a2b18', 1);
            grass.y = groundY - GRASS_Y_OFFSET;
            background.addChild(grass);
            
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            const numberOfBuildings = 15;
            for (let i = 0; i < numberOfBuildings; i++) {
                const buildingHeight = Math.random() * 200 + 100;
                const building = draw.rect(75, buildingHeight, "DarkGray", "Black", 1);
                building.x = canvasWidth / (numberOfBuildings - 1) * i;
                building.y = groundY - 20 - buildingHeight - (Math.random() * (GRASS_Y_OFFSET - 20));
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = canvasWidth - 100;
            tree.y = groundY - 240;
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x -= 1;
            if (tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            for (let building of buildings) {
                building.x -= 0.1;
                if (building.x < -building.width) {
                    building.x = canvasWidth + building.width;
                } 
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
