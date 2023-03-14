let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'craete';  
let tmp;

//TOTAL
function gettotal()
{
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = 0;
        total.style.background = '#c70000';

    }
}

//CREATE

let datapro = [];
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    let datapro = [];
}

submit.onclick = function () {
    let newobj = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '') {
        if (mood == 'create') {
            if (newobj.count > 1) {
                for (let i = 0; i < newobj.count; i++) {
                    datapro.push(newobj);
                }
            } else {
                datapro.push(newobj);
            }
        } else {
            datapro[tmp] = newobj;
            mood = 'create';
            submit.innerHTML = 'CREATE';
            count.style.display = 'block';
        }
        clear();
        console.log(datapro);
    } 


    //save localstorage
    localStorage.product = JSON.stringify(datapro);
    read();
}

//CLEAR
function clear() {
    title.value = '';
    price.value= '';
    taxes.value= '';
    ads.value= '';
    discount.value= '';
    count.value= '';
    category.value = '';
    total.innerHTML = 0;
    total.style.background = '#c70000';
}

//READ

function read() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updatedata (${i})" id="update">update</button></td>
                        <td><button onclick="deletedata (${i})" id="delete">delete</button></td>
                    </tr>
`
    }

    document.getElementById('tbody').innerHTML = table;

//DELETE ALL

    let btndelete = document.getElementById('deleteall');
    btndelete.style = `margin: 10px 0`;
    if (datapro.length > 0) {
        btndelete.innerHTML =
            `
        <button onclick = "deleteall()">DELETE All (${datapro.length})</button>
        `
    } else {
        btndelete.innerHTML = '';
    }
}
read();



//DELETE

function deletedata(i)
{

    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    read();

}

function deleteall() {
    localStorage.clear();
    datapro.splice(0);
    read();
}

//UPDATE

function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    gettotal();
    count.style.display = 'none';
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
    
}

//SEARCH

let searchmood = 'title';
let saerch = document.getElementById('search');
function getsearchmood(id)
{
    if (id == 'searchtitle') {
        searchmood = 'title';
        
    } else {
        searchmood = 'catogery';
        
    }
    search.placeholder = 'Search By ' + searchmood;
    search.focus();
    search.value = '';
    read();
}


function searchdata(value)
{
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchmood == 'title') {

            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updatedata (${i})" id="update">update</button></td>
                        <td><button onclick="deletedata (${i})" id="delete">delete</button></td>
                    </tr>
`
            }




        }


        else {

            if (datapro[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updatedata (${i})" id="update">update</button></td>
                        <td><button onclick="deletedata (${i})" id="delete">delete</button></td>
                    </tr>
`
            }


        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//CLEAN DATA

