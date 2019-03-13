class Ajax 
{
    static ajax = null;  
    static getInstance()
    {
        return this.ajax ? this.ajax : new XMLHttpRequest();
    }
    static getJSON(url,callback)
    {
        let xhr =  this.getInstance();
        xhr.open('GET' , url, true);
        xhr.responseType = 'json';
        xhr.onload =  () => { callback(xhr.status,xhr.response, xhr.statusText)};
        xhr.send();
    }
}