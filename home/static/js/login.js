$(document).ready(function(){
    if(localStorage.getItem("token"))
    {
        document.getElementById('title').innerText = "Usuário Autenticado.";
        document.getElementById('registerForm').innerHTML = "";
        document.getElementById('result').innerHTML = "Aguarde! Você será redirecionado...";
        window.setTimeout(function(){
            window.location.href = "/profile/";
        }, 5000);
    }
}); 

function login(){
    var sd_username = document.getElementById('loginusername').value;
    var sd_password = document.getElementById('loginpassword').value;
    
    var sendInfo = {
        username: sd_username,
        password: sd_password
    };
    $.when(
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/api/token-auth/",
            dataType: "json",
            accept: "application/json",
            contentType: "application/json; charset=UTF-8", // This is the money shot
            success: function(data){
                localStorage.setItem("token", data['token']);
                localStorage.setItem("cmpaasid", data['id']);
            },      
            data: JSON.stringify(sendInfo)
        }).fail(function(response){
            window.location = "/login/";
        })
   ).then(function(){
       $.ajax({
            method: "GET",
            url: "http://127.0.0.1:8000/api/users/"+localStorage.getItem("cmpaasid")+"/",
            success: function(data){
                localStorage.setItem("first_name", data['first_name']);
                localStorage.setItem("last_name", data['last_name']);
                localStorage.setItem("username", data['username']);
                localStorage.setItem("email", data['email']);
            }      
        }).done(function(){
            window.location = "/profile/";
        }).fail(function(response){
            console.log(response);
        })
   });                             
}          
}

