var firebaseConfig = {
    apiKey: "AIzaSyDfk4sphC8kyjWAyV38sqbkjKV1fjWuLPU",
    authDomain: "login-9987a.firebaseapp.com",
    databaseURL: "https://login-9987a-default-rtdb.firebaseio.com",
    projectId: "login-9987a",
    storageBucket: "login-9987a.appspot.com",
    messagingSenderId: "607418490577",
    appId: "1:607418490577:web:a18a2a33586565d2dc6ff0",
    measurementId: "G-E6XX3GHR1P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var name = localStorage.getItem("name");

  function send(){
      var msg = document.getElementById('msg_text').value;
      if(msg != ""){
        firebase.database().ref("messages").push({
            msg : msg,
            sender : name

        }).then(function(){
            document.getElementById('msg_text').value = "";
        })
      }
  }

  firebase.database().ref("messages").on("child_added" , function(snapshot){
      var username = snapshot.val().sender;
      var msg = snapshot.val().msg;
      var html = "";
      if(username == name){
          html += "<div class='message_me' align='right'><p class='user'>" +username + "</p><p class='msg_me'>"+ msg +"</p></div>";
          document.getElementById("box_messages").innerHTML += html;

      }else{
        html += "<div class='message_user' align='left'><p class='user'>" +username + "</p><p class='msg_user'>"+ msg +"</p></div>";
        document.getElementById("box_messages").innerHTML += html;
      }

      var div_obj = document.getElementById("box_messages");
      div_obj.scrollTop = div_obj.scrollHeight;
  });