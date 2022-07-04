
function getwithZero(number){
    return `${number}`.padStart(2, '0');
}

function visitTime2String(time) {

    const visitTime = new Date(time);

    const year = visitTime.getFullYear();
    const month = getwithZero(visitTime.getMonth() + 1);
    const date = getwithZero(visitTime.getDate());
    const hour = getwithZero(visitTime.getHours());
    const minutes = getwithZero(visitTime.getMinutes());
    const tmp = `${year}-${month}-${date} ${hour}:${minutes}`;

    return tmp;

}


function visitTime2LinkString(time) {

    const visitTime = new Date(time);

    const year = visitTime.getFullYear();
    const month = getwithZero(visitTime.getMonth() + 1);
    const date = getwithZero(visitTime.getDate());
    const hour = getwithZero(visitTime.getHours());
    const minutes = getwithZero(visitTime.getMinutes());
    const tmp = `${year}${month}${date}${hour}${minutes}00`;
    return tmp;

}

async function init() {

    const tbl = document.getElementById('visitlist');

    const message = {'getVisits': true }
    let data = await browser.runtime.sendMessage(message);

    let idCounter = 1

    data.visits.forEach((visit) => {
        const tr = tbl.insertRow()
        const span = document.createElement('a')
        span.textContent = visitTime2String(visit);
        span.target = '_blank';
        span.href = 'https://web.archive.org/web/' + visitTime2LinkString(visit)+ '*/' + data.url;
        var td = tr.insertCell()
        td.textContent = idCounter + '. ';
        var td2 = tr.insertCell();
        td2.appendChild(span);
        idCounter++;
    });
}

init();

// open options and close popup
document.getElementById("about").addEventListener('click', function(evt) {
    browser.tabs.create({
        url:"https://addons.mozilla.org/firefox/addon/show-visits"
        ,active: true
	});
    window.close();
});
