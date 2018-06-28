var status = {
    "appState": "open", // open/closed/compact
    "currentWindow": "Sort",
    "sideBar": "open", // open/compact/closed
    "loader": false,
    "openWindows": [
        "checkout",
        "sort"
    ],
}

const test = (msg) => {
    console.log(msg)
}

const setCurrentNavBtn = (event) => {
    $(".navigation-btn").removeClass("active")
    $(event.target).closest("button").addClass("active")
}

const addEventListeners = (e) => {
    const webview = document.querySelector('webview')
    const currentWindow = remote.getCurrentWindow()

    // Window
    $("#exit-btn").click(()=>{currentWindow.close()})
    $("#minimize-btn").click(()=>{currentWindow.minimize()});
    $("#maximize-btn").click(()=>{if (!currentWindow.isMaximized()) {currentWindow.maximize()} else {currentWindow.unmaximize()}})

    // Navigation
    // $("#btn-logout").click(()=>{webview.loadURL('https://www.google.com/')})
    $("#btn-checkout").click(()=>{setCurrentNavBtn(event);webview.loadURL('file://C:/Users/Braden/Documents/GitHub/electronTest/assets/sections/checkout/checkout.html')})
    $("#btn-sort").click(()=>{setCurrentNavBtn(event);webview.loadURL('file://C:/Users/Braden/Documents/GitHub/electronTest/assets/sections/sort/sort.html')})
    $("#btn-edit").click(()=>{setCurrentNavBtn(event);webview.loadURL('https://www.tinymce.com/')})
    $("#btn-preview").click(()=>{setCurrentNavBtn(event);webview.loadURL('https://www.google.com/')})
    $("#btn-publish").click(()=>{setCurrentNavBtn(event);webview.loadURL('https://wordpress.com/')})
    $("#btn-settings").click(()=>{setCurrentNavBtn(event);webview.loadURL('https://demos.creative-tim.com/vue-material-dashboard/?_ga=2.46042212.1762759285.1529897635-552932777.1529897635#/dashboard')})

    // Admin
    $("#ctrl-refresh").click(()=>{location.reload()})
    $("#ctrl-refresh-webview").click(()=>{webview.loadURL(webview.getURL())})
    $("#ctrl-destroy").click(()=>{/* Code here */})
    $("#ctrl-destroy-webview").click(()=>{ui.test("UI Module Loaded")})

    // webview.addEventListener('dom-ready', () => { // be careful this guy reloads every time the dom loads, which is fast
    //     // webview.openDevTools()
    //     var css = "::-webkit-scrollbar{width:10px}::-webkit-scrollbar-track{border-radius:10px;background:#e7e2de}::-webkit-scrollbar-thumb{background:#3498db;border-radius:10px}::-webkit-scrollbar-thumb:hover{background:#277db6}"
    //     webview.insertCSS(css)

    //     // webview.loadURL('https://www.github.com/')
    //     console.log(webview, "const webview")

    // })
        

    
        // console.log($('#ctrl-refresh').innerHTML);

    


    // setTimeout(bar.animate(0.2),1000)



    // document.getElementById("navigation-current-triangle").style.fill = '#e7e2de'




        


    console.log('added event listeners')
}


const createCircle = (percent) => {
    // Create Circular Progress Bar
    var bar = new progress.Circle('#progress-circle', {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailColor: 'rgba(40, 43, 58, 0.3)',
        trailWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#c94040', width: 8 },
        to: { color: '#7bc45a', width: 8 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
            circle.setText('');
            } else {
            circle.setText(value + '%');
            }

        }
    })

    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    bar.text.style.marginTop = '-12px';
    bar.text.style.color = '#ddd';
    // bar.text.style.transform = 'translateX(50%)';

    var subText = document.createElement("p")
    subText.id = "progressbar-subtext"
    subText.innerHTML = "COMPLETED"
    var parent = document.getElementById("progress-circle")
    parent.prepend(subText)

    bar.animate(percent);  // Number from 0.0 to 1.0
}

const destroyCircle = () => {
    $("#progress-circle").remove()
}

const updateCircle = (percent) => {
    var offset = $("#progress-circle svg path:last").get(0) // get(i) is better than [i], doesn't break when there is no index referenced
    console.log(offset)
    var length = offset.style.strokeDashoffset
    var amt = length - (length / 100 * percent)    
    var text = $("#progress-circle div").get(0).textContent = percent + "%"
    if (percent == 0) {
        offset.style.strokeDashoffset = none
    } else{
        offset.style.strokeDashoffset = amt
    }
    // console.log(offset, percent, amt, text)
}

module.exports = {
    status,
    addEventListeners,
    createCircle,
    updateCircle,
    destroyCircle,
    setCurrentNavBtn,
    test
}