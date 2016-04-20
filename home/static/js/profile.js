/* MUITO UTIL
function recursiveGetProperty(obj, lookup, callback) {
    for (property in obj) {
        if (property == lookup) {
            callback(obj[property]);
        } else if (obj[property] instanceof Object) {
            recursiveGetProperty(obj[property], lookup, callback);
        }
    }
} 


recursiveGetProperty(data, 'results', function(obj) {
            document.getElementById("maps").innerHTML += obj["title"] + "<br/>";
    });
*/
function loadMaps(){
    $.ajax({
            type: "GET",
            url: "http://platform.cmpaas.inf.ufes.br:8000/api/mymaps/"+localStorage.getItem("username")+"/",
            dataType: "json",
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            success: function(data){
                var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
                var newRow;
                var newCell;
                var newText;
                var a;
                var linkText;
                var vet = data['results'];
            
                vet.forEach(function(entry) {
                    newRow = tableRef.insertRow(tableRef.rows.length);
                    
                    newCell  = newRow.insertCell(0);
                    newText  = document.createTextNode(entry['id']);
                    newCell.appendChild(newText);
                    
                    newCell  = newRow.insertCell(1);
                    newText  = document.createTextNode(entry['title']);
                    newCell.appendChild(newText);
                    
                    newCell  = newRow.insertCell(2);
                    newText  = document.createTextNode(entry['question']);
                    newCell.appendChild(newText);
                    
                    newCell  = newRow.insertCell(3);
                    newText  = document.createTextNode(entry['created_date']);
                    newCell.appendChild(newText);
                    
                    newCell  = newRow.insertCell(4);
                    if(entry['published_date'] != null){
                        newText  = document.createTextNode(entry['published_date']);
                        newCell.appendChild(newText);
                    }else{
                        a = document.createElement('a');
                        linkText = document.createElement('em');
                        linkText.setAttribute("class", "fa fa-share");
                        a.appendChild(linkText);
                        a.title = "Compartilhar";
                        a.href = "#";
                        a.setAttribute("class", "btn btn-info");
                        newCell.appendChild(a);
                    }
                    
                    
                    newCell = newRow.insertCell(5);
                    a = document.createElement('a');
                    linkText = document.createElement('em');
                    linkText.setAttribute("class", "fa fa-pencil");
                    a.appendChild(linkText);
                    a.title = "Editar";
                    a.href = "#";
                    a.setAttribute("class", "btn btn-default");
                    newCell.appendChild(a);
                    
                    a = document.createElement('a');
                    linkText = document.createElement('em');
                    linkText.setAttribute("class", "fa fa-trash");
                    a.appendChild(linkText);
                    a.title = "Excluir";
                    a.href = "#";
                    a.setAttribute("class", "btn btn-danger");
                    newCell.appendChild(a);
                                   
                    
                });              
            }  
        }).fail(function(response){
            document.getElementById("maps").innerHTML = "Erro ao Carregar Mapas";
        });
}

$("container").ready(function(){
    if(localStorage.getItem("token") == null){
        window.location = "/login/";
    }else{
        document.getElementById("name").innerText = localStorage.getItem("first_name") + " " + localStorage.getItem("last_name");
        document.getElementById("usertag").innerText = "@"+localStorage.getItem("username");
        document.getElementById("imageProfile").src = localStorage.getItem("image");
        loadMaps();
    }  
});