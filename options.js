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


//om de slider de input van de textvakjes te geven
yearmin.oninput = function(){
    $("#yearslider").slider("values", 0, yearmin.value);
    //console.log($("#slider").slider("values", 0))
}
yearmax.oninput = function(){
    $("#yearslider").slider("values", 1, yearmax.value);
}

apply.onclick = function(){
    for (i=group.children.length; i >= 1; i--){//0 mag niet weg want dat is de aarde
        group.remove(group.children[i]);
    }

    Update();
}


$(function(){
    $("#yearslider").slider({
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
    yearmin.value = $("#yearslider").slider("values", 0);//deze moeten nog een keer omdat er anders aan het begin geen getal in de vakjes staat
    yearmax.value = $("#yearslider").slider("values", 1);
});

$(function(){
    var handleleft = $("#showmassleft");
    var handleright = $("#showmassright");
    $("#massslider").slider({
        min: 0,
        max: 2000000,
        values: [0, 2000000],
        range: true,
        create: function(ui){
            handleleft.text(Math.log10($(this).slider("values")[0]+1));
            handleright.text(Math.floor(Math.log10($(this).slider("values")[1])));
        },
        slide: function(ui){
            //om de textvakjes de waardes van de slider te geven
            massmin.value = $(this).slider("values")[0]
            massmax.value = $(this).slider("values")[1]
            handleleft.text(Math.log10($(this).slider("values")[0]+1));
            handleright.text(Math.floor(Math.log10($(this).slider("values")[1])));   
        }
    });
    massmin.value = $("#massslider").slider("values", 0)//deze moeten nog een keer omdat er anders aan het begin geen getal in de vakjes staat
    massmax.value = $("#massslider").slider("values", 1)
});





