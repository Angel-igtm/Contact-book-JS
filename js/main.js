let url = 'http://localhost:3000/contacts';
let myForm = document.querySelector('#myForm');


myForm.addEventListener('submit', async function(e){
    e.preventDefault();

    let elem = e.target
    let formData = {
        name: elem.querySelector('[name="name"]').value,
        
        surname: elem.querySelector('[name="surname"]').value,

        email: elem.querySelector('[name="email"]').value,

        phoneNum: elem.querySelector('[name="phoneNum"]').value,

        streamNum: elem.querySelector('[name="streamNum"]').value
    }
    if(!formData.name || !formData.surname || !formData.email || !formData.phoneNum || !formData.streamNum){
        return alert('Заполните поля')
    }
    else{
        for(let num of myForm){
            num.value = ''
        }
        // alert('Контакт добавлен')
            
        
    }

    //POST REQUEST

    let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        .then(result => result.json())
        .then(data => console.log(data));
        render('GET', url)


})


//GET REQUEST
render('GET', url)
function render(method, url){
    fetch(url, {
        method: method
    })
    .then(response => response.json())
    .then(data => {
    document.querySelector('.tbody').innerHTML = '';
        function getItem(){


            data.forEach(item => {
                let hr = document.createElement('hr');
                let tr = document.createElement('tr');
                tr.appendChild(hr);
                document.querySelector('.tbody').appendChild(tr).innerHTML =
                `
                    <td>${item.name}</td>
                    <td>${item.surname}</td>
                    <td>${item.email}</td>
                    <td>${item.phoneNum}</td>
                    <td>${item.streamNum}</td>
                    <td>
                    <img class="delete" data-id=${item.id} src="./image/delete.png" alt="loading delete icon"/>
                    </td>
                    <td>
                    <img edit-id=${item.id} class="edit" src="./image/edit.png" alt="loading delete icon"/>
                    </td>
                `
            })
            
            let btnDel = document.querySelectorAll('.delete');
            let tbody = document.querySelector('.tbody')
            let a = tbody.childNodes;
            // let a = tbody.childNodes[0].childNodes[11].childNodes[1];
            console.log(a)
            
            btnDel.forEach((item,index) => {
                let id = item.getAttribute('data-id')
                item.addEventListener('click', function(e){
                    fetch(`http://localhost:3000/contacts/${id}`, {
                        method: "DELETE",
                    })
                    .then(response => response.json())
                    .then(() => render('get',url))
                    
                })
            })
        }
        getItem()
    })
    // console.log(data)
    // document.querySelector('.tbody').innerHTML = '';
    // let tbody = document.querySelector('.tbody')
    
    // data.forEach(item => {

    //     // document.querySelector('.tbody').innerHTML;
        // let tr = document.createElement('tr');
        // let hr = document.createElement('hr');
        // tr.appendChild(hr);
        // document.querySelector('.tbody').appendChild(tr).innerHTML = 
    //     `
            // <td>${item.name}</td>
            // <td>${item.surname}</td>
            // <td>${item.email}</td>
            // <td>${item.phoneNum}</td>
            // <td>${item.streamNum}</td>
            // <td>
            // <img class="delete" data-id=${item.id} src="./image/delete.png" alt="loading delete icon"/>
            // </td>
            // <td>
            // <img edit-id=${item.id} class="edit" src="./image/edit.png" alt="loading delete icon"/>
            // </td>
    //     `;

        
    // })})
}
// //GET REQUEST
// render('GET', url)
// function render(method, url){
//     fetch(url, {
//         method: method
//     })
//     .then(response => response.json())
//     .then((data) => {
//     // let arr = []
//     document.querySelector('.tbody').innerHTML = '';
//     let tbody = document.querySelector('.tbody')

//     data.forEach(item => {

//         // document.querySelector('.tbody').innerHTML;
//         let tr = document.createElement('tr');
//         let hr = document.createElement('hr');
//         tr.appendChild(hr);
//         document.querySelector('.tbody').appendChild(tr).innerHTML = 
//         `
//             <td>${item.name}</td>
//             <td>${item.surname}</td>
//             <td>${item.email}</td>
//             <td>${item.phoneNum}</td>
//             <td>${item.streamNum}</td>
//             <td>
//             <img class="delete" data-id=${item.id} src="./image/delete.png" alt="loading delete icon"/>
//             </td>
//             <td>
//             <img edit-id=${item.id} class="edit" src="./image/edit.png" alt="loading delete icon"/>
//             </td>
//         `;

        
//         // btnDel.onclick = deleteItem
//         // let tbody = document.querySelector('.tbody')
//         // btnDel.addEventListener('click', tbody, function(e){
//         //     e.preventDefault()
//         //     console.log('s')
//         // })
//     })})
// }

// let btnDel = document.getElementsByClassName('delete')
// // let tbody = document.querySelector('.tbody')
// console.log(btnDel)


