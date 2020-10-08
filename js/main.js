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

        // streamNum: elem.querySelector('[name="streamNum"]').value
        money: elem.querySelector('[name="money"]').value
    }
    if(!formData.name || !formData.surname || !formData.email || !formData.phoneNum || /*!formData.streamNum*/ !formData.money ){
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
                tr.setAttribute('data-id', item.id)
                tr.appendChild(hr);
                document.querySelector('.tbody').appendChild(tr).innerHTML =
                // <td class="data-info" data-about="streamNum">${item.streamNum}</td>
                `
                    <td class="data-info" data-about="name">${item.name}</td>
                    <td class="data-info" data-about="surname">${item.surname}</td>
                    <td class="data-info" data-about="email">${item.email}</td>
                    <td class="data-info" data-about="phoneNum">${item.phoneNum}</td>
                    <td class="data-info" data-about="money">${item.money}</td>
                    
                    <td>
                    <img class="delete" data-id=${item.id} src="./image/delete.png" alt="loading delete icon"/>
                    </td>
                    <td>
                    <img data-id=${item.id} class="edit" src="./image/edit.png" alt="loading delete icon"/>
                    </td>
                `
            })
            
            let btnDel = document.querySelectorAll('.delete');
            // let tbody = document.querySelector('.tbody')
            // let a = tbody.childNodes;
            // let a = tbody.childNodes[0].childNodes[11].childNodes[1];
            // console.log(a)
            
            btnDel.forEach(item => {
                let id = item.getAttribute('data-id')
                item.addEventListener('click', function(e){
                    let isOk = confirm('Are you sure?')
                    if(!isOk){
                        return
                    }
                    else{
                    fetch(`http://localhost:3000/contacts/${id}`, {
                        method: "DELETE",
                    })
                    .then(response => response.json())
                    .then(() => render('get',url))
                    }
                })
            })
            let btnEdit = document.querySelectorAll('.edit')
            let dataInfo = document.querySelectorAll('.data-info')
            let isTrue = false;
            getEditItem()
            function getEditItem() {
                btnEdit.forEach(item => {
                    item.addEventListener('click', function(e){
                        let id = item.parentElement.parentElement.getAttribute('data-id');
                        let text = e.target.parentElement.parentElement;
                        let about = e.target.parentElement.parentElement.querySelectorAll('td.data-info');
                        let data_aboutName = about[0].getAttribute('data-about')
                        let data_aboutSurname = about[1].getAttribute('data-about')
                        let data_aboutEmail = about[2].getAttribute('data-about')
                        let data_aboutPhoneNum = about[3].getAttribute('data-about')
                        let data_aboutMoney = about[4].getAttribute('data-about')
                        // let data_aboutStreamNum = about[4].getAttribute('data-about')
                        let result = about
                        // console.log(result[0].innerText)
                        // console.log(text)
                        e.preventDefault();
                        isTrue = !isTrue;
                        let saveText = item.parentElement.offsetParent.childNodes[1].children[0].childNodes[15];
                        // let saveId = item.parentElement.offsetParent.childNodes[3].firstChild.childNodes[13].children[0].getAttribute('data-id')
                        // let saveImg = item.parentElement.offsetParent.childNodes[3].firstChild.childNodes[13].children[0].setAttribute('src', './image/save.png')
                        // item.parentElement.offsetParent.childNodes[3].firstChild.childNodes[13].children[0].className = 'save'
                        // item.forEach(save => {console.log(save)})
                        item.setAttribute('src', './image/save.png');
                        item.classList = 'save';
                        if(isTrue){
                            // saveImg.innerHTML = `<img class="save" src="./image/save.png" alt="loading save icon"/>`
                            saveText.innerHTML = 'Save'
                            about.forEach(item => {
                                let text = item.innerText
                                // console.log(item)
                                item.innerHTML = `<input type="text" class="item-info" value="${text}"/>`
                                
                            })
                        }
                        else {
                            saveText.innerHTML = 'Edit' 
                              
                            // saveImg.innerHTML = `<img class="edit" src="./image/edit.png" alt="loading edit icon"/>`
                            
                            let name = about[0].firstChild.value
                            let surname = about[1].firstChild.value
                            let email = about[2].firstChild.value
                            let phoneNum = about[3].firstChild.value
                            // let streamNum = about[4].firstChild.value
                            let money = about[4].firstChild.value
                            console.log(result)
                            let data = {}
                            data[data_aboutName] = name;
                            data[data_aboutSurname] = surname;
                            data[data_aboutEmail] = email;
                            data[data_aboutPhoneNum] = phoneNum;
                            data[data_aboutMoney] = money;
                            // data[data_aboutStreamNum] = streamNum;
                            console.log(data)
                            // let result = item.firstChild.value
                            
                            fetch(`http://localhost:3000/contacts/${id}`, {
                                method: "PATCH",
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(data)
                            })
                            
                            .then(response => response.json())
                            .then(() => render('GET',url))
                            console.log(data)
                                    // render('get',url)
                        }
                        
                    })
                })
            }
        }
        getItem()
    })
}

                                    // let formData = {
                                    //     name: elem.querySelector('[name="name"]').value,
                                        
                                    //     surname: elem.querySelector('[name="surname"]').value,
                                
                                    //     email: elem.querySelector('[name="email"]').value,
                                
                                    //     phoneNum: elem.querySelector('[name="phoneNum"]').value,
                                
                                    //     streamNum: elem.querySelector('[name="streamNum"]').value
                                    // }
                    
                                    // btnEdit.forEach(item => {
                                    //     item.addEventListener('click', function(e){
                                    //         e.preventDefault();
                                            // let text = e.target.parentElement.parentElement
                                    //         // console.log(text)
                                            
                        
                                            
                                                // let about = e.target.parentElement.parentElement.querySelectorAll('td.data-info')
                                                // about.forEach(item => {
                                                    
                                                //     let text = item.innerText
                                                //     // console.log(text)
                                                //     console.log(item)
                                                //     item.innerHTML = `<input type="text" class="item-info" value="${text}"/>`
                                                //     // let result = item.firstChild.value
                                                //     // console.log(result)
                        
                                                //     // console.log(DataAbout)
                                                // })
                                    //             // item.addEventListener('click', function(e){
                                    //             //     let target = e.target.parentElement.parentElement.querySelectorAll('td.data-info');
                                    //             //     target.forEach(item => {
                                    //             //         let result = item
                                    //             //         console.log(result)
                                    //             //         let DataAbout = item.getAttribute('data-about')
                                    //             //         let id = item.parentElement.getAttribute('data-id')
                                    //             //         // console.log(result)
                                    //             //         // console.log(DataAbout)
                                    //             //         let data = {};
                                    //             //         data[DataAbout] = result;
                                    //             //         // console.log(data)
                                                        
                                    //             //     })
                                    //             // })
                                    //         // console.log(about)
                        
                        
                                    //     })
                                        
                                    // })
