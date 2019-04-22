
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('problem', error));
}

Promise.all([fetchData('https://randomuser.me/api/?results=12')])
    .then(data => {
        var info = data[0].results;
        //var i = '';
        var modal = '';
        generateTemplate(info);
        createSearch();
        $('.card').on('click', function() {
            var i = parseInt($('.card').index(this));
            createModal(i, info);
            newModal(i, info);
        });     
        $('#search-input').on('keyup', searchEmployees);    
        $('input#serach-submit').on('click', searchEmployees);

});


//check status code of fetch request

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}



function generateTemplate(data) {
    var template = '';
    $.each(data, function(i, item) {
        // console.log(item)

        //template literal for the 12 cards (username added to rel attr as unique identifier)
        template += `<div class="card" rel="${item.login.username}" id="card_container">
                    <div class="card-img-container">
                        <img class="card-img" src="${item.picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                        <p class="card-text">${item.email} </p>
                        <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
                    </div>
                </div>`;
    });
    $('#gallery').html(template);
}

function createSearch() {
        var search =
            '<form action="#" method="get">' +
            '   <input type="search" id="search-input" class="search-input" placeholder="Search...">' +
            '   <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">' +
            '</form>'
        $(search).appendTo('.search-container');
}
function formatDate(date) {
         var d = new Date(date),
         month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [month, day, year].join('/');
}

function createModal(i, data) {
        var birthday = formatDate(data[i].dob.date);

        modal =
            `<div class="modal-container ${data[i].login.username} ${i}">
                    <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                            <p class="modal-text">${data[i].email}</p>
                            <p class="modal-text cap">${data[i].location.city}</p>
                            <hr>
                            <p class="modal-text">${data[i].phone}</p>
                            <p class="modal-text">${data[i].location.street}, ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
                                <p class="modal-text">Birthday: ${birthday}</p>
                        </div>
                     </div>
                     <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
               </div>`;
        $('body').append(modal);
        $('button.modal-close-btn').on('click', function() {
            
            $('.modal-container').remove();
        });
    //});
}

function newModal(i, data) {
     $(document).on('click', '.modal-container .modal-btn-container', function(e) {

  if (e.target.tagName === 'BUTTON') { 

     if ($(e.target).hasClass('modal-next')) {
        i += 1;
     } else if ($(e.target).hasClass('modal-prev')) {
        i -= 1
     } else {
        i = i;
     }
}
if (i > 11) {
    i = 11;
} 
if (i < 0) {
    i = 0;
}
console.log(i);
         
var birthday = formatDate(data[i].dob.date);
        modal =
            `<div class="modal-container ${data[i].login.username} ${i}">
                    <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                            <p class="modal-text">${data[i].email}</p>
                           <p class="modal-text cap">${data[i].location.city}</p>
                            <hr>
                            <p class="modal-text">${data[i].phone}</p>
                            <p class="modal-text">${data[i].location.street}, ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
                                <p class="modal-text">Birthday: ${birthday}</p>
                        </div>
                     </div>
                     <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
               </div>`;
        $('.modal-container').remove();
        $('body').append(modal);
               $('button.modal-close-btn').on('click', function() {
            
            $('.modal-container').remove();
        });
    });
}
    function searchEmployees() {
        // Declare variables
        var input, filter, txtValue;
        input = document.getElementById('search-input');
        filter = input.value.toUpperCase();

        // Loop through all list items, and hide those who don't match the search query

        $('.card').each(function() {
            txtValue = $(this).find("h3").text()
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
    }