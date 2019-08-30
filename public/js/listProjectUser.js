const getUsers = proj => {
    $("#user_select").empty();
    $("#user_select_div").css("display", "inline-block");
    const projId = proj.parentNode.value;
    fetch('/admin/get_users/' + projId, {
        method: 'GET'
    }).then(result =>{
        return result.json();
    }).then(data => {
        for (var i = 0; i < data.message.length; i++) {
            $("#user_select").append("<option value=" + data.message[i].id + ">" + data.message[i].name +"</option>");
        }
    });
};