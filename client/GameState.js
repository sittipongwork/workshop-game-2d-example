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
}

//create คือ การสร้างตัวเกมเริ่มต้น
gameState.create = function(){
	Kiwi.State.prototype.create.call(this);
	//สร้าง Map Background
	this.bgstate = new Kiwi.Plugins.GameObjects.RepeatingTexture(this,this.textures.bgstate,-800,-500,20000,1300);
	this.addChild(this.bgstate);
	
	//สร้าง Tile Map
	this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap( this, 'tilemap', this.textures.tiles );
	this.addChild( this.tilemap.layers[0] );
	//กำหนด ArcadePhysics ของ map เพื่อบ่งบอกว่าสิ่งนี้คือวัตถุในเกม
	this.tilemap.tileTypes[0].allowCollisions = Kiwi.Components.ArcadePhysics.ANY;

	//สร้าง Character 
	this.character = new Kiwi.GameObjects.Sprite(this, this.textures.character, 70, 50);
	//สร้างค่า Physic ของตัวละคร | บอกตำแหน่งการยืนและการขนกันกับฉาก
	this.character.box.hitbox = new Kiwi.Geom.Rectangle(24, 20, 0, 0 ); 
	this.character.physics = this.character.components.add( new Kiwi.Components.ArcadePhysics( this.character, this.character.box ) );
	//กำหนดตัวแปรทางฟิสิก การเร่งความเร็วสูงสุด และ ความเร็วสูงสุด
	this.character.physics.acceleration.y = 80;
	this.character.physics.maxVelocity.y = 200;
	//ตั้งค่าจุดเริ่มต้น
	this.character.physics.velocity.y = 0;

	this.addChild(this.character);	
}

//update คือ ฟังก์ชันสำหรับ Listening ตัวเกม เวลามีการเปลี่ยนแปลงไดๆ
gameState.update = function(){
	Kiwi.State.prototype.update.call(this);

	//ความเร็วการเคลื่อนไหวของภาพพืนหลัง
	this.bgstate.cellOffsetX += 0.5;

	//เรียกใช้งานฟังก์ชันตัวละครกับแผนที่ชนกัน
	this.tilemap.layers[0].physics.overlapsTiles( this.character, true );
}