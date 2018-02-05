//  Javascript Code for pomodoro clock;
//
//  Owner: Qadir Pervez
//
(function (global){

  // declaration of some global variables
  global.stats = 'none'; //this is the beginning status of the Clock ( none, break, session )
  global.intervalID = null; // will store the return value of time event.
  global.breakTime = null; //will contain value in seconds...
  global.sessionTime = null; // will store value in seconds
  global.timeLeft = null; // second value
  global.oldMsg = null; //stores Old message;
  global.sessionMessages = [
    "Work like you don't need the money.",
    "There are no secrets to success.",
    "success is no accident",
    "Go hard or go home",
    "Becoming is better than being.",
    "Intelligence is the ability to adapt to change.",
    "Fight till the last gasp.",
    "Do or do not. There is no try.",
    "Intelligence without ambition is a bird without wings.",
    "Sometimes the fall kills you. And sometimes, when you fall, you fly."
  ]; // array of session messages.

  global.breakMessages = [
    "You can discover more about a person in an hour of play than in a year of conversation.",
    "There is a virtue in REST !",
    "It is time to pause and reflect.",
    "rest and be thankful.",
    "All that is important comes in quietness and waiting.",
    "Your calm mind is the ultimate weapon against your challenges, so relax.",
    "Rest is not idleness.",
    "it's relaxation that counts",
    "when he played, he really played.",
    "Sometimes it's better to forget the world and listen to music."
  ]; // array of break messages.

  // declaration of some variables (LOCAL)
  global.addBreakTime = function(){
    $("#resetBtn").show();
    var time = $("#breakTime").html();
    if(time == 1){
      $("#subBreak").removeClass("disabled");
    }
    var newTime = parseInt(time) + 1;
    $("#breakTime").html(newTime);
  }
  global.subBreakTime = function(){
    $("#resetBtn").show();
    var time = $("#breakTime").html();
    if(time == 2){
      $("#subBreak").addClass("disabled");
      $("#breakTime").html('1');
      return;
    }
    if(time < 2){
      $("#breakTime").html('1');
      return;
    }
    var newTime = parseInt(time) - 1;
    $("#breakTime").html(newTime);
  }
  global.addSessionTime = function(){
    $("#resetBtn").show();
    var time = $("#sessionTime").html();
    if(time == 1){
      $("#subSession").removeClass("disabled");
    }
    var newTime = parseInt(time) + 1;
    $("#sessionTime").html(newTime);
  }
  global.subSessionTime = function(){
    $("#resetBtn").show();
    var time = $("#sessionTime").html();
    if(time == 2){
      $("#subSession").addClass("disabled");
      $("#sessionTime").html('1');
      return;
    }
    if(time < 2){
      $("#sessionTime").html('1');
      return;
    }

    var newTime = parseInt(time) - 1;
    $("#sessionTime").html(newTime);
  }
  global.startTimer = function(){
    $("#resetBtn").show();
    $("#pauseBtn").show();
    $("#startBtn").hide();
    $("#time-left-section").slideToggle(3500);
    $("#buttons-section").slideToggle(700);
    var sessionT = $("#sessionTime").html();
    var breakT = $("#breakTime").html();
    sessionT = parseInt(sessionT) * 60;
    breakT = parseInt(breakT) * 60;
    global.sessionTime = sessionT;
    global.breakTime = breakT;
    global.stats = 'session';
    $("#pomodoro-body").removeClass("colorChange");
    $("#pomodoro-body").addClass("redColor");
    global.isSession(global.sessionTime);
  }

  global.isSession = function(seconds){
    var min, secs, timeStr = '';
    global.intervalID = setInterval(function (){
      global.timeLeft = seconds;
      if(seconds === 0){
        global.stats = 'break';
        clearInterval(global.intervalID);
        $("#pomodoro-body").removeClass("redColor");
        $("#pomodoro-body").addClass("purpColor");
        isBreak(global.breakTime);
      }
      timeStr = '';
      min = Math.floor(seconds / 60);
      secs = seconds % 60;
      var messTime = secs % 10;
      var messageText = '';
      if(messTime === 2 || messTime === 9 || messTime === 0 || messTime === 1){
        messageText = 'WORK Time !';

        global.oldMsg = null;
        $("#message").html(messageText);
        $("#message").addClass("bigFont");
      } else {
        var RandN = Math.floor(Math.random() * 10);
        if(global.oldMsg === null){
          global.oldMsg = RandN;
        }
        messageText = global.sessionMessages[global.oldMsg];
        $("#message").html(messageText);
        $("#message").removeClass("bigFont");
      }
      if(min < 10){
        timeStr = '0'+min+' : ';
      } else {
        timeStr += min+' : ';
      }
      if(secs < 10){
        if(secs % 2 === 1){
          timeStr = '-- : --';
        } else {
          timeStr += '0'+secs;
        }
      } else {
        timeStr += secs;
      }
      $("#time-left").html(timeStr);
      seconds -= 1;
    }, 1000 );
  }
  global.isBreak = function(seconds){
    var min, secs, timeStr = '';
    global.intervalID = setInterval(function (){
      global.timeLeft = seconds;
      if(seconds === 0){
        global.stats = 'session';
        clearInterval(global.intervalID);
        $("#pomodoro-body").removeClass("purpColor");
        $("#pomodoro-body").addClass("redColor");
        isSession(global.sessionTime);
      }
      timeStr = '';
      min = Math.floor(seconds / 60);
      secs = seconds % 60;
      var messTime = secs % 10;
      var messageText = '';
      if(messTime === 2 || messTime === 9 || messTime === 0 || messTime === 1){
        messageText = 'Break Time !';

        global.oldMsg = null;
        $("#message").html(messageText);
        $("#message").addClass("bigFont");
      } else {
        var RandN = Math.floor(Math.random() * 10);
        if(global.oldMsg === null){
          global.oldMsg = RandN;
        }
        messageText = global.breakMessages[global.oldMsg];
        $("#message").html(messageText);
        $("#message").removeClass("bigFont");
      }
      if(min < 10){
        timeStr = '0'+min+' : ';
      } else {
        timeStr += min+' : ';
      }
      if(secs < 10){
        if(secs % 2 === 1){
          timeStr = '-- : --';
        } else {
          timeStr += '0'+secs;
        }
      } else {
        timeStr += secs;
      }
      $("#time-left").html(timeStr);
      seconds -= 1;
    }, 1000 );
  }

  global.pauseTimer = function(){
    $("#pauseBtn").hide();
    $("#resumeBtn").show();
    clearInterval(intervalID);
    $("#pomodoro-body").attr("class", "");
  }
  global.resumeTimer = function(){
    $("#pauseBtn").show();
    $("#resumeBtn").hide();
    if(global.stats === 'session'){
      $("#pomodoro-body").attr("class", "redColor");
      global.isSession(global.timeLeft);
    } else if(global.stats === 'break'){
      $("#pomodoro-body").attr("class", "purpColor");
      global.isBreak(global.timeLeft);
    }
  }
  global.resetBtn = function(){
    if(global.intervalID !== undefined){
      clearInterval(global.intervalID);
    }
    $("#pomodoro-body").attr("class", "colorChange");
    $("#subSession").removeClass("disabled");
    $("#sessionTime").html('25');
    $("#subBreak").removeClass("disabled");
    $("#breakTime").html('5');
    $("#time-left").html(' 00 : 00 ');
    $("#message").html('No Work, yeppieeeee!');
    $("#startBtn").show();
    $("#pauseBtn").hide();
    $("#resumeBtn").hide();
    $("#resetBtn").hide();
    $("#message").attr("class", "");
    global.stats = 'none';
    global.intervalID = null;
    global.breakTime = null;
    global.sessionTime = null;
    global.timeLeft = null;
    global.oldMsg = null;
    $("#time-left-section").slideUp(700);
    $("#buttons-section").slideDown(2400);
  }
})(window);
