let base_url = "https://coronastats-mj.herokuapp.com";

primus = Primus.connect(base_url, {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

primus.on('data', (data) => {
    if(data.action === "updateStats"){
        updateStats(data);
    }
});

let updateStats = (json) => {
    document.querySelector(`[data-id="${json.data.stat._id}"] .stat__number`).innerHTML = json.data.stat.numberInfected;
}

fetch(base_url + "/api/v1/stats").then(result => {
    return result.json();
}).then(json => {
    json.data.stats.forEach(stat => {
        let newStats = `<div class="stat" data-id="${stat._id}">
            <p class="stat__country">${stat.country}</p>
            <p class="stat__number">${stat.numberInfected}</p>
        </div>`;
        
        document.querySelector(".stat__title ").insertAdjacentHTML('afterend', newStats);
    });
}).catch(err => {
    console.log("Couldn't get data");
});