// setEditItem()
// function setEditItem(){
//     btnEdit.forEach(item => {
//         item.addEventListener('click', function(e){
//             e.preventDefault()
//             console.log(item)
//         })
//     })
// }

// btnEdit.addEventListener('click', function(e){
//     e.preventDefault()
//     let about = e.target.parentElement.parentElement
//     console.log(about)
// })
// btnEdit.forEach((item,index) => {
//     let id = item.getAttribute('data-id')
//     item.addEventListener('click', function(e){
//         // let modal_window = document.createElement('div')
//         // modal_window.className = 'modal-window'
//         e.preventDefault()
//         // let about = e.target.parentElement.parentElement.querySelectorAll('td')
//         let text = e.target.parentElement.parentElement
//         console.log(text)
        
//         // console.log(about)
//         // let elem = e.target.parentElement.parentElement
//         // let formNewData = {
//         //     name: elem.getElementsByTagName('td')[0].innerHTML,

//         //     surname: elem.getElementsByTagName('td')[1].innerHTML,

//         //     email: elem.getElementsByTagName('td')[2].innerHTML,

//         //     phoneNum: elem.getElementsByTagName('td')[3].innerHTML,

//         //     streamNum: elem.getElementsByTagName('td')[4].innerHTML
//         // }
//         // console.log(elem)
//         fetch(`http://localhost:3000/contacts/${id}`,{
//             method: "GET",
//         })
//         .then(response => response.json())
//         .then(data => {
//             function editItem(data){
//                 let isId = true;
//                 // let formData = {
//                 //     name: elem.querySelector('[name="name"]').value,

//                 //     surname: elem.querySelector('[name="surname"]').value,

//                 //     email: elem.querySelector('[name="email"]').value,

//                 //     phoneNum: elem.querySelector('[name="phoneNum"]').value,

//                 //     streamNum: elem.querySelector('[name="streamNum"]').value
//                 // }
//             }
//             editItem(data)
//         })
//     })
// })

