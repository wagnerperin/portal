$(document).ready(function(){
            if(localStorage.getItem("token"))
            {
                document.getElementById("btEntrar").style.display = "none"
                
            }
        }); 


function fstlogin(){
            var sd_username = document.getElementById('fstusername').value;
            var sd_password = document.getElementById('fstpassword').value;
            
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
                    window.location = "/profile/";
                },      
                data: JSON.stringify(sendInfo)
            }).fail(function(response){
                window.location = "/login/";
            });               
}