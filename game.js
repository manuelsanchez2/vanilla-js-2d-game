// Modelo de datos del mundo 
    let world = {
        level: {
            heights: [4, 3, 5, 7, 4, 5, 6, 5, 6, 2, 4, 3, 5, 1, 1, 2, 6, 6, 5, 4],
            block: {
                height: 40,
                width: 100,
            }
        },
        camera: {
            height: 500,
            width: 800 
        },
        player: {
            height: 80,
            width: 20,
            x: 0,
            y: 0,
            speed: 4,
        }
    };

// Programa principal 

var game_ended = false;
setInterval(main_loop, 100);

function main_loop() {
    let canvas = document.querySelector('#screen');
    let ctx = canvas.getContext("2d");
   
    // Player is moved thanks to the speed 
    movePlayer()
    
    // We need to erase the canvas 
    // In order to do that, we make a white rectangle
    clearCanvas(ctx)
    
    // These are the blocks 
    // The iterator is going to be multiplied by [1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 6, 5, 4] creating weird fluctuations on the ground
    drawGround(ctx)

    // Then we redraw the player (after the blocks so that he can be over them)
    drawPlayer(ctx)
}

function movePlayer() {
    world.player.x = world.player.x + world.player.speed;
    console.log("Player position: " + world.player.x + ', ' + world.player.y)
}

function clearCanvas(ctx) {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 600, 600);
}

function drawGround(ctx) {
    let heightBlock = world.level.block.height;
    let widthBlock = world.level.block.width;

    // Color 
    ctx.fillStyle = "rgb(100, 75, 50)";
    // Begin of the path - the polygone 
    ctx.beginPath();
    // Origin of the coordinates and movement 
    ctx.moveTo(0, 0);
    for (let i = 0; i < world.level.heights.length; i++) {
        let heightGround = world.level.heights[i];
        let x = i * widthBlock;
        let y = heightBlock * heightGround; 
        ctx.lineTo(x, y);  
    }
    // Final lineTo to close the polygone 
    ctx.lineTo(ctx.canvas.width, 0);

    // Closing the path
    ctx.closePath();

    // Fill the path with the fill color 
    ctx.fill();
}

function drawPlayer(ctx) {
    // We create the center of the player this way for better managing of collisions later 
    let heightPlayer = world.player.height;
    let widthPlayer = world.player.width;
    let x = world.player.x;
    let y = world.player.y;

    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(x - widthPlayer / 2, y - heightPlayer / 2, widthPlayer, heightPlayer);
}