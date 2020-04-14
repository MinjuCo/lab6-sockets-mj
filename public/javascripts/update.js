let base_url = "https://coronastats-mj.herokuapp.com";

primus = Primus.connect(base_url, {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

fetch(base_url + "/api/v1/stats").then(result => {
    return result.json();
}).then(json => {
    json.data.stats.forEach(stat => {
        var statOption = `<option value="${stat._id}">
          ${stat.country}
        </option>`;
        
        document.querySelector(".placeholder").insertAdjacentHTML('afterend', statOption);
    });
}).catch(err => {
    console.log("Couldn't get data");
});

document.querySelector("#btnUpdate").addEventListener("click", () => {
  let statId = document.querySelector("#country").value;
  let number = document.querySelector("#numberInfected").value;

  if(statId != "" && (number && !isNaN(number))){
    fetch(base_url + '/api/v1/stats/updateStats', {
      method: "put",
      'headers':{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "_id": statId,
        "numberInfected": number
      })
    }).then(result => {
      console.log(result);
      return result.json();
    }).then(json => {
      primus.write({
        "action": "updateStats",
        "data": json.data
      });

      if(json.status === "success"){
        document.querySelector(".info").classList.add("success");
        document.querySelector(".info").classList.remove("error");
        document.querySelector(".info--text").innerHTML = "Stat is successful updated.";
      }else{
        document.querySelector(".info").classList.remove("success");
        document.querySelector(".info").classList.add("error");
        document.querySelector(".info--text").innerHTML = json.message.message;
      }
      console.log(json);
    }).catch(err => {
      console.log(err);
    });
  }else{
    if(statId == ""){
      document.querySelector(".info").classList.remove("success");
      document.querySelector(".info").classList.add("error");
      document.querySelector(".info--text").innerHTML = "You must select a country";
    }

    if(!number || isNaN(number)){
      document.querySelector(".info").classList.remove("success");
      document.querySelector(".info").classList.add("error");
      document.querySelector(".info--text").innerHTML = "You must write a number";
    }
  }
});