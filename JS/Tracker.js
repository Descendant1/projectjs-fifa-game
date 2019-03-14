class Tracker {

    constructor() {
        this.historyContainer = document.getElementById('trackHistory');
        this.trackingItems = localStorage.getItem('trIt') ? JSON.parse(localStorage.getItem('trIt')) : [];
        this.renderTrackHistory();

    }

    track(action, func, datePerf, href) {
        this.trackingItems.push({ action, func, datePerf, href });
    }
    getTrackItems() {
        return this.trackingItems;
    }
    renderTrackHistory() {
        //setInterval(() => {
            if (this.historyContainer) {
                if (this.getTrackItems().length > 0) {
                    this.historyContainer.innerHTML = '<strong>Tracked actions till the moment</strong> <br>';
                    this.getTrackItems().map((trackItem) => {
                        var div = document.createElement('div');
                        div.innerHTML += `${trackItem.action}  <br>Callee ${trackItem.func} 
                                    <br>Date performed: ${formatDate(new Date(trackItem.datePerf))} 
                                    <br>Href: ${trackItem.href} <br>`;
                        div.classList.add('trackItem');
                        this.historyContainer.appendChild(div);
                    });
                }
        localStorage.setItem('trIt', JSON.stringify(this.getTrackItems()));

            }
      //  }, 500);

    }
}

var tracker = tracker ? tracker : new Tracker();


