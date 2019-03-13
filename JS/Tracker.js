class Tracker {

    constructor() {
        this.historyContainer = document.getElementById('trackHistory');
        this.trackingItems = localStorage.getItem('trIt') ? JSON.parse(localStorage.getItem('trIt')) : [];
        this.renderTrackHistory();
    }

    track(action, func, datePerf) {
        this.trackingItems.push({ action, func, datePerf });
    }
    getTrackItems() {
        return this.trackingItems;
    }
    renderTrackHistory() {
        if (this.historyContainer) {
            setInterval(() => {
                if (this.trackingItems.length > 0) {
                    this.historyContainer.innerHTML = '<strong>Tracked actions till the moment</strong> <br>';

                    this.trackingItems.map((trackItem) => {
                        this.historyContainer.innerHTML += `${trackItem.action}  ${trackItem.func}  ${formatDate(new Date(trackItem.datePerf))} <br>`;
                    })

                    localStorage.setItem('trIt', JSON.stringify(this.trackingItems));
                }
            }, 500)
        }
    }
}
var tracker = new Tracker();


