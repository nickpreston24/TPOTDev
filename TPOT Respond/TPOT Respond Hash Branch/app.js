/////////////////////////////////////////
//              app.js                 //
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

var data;


/////////////////////////////////////////
//             Start Code              //
/////////////////////////////////////////

// Give some time for content.js to inject its contents into the page
setTimeout(function() {
  refreshJSON();
}, 250);

function test() {
  alert('I am here again!');
  toggle();
  alert('Hash');
}


/////////////////////////////////////////
//          Button Listeners           //
/////////////////////////////////////////

// // Search Bar
// document.getElementById("btn_verse").firstElementChild.addEventListener("input", function() {
//   isTyping()
//   // searchJSON(this, event.inputType);
//   // console.log(event)
//   // var search = getKeywords(data)
//   // var results = queryData(search, data);
//   // refreshResults(results);
// });

// var timer = null;
// $('#response').keydown(function() {
//   clearTimeout(timer);
//   timer = setTimeout(doStuff, 1000)
// });
//
// function doStuff() {
//   alert('do stuff');
// }


// $(document).ready(function() {
//   $("test_btn").click(function() {
//     var txt = "";
//     txt += "Document width/height: " + $(document).width();
//     txt += "x" + $(document).height() + "\n";
//     txt += "Window width/height: " + $(window).width();
//     txt += "x" + $(window).height();
//     alert(txt);
//   });
// });



function isTyping() {
  console.log(":");

}

// Insert Button
document.getElementById("btn_add").addEventListener("click", function() {
  refreshJSON();
  // console.log(data);
});

/////////////////////////////////////////
//          Search Functions           //
/////////////////////////////////////////

//insertText
//deleteContentBackward
//historyUndo
//insertFromPaste
//(type == "insertText" || type == "deleteContentBackward" || type == "historyUndo" || type == "insertFromPaste")


function searchJSON(element, type) {
  var chars = element.value;
  // console.log(chars, type)
  // isTyping(chars)

}

// function isTyping(chars) {
//   var prev = 0;
//   var next = 0;
//   // Wait 250mils before seeing if the content changed
//   var check = function() {
//     // console.log("Prev", prev)
//     // console.log("Next", next)
//     prev = next;
//     next = chars.length;
//     if (prev == next) {
//       // run when condition is met
//       console.log("FALSE")
//     }
//     else {
//
//       setTimeout(check, 5000000); // check again in a second
//
//     }
//     // console.log("Prev", prev)
//     // console.log("Next", next)
//   }
//   check();
//   console.log("TRUE")
// }



/////////////////////////////////////////
//        Button Functionality         //
/////////////////////////////////////////

function refreshJSON() {
  var span = document.getElementById("JSON_DATA")
  // [GLOBAL VAR] - Set data to parsed JSON
  if (span != null) {
    data = JSON.parse(span.innerHTML);
  }
}

function refreshResults(query) {}

