// 'use strict';
let update = document.querySelector('#update')
let del = document.getElementById('delete')
let form = document.getElementById('form1').classList

document.onkeyup = function (e) {
    e = window.event
    if (e.keyCode === 27) {
        form.add('hidden')
        form.remove('animation')
    }
}

update.addEventListener('click', (e) => {
    form.remove('hidden')
    form.add('animation')
    
    fetch('quotes', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'Ainul',
            'option': 'Lost Saga'
        })
    })
})

del.addEventListener('click', function () {
    fetch('quotes', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': 'Darth Vader'
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        }).
    then(data => {
        console.log(data)
        window.location.reload()
    })
})