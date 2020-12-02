/* Το πρώτο μου κουίζ */
var quiz = {
    draw : function () {
    // Σχεδιασμός κουίζ:

      var wrapper = document.getElementById("quiz-wrap");
  
      // Διασχίζω τις ερωτήσεις
      // Δημιουργώ όλα τα απαραίτητα HTML elements
      for (var index in questions) {
        var number = parseInt(index) + 1; // Ο τρέχων αριθμός ερώτησης
        var qwrap = document.createElement("div"); // Ομαδοποίηση της ερώτησης και των επιλογών της.
        qwrap.classList.add("question"); // CSS class, for cosmetics
  
        var question = document.createElement("h1");
        question.innerHTML = number + ") " + questions[index]['q'];
        qwrap.appendChild(question);
  
        for (var oindex in questions[index]['o']) {
          // The <label> tag
          var label = document.createElement("label");
          qwrap.appendChild(label);
  
          var option = document.createElement("input");
          option.type = "radio";
          option.value = oindex;
          option.required = true;
          option.classList.add("oquiz");
  
          option.name = "quiz-" + number;
          label.appendChild(option);
  
          // Κείμενο επιλογής
          var otext = document.createTextNode(questions[index]['o'][oindex]);
          label.appendChild(otext);
        }

        wrapper.appendChild(qwrap);
      }
  
      var submitbutton = document.createElement("input");
      submitbutton.type = "submit";
      wrapper.appendChild(submitbutton);
      wrapper.addEventListener("submit", quiz.submit);
    },
  
    submit : function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
  
      var selected = document.querySelectorAll(".oquiz:checked");
  
      var score = 0;
      for (var index in questions) {
        if (selected[index].value == questions[index]['a']) {
          score++;
        }
      }
  
      var total = selected.length;
      var percent = score / total ;

      var html = "<h1>";
      if (percent>=0.7) {
        html += "Είσαι μεγάλος παίχτης!!!";
      } else if (percent>=0.4) {
        html += "Δεν τα πήγες κι άσκημα!";
      } else {
        html += "Ωχ, ωχ, ωχ!!!";
      }
      html += "</h1>";
      html += "<div> Βρήκες " + score + " από " + total + ".</div>";
      document.getElementById("quiz-wrap").innerHTML = html;
    }
  };
  
  window.addEventListener("load", quiz.draw);