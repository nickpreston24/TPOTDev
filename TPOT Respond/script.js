/*Handle requests from background.html*/
function handleRequest(
  //The object data with the request params
  request,
  //These last two ones isn't important for this example, if you want know more about it visit: http://code.google.com/chrome/extensions/messaging.html
  sender, sendResponse
) {
  if (request.callFunction == "toggleSidebar")
    toggleSidebar();
}
chrome.extension.onRequest.addListener(handleRequest);

/*Small function wich create a sidebar(just to illustrate my point)*/
var sidebarOpen = false;

function toggleSidebar() {
  if (sidebarOpen) {
    var el = document.getElementById('app');
    el.parentNode.removeChild(el);
    sidebarOpen = false;
  }
  else {
    var sidebar = document.createElement('div');
    sidebar.id = "app";
    sidebar.innerHTML = "\
			<h1>Hello</h1>\
			World!\
		";
    sidebar.style.cssText = "\
			position:relative;\
			// top:0px;\
			// left:0px;\
			width:500px;\
			height:800px;\
			background:lightgrey;\
			z-index:9999 !important;\
		";


    var pageHTML = document.body.innerHTML; //Store ALL Website data in BODY tag
    document.body.innerHTML = ''; // Clear BODY tag
    document.body.style.cssText = "\
      left:500px;\
    ";
    var app = document.createElement('div'); // Create new App Window Parameters
    app.id = "app";
    app.className += "w3-row app";
    app.style.cssText = "\
      z-index: 999999999999999 !important;\
      border: 1 px solid red;\
      background-color: grey;\
    ";
    app.innerHTML = "\
      <div id='panel' class='w3-col'><p>150px</p></div>\
      <div id='frame'class='w3-rest w3-green'><p>rest</p></div>";
    document.body.appendChild(app); // fill empty BODY tag with app
    var panel = document.getElementById('panel'); // get the newly created panel
    var frame = document.getElementById('frame'); // get the newly created frame
    console.log("app: ", app);
    console.log("panel: ", panel);
    console.log("frame: ", frame);
    console.log("pageHTML: ", pageHTML);
    panel.innerHTML = "<h1>TPOT Response</h1>";
    frame.innerHTML = pageHTML; // RESTORE ALL PAGE DATA BACK INTO FRAME!!! SUPER IMPORTANT!!!

    panel.style.cssText += "\
      height: 100vh;\
      width: 500px;\
      background-color: grey;\
      overflow: hidden;\
      z-index: 9000 !important;\
      float: left !important;\
    ";


    frame.style.cssText += "\
      background-color: lightgrey;\
      overflow: scroll;\
      float: left !important \
      z-index: 900 !important;\
    ";


    // var bodyTag = document.body;
    // var firstChild = bodyTag.firstElementChild;

    // firstChild.insertBefore(sidebar);
    // document.body.insertBefore(sidebar, document.body.firstChild);
    // document.body.insertBefore(startFrame, document.body.firstChild);
    // bodyTag.insertBefore(sidebar, bodyTag.childNodes[0])
    // console.log(bodyTag)
    // console.log(bodyTag.outerHTML)
    // console.log(firstChild)
    // console.log(firstChild.outerHTML)
    // document.body.appendChild(sidebar);
    sidebarOpen = true;
  }
}
