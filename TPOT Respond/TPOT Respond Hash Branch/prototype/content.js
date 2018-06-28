// alert("Content.js")
var json
var database

///////////////////////////////////////////////////
//          Load and Format Database             //
///////////////////////////////////////////////////

// Get the focused element:
var $focused = $(':focus');

// Does the element have focus:
var hasFocus = $('foo').is(':focus');



$('body').mousedown(function() {
  var active = document.activeElement

  if (active.tagName == "INPUT" || active.tagName == "DIV" || active.tagName == "TEXTAREA") {
    console.log(active)
    console.log(active.contentEditable)
    console.log(active.type)
    if (active.contentEditable) {
      toggleSearch()
    }
    else if (active.type == "text") {
      toggleSearch()
    }
    else if (active.type == "input") {
      toggleSearch()
    }
    else {

    }
    // if (active.contentEditable == true || active.type = "text") {

    // }

  }
})




setTimeout(function() {
  // buildDatabase()
  // injectToolbox()
}, 50);

var isCtrl = false;
var isShift = false;
$(document).keyup(function(e) {
  if (e.which == 17) isCtrl = false;
}).keydown(function(e) {
  if (e.which == 17) isCtrl = true;
  if (isCtrl == true && e.which == 38) {
    // Run code when pressing CTRL + UP
    alert('Keyboard shortcuts + JQuery are even more cool!');
    return false;
  }
});


$('html, body').mousedown(function(event) {
  if (event.which == 3) {
    console.log('mouse position:', 'horizontal: ' + event.clientX, 'vertical: ' + event.clientY);
  }
});





