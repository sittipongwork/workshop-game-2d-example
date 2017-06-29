//สร้าง object State สำหรับจัดการ state ของตัวเกม
var gameState = new Kiwi.State( "GameState" );

//preload คือ การเตรียมข้อมูลไว้ก่อนที่ state จะสร้างตัวเกม
gameState.preload = function(){
    this.game.stage.color = '#000';
	Kiwi.State.prototype.preload.call(this);
	//โหลด Background
	this.addImage('bgstate','client/resource/map/Stage1/bg-stage1.jpg')

	//โหลด TileMap
	this.addSpriteSheet( 'tiles', 'client/resource/map/Stage1/starmap1.png', 48, 48 );
	this.addJSON('tilemap', 'client/resource/map/Stage1/TileMap.json');
	
	//โหลด Character
	this.addSpriteSheet( "character", 'client/resource/character/player1-70x70.png', 70, 70 );

	//เพิ่ม Audio
	this.addAudio('sci-fi-theme-8-bit', 'client/resource/audio/sci-fi/sci-fi-theme-8-bit.mp3');
	this.addAudio('jump-se', 'client/resource/audio/sound-effects/w-lasergun.mp3');
}

//create คือ การสร้างตัวเกมเริ่มต้น
gameState.create = function(){
	Kiwi.State.prototype.create.call(this);
	//สร้าง Map Background
	this.bgstate = new Kiwi.Plugins.GameObjects.RepeatingTexture(this,this.textures.bgstate,-800,-500,20000,1300);
	this.addChild(this.bgstate);
	
	//สร้าง Tile Map
	this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap( this, 'tilemap', this.textures.tiles );
	for( var i = 0; i < this.tilemap.layers.length; i++ ) {
		this.addChild( this.tilemap.layers[ i ] );
	}
	for(var i = 1; i < this.tilemap.tileTypes.length; i++) {
		this.tilemap.tileTypes[i].allowCollisions = Kiwi.Components.ArcadePhysics.ANY;
	}

	//สร้าง Character 
	this.character = new Kiwi.GameObjects.Sprite(this, this.textures.character, 70, 50);
	//สร้างค่า Physic ของตัวละคร | บอกตำแหน่งการยืนและการขนกันกับฉาก
	this.character.box.hitbox = new Kiwi.Geom.Rectangle(35, 0, 20, 70 ); 
	this.character.physics = this.character.components.add( new Kiwi.Components.ArcadePhysics( this.character, this.character.box ) );
	//กำหนดตัวแปรทางฟิสิก การเร่งความเร็วสูงสุด และ ความเร็วสูงสุด
	this.character.physics.acceleration.y = 80;
	this.character.physics.maxVelocity.y = 200;
	//ตั้งค่าจุดเริ่มต้น
	this.character.physics.velocity.y = 0;

	//ขอรับค่าจาก Keyboard
	this.keyboard = this.game.input.keyboard;
	//เพิ่ม Key ที่รับจาก Keyboard
	this.leftKey = this.keyboard.addKey(Kiwi.Input.Keycodes.LEFT, true);
	this.rightKey = this.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT, true);
	this.jumpKey = this.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR, true);
	//กำหนด Event ไปที่ฟังก์ชัน เมื่อรับค่าจากคีย์บอร์ด
	this.keyboard.onKeyDownOnce.add(this.keyDownOnce, this);
	this.keyboard.onKeyUp.add(this.keyUp, this);
	// กำหนดการเคลื่อนไหวของตัวละคร
	this.character.animation.add('idle',[0,1] , 0.3, true);
	this.character.animation.add('walking',[3,4,5,6,7,8] , 0.1, true);
	this.character.animation.add('jump',[10] , 0.1, true);
	this.character.animation.add('fall',[11] , 0.1, true);

	this.addChild(this.character);	

	//เสียงเพลงของเกม
	this.bgmusic = new Kiwi.Sound.Audio(this.game, 'sci-fi-theme-8-bit', 1, true);
	this.bgmusic.play();

	this.jumpse = new Kiwi.Sound.Audio(this.game, 'jump-se', 1, false);

	//HUD Time
	this.GameTime = new Kiwi.HUD.Widget.Time( this.game, '', 512, 25 );
    this.GameTime.style.color = 'white';
	this.GameTime.style.fontSize = '30px';
    this.game.huds.defaultHUD.addWidget( this.GameTime );
    this.GameTime.start()
}

//update คือ ฟังก์ชันสำหรับ Listening ตัวเกม เวลามีการเปลี่ยนแปลงไดๆ
gameState.update = function(){
	Kiwi.State.prototype.update.call(this);

	this.bgstate.cellOffsetX += 0.5;

	//เรียกใช้งานฟังก์ชันตัวละครกับแผนที่ชนกัน
	this.tilemap.layers[0].physics.overlapsTiles( this.character, true );
	
	this.updateCharacterMovement();
	this.updateCharacterAnimation();
}

//Event เมื่อมีการกดปุ่มไดๆ
gameState.keyDownOnce = function(keyCode, key) {
	if( keyCode === this.rightKey.keyCode ){
		this.rightPressed = true;
	} 

	if( keyCode === this.leftKey.keyCode ){
		this.leftPressed = true;
	} 

	if( keyCode === this.jumpKey.keyCode ){
		this.jumpPressed = true;
	} 
}

//Event เมื่อไม่มีการกดปุ่มไดๆ
gameState.keyUp = function(keyCode, key) {
	if( keyCode === this.rightKey.keyCode ){
		this.rightPressed = false;
	} 

	if( keyCode === this.leftKey.keyCode ){
		this.leftPressed = false;
	} 

	if( keyCode === this.jumpKey.keyCode){
		this.jumpPressed = false;
	} 
}

//อัพเดทค่าเมื่อมีการกดปุ่มไดๆ 
gameState.updateCharacterMovement = function () {
	//Move the player/character
	if ( this.leftPressed ) {
		this.character.scaleX = -1;
		this.character.physics.velocity.x = -55;

	} else if ( this.rightPressed ) {
		this.character.scaleX = 1;
		this.character.physics.velocity.x = 55;

	} else {
		this.character.physics.velocity.x = 0;
	}
	
	if (this.jumpPressed && this.character.physics.isTouching( Kiwi.Components.ArcadePhysics.DOWN ) ){
		this.character.physics.velocity.y = -160;
		this.jumpse.stop();
		this.jumpse.play();
	}
    
	//Setting กึ่งกลางตัวละคร
	var playerOffsetX = -1 * this.character.x + this.game.stage.width * 0.2 - (this.character.width * 0.5);
	this.game.cameras.defaultCamera.transform.x = playerOffsetX;
	var playerOffsetY = -1 * this.character.y + this.game.stage.height * 0.5 - (this.character.height * 0.5);
	this.game.cameras.defaultCamera.transform.y = playerOffsetY;
}

// กำหนด Animation ตัวละครเมื่อมีการกดปุ่ม
gameState.updateCharacterAnimation = function () {
	//อยู่บนอากาศหรือไม่
	if( !this.character.physics.isTouching( Kiwi.Components.ArcadePhysics.DOWN ) ) {
		//กำลังตก หรือ กำลังกระโดด
		if( this.character.physics.velocity.y > 0 ) {
			this.character.animation.play('fall', false);
		} else {
			this.character.animation.play('jump', false);
		}

	} else if ( this.rightPressed || this.leftPressed ){
		this.character.animation.play('walking', false);
	}else {
		this.character.animation.play('idle', false);
	}

}
