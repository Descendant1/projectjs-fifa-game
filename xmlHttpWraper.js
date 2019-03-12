var  getJSON =  (url, callback ) =>{
    var xhr = new XMLHttpRequest();
    xhr.open('GET' , url, true);
    xhr.responseType = 'json';
    xhr.onload =  () => { callback(xhr.status,xhr.response, xhr.statusText)};
    xhr.send();
};

