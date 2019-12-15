
export default {
  doFormPostDatas(url, datas, cb, errorCb) {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        credentials: 'same-origin',
        body: datas
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
        cb(json)
    }).catch(function(ex) {
        errorCb(ex)
    })
  },
  doGetDatas(url, cd) {
      let token = localStorage.getItem('token')
    fetch(url, {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json())
        .then(data => cd(data))
        .catch(e => console.log('error', e))
    }
  
}