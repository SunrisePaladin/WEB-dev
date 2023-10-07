let s = 0;

$(".b1").on("click", function(){
    let i1 = parseInt($("#i1").val());
    let i2 = parseInt($("#i2").val());
    switch (s) {
        case 0:
            alert(i1 + i2);
            break;
        case 1:
            alert(i1 - i2);
            break;
        case 2:
            alert(i1 * i2);
            break;
        case 3:
            if (i2 == 0) alert("unsigned Infinity");
            else alert(i1/i2);
            break;
        default:
            alert(i1 + i2);
            break;
    }
})

$('select').change(function(){
    console.log($('option:selected',this).index());
    s = $('option:selected',this).index();
});