<?php require_once('server/env.php');  ?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Workshop Game Developer - 2D Game</title>
<link rel="apple-touch-icon" sizes="57x57" href="<?php echo BaseURL;?>/client/assets/img/favicon/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="<?php echo BaseURL;?>/client/assets/img/favicon/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="<?php echo BaseURL;?>/client/assets/img/favicon/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="<?php echo BaseURL;?>/client/assets/img/favicon/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="<?php echo BaseURL;?>/client/assets/img/favicon/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="<?php echo BaseURL;?>/client/assets/img/favicon/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="<?php echo BaseURL;?>/client/assets/img/favicon/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="<?php echo BaseURL;?>/client/assets/img/favicon/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="<?php echo BaseURL;?>/client/assets/img/favicon/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="<?php echo BaseURL;?>/client/assets/img/favicon/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="<?php echo BaseURL;?>/client/assets/img/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="<?php echo BaseURL;?>/client/assets/img/favicon/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="<?php echo BaseURL;?>/client/assets/img/favicon/favicon-16x16.png">
<link rel="manifest" href="<?php echo BaseURL;?>/client/assets/img/favicon/manifest.json">
<meta name="msapplication-TileColor" content="#000000">
<meta name="msapplication-TileImage" content="<?php echo BaseURL;?>/client/assets/img/favicon/ms-icon-144x144.png">
<meta name="theme-color" content="#000000">
<style>
body,html{
	background-color: #000;
}
.container{
	background-color: #000;
}
.header-wrapper{
	width: 100%;
	height: 210px; /* ขนาดของ Header*/
	margin: 0 auto;
	display: block;
	text-align: center;
}
.header-wrapper img.logo{
	padding: 30px;
} 
.game-wrapper{
	margin: 0 auto;
	display: block;
}
</style>
</head>

<body>
<div class="container">
	<div class="header-wrapper">
		<img src="<?php echo BaseURL;?>/client/assets/img/logo.png" class="logo" alt="Donuts Logo" title="Donuts Bangkok">
	</div>
	<div id="GameWrapper" class="game-wrapper"></div>
</div>

<!-- Loading Script -->
<script type="text/javascript" src="<?php echo BaseURL;?>/client/assets/js/lib/kiwi-js/kiwi.min.js"></script>
<?php /*
<script type="text/javascript" src="<?php echo BaseURL;?>/client/assets/js/lib/kiwi-js/Inventory-1.0.0.min.js"></script>
<script type="text/javascript" src="<?php echo BaseURL;?>/client/assets/js/lib/kiwi-js/repeating-texture-1.0.0.js"></script>
<script type="text/javascript" src="<?php echo BaseURL;?>/client/assets/js/lib/kiwi-js/ai-tree-1.0.0.min.js"></script>
<script type="text/javascript" src="<?php echo BaseURL;?>/client/assets/js/lib/kiwi-js/primitives-1.0.2.min.js"></script>
*/?>
<script type="text/javascript" src="<?php echo BaseURL;?>/client/assets/GameState.js"></script>

<!-- Main Script -->
<script type="text/javascript" defer>
	
    //Kiwi.Log.display = false ปิดการ show log
	var game = new Kiwi.Game('GameWrapper', 'GameExample', null, gameOptions);
    game.states.addState( loadingState );
    game.states.switchState( "GameState" );
</script>
</body>

</html>

<script>
</script>