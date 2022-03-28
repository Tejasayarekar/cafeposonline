
// bank account validation not working//
/*

Code Version 1.00 
Code Written By: Pawar Softwares Soluiton Pvt. Ltd.
Email :hr@pawarsoftwares.com
Contact:8983438373

=====================================================================================
To Run This Code Required Bellow
1.Jquery Library
2. input filed should have for_valid atttribute to validate
3. Documention Is Provided With this library (index.html) refer for more details. 
======================================================================================
*/

var e_status=false;

var passformat = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})";
 // To Validate Bank Password Format 

var contactformat = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})+$/;
//  To Validate Contact NUmber

var mailformat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)+$/;
//  To Validate Mail Format 
// /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

var adharformat = "^\d{4}\s\d{4}\s\d{4}$";
 // To Validate Adhar Card 

var num_only_format = "^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$"; 
 // To Validate Number 

var str_only_format =/^([a-zA-Z])*\s*([.\])*\s*([a-zA-Z])*\s*$/gm;
 // To Validate String ONly 

var code_format =/^[\x00-\x7F]*$/gm;
 // To Validate Code in String Format 

var string_format_for_sybmol =/^([a-zA-Z0-9])*\s*([.\,\_\-\:\@\#\$\'\"\!\?\(\)\^\%\*\`\[\]\)*\s*([a-zA-Z0-9])*\s*$/gm;
 // To Validate String With Some Symbol

var date_format = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gm; 
// To Validate Date

var bank_account = "^\d{9,18}$";  
// To Validate Bank Account

var gst = "/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}Z[0-9]{1}?$/"; 
// To GST Number

var panformat = "[A-Z]{5}[0-9]{4}[A-Z]{1}"; 
// To Validate pancard

function form_valid(form_id)
{
  var err_status=false;
  try {
   
    $("#"+form_id+" input, #"+form_id+" select, #"+form_id+" textarea").each(
        function(index){
            var input = $(this);
            var rq_sts=false;
            var min_length=0;
            var max_length=10;
          if(typeof  input.attr("for_valid")==="undefined")
            {
             
            }
            else{

            var data= input.attr("for_valid");
            var data_copy=data;
            var t_ch=data.includes("only_num");
            var tt_ch=data.includes("only_string");
             var tt_name=data.includes("name");
            var code_ch=data.includes("code_allow");
            var ch_box=data.includes("checkbox");
            var temp_ar=data.split("-");
            rq_sts=temp_ar[1];
            var err_shw_id="";
            data=temp_ar[0];

                      if(t_ch || tt_ch || tt_name || code_ch)
                      {
                        var ss=data_copy.split("-");

                        rq_sts=ss[1];
                        min_length=ss[2];
                        max_length=ss[3];
                        data=ss[0];

                      }else if(ch_box){

                        var ss=data_copy.split("-");
                        rq_sts=ss[1];
                        err_shw_id=ss[2];
                        min_length=ss[2];
                        max_length=ss[3];
                        data=ss[0];

                      }else{

                      }

            var id=input.attr("id");
              switch(data) {
              case "email":
                   err_status=Email_keyUp(id,rq_sts);
                            break;                         
              case "contact":
                            err_status=Contact_keyUp(id,rq_sts);
                         
                            break;
              case "pass":
                            err_status=Password_keyUp(id,rq_sts);
                           
                            break;
              case "select":
                            err_status=Select_Change(id,rq_sts);
                      
                            break;
              case "bank_account":
                            err_status=Bank_Account_keyUp(id,rq_sts);
                         
                            break;
              case "adhar":
                            err_status=Adhar_keyUp(id,rq_sts);
                            break;
              case "pancard":
                            err_status=Pan_keyUp(id,rq_sts);
                            break;
              case "only_string":
                            err_status=Str_only_keyUp(id,min_length,max_length,rq_sts);
                           
                            break;
              case "name":
                            err_status=Name_keyUp(id,min_length,max_length,rq_sts);
                          
                            break;
              case "code_allow":
                            err_status=Code_keyUp(id,min_length,max_length,rq_sts);
                            break;                    
              case "only_num":
                            err_status=Num_only_keyUp(id,min_length,max_length,rq_sts);
                            break;
              case "date":
                            err_status=DatekeyUp(id,rq_sts);
                            break;
              case "gst":
                            err_status=GST_keyUp(id,rq_sts);
                            break;
              case "required":
                            err_status=Code_keyUp(id,min_length,max_length,rq_sts);
                            break;
              case "radio_check":
                              var name= input.attr("name");
                              var e_id=input.attr("id");
                              var prv_id=$("#"+e_id).closest("div").attr("id");
                              err_status=checked_keyUp(name,rq_sts,prv_id);
                             
                              break;
              case "checkbox":
                               var e_id= input.attr("id");
                               var prv_id=$("#"+e_id).closest("div").attr("id");
                               //var err_show_id=input.attr("id");
                               err_status=CheckBox_keyUp(e_id,prv_id,rq_sts,min_length,max_length);
                              
                               break;                
              case "not_required":
                            err_status=true;
                            break;
            }
    }
  }
);

}
catch(err) {
  err_status=false;
  console.log("Error Form Valid Method",err.message);
}
return err_status;
}


function form_valid1(form_id)
{
  var err_status=true;
  try {
   

    $("#"+form_id+" input, #"+form_id+" select, #"+form_id+" textarea").each(
        function(index){

            var input = $(this);
            var min_length=0;
            var max_length=10;
            if(typeof  input.attr("for_valid")==="undefined")
            {
             
            }
            else{
            var data= input.attr("for_valid");
            var data_copy=data;
            var t_ch=data.includes("only_num");
            var tt_ch=data.includes("only_string");
            var tt_name=data.includes("name");
            var code_ch=data.includes("code_allow");
            var ch_box=data.includes("checkbox");
            var temp_ar=data.split("-");
            rq_sts=temp_ar[1];
            data=temp_ar[0];

                      if(t_ch || tt_ch || tt_name || code_ch)
                      {
                        var ss=data_copy.split("-");

                        rq_sts=ss[1];
                        min_length=ss[2];
                        max_length=ss[3];
                        data=ss[0];

                      }else if(ch_box){

                        var ss=data_copy.split("-");
                        rq_sts=ss[1];
                        err_shw_id=ss[2];
                        min_length=ss[2];
                        max_length=ss[3];
                        data=ss[0];

                      }else{

                      }

                      var id=input.attr("id");


            switch(data) {
              case "email":
                        if(err_status)
                        {
                          err_status=Email_valid(id,rq_sts);
                        }else{
                          Email_valid(id,rq_sts);
                        }
                  break;
              case "contact":
                            if(err_status)
                            {
                              err_status=Contact_valid(id,rq_sts);
                            }
                            else{
                              Contact_valid(id,rq_sts);
                            }
                            break;
              case "pass":
                          if(err_status)
                          {
                            err_status=Password_valid(id,rq_sts);
                          }else{
                            Password_valid(id,rq_sts);
                          }
                            break;
              case "select":
                          if(err_status)
                          {
                            err_status=Select_valid(id,rq_sts);
                          }else{
                            Select_valid(id,rq_sts);
                          }
                            break;
              case "bank_account":
                         if(err_status)
                          {
                            err_status=Bank_Account_valid(id,rq_sts);
                          }else{
                            Bank_Account_valid(id,rq_sts);
                          }
                           
                            break;
              case "adhar":
                           if(err_status)
                          {
                            err_status=Adhar_valid(id,rq_sts);
                          }else{
                            Adhar_valid(id,rq_sts);
                          }
                            break;
              case "pancard":
                            if(err_status)
                            {
                              err_status=Pan_valid(id,rq_sts);
                            }              
                            else{
                              Pan_valid(id,rq_sts);
                            }
                            break;
              case "only_string":
                            if(err_status)
                            {
                              err_status=Str_only_valid(id,min_length,max_length,rq_sts);
                            }
                            else{
                              Str_only_valid(id,min_length,max_length,rq_sts);
                         
                            }  
                            break;
               case "name":
                          if(err_status)
                          {
                            err_status=Name_valid(id,min_length,max_length,rq_sts);
                         }else{
                          Name_valid(id,min_length,max_length,rq_sts);
                       
                        }  
                           
                            break;
               case "code_allow":
                if(err_status)
                {
                  err_status=Code_valid(id,min_length,max_length,rq_sts);
                }else{
                  Code_valid(id,min_length,max_length,rq_sts);
                }  
                           break;                             
              case "only_num":
                          if(err_status)
                          {
                            err_status=Num_only_valid(id,min_length,max_length,rq_sts);
                          } else{
                            Num_only_valid(id,min_length,max_length,rq_sts);
                          }
                           break;
              case "date":
                      if(err_status)
                      {
                        err_status=Date_valid(id,rq_sts);
                      } else{
                        Date_valid(id,rq_sts);
                      } 
                        break;
              case "gst":
                        if(err_status)
                          {
                            err_status=GST_valid(id,rq_sts);
                          } else{
                            GST_valid(id,rq_sts);
                          } 
                            break;
              case "required":
                          if(err_status)
                          {
                            err_status=Code_valid(id,min_length,max_length,rq_sts);
                          } 
                          else{
                            Code_valid(id,min_length,max_length,rq_sts);
                       
                          }
                            break;
              case "radio_check":
                        if(err_status)
                        {
                          var name= input.attr("name");
                          var e_id=input.attr("id");
                          var prv_id=$("#"+e_id).closest("div").attr("id");
                          err_status=checked_valid(e_id,rq_sts,prv_id);
                        }else{
                          var name= input.attr("name");
                          var e_id=input.attr("id");
                          var prv_id=$("#"+e_id).closest("div").attr("id");
                          checked_valid(e_id,rq_sts,prv_id);
                        } 
                           
                            break;
              case "checkbox":
                        if(err_status)
                        {
                          var e_id= input.attr("id");
                          var prv_id=$("#"+e_id).closest("div").attr("id");
                          err_status=CheckBox_valid(e_id,prv_id,rq_sts,min_length,max_length);
                       
                        } else{
                          var e_id= input.attr("id");
                          var prv_id=$("#"+e_id).closest("div").attr("id");
                          CheckBox_valid(e_id,prv_id,rq_sts,min_length,max_length);
                       }
                             
                              break;                              
              case "not_required":
                        if(err_status)
                        {
                          err_status=true;
                        }
                       break;
            }
    }
  }
);
}
catch(err) {
  err_status=false;
  console.log("Error Form Valid1 Method",err.message);
}
return err_status;
}











function error_disp(id_name,error_sms)
{

  try{

  $("#"+id_name+"_alert").remove();
  $("<div id='"+id_name+"_alert' class='alert alert-danger'>"
  +"<strong>"+error_sms+"</strong>"+
  +"</div>").insertAfter("#"+id_name);;

$("#"+id_name).focus();
$("#"+id_name).css("border-radius","5px");
$("#"+id_name).css("border","1px solid #a94442");

}catch(err) {
  console.log("Error-> Display Error  ",err.message);
}

}
function error_remove(id_name)
{
  try{
  $("#"+id_name+"_alert").remove();
  $("#"+id_name).css("border-radius","5px");
  $("#"+id_name).css("border","1px solid #b9fc8a");
}catch(err) {
  console.log("Error-> Remove Error  ",err.message);
}

}







// code for select box
function ValidateSelect(inputText,id_name,rq_sts)
{

try{

var select_value = $("#"+id_name+" option:selected").val().toString();
var sel_format=regex=/(.|\s)*\S(.|\s)*/;
      if(rq_sts)
      {
           
            if(select_value.match(sel_format))
            {
              error_remove(id_name);
              return true;
            }
            else
            {
              error_disp(id_name,"* Please Select Valid Option ");
              return false;
            }
      }else
      {
        if(select_value!=0)
        {
          error_remove(id_name);
          return true;
        }
        else
        {
          error_remove(id_name);
          return true;
        }

      }

}catch(err) {
  
  console.log("Error-> Select Validaation  ",err.message);
  return false;
}

}
function Select_Change(id,rq_sts)
{
$("#"+id).change(function(){
 var new_val=$("#"+id).val();
 e_status=ValidateSelect(new_val,id,rq_sts);
});
return e_status;

}
function Select_valid(id,rq_sts)
{
 var new_val=$("#"+id).val();
 e_status=ValidateSelect(new_val,id,rq_sts);
 return e_status;
}





































// code for password
function ValidatePassword(inputText,id_name,rq_sts)
{
  try{
var len=inputText.length;
    if(rq_sts)
    {
                if(inputText.match(passformat))
                {
                    error_remove(id_name);
                    return true;
                }
                else
                {
                  error_disp(id_name,""
                    +"* Length of password must between 6,20  * <br>"
                    +" * Must Contain *<br>"
                    +"1. one lowercase character <br>"
                    +"2. one uppercase  character <br>"
                    +"3. one Number <br>"
                    +"4.  one special character !@#\$%\^&. \n"
                    +"</div>");

                  return false;

                }
    }
    else{
                    if(len >= 1)
                    {
                      if(inputText.match(passformat))
                      {
                          error_remove(id_name);
                          return true;
                      }
                      else
                      {
                        error_disp(id_name,""
                          +"* Length of password must between 6,20  * <br>"
                          +" * Must Contain *<br>"
                          +"1. one lowercase character <br>"
                          +"2. one uppercase  character <br>"
                          +"3. one Number <br>"
                          +"4.  one special character !@#\$%\^&. \n"
                          +"</div>");

                        return false;

                      }


                    }else{
                      error_remove(id_name);
                      return true;
                    }

    }

    
}catch(err) {
  
  console.log("Error-> Password  ",err.message);
  return false;
}
}


function Password_keyUp(id,rq_sts)
{

$("#"+id).keyup(function(){
 var new_val=$("#"+id).val();
 e_status=ValidatePassword(new_val,id,rq_sts);
});
  return e_status;
}
function Password_valid(id,rq_sts)
{

 var new_val=$("#"+id).val();
 e_status=ValidatePassword(new_val,id,rq_sts);
 return e_status;
}









































// function to validate Contact
function ValidateContact(inputText,id_name,rq_sts)
{
      
  try{
        var len=inputText.length;
    if(rq_sts=="true")
    {
        if(inputText.match(contactformat))
        {
            error_remove(id_name);
            return true;
        }
        else
        {
            error_disp(id_name,"Pease Enter Valid Contact Number");
           return false;
        }
      }else{
            if(len >= 1)
            {
              if(inputText.match(contactformat))
              {
                  error_remove(id_name);
                  return true;
              }
              else
              {
                  error_disp(id_name,"Pease Enter Valid Contact Number  ");
                 return false;
              }

            }else{
              error_remove(id_name);
              return true;
            }

      }
      
}catch(err) {
  
  console.log("Error-> Contact Validation  ",err.message);
  return false;
}
}


function Contact_keyUp(id,rq_sts)
{

$("#"+id).keyup(function(){
var new_val=$("#"+id).val();
e_status=ValidateContact(new_val,id,rq_sts);
});
  return e_status;
}
function Contact_valid(id,rq_sts)
{
var new_val=$("#"+id).val();
e_status=ValidateContact(new_val,id,rq_sts);
return e_status;
}




























// Code to Validate Email
function ValidateEmail(inputText,id_name,rq_sts)
{
  try{

      var len=inputText.length;
        if(rq_sts=="true")
        {
              if(inputText.match(mailformat))
              {
                let st=inputText.match(mailformat);
              
                error_remove(id_name);
                return true;
              }
              else
              {
                error_disp(id_name,"Enter Valid Email Id");
                return false;
              }
          }else{
            if(len >= 1)
            {
                        if(inputText.match(mailformat))
                        {
                            error_remove(id_name);
                            return true;
                        }
                        else
                        {
                            error_disp(id_name,"Enter Valid Email Id");
                          return false;
                        }
            }else{
              error_remove(id_name);
              return true;
            }

          }
          
}catch(err) {
  
  console.log("Error-> Email Validation  ",err.message);
  return false;
}
}

function Email_keyUp(id,rq_sts)
{
$("#"+id).keyup(function(){
var new_val=$("#"+id).val();
e_status=ValidateEmail(new_val,id,rq_sts);
});
return e_status;
}

function Email_valid(id,rq_sts)
{
var new_val=$("#"+id).val();
e_status=ValidateEmail(new_val,id,rq_sts);

return e_status;
}




// Code for Validate AdharCard
function ValidateAdhar(inputText,id_name,rq_sts)
{

  try{
var len=inputText.length;
          if(rq_sts=="true")
          {
                if(inputText.match(adharformat))
                {
                    error_remove(id_name);
                    return true;
                }
                else
                {
                   error_disp(id_name,"Invalid Adhar Card Number");
                   return false;
                }
          }else {
                    if(len >= 1)
                    {
                            if(inputText.match(adharformat))
                            {
                                error_remove(id_name);
                                return true;
                            }
                            else
                            {
                               error_disp(id_name,"Invalid Adhar Card Number");
                               return false;
                            }

                    }else{
                      error_remove(id_name);
                      return true;
                    }
          }
                
}catch(err) {
  
  console.log("Error-> Adharcard Validation  ",err.message);
  return false;
}
}


function Adhar_keyUp(id)
{

$("#"+id).keyup(function(){
 var new_val=$("#"+id).val();
 e_status=ValidateAdhar(new_val,id,rq_sts);
});
  return e_status;
}
function Adhar_valid(id,rq_sts)
{
 var new_val=$("#"+id).val();
 e_status=ValidateAdhar(new_val,id,rq_sts);
  return e_status;
}







// Code for validation Pancard
function ValidatePan(inputText,id_name,rq_sts)
{
try{
var len=inputText.length;

      if(rq_sts=="true")
      {
            if(inputText.match(panformat))
            {
                    error_remove(id_name);
                    return true;
            }
            else
            {
                    error_disp(id_name," Invalid Pan Card Number ");
                    return false;
            }
        }else {

                  if(len >= 1)
                  {
                          if(inputText.match(panformat))
                          {
                                  error_remove(id_name);
                                  return true;
                          }
                          else
                          {
                                  error_disp(id_name," Invalid Pan Card Number ");
                                  return false;
                          }

                  }else{
                    error_remove(id_name);
                    return true;
                  }

        }
              
}catch(err) {
  
  console.log("Error-> Pancard Validation  ",err.message);
  return false;
}
}


function Pan_keyUp(id,rq_sts)
{

$("#"+id).keyup(function(){
 var new_val=$("#"+id).val();
 e_status=ValidatePan(new_val,id,rq_sts);
});
  return e_status;
}
function Pan_valid(id)
{
 var new_val=$("#"+id).val();
 e_status=ValidatePan(new_val,id,rq_sts);
 return e_status;
}



// Code for Only Number
function ValidateNum_Only(inputText,id_name,min_length,max_length,rq_sts)
{
      
try{
    var len=inputText.length;

if(rq_sts=="true")
{
          if(len >= min_length)
          {
                    if(len <= max_length)
                    {
                                      if(inputText.match(num_only_format))
                                        {
                                            error_remove(id_name);
                                            return true;
                                        }
                                        else
                                        {
                                          error_disp(id_name,"Invalid Number");
                                          return false;
                                        }
                     }
                     else{
                       error_disp(id_name,"Max "+max_length+" Numbers Allowed");
                       return false;
                     }
          }
          else{
            error_disp(id_name,"At Least "+min_length+" Numbers Required");
            return false;
          }

}else {
          if(len >= 1)
          {

            if(len >= min_length)
            {
                      if(len <= max_length)
                      {
                                        if(inputText.match(num_only_format))
                                          {
                                              error_remove(id_name);
                                              return true;
                                          }
                                          else
                                          {
                                            error_disp(id_name,"Invalid Number");
                                            return false;
                                          }
                       }
                       else{
                         error_disp(id_name,"Max "+max_length+" Numbers Allowed");
                         return false;
                       }
            }
            else{
              error_disp(id_name,"At Least "+min_length+" Numbers Required");
              return false;
            }



          }else{
            error_remove(id_name);
            return true;
          }

}
}catch(err) {
  
  console.log("Error-> Num Validation  ",err.message);
  return false;
}


}
function Num_only_keyUp(id,min_length,max_length,rq_sts)
{
$("#"+id).keyup(function(){
 var new_val=$("#"+id).val();
 e_status=ValidateNum_Only(new_val,id,min_length,max_length,rq_sts);
});
  return e_status;
}
function Num_only_valid(id,min_length,max_length,rq_sts)
{
 var new_val=$("#"+id).val();
 e_status=ValidateNum_Only(new_val,id,min_length,max_length,rq_sts);
  return e_status;
}





function Name_keyUp(id,min_length,max_length,rq_sts)
{

$("#"+id).keyup(function(){
 var new_val=$("#"+id).val();
 e_status=ValidateName_Only(new_val,id,min_length,max_length,rq_sts);
});
  return e_status;
}
function Name_valid(id,min_length,max_length,rq_sts)
{

 var new_val=$("#"+id).val();
 e_status=ValidateName_Only(new_val,id,min_length,max_length,rq_sts);
  return e_status;
}

function ValidateName_Only(inputText,id_name,min_length,max_length,rq_sts)
{
try{

var len=inputText.length;
if(rq_sts=="true")
{

      if(len >= min_length)
      {
                if(len <= max_length)
                {
                                  if(inputText.match(str_only_format))
                                    {
                                        error_remove(id_name);
                                        return true;
                                    }
                                    else
                                    {
                                      error_disp(id_name,"Invalid Name");
                                      return false;
                                    }
                 }
                 else{
                   error_disp(id_name,"Max "+max_length+" Characters Allowed");
                   return false;
                 }
      }
      else{
        error_disp(id_name,"At Least "+min_length+" Characters Required");
        return false;
      }
}else {

              if(len >= 1)
              {
                if(len >= min_length)
                {
                          if(len <= max_length)
                          {
                                            if(inputText.match(str_only_format))
                                              {
                                                  error_remove(id_name);
                                                  return true;
                                              }
                                              else
                                              {
                                                error_disp(id_name,"Invalid Name");
                                                return false;
                                              }
                           }
                           else{
                             error_disp(id_name,"Max "+max_length+" Characters Allowed");
                             return false;
                           }
                }
                else{
                  error_disp(id_name,"At Least "+min_length+" Characters Required");
                  return false;
                }

              }
              else {
                error_remove(id_name);
                return true;
              }

}
}catch(err) {
  
  console.log("Error-> Name Validation  ",err.message);
  return false;
}
}



function Code_keyUp(id,min_length,max_length,rq_sts)
{
$("#"+id).keyup(function(){
 var new_val=$("#"+id).val();
 e_status=ValidateCode_Only(new_val,id,min_length,max_length,rq_sts);
});
  return e_status;
}
function Code_valid(id,min_length,max_length,rq_sts)
{
 var new_val=$("#"+id).val();
 e_status=ValidateCode_Only(new_val,id,min_length,max_length,rq_sts);
  return e_status;
}


function ValidateCode_Only(inputText,id_name,min_length,max_length,rq_sts)
{
try{
var len=inputText.length;
if(rq_sts=="true")
{

      if(len >= min_length)
      {
                if(len <= max_length)
                {
                                  if(inputText.match(code_format))
                                    {
                                        error_remove(id_name);
                                        return true;
                                    }
                                    else
                                    {
                                      error_disp(id_name,"Invalid Code");
                                      return false;
                                    }
                 }
                 else{
                   error_disp(id_name,"Max "+max_length+" Characters Allowed");
                   return false;
                 }
      }
      else{
        error_disp(id_name,"At Least "+min_length+" Characters Required");
        return false;
      }
}else {

              if(len >= 1)
              {
                if(len >= min_length)
                {
                          if(len <= max_length)
                          {
                                            if(inputText.match(code_format))
                                              {
                                                  error_remove(id_name);
                                                  return true;
                                              }
                                              else
                                              {
                                                error_disp(id_name,"Invalid Code");
                                                return false;
                                              }
                           }
                           else{
                             error_disp(id_name,"Max "+max_length+" Characters Allowed");
                             return false;
                           }
                }
                else{
                  error_disp(id_name,"At Least "+min_length+" Characters Required");
                  return false;
                }

              }
              else {
                error_remove(id_name);
                return true;
              }

}
}catch(err) {
  
  console.log("Error-> Code Validation  ",err.message);
  return false;
}
}
















function ValidateStr_Only(inputText,id_name,min_length,max_length,rq_sts)
{

  try{

var len=inputText.length;
if(rq_sts=="true")
{

      if(len >= min_length)
      {
                if(len <= max_length)
                {
                                  if(inputText.match(string_format_for_sybmol))
                                    {
                                        error_remove(id_name);
                                        return true;
                                    }
                                    else
                                    {
                                      error_disp(id_name,"Invalid Value");
                                      return false;
                                    }
                 }
                 else{
                   error_disp(id_name,"Max "+max_length+" Characters Allowed");
                   return false;
                 }
      }
      else{
        error_disp(id_name,"At Least "+min_length+" Characters Required");
        return false;
      }
}else {

              if(len >= 1)
              {
                if(len >= min_length)
                {
                          if(len <= max_length)
                          {
                                            if(inputText.match(string_format_for_sybmol))
                                              {
                                                  error_remove(id_name);
                                                  return true;
                                              }
                                              else
                                              {
                                                error_disp(id_name,"Invalid Value");
                                                return false;
                                              }
                           }
                           else{
                             error_disp(id_name,"Max "+max_length+" Characters Allowed");
                             return false;
                           }
                }
                else{
                  error_disp(id_name,"At Least "+min_length+" Characters Required");
                  return false;
                }

              }
              else {
                error_remove(id_name);
                return true;
              }

}
}catch(err) {
  
  console.log("Error-> String Validation  ",err.message);
  return false;
}

}
function Str_only_keyUp(id,min_length,max_length,rq_sts)
{

$("#"+id).keyup(function(){
 var new_val=$("#"+id).val();
 e_status=ValidateStr_Only(new_val,id,min_length,max_length,rq_sts);
});
  return e_status;
}
function Str_only_valid(id,min_length,max_length,rq_sts)
{

 var new_val=$("#"+id).val();
 e_status=ValidateStr_Only(new_val,id,min_length,max_length,rq_sts);
  return e_status;
}











// Code for Date
function ValidateDate(inputText,id_name,rq_sts)
{
try{

var len=inputText.length;
if(rq_sts=="true")
{
      if(inputText.match(date_format))
      {
          error_remove(id_name);
          return true;
      }
      else
      {
          var sms="Invalid Date Format";
          error_disp(id_name,sms);
          return false;
      }
}else {

              if(len >=1 )
              {
                if(inputText.match(date_format))
                {
                    error_remove(id_name);
                    return true;
                }
                else
                {
                    var sms="Invalid Date Format\n"
                    +"Enter Date in format of DD/MM/YYYY";
                    error_disp(id_name,sms);
                    return false;
                }
              }else {
                error_remove(id_name);
                return true;
              }

}
}catch(err) {
  
  console.log("Error-> Date Validation  ",err.message);
  return false;
}
}




function DatekeyUp(id,rq_sts)
{

$("#"+id).keyup(function(){
 var new_val=$("#"+id).val();
 e_status=ValidateDate(new_val,id,rq_sts);
});
  return e_status;
}
function Date_valid(id)
{
 var new_val=$("#"+id).val();
 e_status=ValidateDate(new_val,id,rq_sts);
  return e_status;
}





function ValidateBank_Account(inputText,id_name,rq_sts)
{


if(rq_sts=="true")
{
        if(inputText.match(bank_account))
        {
            error_remove(id_name);
        return true;
        }
        else
        {
            var sms="Invalid Bank Account Number\n"
            +"Number Should have minimum 9 numbers";
            error_disp(id_name,sms);
            return false;
        }
    }else{
                if(len >=1)
                {
                  if(inputText.match(bank_account))
                  {
                      error_remove(id_name);
                  return true;
                  }
                  else
                  {
                      var sms="Invalid Bank Account Number\n"
                      +"Number Should have minimum 9 numbers";
                      error_disp(id_name,sms);
                      return false;
                  }
                }
                else {
                  error_remove(id_name);
                  return true;
                }
    }
}


function Bank_Account_keyUp(id,rq_sts)
{
$("#"+id).keyup(function(){
 var new_val=$("#"+id).val();
 e_status=ValidateBank_Account(new_val,id,rq_sts);
});
  return e_status;
}

function Bank_Account_valid(id,rq_sts)
{
 var new_val=$("#"+id).val();
 e_status=ValidateBank_Account(new_val,id,rq_sts);
 return e_status;
}



// Code for File Select
function ValidateFile_select(inputText,id_name,rq_sts)
{
try{

var file_name=$("'#"+id+"'").val();
        if(rq_sts=="true")
        {
              if(file_name.Length >=1 )
              {
                  error_remove(id_name);
                  return true;
              }
              else
              {
                  var sms="Please Select File To Proceed";
                  error_disp(id_name,sms);
                  return false;
              }
          }
          else {

                        if(file_name.Length >=1 ){
                          return true;
                        }
                        else{
                          error_remove(id_name);
                          return true;
                        }
          }
        }catch(err) {
  
          console.log("Error-> Droupdown Validation  ",err.message);
          return false;
        }
}









// Code for GST Number Validation
function ValidateGST_Num(inputText,id_name,rq_sts)
{
try{
  var len=inputText.length;

      if(rq_sts=="true")
      {
            if(inputText.match(gst))
            {
              error_remove(id_name);
              return true;
            }
            else
            {
                var sms="Invalid GST Number\n"
                  +"Please Enter Valid GST Number";
                  error_disp(id_name,sms);
                  return false;
            }
      }
      else{
                if(len >=1)
                {
                          if(inputText.match(gst))
                          {
                            error_remove(id_name);
                            return true;
                          }
                          else
                          {
                              var sms="Invalid GST Number\n"
                                +"Please Enter Valid GST Number";
                                error_disp(id_name,sms);
                                return false;
                          }

                }else{
                  error_remove(id_name);
                  return true;
                }
      }
    }catch(err) {
  
      console.log("Error-> GST Validation  ",err.message);
      return false;
    }
}


function GST_keyUp(id,rq_sts)
{
$("#"+id).keyup(function(){
 var new_val=$("#"+id).val();
 e_status=ValidateGST_Num(new_val,id,rq_sts);
});
  return e_status;
}
function GST_valid(id)
{
 var new_val=$("#"+id).val();
 e_status=ValidateGST_Num(new_val,id,rq_sts);
 return e_status;
}






// Code for Validation check and radio
function Validatecheck_radio(inputText,id_name,rq_sts,err_show_id)
{
  try{

var len=inputText.length;
  if(rq_sts=="true")
  {
      if(len >=1 )
      {

       error_remove(err_show_id);
       return true;
      }
      else
      {
            var sms="Please Select One Option";
            error_disp(err_show_id,sms);
            return false;
      }

    }else{
                if(len >= 1)
                {
                  error_remove(id_name);
                  return true;
                }else{
                  error_remove(id_name);
                  return true;
                }
    }
  }catch(err) {
  
    console.log("Error-> RadioButton Validation  ",err.message);
    return false;
  }
}


function checked_keyUp(id,rq_sts,err_show_id)
{

  $("input[name='"+id+"']").change(function(){

   var new_val=$("input[name='"+id+"']:checked").val();
   e_status=Validatecheck_radio(new_val,id,rq_sts,err_show_id);

  });
   return e_status;
}

function checked_valid(id,rq_sts,err_show_id)
{
  console.log($("input:radio[name='"+id+"']").is(":checked").val());
  console.log('$("input:radio[name='+id+']").is(":checked")');
  if($("input:radio[name='"+id+"']").is(":checked"))
  {
   var new_val=$("input[name='"+id+"']:checked").val();
   e_status=Validatecheck_radio(new_val,id,rq_sts,err_show_id);
 }else{
   var new_val="";
   e_status=Validatecheck_radio(new_val,id,rq_sts,err_show_id);
  }

   return e_status;
}





function CheckBox_keyUp(id,prv_id,rq_sts,min,max)
{
var container = document.querySelector("#"+prv_id);
var checkboxesAll = container.querySelectorAll("#"+id+"");

    for(var i=0;i<checkboxesAll.length;i++)
    {
        checkboxesAll[i].addEventListener('change', function() {
      if (this.checked) {
        e_status=Validatecheck_Box(prv_id,id,min,max,rq_sts);
      } else {
        e_status=Validatecheck_Box(prv_id,id,min,max,rq_sts);
      }
    });
   
    }
    return e_status;
}

function CheckBox_valid(id,prv_id,rq_sts,min,max)
{
   e_status=Validatecheck_Box(prv_id,id,min,max,rq_sts);
   return e_status;
}


function Validatecheck_Box(prv_id,id,min,max,rq_sts)
{
  try{
      if(rq_sts)
      {
        var container = document.querySelector('#'+prv_id);
        var checkboxesAll = container.querySelectorAll('#'+id);
        var checkBoxesSelected = container.querySelectorAll('input[type="checkbox"]:checked');
        let k=checkBoxesSelected.length;
        if(k<min)
        {
          var sms="Please Select Minimum "+min+" Option";
          error_disp(prv_id,sms);
          return false;
        }else if(k>max)
        {
          var sms="Please Select Maximum "+max+" Options";
          error_disp(prv_id,sms);
          return false;
        }else if((k>=min) && (k<=max)){
          var sms="";
          error_remove(prv_id);
          return true;
        }else{
          var sms="Please Select Minimum "+min+" & Maximum "+max+" Option";
          error_disp(prv_id,sms);
          return false;
        }

      }else{
        return true;
      }
    }catch(err) {
  
      console.log("Error-> CheckBox Validation  ",err.message);
      return false;
    }
}

/*
Code Version 1.00 
Code Written By: Pawar Softwares Soluiton Pvt. Ltd.
Email :hr@pawarsoftwares.com
Contact:8983438373
*/