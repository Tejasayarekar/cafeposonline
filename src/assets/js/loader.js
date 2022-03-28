function load_logo(id_name)
{
    $(id_name).append("<img src='assets/img/gif/Ring3.gif' id='loading_logo' >");
}

function hide_logo(id_name)
{
    $(id_name).append("<img src='assets/img/Ring3.gif' id='loading_logo' >");
}


function load_loading_img(id_name)
{
  try{

  $("#"+id_name).prop('disabled',true);
  $("#"+id_name).append("<img src='assets/img/gif/Ring3.gif' id='btn_load_temp' > ");
  }
  catch(err) {
    console.log("Error-> Loading Logo  ",err.message);
    
  }
}

function remove_loading_img(id_name)
{
  try{
  $("#"+id_name).prop('disabled',false);
  $("#"+id_name+ " #btn_load_temp").remove();
}
catch(err) {
  console.log("Error-> Loading Logo  ",err.message);

}
}

function btn_off(id_name)
{
  $(id_name).prop('disabled',true);
}

function btn_on(id_name)
{
  $(id_name).prop('disabled',false);
}

function remove_code_by_id(id){
  $("#"+id).remove();
}


function add_code_by_id(id,code){
  $("#"+id).append(code);
}

function highlight(id)
{
  try{

  $('div#' + id)[0].scrollIntoView();
  
}catch(err) {
    console.log("Error-> Scroll Error  ",err.message);
   
  }
}

function error_sms_disp(id_name,sms,time)
{
            $("#"+id_name).show(300);
            $("#"+id_name).removeClass("alert alert-success");
            $("#"+id_name).addClass("alert alert-danger");
            $("#"+id_name).html(sms);

            setTimeout(function() {
              $("#"+id_name).hide(300);
            }, time);
}

function success_sms_disp(id_name,sms,time)
{
            $("#"+id_name).show(300);
            $("#"+id_name).removeClass("alert alert-danger");
            $("#"+id_name).addClass("alert alert-success");
            $("#"+id_name).html(sms);

            setTimeout(function() {
              $("#"+id_name).hide(300);
            }, time);
}


function row_filter(cls,id)
{
  $(document).ready(function(){
    $("#"+id).on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("."+cls+" .row_data").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});

}

function reset_form(id)
{
  $("#"+id+"").trigger("reset");
}

function hide_form(id_name)
{
 
 $("#"+id_name).toggle();

}