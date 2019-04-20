$(function() {

    //JSON url
    var url = 'https://randomuser.me/api/?results=12';

    //empty var for main template and modal popup
    var template = '';
    var modal = '';
    var search = '<form action="#" method="get">' +
        '        <input type="search" id="search-input" class="search-input" placeholder="Search...">' +
        '        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">' +
        '    </form>'

    $(search).appendTo('.search-container');


    function getGallery() {
        $.getJSON(url, function(data) {
            $.each(data, function(i, item) { // loop through data
                for (let i = 0; i < item.length; i += 1) { // loop through individual items in the data
                    //template literal for the 12 items (username added to rel attr as unique identifier)

                    template += `<div class="card" rel="${item[i].login.username}" id="card_container">
                    <div class="card-img-container">
                        <img class="card-img" src="${item[i].picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${item[i].name.first} ${item[i].name.last}</h3>
                        <p class="card-text">${item[i].email} </p>
                        <p class="card-text cap">${item[i].location.city}, ${item[i].location.state}</p>
                    </div>
                </div>`;
                    //template literal for the modal popup (username added to class as unique identifier)

                    modal +=
                        `<div class="modal-container ${item[i].login.username}">
                	<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    	<div class="modal-info-container">
	                        <img class="modal-img" src="${item[i].picture.large}" alt="profile picture">
	                        <h3 id="name" class="modal-name cap">${item[i].name.first} ${item[i].name.last}</h3>
	                        <p class="modal-text">${item[i].email}</p>
	                        <p class="modal-text cap">${item[i].location.city}</p>
	                        <hr>
	                        <p class="modal-text">${item[i].phone}</p>
	                        <p class="modal-text">${item[i].location.street}, ${item[i].location.city}, ${item[i].location.state} ${item[i].location.postcode}</p>
								<p class="modal-text">Birthday: ${item[i].dob.date}</p>
                    	</div>
               		 </div>
               		 <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
               </div>`;
                }
            })
            $('body').append(modal); //appending modal content to body, hidden by css.
            $('#gallery').html(template); // appending template content to gallery

            $('.card').on('click', function() {
                var name = $(this).attr('rel'); // rel attr of clicked item
                var modalContent = $('.modal-container.' + name) // class attr of modal if it contains rel of clicked item
                $(modalContent).show();
            })

            //hide modal on click of X

            $('button.modal-close-btn').on('click', function() {
                $(this).parent().parent().hide();
            });

            //if a previous sivling exists, toggle to it when clicking prev button

            $('button#modal-prev').on('click', function(e) {
                var thisModal = $(this).parent().parent();
                if (thisModal.prev('.modal-container').length) {
                    $(this).parent().parent().hide();
                    $(this).parent().parent().prev().show();
                }
            });

            //if a next sibling exists, toggle to it when clicking prev button

            $('button#modal-next').on('click', function(e) {
                var thisModal = $(this).parent().parent();
                if (thisModal.next('.modal-container').length) {
                    $(this).parent().parent().hide();
                    $(this).parent().parent().next().show();
                }
            });
			$('#search-input').on('keyup', function() {
				searchEmployees()
    		})
        })
    }
    getGallery();
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
})