var ChatManager = function(rid, room) {
  var roomId = rid;
  var roomObject = room;

  $('#chat-messages').empty();
  $('#chat-toolbar textarea').val('');

  function appendNewMessage(data) {
    $('#chat-messages').append('<div class="message-line' + (data.from == '[Server]' ? ' op' : '') + '">'+
        '<span class="message-line-from">' + data.from + '</span>'+
        data.text+
      '</div>');
    $('#chat-toolbar textarea').val('');
    $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
  }

  function updateUsersInRoom(data) {
    $('#room-users').empty();
    for (var i = data.length - 1; i >= 0; i--) {
      $('#room-users').append('<div class="stylized stylized-light boxed fontized">' + data[i].name +
        (data[i].owner ? ' (owner)' : '') +
        '</div>');
    };
  }

  function sendMessage() {
    var message = $('#chat-toolbar textarea').val();
    SERVER.sendChat({
      rid: roomId,
      from: SERVER.getUsername(),
      text: message
    });
  }

  $('#chat-toolbar textarea').on('keypress', function(e){
    if (e.keyCode == 13) {
      sendMessage();
    }
  });
  $('#chat-toolbar a').on('click', function(){
    sendMessage();
  });

  return {
    getRoomObject: function() {
      return roomObject;
    },
    getRoomID: function() {
      return roomId;
    },
    append: appendNewMessage,
    sendMessage: sendMessage,
    updateUsersInRoom: updateUsersInRoom
  };
}

var CHAT = null;
