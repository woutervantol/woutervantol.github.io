// var slidermax = document.getElementById("slidermax");
// var slidermin = document.getElementById("slidermin");
// var slider = document.getElementById("slider1");

// slidermin.value = slider.value;
// console.log(slider.value)


// slider.oninput = function(){
//     slidermin.value = this.value
// }

// slidermin.oninput = function(){
//     slider.value = this.value
// }

var yearmin = document.getElementById("yearmin");
var yearmax = document.getElementById("yearmax");

var massmin = document.getElementById("massmin");
var massmax = document.getElementById("massmax");

var apply = document.getElementById("apply");
var reset = document.getElementById("reset");
var about = document.getElementById("about");
var overlay = document.getElementById("overlay");

yearmin.addEventListener("keydown", event => {if (event.isComposing || event.keyCode === 13) {Update();}});
yearmax.addEventListener("keydown", event => {if (event.isComposing || event.keyCode === 13) {Update();}});
massmin.addEventListener("keydown", event => {if (event.isComposing || event.keyCode === 13) {Update();}});
massmax.addEventListener("keydown", event => {if (event.isComposing || event.keyCode === 13 ) {Update();}});

//om de slider de input van de textvakjes te geven
yearmin.oninput = function(){
    $("#yearslider").slider("values", 0, yearmin.value);
    //console.log($("#slider").slider("values", 0))
}
yearmax.oninput = function(){
    $("#yearslider").slider("values", 1, yearmax.value);
}

massmin.oninput = function(){
    $("#massslider").slider("values", 0, Math.log10(massmin.value));
    //console.log($("#slider").slider("values", 0))
}
massmax.oninput = function(){
    $("#massslider").slider("values", 1, Math.log10(massmax.value));
}

apply.onclick = function(){
    Update();
}

reset.onclick = function(){
    yearmin.value = 861;
    yearmax.value = 2019;
    massmin.value = 0.001;
    massmax.value = 10000;
    $("#yearslider").slider("values", 0, 861);
    $("#yearslider").slider("values", 1, 2019);
    $("#massslider").slider("values", 0, -3);
    $("#massslider").slider("values", 1, 5);
}

about.onclick = function(){
    overlay.style.display = "block"
}
overlay.onclick = function(){
    overlay.style.display = "none"
}

$(function(){
    $("#yearslider").slider({
        min: 861,
        max: 2019,
        values: [861, 2019],
        range: true,
        slide: function(event, ui){
            //om de textvakjes de waardes van de slider te geven
            yearmin.value = ui.values[0]
            yearmax.value = ui.values[1]
        }
    });
    yearmin.value = $("#yearslider").slider("values", 0);//deze moeten nog een keer omdat er anders aan het begin geen getal in de vakjes staat
    yearmax.value = $("#yearslider").slider("values", 1);
});

$(function(){
    var handleleft = $("#showmassleft");
    var handleright = $("#showmassright");
    $("#massslider").slider({
        min: -3,
        max: 5,
        values: [-3, 5],
        step: 0.1,
        range: true,
        classes: {
            "ui-slider-range":"ui-corner-all ui-widget-header",
            "ui-slider": "highlight"
        },
        create: function(ui){
            // handleleft.text($(this).slider("values")[0]);
            
            // handleright.text($(this).slider("values")[1]);
            // ui-slider-range.color
        },
        slide: function(ui){
            //om de textvakjes de waardes van de slider te geven
            if ($(this).slider("values")[0] < 2){
                massmin.value = Math.floor(10**$(this).slider("values")[0]*1000)/1000// de * en / 1000 zijn zodat de floor hem afrond op 3 cijfers na de komma
            }else{
                massmin.value = Math.floor(10**$(this).slider("values")[0])
            }
            if ($(this).slider("values")[1] < 2){
                massmax.value = Math.floor(10**$(this).slider("values")[1]*1000)/1000
            }else{
                massmax.value = Math.floor(10**$(this).slider("values")[1])
            }
            //handleleft.text($(this).slider("values")[0]);
            //handleright.text($(this).slider("values")[1]);   
            
        }
    });
    massmin.value = 10**$("#massslider").slider("values", 0)//deze moeten nog een keer omdat er anders aan het begin geen getal in de vakjes staat
    massmax.value = 10**$("#massslider").slider("values", 1)
});

