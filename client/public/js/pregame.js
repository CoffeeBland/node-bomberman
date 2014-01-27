/***************************************
  STEP 1: Server connect
****************************************/

function setDisconnectCallback() {
  SERVER.setDisconnectCallback(function(){
    STEPS.goTo(1);
  });
}
$('#set-server').on('click', function(){
  SERVER = new Server($('#server-addresss').val());
  setDisconnectCallback();
});
$('.dev-set-server').on('click', function(){
  SERVER = new Server($(this).attr('data-url'));
  setDisconnectCallback();
});

/***************************************
  STEP 2: Username select
****************************************/

function setUsername(){
  var username = $('#username').val().replace(/</g, '').replace(/>/g, '');
  if (username.length >= 3) {
    localStorage["username"] = username;
    SERVER.setUsername(username);
    STEPS.goTo(3);
    startRoomSelect();
  } else {
    alert('Username must be at least 3 characters long.');
  }
}
$('#set-username').on('click', setUsername);
$('#username').on('keypress', function(e){
  if (e.keyCode == 13)
    setUsername();
});
if (localStorage["username"])
  $('#username').val(localStorage["username"]);

/***************************************
  STEP 3: Room select
****************************************/

function startRoomSelect() {
  $display = $('#room-select');
  $display.empty().append('<p style="color:#fff;">Loading...</p>');
  SERVER.getRooms(function(roomsData){
    if (roomsData.length == 0) {
      $display.empty().append('<br/><br/><div class="stylized stylized-light boxed fontized">No rooms on this server!</div>');
    } else {
      $display.empty();
      for (var i = roomsData.length - 1; i >= 0; i--) {
        $display.append('<div class="stylized stylized-light boxed fontized room-box">' +
            roomsData[i].name + ' - ' + roomsData[i].userCount + '/' + roomsData[i].userCap + ' players' +
            '<a class="pull-right join-room" data-id="' + roomsData[i].id + '">Join</a>' +
          '</div>');
      };
    }
    $display.append('<a href="javascript:void(0);" class="stylized half-btn boxed fontized" id="refresh-rooms">Refresh</a>');
    $display.append('<a href="javascript:void(0);" class="stylized half-btn boxed fontized" id="create-room">Create room</a>');
  });
}

$("body").on('click', '#refresh-rooms', function(){
  startRoomSelect();
});
$("body").on('click', '#create-room', function(){
  var roomName = prompt("What is the room name?", (Math.round(Math.random()*1000000)).toString());
  if (roomName != null) {
    SERVER.addNewRoom(roomName, function(room){
      STEPS.goTo(4);
      joinRoom(room);
    });
  }
});
$('body').on('click', '.join-room', function(){
  SERVER.joinRoom($(this).attr('data-id'), function(room){
    STEPS.goTo(4);
    joinRoom(room);
  });
});

function joinRoom(room) {
  CHAT = new ChatManager(room.id, room);
  $('#room-name').text(room.name);
  $('#room-count').text(room.userCount);
  $('#room-cap').text(room.userCap);
  CHAT.updateUsersInRoom(room.users);
  console.log(room);
}

/***************************************
  STEP 4
****************************************/

$('#chat-back').on('click', function(){
  STEPS.goTo(3);
  SERVER.quitRoom();
  startRoomSelect();
});
$('#chat-startgame').on('click', function(){
  if (CHAT.getRoomObject().ownerId == SERVER.getUserID()) {
    SERVER.startGame(CHAT.getRoomID());
  } else {
    alert('NOPE! You are not the room owner!');
  }
});

STEPS.boot();