function queryData(keywords, data) {
  var hits = [];

  console.group("[Search Results]");
  filterType();
  filterCatg();
  filterTags();
  console.log("SearchWords:", keywords);
  console.log("Results:", hits);
  console.groupEnd("[Search Results]");

  function filterType() { // FILTER BY ADDITION
    // Get Filters from Keywords Object
    var tmpFilters = ["papers", "verses", "quotes"];
    console.log("Filters: ", tmpFilters)
    // Get all filters (even if many) and pop them into hits[] to search
    for (var f = 0; f < tmpFilters.length; f++) {
      switch (tmpFilters[f]) {
        case "papers":
          hits.push(data.papers);
          break;
        case "verses":
          hits.push(data.verses);
          break;
        case "quotes":
          hits.push(data.quotes);
          break;
        default:
      }
    }
  }

  function filterCatg() { // FILTER BY REMOVAL
    var arr = [];
    // Get Filters from Keywords Object
    // var tmpCategories = [];
    var tmpCategories = ["hell", "theo", "testimony", "music", "poems", "proverbs"];
    // if there are no category tags, then don't filter
    if (tmpCategories.length == 0) {
      for (var i = 0; i < hits.length; i++) {
        if (hits[i] != null) {
          for (var p = 0; p < hits[i].length; p++) {
            arr.push(hits[i][p]);
          }
        }
      }
      // console.log(hits);
      // console.log(arr);
      hits = arr;
    }
    else if (tmpCategories.length > 0) {
      console.log("Numb Catg:", tmpCategories.length);

      console.log("Categories: ", tmpCategories)
      // Get every type[i] in hits
      for (var i = 0; i < hits.length; i++) {
        // Get every paper/verse/quote[p]
        if (hits[i] != null) {
          for (var p = 0; p < hits[i].length; p++) {
            // get the categories of each
            if (hits[i][p].catg != null && hits[i][p].catg != "") {
              var match = false;
              // Regex the categories of each
              var chars = hits[i][p].catg
              var words = chars.match(/[a-z,]+($|\s+)/gi);
              for (var w = 0; w < words.length; w++) {
                words[w] = words[w].replace(/^\s+|\s+$|[,]|\s+(?=\s)/g, "");
              }
              // Check every entry's {catg} against selected categories
              for (var c = 0; c < tmpCategories.length; c++) {
                for (var w = 0; w < words.length; w++) {
                  if (tmpCategories[c] == words[w]) {
                    match = true;
                  }
                }
              }
              // If at least one of the categories matches, push
              if (match) {
                arr.push(hits[i][p]);
              }
            }
          }
        }
      }
      //Publish new hits[]
      hits = arr;
    }

  }

  function filterTags() {
    // Array to Source
    var arr = hits;

    // Ping array
    var pingArr = [
      [], // 0 Pings
      [], // 1 Pings
      [], // 2 Pings
      [], // 3 Pings
      [], // 4 Pings
      [], // 5 Pings
      [], // 6 Pings
      [], // 7 Pings
      [], // 8 Pings
      [], // 9 Pings
      [] // 10 Pings
    ];
    var ping = 0;
    // console.log(arr[a].name);
    // FOR EVERY HIT
    for (var a = 0; a < arr.length; a++) {

      var chars = arr[a].tags

      // FOR EVERY TAG {
      var words = chars.match(/[a-z,]+($|\s+)/gi);
      if (words != null) {
        for (var w = 0; w < words.length; w++) {
          words[w] = words[w].replace(/^\s+|\s+$|[,]|\s+(?=\s)/g, "");
        }
        // Search Confirmed First
        console.group(arr[a].name);
        for (var k = 0; k < keywords.length; k++) {
          if (Array.isArray(keywords[k]) == false) {
            // Match a confirmed keyword first
            for (var w = 0; w < words.length; w++) {
              if (words[w] == keywords[k]) {
                console.log(keywords[k])
                ping++; // Only confirmed words get a ping
              }
            }
          }
          else {
            console.log("array")
          }
        }
        console.log("Ping: ", ping);
        console.groupEnd();
        for (var p = 0; p < pingArr.length; p++) {
          // Only add ping entries that had tag matches
          if (ping == p && ping >= 1) {
            var push = pingArr[p];
            push.push(arr[a])
          }
        }
        ping = 0 //!!! RESET PING!!
      }

    }

    // Put highest pings on top
    pingArr.reverse();
    // Assign highest pings to first[]
    var first = []
    for (var e = 0; e < pingArr.length; e++) {
      if (pingArr[e] != "") {
        first.push(pingArr[e])
      }
    }
    // console.log("Ping Array: ", arr);

    // Put Pings first, then alternate results
    arr = first

    // Publish Results
    hits = arr;

    // End of filter
  }

}

