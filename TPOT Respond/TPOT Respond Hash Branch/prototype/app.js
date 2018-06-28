var wait2Load = 10;
var inputDelay = 400;

///////////////////////////////////////////////////
//                  Utilities                    //
///////////////////////////////////////////////////

var logColor = {
  "red": "color: #e06252; font-size: 14px;",
  "yellow": "color: #e5c07b; font-size: 14px;",
  "blue": "color: #61afef; font-size: 14px;",
  "teal": "color: #56b6a7; font-size: 14px;",
  "green": "color: #7cc379; font-size: 14px;",
  "purple": "color: #c678dd; font-size: 14px;",
}

// Easy access to log functions to be changed on build
let log = console.log.bind(console)
let diag = function(msg) {
  document.getElementById("console").innerHTML = msg
}

// Wait till the DOM loads, then add the event listeners
window.addEventListener("load", function() {
  $("#app").hide()
  addEventListeners()
  $("#intellisense").hide()
  // $("#results").hide()

  toggleBar()
  toggleSearch()
});

///////////////////////////////////////////////////
//              Load App Settings                //
///////////////////////////////////////////////////
// Give the App some time to load before stuff
// setTimeout(function() {
//   addEventListeners()
//   // $("#btn_content").show()
//   // $("#btn_toggle").fadeOut(0)
// }, wait2Load);

///////////////////////////////////////////////////
//     Send and Recieve Messages from APP.JS     //
///////////////////////////////////////////////////


function addEventListeners() {

  //     RECIEVE      //
  //////////////////////

  // Can't attach event listener to parent frame due to cross-origin security
  // Work around is to attach the event to the iframe document window, and have content read it
  window.addEventListener("message", function(event) {
    decodeMessage(event.data)
  }, false)

  //       SEND       //
  //////////////////////

  document.getElementById("refresh").addEventListener("click", function() {
    sendMessageToContent("command", "refresh", "app.js")
    diag("refresh()")
  }, false);

  document.getElementById("btn_add").addEventListener("click", function() {
    // sendMessageToContent("command", "insert", "app.js")
    diag("insert()")
  }, false);


  $("#drawer").click(function() {
    if (barOpen == false) {
      toggleBar()
      if (appOpen == false) {
        toggleApps()
      }
    }
    else if (barOpen == true) {
      toggleBar()
      if (appOpen == true) {
        toggleApps()
      }
      $("#intellisense").fadeOut()
      $("#results").hide()
      searchOpen = false
    }
  });

  $("#drawer").hover(function() {
    console.log('hover')
    hoverDrawer()
  });

  $("#search_btn").click(function() {
    toggleApps()
    toggleSearch()
    $("#intellisense_input").focus() // get the cursor into the search box
    $("#results").show()
  });

}

// RECIEVE
function decodeMessage(data) {
  // Filter by Data Type
  if (data.type) {
    switch (data.type) {
      // if type is a function, send to function delegator
      case "command":
        log("%c Command from " + data.sender + ":%c " + data.value + "()", logColor.green, logColor.blue);
        diag("Command from " + data.sender + ": " + data.value + "()", logColor.green, logColor.blue);
        break
        // if type is data, interpret it
      case "data":
        log("%c Data from " + data.sender + ":%c [" + data.value + "]", logColor.green, logColor.purple);
        diag("Data from " + data.sender + ": [" + data.value + "]", logColor.green, logColor.purple);
        break
        // if type is forward, send to BACKGROUND.JS
      case "forward":
        log("%c Forward from " + data.sender + ' to background.js:%c "' + data.value + '"', logColor.green, logColor.teal);
        diag("Forward from " + data.sender + ' to background.js: "' + data.value + '"', logColor.green, logColor.teal);
        break
      default:
    }
  }
} ///////////////////////////////////////////////////

// SEND
function sendMessageToContent(type, value, sender) {
  window.parent.postMessage({
    type: type,
    value: value,
    sender: sender
  }, "*")
} ///////////////////////////////////////////////////


///////////////////////////////////////////////////
//           Search Bar Functionality            //
///////////////////////////////////////////////////

setTimeout(function() {
  diag(isTyping())
  // isTyping()
}, wait2Load); // Wait until the DOM is loaded before adding eventListener

