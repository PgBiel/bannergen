window.maincrap = {
  addDivider() {
    if (lastspanid >= Number.MAX_SAFE_INTEGER) return;
    if (lastspanid <= 0) return;
    var lasty = ++lastspanid;
    $("#generated").append("<br class=\"span" + lasty + "\"/><span class=\"span" + lasty + "\" id=\"span" + lasty + "\" title=\"Divider\">-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=</span><a onclick=\"maincrap.delSpan('" + lasty + "');\" class=\"span" + lasty + "\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></a>");
  },
  addText() {
    if (lastinputid >= Number.MAX_SAFE_INTEGER) return;
    if (lastinputid <= 0) return;
    var lasty = ++lastinputid;
    $("#generated").append(`<br class='input${lasty}' /><span class='input${lasty}' style='display: none;'></span><a onclick="maincrap.openInput('${lasty}');" class="input${lasty}edit" style="display:none;"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a><a onclick="maincrap.delText('${lasty}');" class="input${lasty}edit" style="display:none;"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a><input type="text" style="text-align: center;" maxlength="66" id="input${lasty}" class="input${lasty} form-control"/><a onclick="maincrap.setText('${lasty}')" class="input${lasty}"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a><a onclick="maincrap.backText('${lasty}')" class="input${lasty}"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a><a onclick="maincrap.delText('${lasty}')" class="input${lasty}"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>` + /*<a onclick="maincrap.alignInput('${lasty}', 'left');" class="input${lasty}edit" style="display: none;"><span class="glyphicon glyphicon-align-left" aria-hidden="true"></span></a><a onclick="maincrap.alignInput('${lasty}', 'center');" class="input${lasty}edit" style="display: none;"><span class="glyphicon glyphicon-align-center" aria-hidden="true"></span></a><a onclick="maincrap.alignInput('${lasty}', 'right');" class="input${lasty}edit" style="display: none;"><span class="glyphicon glyphicon-align-left" aria-hidden="true"></span></a>*/"");
  },
  setText(id) {
    if ($(`.input${id}`).length < 1) return;
    var inputs = $(`.input${id}:not(span):not(br)`);
    inputs.hide();
    var theinput = $(`#input${id}`);
    var thetext = $(`span.input${id}`);
    var newval = theinput.val();
    thetext.text(newval).html(thetext.html().replace(/ /g, "&nbsp;"));
    thetext.show();
    $(`.input${id}edit`).show();
  },
  backText(id) {
    if ($(`.input${id}`).length < 1) return;
    var inputs = $(`.input${id}:not(span):not(br)`);
    inputs.hide();
    var thetext = $(`span.input${id}`);
    thetext.show();
    $(`.input${id}edit`).show();
  },
  delText(id) {
    if ($(`.input${id}`).length < 1) return;
    $(`.input${id}`).remove();
    $(`.input${id}edit`).remove();
  },
  openInput(id) {
    if ($(`.input${id}`).length < 1) return;
    $(`.input${id}`).show();
    $(`#input${id}`).val($(`span.input${id}`).text());
    $(`.input${id}edit`).hide();
    $(`span.input${id}`).hide();
  },
  delSpan(id) {
    if ($(`.span${id}`).length < 1) return;
    $(`.span${id}`).remove();
  },
  adjust(text) {
    if (typeof text !== "string") return text; //text
    let MAX_NUMBA = 66;
    if (text.length >= MAX_NUMBA) return text;
    if (text.length < 1) return text;
    if (` ${text} `.length > MAX_NUMBA) return ` ${text} `;
    if (` ${text} `.length == MAX_NUMBA) return ` ${text} `;
    let freespace = MAX_NUMBA - text.length;
    let spacestoadd = freespace; // / 2;
    return `${" ".repeat(spacestoadd)}${text}${""/*" ".repeat(spacestoadd)*/}`;
  },
  copy() {
    if ($("span").length < 1) return;
    var results = [];
    var legitresults = [];
    Array.from($("span")).map((spanz, i)=>{
      spanz = $(spanz);
      if (/span\d+/.test(spanz.attr("id"))) {
        results.push(spanz);
      } else if (/input\d+/.test(Array.from($("span"))[i].className)) {
        results.push(spanz);
      }
    });
    if (results.length < 1) return;
    results.map(spanz=>{
      var newtext = spanz.text();
      legitresults.push(maincrap.adjust(newtext) + "\u200B");
    });
    clipboard.copy(legitresults.join("\n"));
  },
  /*alignInput(id, place) {
    if ($(`.input${id}`).length < 1) return;
    switch (place) {
      case "left":
      case "center":
      case "right":
        break;
      default:
        return;
    }
    $(`span.input${id}`).attr("align", place);
    /*var classtoadd;
    switch (place) {
      case "left":
        classtoadd = "text-left";
        break;
      case "center":
        classtoadd = "text-center";
        break;
      case "right":
        classtoadd = "text-right";
        break;
      default:
        return;
    }
    var spanny = $(`span.input${id}`)[0];
    spanny.className = spanny.className.replace(/ (?:text-left|text-right|text-center)/, "");
    spanny.className += ` ${classtoadd}`;*
  }*/
};