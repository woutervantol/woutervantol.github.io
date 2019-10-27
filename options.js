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


//om de slider de input van de textvakjes te geven
yearmin.oninput = function(){
    $("#slider").slider("values", 0, yearmin.value);
    //console.log($("#slider").slider("values", 0))
}
yearmax.oninput = function(){
    $("#slider").slider("values", 1, yearmax.value);
}


$(function(){
    $("#slider").slider({
        min: 0,
        max: 2019,
        values: [0, 2019],
        range: true,
        slide: function(event, ui){
            //om de textvakjes de waardes van de slider te geven
            yearmin.value = ui.values[0]
            yearmax.value = ui.values[1]
        }
    });
    yearmin.value = $("#slider").slider("values", 0)//deze moeten nog een keer omdat er anders aan het begin geen getal in de vakjes staat
    yearmax.value = $("#slider").slider("values", 1)
});