function buildDatabase() {


  // COMBINATIONS (UNORDERED), NOT PERMUTATIONS!

  // a   ab   abc   abcd
  // b   ac   abd
  // c   ad   acd
  // d   bc   bcd
  //     bd
  //     cd

  // a     b    c    d
  // ab    bc   cd
  // ac    bd
  // ad    bcd
  // abc
  // acd
  // abd
  // abcd

  // d row = d
  // c row = c+{}, c+d
  //       = c, cd
  // b row = b+{}, b+d, b+c, b+cd
  //       = b, bd, bc, bcd
  // c row = a+{}, a+d, a+c, a+cd, a+b, a+bc, a+bd, a+bcd
  //       = a, ad, ac, acd, ab, abc, abd, abcd

  // Possible unique combinations:
  // P(26,1) + P(26,2) + P(26,3) + P(26,4) = 17,901 buckets (binary tree)

  // Global Integers
  var numCharKeys = 0
  var numEntries = 0
  var maxLetters = 0

  // Global Arrays
  var categories = []
  var keywords = []
  var badKeywords = []
  var charSortedArray = []
  var typeSortedArray = []
  var catgSortedArray = []
  var buckets = []


  var file = chrome.extension.getURL('data.json'); // Use if json data will be updated with extention
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("%c Loading JSON... ", logColor.blue);
      json = JSON.parse(this.responseText); // copy the parsed JSON data into variable
      console.log("%c JSON Parsing... ", logColor.blue);
    }
  };
  xmlhttp.open("GET", file, true); // open the file at the url 'file'
  console.group("%c [Load JSON Database]", logColor.blue)
  console.log("%c Data Loaded: " + file + "", logColor.blue);
  console.log("%c Open File", logColor.blue);
  xmlhttp.send();

  // JSON Needs Time to Load before being accessed
  var check = function() {
    if (json != null) {
      console.log("%c File to Load: ", logColor.blue, true)
      console.log("%c JSON Data: ", logColor.blue)
      console.log(json)
      console.groupEnd("[Load JSON Database]")
      console.group("%c [Sort Database]", logColor.yellow)
      defilter() // take all entries types and put them under single array
      regexTags() // take all entries, make comma separated tags as arrays
      getCategories() // read the json and determine the categories
      getKeywords() // read all entry tag arrays, remove bad keys, and make keywords array
      sortByChar() // get references for entries that contain a tag beginning with X letter
      sortByType() // get references for entries that are of type paper, or verse, etc.
      sortByCatg() // get references for entries that are under a certain category
      getMaxLetters() // calculate the max number of unique char tags per hash bucket
      console.groupEnd("[Sort Database]")
      console.group("%c [Build Buckets]", logColor.green)
      console.group("%c [Hash Codes]", logColor.green)
      createBuckets() // create buckets that match type and unique letter tags
      sortBuckets() // clean up hash names and duplicate buckets for each type of entry
      fillBuckets() // fill buckets by cross examining the char and catg sorted arrays
      console.groupEnd()
      console.groupCollapsed("%c [expand all]", logColor.green)
      printBuckets() // print all bucket combinations (should disable unless debugging)
      console.groupEnd()
      console.groupEnd("[Build Buckets]")
      console.log("Ready?...")
      setTimeout(function() {
        console.log("start")
        console.log(search(buckets, "@FHS0"))
        console.log("end")
      }, 2000);
      printLegend()
    }
    else {
      // console.log("%c Data Loaded:", logColor.teal, dataLoaded);
      setTimeout(check); // check again to see if file is loaded yet
    }
  }
  check();

  // De-Filter JSON Results. Add the type back as a property
  function defilter() {
    var arr = []
    for (var i = 0; i < json.papers.length; i++) {
      json.papers[i].type = "paper"
      arr.push(json.papers[i])
    }
    for (var i = 0; i < json.quotes.length; i++) {
      json.quotes[i].type = "quote"
      arr.push(json.quotes[i])
    }
    for (var i = 0; i < json.verses.length; i++) {
      json.verses[i].type = "verse"
      arr.push(json.verses[i])
    }
    database = arr;
  }

  // go through the index and regex out each tag and make tag arrays
  function regexTags() {
    for (var i = 0; i < database.length; i++) {
      database[i].tags = database[i].tags.match(/[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*/gi);
      // console.log(database[i].tags)
    }
  }

  function getCategories() {
    for (var i = 0; i < database.length; i++) {
      database[i].catg = database[i].catg.match(/[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*/gi);
      if (database[i].catg != null) {
        for (var c = 0; c < database[i].catg.length; c++) {
          categories.push(database[i].catg[c])
        }
      }
    }
    categories = removeDuplicates(categories)
    console.log("%c Categories: ", logColor.yellow, categories)
  }

  function getKeywords() {
    // get the keywords blacklist
    for (var i = 0; i < json.blacklistkeys.length; i++) {
      if (json.blacklistkeys[i] != "" && json.blacklistkeys[i] != null) {
        badKeywords.push(json.blacklistkeys[i])
      }
    }
    console.log("%c Blacklist Keys: ", logColor.yellow, (badKeywords))

    // get all keywords, valid or invalid from entries
    for (var i = 0; i < database.length; i++) {
      if (database[i] !== null && database[i].tags != null) {
        for (var t = 0; t < database[i].tags.length; t++) {
          keywords.push(database[i].tags[t])
        }
      }
    }
    keywords = removeDuplicates(keywords)
    keywords.sort()
    console.log("%c Original Database: ", logColor.yellow, (database))

    // nix the bad keywords from each entry and push the rest to the keywords arrays
    for (var e = 0; e < database.length; e++) {
      // console.log(database[e].tags) // DEBUG tags before
      if (database[e].tags != null) {
        var tags = []
        for (var t = 0; t < database[e].tags.length; t++) {
          if (database[e].tags[t] !== null) {
            for (var k = 0; k < badKeywords.length; k++) {
              if (database[e].tags[t] == badKeywords[k]) {
                database[e].tags[t] = ""
              }
            }
          }
          // remove duplicates and nulls
          if (database[e].tags[t] == "") {
            database[e].tags.splice(t, 1)
          }
          database[e].tags = removeDuplicates(database[e].tags)
        }
      }
      // console.log(database[e].tags) // DEBUG tags after
    }
    console.log("%c Whitelisted Database: ", logColor.yellow, (database))

    // fix the valid keywords array so it can search valid keys (nix the bad keys)
    for (var k = 0; k < keywords.length; k++) {
      for (var b = 0; b < badKeywords.length; b++) {
        if (keywords[k] == badKeywords[b]) {
          keywords[k] = ""
        }
      }
      if (keywords[k] == "") {
        keywords.splice(k, 1)
      }
    }
    keywords = removeDuplicates(keywords)
    console.log("%c Keywords: ", logColor.yellow, (keywords))

  } // End of getKeywords()

  // go through the index and sort entries by their letter
  function sortByChar() {
    console.log("%c Database: ", logColor.yellow, database, database.length)
    var arr = []
    for (var i = 0; i < 26; i++) {
      arr.push([]);
    }
    // for every entry
    for (var e = 0; e < database.length; e++) {
      // make sure the entry has tags in the first place
      if (database[e].tags != null) {
        // make a new array for tags first characters
        var char = []
        for (var t = 0; t < database[e].tags.length; t++) {
          // for every tag, get the first letter and push unique ones to the array.
          char.push(database[e].tags[t].charAt(0).toUpperCase())
        }
        // remove letters that already exist
        char = removeDuplicates(char)
        numCharKeys += char.length // get the number of tag letters
        // for every letter, push the entry's index reference to the sorted array
        for (var c = 0; c < char.length; c++) {
          // remember that 'e' represents the entry's index
          if (arr[char2index(char[c])] && e !== undefined) {
            arr[char2index(char[c])].push(e) // get the letter, its index number, and push the entry to that index number in arr arrary
          }
        }
      }
      numEntries++
    }
    console.log("%c Char Sorted Array: ", logColor.yellow, arr, numCharKeys)
    charSortedArray = arr; // store result
  }

  function sortByType() {
    var length = 0
    var arr = {
      "papers": [],
      "quotes": [],
      "verses": []
    }
    for (var e = 0; e < database.length; e++) {
      // make sure the entry has tags in the first place
      switch (database[e].type) {
        case "paper":
          arr.papers.push(e)
          break;
        case "verse":
          arr.verses.push(e)
          break;
        case "quote":
          arr.quotes.push(e)
          break;
        default:
      }
      length++
    }
    console.log("%c Type Sorted Array: ", logColor.yellow, arr, length)
    typeSortedArray = arr; // store result
  }

  function sortByCatg() {
    var arr = new Array(categories.length)
    for (var a = 0; a < arr.length; a++) {
      arr[a] = {
        name: categories[a],
        refs: []
      }
      for (var e = 0; e < database.length; e++) {
        if (database[e].catg != null) {
          for (var c = 0; c < database[e].catg.length; c++) {
            if (database[e].catg[c] == categories[a]) {
              // console.log()
              arr[a].refs.push(e)
            }
          }
        }
      }
      length++
    }
    console.log("%c Catg Sorted Array: ", logColor.yellow, arr, arr.length)
    catgSortedArray = arr; // store result
  }

  // calculate the average number of keys
  function getMaxLetters() {
    maxLetters = Math.ceil(numCharKeys / numEntries)
    console.log("%c Hash Code Length: ", logColor.yellow, maxLetters)
  }

  // create character combination posibilities
  function createBuckets() {

    buckets = getCharCombinations(0, 26, maxLetters)
    // console.log("%c raw: ", logColor.green, buckets)

    // Utilities
    function getCharCombinations(start, end, maxLetters) {
      var chars = ""
      for (var i = start; i < end; i++) {
        chars += index2char(i)
      }
      // chars = "abcdef"
      maxLetters = 4
      var results = []
      for (var i = 0; i < chars.length; i++) {
        var strLength
        // Record size as results length changes on every operation
        var resultsLength = results.length;
        for (var j = 0; j < resultsLength; j++) {
          strLength = (chars[i] + results[j]).length
          if (strLength <= maxLetters) {
            // console.log(strLength)
            results.push(chars[i] + results[j])
          }
        }
        strLength = (chars[i].length)
        if (strLength <= maxLetters) {
          // console.log(strLength)
          results.push(chars[i]);
        }
      }
      return results;
    }

  } // End of createBuckets()

  function sortBuckets() {
    // Clean up the buckets sorting alphabetically recursively.
    var arr = buckets
    for (var b = 0; b < buckets.length; b++) {
      buckets[b] = sortBucketsByChars(buckets[b]) // IMPORTANT!
    }
    arr.sort()
    buckets = arr;

    console.log("%c Number of Buckets Per Type: ", logColor.green, buckets.length)

    // Add in zeros to fill up hashes (not needed, but cleaner)
    var str = "0"
    var pfx = ""
    for (var b = 0; b < buckets.length; b++) {
      buckets[b] = sortBucketsByChars(buckets[b])
      // add x number zeros after hashes that are less than max length
      if (buckets[b].length < maxLetters) {
        buckets[b] += str.repeat(maxLetters - buckets[b].length)
      }
    }

    //__Filter_________Hash_________Query_________________________________________
    // ! category    = !judge    = "judging, "
    // @ paper       = @SFH00    = "the state fate "
    // # verse       = #WPTCH    = "verse, woe pharisees twofold children hell "
    // $ quote       = $WEB00    = "quote, we enter by faith "

    // make buckets for each type
    var papers = prefixBuckets(buckets, "@", maxLetters)
    var verses = prefixBuckets(buckets, "#", maxLetters)
    var quotes = prefixBuckets(buckets, "$", maxLetters)


    // defilter and combine buckets under parent
    var combine = []

    for (var p = 0; p < papers.length; p++) {
      combine.push(papers[p])
    }
    for (var v = 0; v < verses.length; v++) {
      combine.push(verses[v])
    }
    for (var q = 0; q < quotes.length; q++) {
      combine.push(quotes[q])
    }

    buckets = combine
    console.log("%c All Possible Combinations: ", logColor.green, (arr.length * 3))
    console.log(arr)
    // console.log("Combinations: ", arr, "Papers", papers, "Verses", verses, "Quotes", quotes)

    function prefixBuckets(arr, pfx, max) {
      var buckets = []
      // make a copy of the source array
      for (var i = 0; i < arr.length; i++) {
        buckets.push(arr[i])
      }
      // modify the copy
      for (var b = 0; b < buckets.length; b++) {
        buckets[b] = pfx + buckets[b]
      }
      return buckets // return the copy
    }

    // Utilities
    function sortBucketsByChars(text) {
      return text.split('').sort().join('');
    }

  } // End of sortBuckets()


  function fillBuckets() {
    var filledBuckets = []
    // start filling buckets that have matches for type and letters
    for (var b = 0; b < buckets.length; b++) {
      buckets[b] = {
        hash: buckets[b],
        refs: []
      }

      var refs = [] // new refs to store
      var hash = buckets[b].hash.slice(1) // kill the first character, get the rest
      var chars = (hash).split("")

      // get references that match Letters
      for (var c = 0; c < chars.length; c++) { // get all characters of hash
        for (var a = 0; a < charSortedArray.length; a++) {
          if (index2char(a) == chars[c]) { // get the characters that match the sorted array
            refs.push(charSortedArray[a]) // push the ones that match
          }
        }
      }
      // console.log(chars, letters) // Keep disabled unless debuggin char refs

      // get references that match type
      var type = buckets[b].hash.charAt(0) // get the special character prefix
      switch (type) {
        case "@":
          refs.push(typeSortedArray.papers)
          type = "paper"
          break;
        case "#":
          refs.push(typeSortedArray.verses)
          type = "verse"
          break;
        case "$":
          refs.push(typeSortedArray.quotes)
          type = "quote"
          break;
        default:
      }



      // if (b == 16000) {
      //   buckets[b].refs = [
      //     [],
      //     [],
      //     []
      //   ]
      // }

      var results = getDuplicates(refs)
      if (results.length == 0) {
        buckets[b].refs = results
        // console.log(buckets[b].refs, "false")
        // buckets.splice(b, 1)
      }
      else {
        buckets[b].refs = results
        filledBuckets.push(buckets[b])
        // console.log(buckets[b].refs)
      }
      // buckets[b].refs =  // Time consuming operation here...


    } // end of initial fill for loop




    // console.log("Filled Buckets", buckets)

    // for (var b = 0; b < buckets.length; b++) {
    //   if (buckets[b].refs.length == 0) {
    //     buckets.splice(b, 1)
    //     // console.log(true)
    //   }
    // }

    console.log("%c Filled Buckets: ", logColor.green, filledBuckets.length)
    buckets = filledBuckets // store results

    // console.log(typeSortedArray.quotes)
    // console.log(buckets[18].refs, buckets[20595].refs, buckets[16000].refs) // 20595 == 1271

  } // End of sortBuckets()

  function printBuckets() {
    for (var b = 0; b < buckets.length; b++) {
      console.log("%c Hash: ", logColor.green, buckets[b].hash, "", buckets[b].refs)
    }
  }

  function search(buckets, hash) {
    // console.log(array[hash])
    for (var i = 0; i < buckets.length; i++) {
      if (buckets[i].hash === hash) {
        return buckets[i].refs
      }
    }
  }


  function printLegend() {
    console.groupEnd()
    var leg = []
    for (var i = 0; i < 26; i++) {
      leg.push("        " + i + " = " + index2char(i) + "\n");
    }
    var msg = "\n"
    for (var i = 0; i < leg.length; i++) {
      msg += leg[i]
    }
    console.log("%c Legend: " + msg + "", logColor.teal, )
  }
  //
  //
  //
  //
  //
  //
  //
} // END OF BUILD DATABASE




// Utilities

function char2index(a) {
  i = a.charCodeAt(0) - 65
  return i;
}

function index2char(i) {
  a = String.fromCharCode(i + 65)
  return a;
}

function removeDuplicates(arr) {
  let unique_array = Array.from(new Set(arr))
  return unique_array
}

function getDuplicates() {
  var result = [];
  var lists;
  if (arguments.length === 1) {
    lists = arguments[0];
  }
  else {
    lists = arguments;
  }
  for (var i = 0; i < lists.length; i++) {
    var currentList = lists[i];
    for (var y = 0; y < currentList.length; y++) {
      var currentValue = currentList[y];
      if (result.indexOf(currentValue) === -1) {
        if (lists.filter(function(obj) {
            return obj.indexOf(currentValue) == -1
          }).length == 0) {
          result.push(currentValue);
        }
      }
    }
  }
  return result;
}





// function getCharCombinations(start, end, maxLetters) {
//   var chars = ""
//   for (var i = start; i < end; i++) {
//     chars += index2char(i)
//   }
//   chars = "abcdef"
//   var results = []
//   for (var i = 0; i < chars.length; i++) {
//     // Record size as results length changes on every operation
//     var resultsLength = results.length;
//     for (var j = 0; j < resultsLength; j++) {
//       var concat = chars[i] + results[j]
//       // if ((concat.length) > maxLetters) {
//       // break
//       // }
//       // else {
//       results.push(chars[i] + results[j])
//       // }
//     }
//     results.push(chars[i]);
//   }
//   return results;
// }
// } // End of Hash Codes

// var json =
//   var json = chrome.runtime.getURL('data.json')
// // var data = JSON.stringify(json.responseText);
// // var test = JSON.parse(data);
// setTimeout(function() {
//   console.log(json.responseText)
// }, 100);

// readTextFile = function(file) {
//   var rawFile = new XMLHttpRequest();
//   rawFile.open("GET", file, false);
//   rawFile.onreadystatechange = function() {
//     if (rawFile.readyState === 4) {
//       if (rawFile.status === 200 || rawFile.status == 0) {
//         var allText = rawFile.responseText;
//         doSomethingWithTheText(allText);
//       }
//     }
//   }
//   rawFile.send(null);


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

///////////////////////////////////////////////////
//         Injecting and Refreshing App          //
///////////////////////////////////////////////////

if (document.getElementById('TPOT_Respond_App') == null) {
  console.clear()
  injectApp();
  setTimeout(function() {
    if (document.getElementById('TPOT_Respond_App') != null) {
      console.log('%c Insert App Verified!', logColor.red)
      console.groupEnd('[App Injection Startup]');
    }
  }, 10);
}

function injectApp() {
  console.group('%c [App Injection Startup]', logColor.purple)
  // Create iFrame
  var iframe = document.createElement("iframe")
  iframe.id = 'TPOT_Respond_App';
  iframe.src = chrome.runtime.getURL('app.html');
  // iframe.className = "app-close app-open app-delta frame-hide"
  iframe.className = "frame frame-icon"
  console.log('%c Creating iFrame...', logColor.purple)
  // Create button
  var controls = document.createElement("div")
  controls.id = "controls";
  // Append iFrame
  $("body").prepend(iframe);
  // $("#TPOT_Respond_App").addClass("app-close", "app-delta", "app-open")

  console.log('%c adding iFrame to page...', logColor.purple)
  // Append Controls
  $("#TPOT_Respond_App").after(controls);
  var button1 = document.createElement("button")
  button1.id = "btn_refresh";
  button1.innerHTML = "Refresh iFrame";
  var button2 = document.createElement("button")
  button2.id = "btn_toggle";
  button2.innerHTML = "Toggle Modal";
  var button3 = document.createElement("button")
  button3.id = "btn_float";
  button3.innerHTML = "Toggle Search";
  $("#controls").append(button1, button2, button3);
}

function refreshApp() {
  var iframe = document.getElementById('TPOT_Respond_App')
  if (iframe != null) {
    iframe.src = chrome.runtime.getURL('app.html');
    console.log('%c Refreshed iFrame!', logColor.yellow)
  }
}


///////////////////////////////////////////////////
//     Send and Recieve Messages from APP.JS     //
///////////////////////////////////////////////////

//     RECIEVE      //
//////////////////////

window.addEventListener("message", function(event) {
  decodeMessage(event.data)
}, false);

function decodeMessage(data) {
  // Filter by Data Type
  if (data.type) {
    switch (data.type) {
      // if type is a function, send to function delegator
      case "command":
        console.log("%c Command from " + data.sender + ":%c " + data.value + "()", logColor.green, logColor.blue);
        refreshApp()
        break;
        // if type is data, interpret it
      case "data":
        console.log("%c Data from " + data.sender + ":%c [" + data.value + "]", logColor.green, logColor.purple);
        break;
        // if type is forward, send to BACKGROUND.JS
      case "forward":
        console.log("%c Forward from " + data.sender + ' to background.js:%c "' + data.value + '"', logColor.green, logColor.teal);
        break;
      default:
    }
  }
}

//       SEND       //
//////////////////////

document.getElementById("btn_refresh").addEventListener("click", function() {
  refreshApp()
}, false)
document.getElementById("btn_toggle").addEventListener("click", function() {
  sendMessageToApp("command", "toggleSearch", "content.js")
  // toggleApp()
  toggleModal()
}, false)
document.getElementById("btn_float").addEventListener("click", function() {
  sendMessageToApp("command", "toggleModal", "content.js")
  // floatApp()
  toggleSearch()

}, false)

function toggleSearch() {
  var frame = $("#TPOT_Respond_App")
  if (frame.hasClass("frame-hide")) {
    frame.removeClass("frame-hide")
    frame.addClass("frame-search")
  }
  else if (frame.hasClass("frame-search")) {
    frame.removeClass("frame-search")
    frame.addClass("frame-hide")
  }
}

function toggleModal() {
  var frame = $("#TPOT_Respond_App")
  if (frame.hasClass("frame-hide")) {
    frame.removeClass("frame-hide")
    frame.addClass("frame-modal")
  }
  else if (frame.hasClass("frame-modal")) {
    frame.removeClass("frame-modal")
    frame.addClass("frame-hide")
  }
}

function sendMessageToApp(type, value, sender) {
  document.getElementById('TPOT_Respond_App').contentWindow.postMessage({
    type: type,
    value: value,
    sender: sender
  }, "*")
}

///////////////////////////////////////////////////
//     Other                                     //
///////////////////////////////////////////////////

function toggleApp() {
  $("#TPOT_Respond_App").toggleClass("app-open")
}

function floatApp() {
  $("#TPOT_Respond_App").toggleClass("app-delta", false)
}

function listenToChromeMessages() {}





//// Backup
/////////////////////////////



// function filter(buckets, position) {
//   // run through all the Letters (0-25)
//
//   // get the first bucket that matches the letter at character position (0, 1, 3, 4)
//
//   // store the rest of the buckets that start with the matching letter
//
//   // put the rest under the first bucket letter match
//
//   // get the rest (new buckets) and run the filter again
//
//   // RUN AGAIN
//   // filter(stored, position + 1);
//
// }




// // filter(buckets, 4)
//
// function filter(buckets, position) {
//   var pos = (4 - position)
//
//
//
//   // run through all the Letters (0-25)
//   for (var a = 0; a < 26; a++) {
//     console.log("bucket before", buckets)
//     var first = 0
//     var last = 0
//     var hold = []
//     console.group("Letter " + index2char(a))
//
//     for (var b = 0; b < buckets.length; b++) {
//       // Does does bucket(b) contain letter(a) @ pos()?
//
//       // console.log(pos)
//       // Case: Search "A", match "A"
//       if (buckets[b].toString().charAt(pos) == index2char(a) && buckets[b].length == (pos + 1)) {
//         console.log("STATS: ", "b", b, "a", a, "char", index2char(a), "pos", pos, "len", (pos + 1))
//         console.log("%c KEEP", buckets[b])
//         first = b;
//         // var name = index2char(a)
//         buckets[b] = {
//           "bucket": {
//             name: buckets[b],
//             refs: [2, 4, 6, 10, 30, 50],
//             hold: ["AB", "BC", "CZ", "BX"]
//           }
//         }
//         console.log("%c KEEP", logColor.green, buckets[b])
//       }
//
//       // Case: Search "A", match "A"
//       else if (buckets[b].toString().charAt(pos) == index2char(a) && buckets[b].length > (pos + 1)) {
//         console.log("STATS: ", "b", b, "a", a, "char", index2char(a), "pos", pos, "len", (pos + 1))
//
//         hold.push(buckets[b])
//         console.log("%c HOLD", logColor.red, buckets[b], b)
//       }
//
//       // Case: Search "A", no Match?
//       else {
//         last = hold.length + first
//         if (last == 0) {
//           last = buckets.length
//         }
//         // return
//         // last = b;
//       }
//
//       if (buckets[first].bucket == undefined) {
//         console.log("CRAP!")
//         break
//       }
//       else {
//         buckets[first].bucket.hold = hold
//       }
//
//
//     }
//     // console.log("Letter", index2char(a))
//     // buckets[b].bucket
//
//     console.log("%c REMOVE", logColor.red, first + 1, last)
//     buckets.splice((first + 1), (last - first))
//
//     // console.log("Subs", buckets)
//     // console.log(typeof buckets[first])
//     // if (buckets === undefined) {
//     // console.log(true)
//
//
//     // }
//     // else
//     // console.log("%c FILL", logColor.purple, hold)
//
//     // console.log(buckets[first].bucket.name)
//     // console.log("hold", hold, "first", first, "last", last)
//
//
//     if (position > 0) {
//       if (buckets[first].bucket == undefined) {
//         console.log("CRAP 2!")
//         // break
//       }
//       else {
//         console.log("%c NEW SUB-BUCKETS", logColor.blue, buckets[first].bucket.hold)
//         return filter((buckets[first].bucket.hold), (position - 1))
//       }
//       // console.log(true)
//       // if (buckets[first].bucket != undefined) {
//       //   buckets[first].bucket.hold = hold
//       // }
//
//     }
//     else {
//       // return
//     }
//
//     console.groupEnd()
//
//
//   }
//
//   console.log("%c BUCKET TREE", logColor.yellow, buckets)