function isTyping() {
  var input = document.getElementById('intellisense_input');
  var timeout = null;
  var counter = 0;
  var isTyping = false;
  // Listen for keystroke events
  input.onkeyup = function(e) {
    if (e.keyCode == 32) {
      // alert('space')
      isTyping = false;
      diag(isTyping)
      colorKeys(input) // When we stop typing, update the colors of the keywords
    }
    else {
      // Clear the timeout if it has already been set.
      // This will prevent the previous task from executing
      // if it has been less than <MILLISECONDS>
      isTyping = true;
      diag(isTyping)
      clearTimeout(timeout);
      // Make a new timeout set to go off in 800ms
      timeout = setTimeout(function() {
        // console.log('Input Value:', input.value);
        counter++
        diag(counter + " " + input.value);
        isTyping = false;
        diag(isTyping)
        colorKeys(input) // When we stop typing, update the colors of the keywords
      }, inputDelay);
      if (input.value == "") {
        counter = 0;
      }
    }

    return isTyping
  };
}

function colorKeys(input) {
  var text = input.textContent
  console.log(input.textContent)
  var words = text.match(/[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*/gi); // Get all the words
  // var words = text.match(/[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*/gi); // Get all the words

  // text.replace(/&nbsp;/g, "")
  for (var w = 0; w < words.length && words.length != 0; w++) {
    switch (words[w]) {
      case 'state':
        console.log('hit!')
        input.innerHTML.replace("state", "hit")
        // input.innerHTML.replace('state', '<span style="color:blue">state</span>')
        break;
      case 'fate':
        console.log('boom!')
        // input.innerHTML.replace('fate', '<span style="color:green">fate</span>')
        break;
      default:
    }
  }

  console.log(words)
  input.textContent = "test"
  console.log(input.textContent)


}



///////////////////////////////////////////////////
//             Assorted Functions                //
///////////////////////////////////////////////////

function toggle() {
  $("#app").toggleClass("app-open") // Disable the open class to close it
  // $("#btn_toggle").fadeToggle(200)
  // setTimeout(function() {
  //   $("#btn_content").hide()
  // }, 400);



  // alert($("#app").attr("class"))
}



function hoverDrawer() {

}

// CLOSE BAR
var barOpen = false

function toggleBar() {
  // alert(barOpen)
  var bar = $("#bar")
  var apps = $("#bar-apps")
  var tri = $("#triangle")

  if (barOpen == true) {

    bar.animate({
      width: "0px",
      height: "50px"
    }, 100, "linear")
    bar.animate({
      backgroundColor: "#e93f3f"
    }, 400, "linear")

    setTimeout(function() {
      barOpen = false
    }, 0);

  }

  // OPEN BAR
  else if (barOpen == false) {
    bar.animate({
      width: "165px",
      height: "60px"
    }, 100, "linear")
    bar.animate({
      backgroundColor: "#33373e"
    }, 400, "linear")

    setTimeout(function() {
      barOpen = true
    }, 0);

  }
}


var appOpen = false

function toggleApps() {
  // alert(barOpen)
  var apps = $("#bar-apps")
  var tri = $("#triangle")

  if (appOpen == true) {
    apps.animate({
      width: "0px",
      height: "0px"
    }, 0, "linear")
    tri.animate({
      borderLeftWidth: "0px",
      borderRightWidth: "0px",
      borderTopWidth: "0px"
    }, 0, "linear")

    document.getElementById("bar-apps").style.boxShadow = "0 0 0px 0 rgba(0, 0, 0, .5)"
    setTimeout(function() {
      appOpen = false
    }, 0);

  }

  // OPEN BAR
  else if (appOpen == false) {

    apps.animate({
      width: "25px",
      height: "0px",
      bottom: "55px",
      borderRadius: "15px"
    }, 0, "linear")
    tri.animate({
      borderLeftWidth: "0px",
      borderRightWidth: "0px",
      borderTopWidth: "0px"
    }, 0, "linear")

    setTimeout(function() {
      apps.animate({
        borderRadius: "8px",
        height: "45px",
        width: "165px",
        bottom: "72px"
      }, 150, "linear")
      tri.animate({
        borderLeftWidth: "18px",
        borderRightWidth: "18px",
        borderTopWidth: "25px"
      }, 150, "linear")
    }, 150);

    setTimeout(function() {
      var appbar = document.getElementById("bar-apps")
      appbar.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, .5)"
      // appbar.style.borderBottom = "4px solid #ff5e5e"
    }, 340);

    setTimeout(function() {
      appOpen = true
    }, 0);

  }
}

var searchOpen = false

function toggleSearch() {
  // alert()
  $("#intellisense").fadeIn()
  searchOpen = true
}



// function refresh() {
//   alert('clicked!');
//   chrome.runtime.sendMessage("test");
//   // chrome.runtime.sendMessage({
//   //   action: 'toggle',
//   //   data: {
//   //     pageX: event.pageX,
//   //     pageY: event.pageY
//   //   }
//   // }, function() {})
// }
