(function () {
    
    var game = {
        element: document.getElementById("gameContainer"),
        width: 730,
        height: 760
    },

    resizeGame = function () {

        var viewport, newGameWidth, newGameHeight, newGameX, newGameY;		

        viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        if (game.height / game.width > viewport.height / viewport.width) {
            newGameHeight = viewport.height;
            newGameWidth = newGameHeight * game.width / game.height;  
        } else {
            newGameWidth = viewport.width;
            newGameHeight = newGameWidth * game.height / game.width;		 
        }

        game.element.style.width = newGameWidth + "px";
        game.element.style.height = newGameHeight + "px";

        newGameX = (viewport.width - newGameWidth) / 2;
        newGameY = (viewport.height - newGameHeight) / 2;

        game.element.style.padding = newGameY + "px " + newGameX + "px";
    };

    window.addEventListener("resize", resizeGame);
    resizeGame();
}())    