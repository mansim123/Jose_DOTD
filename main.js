var mainPage = true;
var a = false;
var b = false;
var c = false;
var d = false;
var e = false;
var cookieChecked = false;

//smoke

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.height = 500;
canvas.width = 500;

var parts = [],
    minSpawnTime = 50,
    lastTime = new Date().getTime(),
    maxLifeTime = Math.min(5000, (canvas.height/(1.5*60)*1500)),
    emitterX = canvas.width / 2,
    emitterY = canvas.height,
    smokeImage = new Image();

function spawn() {
    if (new Date().getTime() > lastTime + minSpawnTime) {
        lastTime = new Date().getTime();
        parts.push(new smoke(emitterX, emitterY));
    }
}

function render() {
    var len = parts.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    while (len--) {
        if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
            parts.splice(len, 1);
        } else {
            parts[len].update();

            ctx.save();
            var offsetX = -parts[len].size/4,
                offsetY = -parts[len].size/4;
         
            ctx.translate(parts[len].x-offsetX, parts[len].y-offsetY);
            ctx.rotate(parts[len].angle / 100 * Math.PI);
            ctx.globalAlpha  = parts[len].alpha;
            ctx.drawImage(smokeImage, offsetX,offsetY, parts[len].size, parts[len].size);
            ctx.restore();
        }
    }
    spawn();
    requestAnimationFrame(render);
}

function smoke(x, y, index) {
    this.x = x;
    this.y = y;

    this.size = 1;
    this.startSize = 0;
    this.endSize = 50;

    this.angle = Math.random() * 180;

    this.startLife = new Date().getTime();
    this.lifeTime = 0;

    this.velY = -1 - (Math.random()*2.2);
    this.velX = Math.floor(Math.random() * (-6) + 3) / 4;
}

smoke.prototype.update = function () {
    this.lifeTime = new Date().getTime() - this.startLife;
    this.angle += 0.2;
    
    var lifePerc = ((this.lifeTime / maxLifeTime) * 100);

    this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);

    this.alpha = 1 - (lifePerc * .01);
    this.alpha = Math.max(this.alpha,0);
    
    this.x += this.velX;
    this.y += this.velY;
}

smokeImage.src = "smoke.png";


// window.onresize = resizeMe;
// window.onload = resizeMe;
// function resizeMe() {
//    canvas.height = document.body.offsetHeight;
// }

if(Cookies.get('age-gateway') == 0 || Cookies.get('age-gateway') == undefined)
{
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        checkAge();
	    }
	});

	$('#age-enter').on('click touch', function () {
		checkAge();
	});

}
else {
	console.log(Cookies.get());
	ageSuccess();
}

function checkAge (){
	// console.log($('#age-year').val());
	// console.log($('#age-cookie-checkBox').is(":checked"));
	//check 2001
	if($('#age-year').val() < 2001){
		$('.age-year-error').hide();
		$('#age-cookie').css({
			marginTop:'30px'
		})	
	}else{
		$('.age-year-error').show();
		$('#age-cookie').css({
			marginTop:'10px'
		})
	}
	if($('#age-cookie-checkBox').is(":checked") == true){
		cookieChecked = true;
	}else{
		cookieChecked = false;
	}
	if($('#age-year').val() < 2001){
		ageSuccess();
	}
}

function ageSuccess () {
	mainPage = true;
	$("#age-gateway").remove();
	//$("#main-container").show();
	if(cookieChecked == true){
		Cookies.set('age-gateway', '1', { expires: 30});
	}
	//smokeImage.onload = function () {
		window.scrollTo(0, 0);
		$('body').css({overflow:'hidden'});
		$("canvas").show();
	    render();
	//}
	animateEyes();
}

//$("#age-enter").click(function(){
//    $("#main-container").show();
//});

function animateEyes(){

	TweenMax.to('#main-dod-eyes', 2, {alpha:1,delay:3, onComplete:function(){
		$('#main-container').show();
	}});

	TweenMax.to('#main-dod-eyes', 0.5, {alpha:0,delay:5, onComplete:function(){
		$('#main-container-skull').hide();
	}});

	TweenMax.to('#main-container',0.5, {alpha:1,delay:5.75});
	
	TweenMax.to('canvas', 0.5, {alpha:0,delay:6, onComplete:function(){
		$('body').css({overflow:'auto'});
		$("canvas").hide();
	}});

}

$("#age-terms").click(function(){
    $(".terms-and-conditions").show();
});

$("#t-and-c-link").click(function(){
    $(".terms-and-conditions").show();
});

$("#close").click(function(){
    $(".terms-and-conditions").hide();
});

$("#age-terms").click(function(){
    $(".terms-and-conditions").show();
});


$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	console.log(mainPage);
	        if(mainPage == true){
	        	checkForm();
	        }
	    }
	});

$('#enter-btn').on('click touch', function (e) {
	e.preventDefault();
	checkForm();
});

function checkForm (){
	
	if($('.termsCheck').is(":checked") == true){
		console.log('termsCheck ---> true');
		$('.checkmark1').css({
			color:"white"
		});
		b = true;
	}
	else{
		console.log('termsCheck ---> false');
		$('.checkmark1').css({
			color:"red"
		});
	}
	if( $('#fname').val().length > 0 ) {
		console.log('fname ---> true');
		$('.fnameText').css({
			color:"white"
		});
		c = true;
	}
	else{
		console.log('fname ---> false');
		$('.fnameText').css({
			color:"red"
		});
	}
	if( $('#lname').val().length > 0 ) {
		console.log('lname ---> true');
		$('.lnameText').css({
			color:"white"
		});
		d = true;
	}
	else{
		console.log('lname ---> false');+
		$('.lnameText').css({
			color:"red"
		});
	}
	if( $('#email').val().length > 0 ) {
		console.log('email ---> true');
		$('.emailText').css({
			color:"white"
		});
		e = true;
	}
	else{
		$('.emailText').css({
			color:"red"
		});
		console.log('email ---> false');
	}

	if(b == true && c == true && d == true && e == true){
		$('#error').hide();

		myData = [['name',$('#fname').val()],['lastname',$('#lname').val(),['email',$('#email').val()]]]

		var newData = JSON.stringify(myData);

         //    $.post('saveJson.php', {
         //        newData: newData
         //    }, function(response) {
         //        console.log(response);
         // });

         $.ajax({
            url: 'saveJson.php',
            method: 'POST',
            data: $('input').serialize(),
            success: function(result) {

            	$('#main-container').hide();
                $('#page2').show();

             },
            error: function(result) {console.log("Error!");}
        });
	}
	else{
		$('#error').show();
	}
}

