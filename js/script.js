$(function() {

    //empty var for main template and modal popup
    var template = '';
    var modal = '';

    function fetchData(url) {
        return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('problem', error));
    }

    Promise.all([fetchData('https://randomuser.me/api/?results=12')])
        .then(data => {
            var info = data[0].results;
            generateTemplate(info);
            generateModal(info);
            createSearch();
            $('.card').on('click', showModal);
            $('button#modal-prev').on('click', showPrev);
            $('button#modal-next').on('click', showNext);
            $('#search-input').on('keyup', searchEmployees);
            $('button.modal-close-btn').on('click', function() {
                $(this).parent().parent().hide();
            });
        })
        
    function checkStatus(response) {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    function generateTemplate(data) {
        var template = '';
        $.each(data, function(i, item) { // loop through data
            console.log(item)

            //template literal for the 12 items (username added to rel attr as unique identifier)
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

    function generateModal(data) {
        var modal = '';
        $.each(data, function(i, item) { // loop through data

            //formatting birthday
            var birthday = function formatDate(date) {
                var d = new Date(item.dob.date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [month, day, year].join('/');
            }
            modal +=
                `<div class="modal-container ${item.login.username}">
                    <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${item.picture.large}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${item.name.first} ${item.name.last}</h3>
                            <p class="modal-text">${item.email}</p>
                            <p class="modal-text cap">${item.location.city}</p>
                            <hr>
                            <p class="modal-text">${item.phone}</p>
                            <p class="modal-text">${item.location.street}, ${item.location.city}, ${item.location.state} ${item.location.postcode}</p>
                                <p class="modal-text">Birthday: ${birthday()}</p>
                        </div>
                     </div>
                     <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
               </div>`;
        });
        $('body').append(modal);
    }

    // Helper Functions

    function createSearch() {
        var search =
            '<form action="#" method="get">' +
            '   <input type="search" id="search-input" class="search-input" placeholder="Search...">' +
            '   <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">' +
            '</form>'
        $(search).appendTo('.search-container');
    }

    function showModal() {
        console.log('hi')
        var name = $(this).attr('rel'); // rel attr of clicked item
        console.log(name);
        var modalContent = $('.modal-container.' + name) // class attr of modal if it contains rel of clicked item
        $(modalContent).show();
    }

    function showPrev() {
        var thisModal = $(this).parent().parent();
        if (thisModal.prev('.modal-container').length) {
            $(this).parent().parent().hide();
            $(this).parent().parent().prev().show();
        }
    }

    function showNext() {
        var thisModal = $(this).parent().parent();
        if (thisModal.next('.modal-container').length) {
            $(this).parent().parent().hide();
            $(this).parent().parent().next().show();
        }
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
});