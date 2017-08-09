function clean(string) {
  return string.replace(/\t/g,"    ").replace(/"/g,"'");
}

var popups = Array.from(document.querySelectorAll(".speakers-container .details"));

var cards_as_elements = Array.from(document.querySelectorAll(".uv-shortcard__container.speaker_list_calvin div.uv-shortcard"));

var cards_as_objects = cards_as_elements.map(card => {
  
    var name = clean(card.querySelector(".uv-shortcard__title").textContent);

    var card_as_obj = {
      name: name
    };
    
    var subtitles = card.getElementsByClassName("uv-shortcard__subtitle");
    var number_of_subtitles = subtitles.length;
    if (number_of_subtitles === 0) {
      console.log("couldn't find subtitles for ", card);
    } else if (number_of_subtitles === 1) {
      card_as_obj.org = clean(subtitles[0].textContent);
    } else if (number_of_subtitles === 2) {
      card_as_obj.position = clean(subtitles[0].textContent);
      card_as_obj.org = clean(subtitles[1].textContent);
    }
    
    // get bio paragraph(s)
    var popup = popups.find(popup => clean(popup.querySelector(".uv-card__title").textContent) === name);
    if (popup) {
      var bio = popup.querySelector(".uv-card__description");
      if (bio) {
        card_as_obj.bio = clean(bio.textContent.trim());
      }
    }
    
    return card_as_obj;
});

var tsv_header = "name\torg\tposition\tbio";



var tsv_body = cards_as_objects.map(obj => [obj.name, obj.org || "none", obj.position || "none", '"' + obj.bio + '"' || "none"].join("\t")).join("\n");

var tsv_string = tsv_header + "\n" + tsv_body;
