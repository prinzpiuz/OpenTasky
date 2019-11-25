var click = 1;
const task_id = $("#task_id").val();
const copyDiv = copy => {
  click = click + 1;
  var a = $(".my-4").html();
  $("#div").append("<div class='my-4' id='" + click + "'</div>");
  $("#" + click).append(a);
  $("#" + click).append("<a onclick='del(" + click + ")'>X</a>");
};

const del = div => {
  $("#" + div).remove();
  click = click - 1;
};

const sendDate = send => {
  data = {};
  for (var i = 1; i <= click; i++) {
    date = $("#" + i)
      .find("input[name~='date']")
      .val();
    start_hour = $("#" + i)
      .find("select[name~='StartHour']")
      .val();
    start_min = $("#" + i)
      .find("select[name~='StartMin']")
      .val();
    end_hour = $("#" + i)
      .find("select[name~='EndHour']")
      .val();
    end_min = $("#" + i)
      .find("select[name~='EndMin']")
      .val();
    hour_diff = Math.abs(parseInt(start_hour) - parseInt(end_hour));
    min_diff = Math.abs(parseInt(end_min) - parseInt(start_min));
    total_hours = hour_diff + "." + min_diff;
    data[date] = total_hours;
  }
  data["task_id"] = task_id;
  sendData(data);
};

const sendData = data => {
  console.log("data", data);

  $.ajax({
    url: "http://127.0.0.1:3000/add_manually",
    type: "POST",
    dataType: "json",
    data: data,
    success: function(d) {
      window.location.replace("http://127.0.0.1:3000/");
    },
    error: function() {
      alert("Error please try again");
    }
  });
};
