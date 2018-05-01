function test() {
  alert('I am here again!');
  toggle();
}

document.getElementById("btn_verse").firstElementChild.addEventListener("click", function() {
  // test();
});

document.getElementById("btn_add").addEventListener("click", function() {
  // test();
});

function startSearch(event) {
  var inputType = event.inputType;
  // console.log(inputType);
  switch (inputType) {
    case "insertText":
      getKeywords();
      break;
    case "deleteContentBackward":
      getKeywords();
      break;
    default:

  }
}

// Key Keywords within Unibar
function getKeywords() {

  // Sample Keywords, Load Manifest Here.
  var keywords = ["hell", "state", "fate", "forgiveness", "family", "life", "end", "heaven", "trumps", "eternal", "love", "compatible", "true", "scripture", "meanings", "forever", "everlasting"];

  // Get the Contents of the Search
  chars = document.getElementById("btn_verse").firstElementChild.value;

  // Regex out separate words (complete or not) and store in array of words
  var words = chars.match(/[a-z]+($|\s+)/gi);

  // Compare each word to see if they are a possible or recognized keyword
  var results = [];
  var abc;
  for (var i = 0; i < words.length; i++) {

    abc = words[i].charAt(0);
    console.log(abc);
    var keys = [];
    // Get each word and delete the extra spaces
    words[i] = words[i].replace(/^\s+|\s+$|\s+(?=\s)/g, "");

    // Get Possible Keywords for a single word
    for (var e = 0; e < keywords.length; e++) {
      if (keywords[e].includes(words[i])) {
        keys.push(keywords[e]);
      }
    }

    results.push(keys);
    keys = [];
  }

  // Clean Up Results Array ****

  // Delete Unfilled Data
  for (var r = 0; r < results.length; r++) {
    if (results[r] == "") {
      results.splice(r, 1);
    }
  }

  // Prioritize Array **
  for (var i = 0; i < results.length; i++) {

    // Get All Unconfirmed Keyword Arrays
    if (results[i].length > 1) {

      // Create two arrays, front for alphabet match, back for rest match
      var front = [];
      var back = []
      for (var c = 0; c < results[i].length; c++) {
        // if the potential keywords matches the partial word first letter
        if (results[i][c].charAt(0) == abc) {
          front.push(results[i][c]);
        }
        // if the potential keywords don't match the first letter
        else {
          back.push(results[i][c]);
        }
      }

      // sort both arrays alphabetically
      front.sort()
      back.sort()

      // add the less important potential keywords to the back
      for (var b = 0; b < back.length; b++) {
        front.push(back[b])
      }

      // replace the unconfirmed keyword array results, now prioritized
      results[i] = front;
    }
    // If keyword is confirmed already, remove redundant array
    else {
      results[i] = "" + results[i] + "";
    }
  }

  // Publish Results
  console.log(results);

  // Reset Results
  results = [];
}
