// 'use strict';
let update = document.getElementById('update')
let name = document.querySelectorAll('.name')
let del = document.getElementById('delete')
let form = document.getElementById('form1').classList

document.onkeyup = function (e) {
    e = window.event
    if (e.keyCode === 27) {
        form.add('hidden')
        form.remove('animation')
    }
}

function closestById(el, id) {
    while (el.id != id) {
        el = el.parentNode
        if (!el){
            return null;
        }
    }
    return el;
}

update.addEventListener('click', (e) => {
    alert(update.parentNode.id)
})

// update.addEventListener('click', (e) => {
//     form.remove('hidden')
//     form.add('animation')
// })

del.addEventListener('click', function () {
    fetch('quotes', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': 'Ainul'
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
