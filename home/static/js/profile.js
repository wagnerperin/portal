$("container").ready(function(){
    document.getElementById("name").innerText = localStorage.getItem("first_name") + " " + localStorage.getItem("last_name");
    document.getElementById("usertag").innerText = "@"+localStorage.getItem("username");
});