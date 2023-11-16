class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    play1 = createSprite(100,200);
    play2 = createSprite(200,200);
    play3 = createSprite(300,200);
    play4 = createSprite(400,200);
    cars = [play1, play2, play3, play4];
  }

  play(){
    form.hide();
    background("gold");
    stroke("black");
    textSize(30);
    text("Game Start", displayWidth/2 - 100, displayHeight/ 3);

    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0;
      var x = 0;
      var y = 0;
      for(var plr in allPlayers){
        index +=  1;
        x += 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(index=== player.index) {
          cars [index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites();
  }
}