function getKeywords(data) {
  // console.log(data)
  // Sample Keywords, Load Manifest Here.

  var keywords = data.keywords;
  // var keywords = ["hell", "state", "fate", "forgiveness", "family", "life", "end", "heaven", "trumps", "eternal", "love", "compatible", "true", "scripture", "meanings", "forever", "everlasting"];

  // Get the Contents of the Search
  chars = document.getElementById("btn_verse").firstElementChild.value;

  // Regex out separate words (complete or not) and store in array of words
  var words = chars.match(/[a-z]+($|\s+)/gi);

  // Compare each word to see if they are a possible or recognized keyword
  var results = [];
  var abc = "";
  for (var i = 0; i < words.length; i++) {

    abc = words[i].charAt(0);
    var keys = [];
    // Get each word and delete the extra spaces
    words[i] = words[i].replace(/^\s+|\s+$|\s+(?=\s)/g, "");

    // Get Possible Keywords for a single word
    for (var e = 0; e < keywords.length; e++) {
      if (keywords[e].includes(words[i])) {
        keys.push(keywords[e]);
      }
    }

    /// ** Prioritize potential keywords

    // Create two arrays, front for alphabet match, back for rest match
    var front = [];
    var back = []
    for (var c = 0; c < keys.length; c++) {
      // if the potential keywords matches the partial word first letter
      if (keys[c].charAt(0) == abc) {
        front.push(keys[c]);
      }
      // if the potential keywords don't match the first letter
      else {
        back.push(keys[c]);
      }
    }

    // sort both arrays of potential keywords alphabetically
    front.sort()
    back.sort()

    // // if there is no match for the first character, dont add redunant results
    // if (front.length >= 1) {
    //   // if there is at least one match, add the other possible unconfirmed keywords
    //   for (var b = 0; b < back.length; b++) {
    //     front.push(back[b])
    //   }
    // }

    // reset the contents of keys to be the prioritized array
    keys = front;

    // Publish results back to main array
    results.push(keys);

    // if there is only a single result, make it a string instead of an array
    for (var c = 0; c < results.length; c++) {
      if (results[c].length <= 1) {
        results[c] = "" + results[c] + "";
      }
    }

    // Delete Unfilled Data
    for (var r = 0; r < results.length; r++) {
      if (results[r] == "") {
        results.splice(r, 1);
      }
    }

  }

  return results;



  // Display Results
  // console.log(results);
}

// DEPRICATED
// function autoJSON() {
//
//   var categories = []
//   var tags = [];
//   var papers = [];
//   var verses = [];
//   var quotes = [];
//   var filters = ["paper,", "verse,", "quote,"]
//
//   console.log('Auto JSON');
//
//   var anchors = document.getElementsByTagName("a");
//   for (var i = 0; i < anchors.length; i++) {
//     var title = anchors[i].text;
//     var url = anchors[i].getAttribute("href");
//     var keys = "";
//     var words = title.match(/[a-z]+($|\s+)/gi);
//     if (words != null) {
//       for (var e = 0; e < words.length; e++) {
//         if (words[e].length > 2) {
//           words[e] = words[e].replace(/^\s+|\s+$|\s+(?=\s)/g, "");
//           words[e] = words[e].toLowerCase();
//           tags.push(words[e])
//           if (e < words.length - 1) {
//             keys += words[e] + ", ";
//           }
//           else {
//             keys += words[e];
//           }
//
//         }
//       }
//     }
//     var name = "paper";
//     var text = title + "\n" + url;
//     var entry = {
//       "catg": "",
//       "tags": keys,
//       "name": name,
//       "text": text
//     };
//     papers.push(entry)
//     console.log(entry);
//   }
//
//   function removeDuplicates(arr) {
//     let filtered = Array.from(new Set(arr));
//     filtered.sort();
//     return filtered;
//   }
//
//   tags = removeDuplicates(tags)
//
//   console.log("Tags: ", tags)
//   console.log("Papers: ", papers);
//
//   var json = {
//     "filters": filters,
//     "categories": categories,
//     "keywords": tags,
//     "papers": papers,
//     "verses": verses,
//     "quotes": quotes
//   };
//
//   console.log("JSON Doc: ", json)
//
//   setTimeout(function() {
//     demo = JSON.stringify(json)
//     document.getElementById("response").innerHTML = demo;
//   }, 2000);
//
// }
