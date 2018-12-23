/*
 * Digit Paper Top Gun
 * Copyright 2018 Chutian Gao
 * Licensed under the Apache 2.0 license (https://digitpaper.github.io/LICENSE)
 */
(function() {
    var t = 0; // length from top
    var l = 10; // lenght from left
    var windowW = 0;
    var windowH = 0;
    var snakeTimer;
    var foodTimer;
    var foods = [];
    var snakeBody = [];
    var current_tail;
    var totalHit = 0;
    $(window).ready(function() {
        $("#stopBtn").hide();
        windowW = $(window).width();
        windowH = $(window).height();
        $("#startBtn").click(function() {
            startGame();
            $(this).hide();
            $("#stopBtn").show();
        });
        $("#stopBtn").click(function() {
            stopGame();
            $(this).hide();
            $("#startBtn").show();
        });
        $(document).keydown(function(e) {
            e.preventDefault();
            if (e.keyCode == 37) {
                l = -10;
                t = 0;
            }
            if (e.keyCode == 38) {
                l = 0;
                t = -10;
            }
            if (e.keyCode == 39) {
                l = 10;
                t = 0;
            }
            if (e.keyCode == 40) {
                l = 0;
                t = 10;
            }
        });

        detectSwipe();

    });

    function detectSwipe() {
        
        var starX;
        var starY;
        var startTime;
      
        var threshold = 150;
        var allowedTime = 200;

        var directionCode = 0;
   
        
        $("body").on("touchstart", function(e) {
            var touchobj = e.changedTouches[0]
            dist = 0
            startX = touchobj.pageX
            startY = touchobj.pageY
            startTime = new Date().getTime()

        });

        $("body").on("touchend", function(e) {
            var touchobj = e.changedTouches[0]
            var distX = touchobj.pageX - startX;
            var ndistX = startX - touchobj.pageX;

            var distY = touchobj.pageY - startY;
            var ndistY = startY - touchobj.pageY;

            var elapsedTime = new Date().getTime() - startTime
            
            var swiperightBol = (elapsedTime <= allowedTime && distX >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
            var swipeleftBol = (elapsedTime <= allowedTime && ndistX >= threshold && Math.abs(touchobj.pageY - startY) <= 100)

            var swipedownBol = (elapsedTime <= allowedTime && distY >= threshold && Math.abs(touchobj.pageX - startX) <= 100)
            var swipeupBol = (elapsedTime <= allowedTime && ndistY >= threshold && Math.abs(touchobj.pageX - startX) <= 100)
            
            if (swipeleftBol) {
                directionCode = 1;
                l = -10;
                t = 0;
            } else if (swipeupBol) {
                directionCode = 2;
                l = 0;
                t = -10;
            } else if (swiperightBol) {
                directionCode = 3;
                l = 10;
                t = 0;
            } else if (swipedownBol) {
                directionCode = 4;
                l = 0;
                t = 10;
            }
      
        });
    }

    function startGame() {
        /*--------- Start Game -----------*/
        $("#snake-head").show();
        $("#snake-head").css({
            'position': 'absolute',
            'top': (windowH / 2) + 'px',
            'left': (windowW / 2) + 'px'
        });
        current_tail = $("#snake-head");
        snakeBody.push($("#snake-head"));
        snakeTimer = setInterval(function() {
            walk();
            isHit();
        }, 100);
        generateFood();
        /*---------/ Start Game -----------*/
    }

    function stopGame() {
        clearInterval(snakeTimer);
    }

    function walk() {
        var p = $("#snake-head").position();
        var current_l = p.left;
        var current_t = p.top;
        // X
        if (current_l > windowW) {
            current_l = 0;
        }
        if (current_l < 0) {
            current_l = windowW;
        }
        if (current_t > windowH) {
            current_t = 50;
        }
        if (current_t < 0) {
            current_t = windowH;
        }
        new_l = current_l + l;
        new_t = current_t + t;
        $("#snake-head").css({
            'position': 'absolute',
            'top': new_t + 'px',
            'left': new_l + 'px'
        });
        var bodyT = current_t;
        var bodyL = current_l;
        for (var sb_c = 1; sb_c < snakeBody.length; sb_c++) {
            var bodyP = snakeBody[sb_c].position();
            /*
                        if (l > 0) {
                            bodyL = bodyL - 10;
                        } else if (l < 0) {
                            bodyL = bodyL + 10;
                        }

                        if (t > 0) {
                            bodyT = bodyT - 10;
                        } else if (t < 0) {
                            bodyT = bodyT + 10;
                        }
               */
            snakeBody[sb_c].css({
                'position': 'absolute',
                'top': bodyT + 'px',
                'left': bodyL + 'px'
            });
            bodyT = bodyP.top;
            bodyL = bodyP.left;
        }
    }

    function generateFood() {
        var foodId = 'Food-1';
        var foodHTML = '<i class="far fa-square food fa-w-14 fa-2x" id="' + foodId + '" style="position:absolute;"></i>';
        $('body').prepend(foodHTML);
        var foodT = Math.random() * windowH + 50;
        var foodL = Math.random() * windowW;
        if (foodT > windowH - 10) {
            foodT = foodT - 10;
        }
        if (foodT < 60) {
            foodT = 60;
        }
        if (foodL > windowW - 10) {
            foodL = foodL - 10;
        }
        if (foodL < 10) {
            foodL = 10;
        }
        $("#" + foodId).css({
            'position': 'absolute',
            'top': foodT + 'px',
            'left': foodL + 'px'
        });
        foods.push(foodId);
    }

    function generateTail() {
        var tailId = "Tail-" + snakeBody.length;
        var tailHTML = '<i class="fas fa-square fa-w-14 fa-2x tail" id="' + tailId + '" style="position:absolute;"></i>';
        $('body').prepend(tailHTML);
        var pTail = current_tail.position();
        var tailL = pTail.left;
        var tailT = pTail.top;
        if (l > 0) {
            tailL = tailL - 10;
        } else if (l < 0) {
            tailL = tailL + 10
        }
        if (t > 0) {
            tailT = tailT - 10;
        } else if (l < 0) {
            tailT = tailT + 10
        }
        $("#" + tailId).css({
            'position': 'absolute',
            'top': tailT + 'px',
            'left': tailL + 'px'
        });
        current_tail = $("#" + tailId);
        snakeBody.push(current_tail);
    }

    function isHit() {
        var pHead = $("#snake-head").position();
        var tH = pHead.top;
        var lH = pHead.left;
        $(".food").each(function() {
            var pFood = $(this).position();
            var tF = pFood.top;
            var lF = pFood.left;
            if (tF <= tH + 10 && tF >= tH - 10 && lF <= lH + 10 && lF >= lH - 10) {
                var foodId = $(this).attr('id');
                $(this).remove();
                foods = removeFromArray(foods, foodId);
                generateFood();
                generateTail();
                totalHit++;
                $("#score").html(totalHit);
            }
        });
    }

    function removeFromArray(arr, niddle) {
        arr = arr.filter(function(item) {
            return item !== niddle
        });
        return arr;
    }
})();