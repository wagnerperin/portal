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
            
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8000/api/token-auth/",
                dataType: "json",
                accept: "application/json",
                contentType: "application/json; charset=UTF-8", // This is the money shot
                success: function(data){
                    localStorage.setItem("token", data['token']);
                    alert(localStorage.getItem("token"));
                    window.location = "/login/";
                },      
                data: JSON.stringify(sendInfo)
            }).fail(function(response){
                var json = JSON.stringify(response);
                var res = $.parseJSON(json);
                var msg = $.parseJSON(res.responseText);
                var output = "";
                for(var property in msg)
                {
                    output += property + ": " + msg[property]
                }
                alert(output);
            });
                        
        }