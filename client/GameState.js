//สร้าง object State สำหรับจัดการ state ของตัวเกม
var gameState = new Kiwi.State( "GameState" );

//preload คือ การเตรียมข้อมูลไว้ก่อนที่ state จะสร้างตัวเกม
gameState.preload = function(){
    this.game.stage.color = '#fff';
	Kiwi.State.prototype.preload.call(this);
}

//create คือ การสร้างตัวเกมเริ่มต้น
gameState.create = function(){
	Kiwi.State.prototype.create.call(this);
}

//update คือ ฟังก์ชันสำหรับ Listening ตัวเกม เวลามีการเปลี่ยนแปลงไดๆ
gameState.update = function(){
	Kiwi.State.prototype.update.call(this);
}