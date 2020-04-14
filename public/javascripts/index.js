primus = Primus.connect("", {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

fetch("http://localhost:3000/api/v1/stats").then(result => {
    return result.json();
}).then(json => {
    json.data.stats.forEach(stat => {
        var newStats = `<div class="stat">
            <p class="stat__country">${stat.country}</p>
            <p class="stat__number">${stat.numberInfected}</p>
        </div>`;
        
        document.querySelector(".stat__title ").insertAdjacentHTML('afterend', newStats);
    });
}).catch(err => {
    console.log("Couldn't get data");
});