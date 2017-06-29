
var gameState = new Kiwi.State( "GameState" );

gameState.preload = function(){
    this.game.stage.color = '#fff';
	Kiwi.State.prototype.preload.call(this);
}

gameState.create = function(){
	Kiwi.State.prototype.create.call(this);
}

gameState.update = function(){
	Kiwi.State.prototype.update.call(this);
}