var countrylist = ["Andorra", "United Arab Emirates", "Afghanistan", "Antigua and Barbuda", "Anguilla", "Albania", "Armenia", "Netherlands Antilles", "Angola", "Antarctica", "Argentina", "American Samoa", "Austria", "Australia", "Aruba", "Azerbaijan", "Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Bermuda", "Brunei", "Bolivia", "Brazil", "Bahamas", "Bhutan", "Bouvet Island", "Botswana", "Belarus", "Belize", "Canada", "Cocos [Keeling] Islands", "Congo [DRC]", "Central African Republic", "Congo [Republic]", "Switzerland", "Côte d'Ivoire", "Cook Islands", "Chile", "Cameroon", "China", "Colombia", "Costa Rica", "Cuba", "Cape Verde", "Christmas Island", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Algeria", "Ecuador", "Estonia", "Egypt", "Western Sahara", "Eritrea", "Spain", "Ethiopia", "Finland", "Fiji", "Falkland Islands [Islas Malvinas]", "Micronesia", "Faroe Islands", "France", "Gabon", "United Kingdom", "Grenada", "Georgia", "French Guiana", "Guernsey", "Ghana", "Gibraltar", "Greenland", "Gambia", "Guinea", "Guadeloupe", "Equatorial Guinea", "Greece", "South Georgia and the South Sandwich Islands", "Guatemala", "Guam", "Guinea-Bissau", "Guyana", "Gaza Strip", "Hong Kong", "Heard Island and McDonald Islands", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Ireland", "Israel", "Isle of Man", "India", "British Indian Ocean Territory", "Iraq", "Iran", "Iceland", "Italy", "Jersey", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan", "Cambodia", "Kiribati", "Comoros", "Saint Kitts and Nevis", "North Korea", "South Korea", "Kuwait", "Cayman Islands", "Kazakhstan", "Laos", "Lebanon", "Saint Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libya", "Morocco", "Monaco", "Moldova", "Montenegro", "Madagascar", "Marshall Islands", "Macedonia [FYROM]", "Mali", "Myanmar [Burma]", "Mongolia", "Macau", "Northern Mariana Islands", "Martinique", "Mauritania", "Montserrat", "Malta", "Mauritius", "Maldives", "Malawi", "Mexico", "Malaysia", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "Nauru", "Niue", "New Zealand", "Oman", "Panama", "Peru", "French Polynesia", "Papua New Guinea", "Philippines", "Pakistan", "Poland", "Saint Pierre and Miquelon", "Pitcairn Islands", "Puerto Rico", "Palestinian Territories", "Portugal", "Palau", "Paraguay", "Qatar", "Réunion", "Romania", "Serbia", "Russia", "Rwanda", "Saudi Arabia", "Solomon Islands", "Seychelles", "Sudan", "Sweden", "Singapore", "Saint Helena", "Slovenia", "Svalbard and Jan Mayen", "Slovakia", "Sierra Leone", "San Marino", "Senegal", "Somalia", "Suriname", "São Tomé and Príncipe", "El Salvador", "Syria", "Swaziland", "Turks and Caicos Islands", "Chad", "French Southern Territories", "Togo", "Thailand", "Tajikistan", "Tokelau", "Timor-Leste", "Turkmenistan", "Tunisia", "Tonga", "Turkey", "Trinidad and Tobago", "Tuvalu", "Taiwan", "Tanzania", "Ukraine", "Uganda", "United States", "Uruguay", "Uzbekistan", "Vatican City", "Saint Vincent and the Grenadines", "Venezuela", "British Virgin Islands", "U.S. Virgin Islands", "Vietnam", "Vanuatu", "Wallis and Futuna", "Samoa", "Kosovo", "Yemen", "Mayotte", "South Africa", "Zambia", "Zimbabwe"]
$(function(){
    $("#tags").autocomplete({
        source: countrylist,
        minLength: 0,
        select: function(event, ui){
            pan(ui.item.value)
        }

    });
});




// $( function() {
//     $( "#reset, .widget button" ).button();
//     $( "button, input, a" ).click( function( event ) {
//     //   event.preventDefault();
//     } );
//   } );