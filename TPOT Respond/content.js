/////////////////////////////////////////
//             content.js              //
/////////////////////////////////////////
//  • Loaded on every tab on refresh   //
//  • Get commands from background.js  //
//  • Toggle / Attach / Refresh app    //
//  • Float app frame left or right    //
//  • Start with Chrome option         //
//  •                                  //
/////////////////////////////////////////


/////////////////////////////////////////
//             Variables               //
/////////////////////////////////////////

var appInjected = false;


/////////////////////////////////////////
//             Start Code              //
/////////////////////////////////////////

// Add CSS
var style = document.createElement('link');
style.rel = "stylesheet";
style.type = "text/css"
style.href = "content_css";
style.onload = function() {
  //do stuff with the css
};
style.href = chrome.extension.getURL('content.css');
document.head.appendChild(style); //or something of the likes

// Add App to Tab(Later All Tabs)

var app = document.createElement("div");
app.id = "app";
app.className = "app";
// alert('test');

// <BODY> Styling
document.body.style.position = "relative";
document.body.style.minHeight = "100%";
document.body.style.top = "0px";
document.body.prepend(app);

// <HTML> Styling
// document.documentElement.style.width = "width: calc(100% - 400px);";

var controls = document.createElement("div");
controls.id = "controls";
controls.style.position = "fixed";
controls.style.top = "0px";
controls.style.right = "0px";
controls.style.zIndex = "2030";
controls.innerHTML += "\
<button id='btn_toggle'>Toggle</button>\
<button id='btn_attach'>Attach</button>\
<button id='btn_refresh'>Refresh</button>\
";
app.append(controls);

// attach();
insert();
toggle();


/////////////////////////////////////////
//          Button Listeners           //
/////////////////////////////////////////

// Toggle
document.getElementById("btn_toggle").addEventListener("click", function() {
  toggle();
});

// Attach
document.getElementById("btn_attach").addEventListener("click", function() {
  attach();
});

// Refresh
document.getElementById("btn_refresh").addEventListener("click", function() {
  refresh();
});


/////////////////////////////////////////
//        Button Functionality         //
/////////////////////////////////////////

function toggle() {
  // alert('toggle!');
  var x = document.getElementById("app")
  if (x.className == "app") {
    x.classList.add("app-open");
    // alert('case1');
  }
  else if (x.className == "app app-open") {
    x.classList.add("app-close");
    x.classList.remove("app-open");
    // alert('case2');
  }
  else if (x.className == "app app-close") {
    x.classList.add("app-open");
    x.classList.remove("app-close");
    // alert('case3');
  }


  // if (x.className = "app-close") {
  //   x.classList.add("app-open");
  //   alert(x.className);
  // }
  // else if (x.className = "app-close app-open") {
  //   x.classList.remove("app-open");
  //   alert(x.className);
  // }


  // else if (x.className == "app-close app-open") {
  // x.style.width = "380px";
  // x.className -= "app-open";
  // }

  // attach();
}

function attach() {
  // alert(document.documentElement.style.width);
  if (document.documentElement.style.width == "calc(100vw - 380px)") {
    document.documentElement.style.width = "";
  }
  else if (document.documentElement.style.width == "") {
    document.documentElement.style.width += "calc(100vw - 380px)"
  }
}

function refresh() {
  insert();
  remove();
  // alert('refreshed!');
}


/////////////////////////////////////////
//          Injection Logic            //
/////////////////////////////////////////

function insert() {

  // Add HTML
  var sidebar = document.createElement("div");
  sidebar.id = "sidebar";
  sidebar.setAttribute("w3-include-html", chrome.extension.getURL('app.html'));
  app.appendChild(sidebar);
  includeHTML();
  // alert('inserted html');

  // Add JS
  var script = document.createElement('script');
  script.onload = function() {
    //do stuff with the script
  };
  script.src = chrome.extension.getURL('app.js');
  document.head.appendChild(script); //or something of the likes
  // alert('inserted javascript');

  // Add CSS
  var style = document.createElement('link');
  style.rel = "stylesheet";
  style.type = "text/css"
  style.href = "content_css";
  style.onload = function() {
    //do stuff with the script
  };
  style.href = chrome.extension.getURL('app.css');
  document.head.appendChild(style); //or something of the likes
  // alert('inserted css');

  // var style2 = document.createElement('link');
  // style2.rel = "stylesheet";
  // style2.type = "text/css"
  // style2.href = "content_css";
  // style2.onload = function() {
  //   //do stuff with the script
  // };
  // style2.href = "https://use.fontawesome.com/releases/v5.0.10/js/all.js";
  // document.head.appendChild(style2); //or something of the likes
  // // alert('inserted css');

}

function remove() {
  var parent = document.getElementById("app");
  var child = document.getElementById("sidebar");
  parent.removeChild(child);
}

function refreshWebResources() {

}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}




// In the Page, is the app already injected?
function isAppInjected() {
  var x = document.getElementById("app");
  if (x != null) {
    appInjected = true;
  }
  else {
    appInjected = false
  }
}
