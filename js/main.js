'use strict';
let update = document.getElementById('update')

update.addEventListener('click', (e) => {
    fetch('quotes', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'Ainul',
            'option': 'Node Js'
        })
    })
})

let del = document.getElementById('delete')

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