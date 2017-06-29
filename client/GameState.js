//สร้าง object State สำหรับจัดการ state ของตัวเกม
var gameState = new Kiwi.State( "GameState" );

//preload คือ การเตรียมข้อมูลไว้ก่อนที่ state จะสร้างตัวเกม
gameState.preload = function(){
    this.game.stage.color = '#000';
	Kiwi.State.prototype.preload.call(this);

	this.addImage('bgstate','client/resource/map/Stage1/bg-stage1.jpg')
}

//create คือ การสร้างตัวเกมเริ่มต้น
gameState.create = function(){
	Kiwi.State.prototype.create.call(this);

	this.bgstate = new Kiwi.Plugins.GameObjects.RepeatingTexture(this,this.textures.bgstate,-800,-500,20000,1300);
	this.addChild(this.bgstate);
}

//update คือ ฟังก์ชันสำหรับ Listening ตัวเกม เวลามีการเปลี่ยนแปลงไดๆ
gameState.update = function(){
	Kiwi.State.prototype.update.call(this);

	//ความเร็วการเคลื่อนไหวของภาพพืนหลัง
	this.bgstate.cellOffsetX += 0.5;
}