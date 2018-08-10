if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('/sw.js')
  .then(function(){
      console.log('Service worker registerd successfully');
  });
}
$(function() {
  $('#errormesg').hide();
});
  function get(evt){
    evt.preventDefault();
    var userid=$('#name').val();
  fetch(`https://api.github.com/users/${userid}/followers`)
        .then(function(response) { 
    return response.json();
  })
  .then(function(json){
    $('#errormesg').hide();
    json.map(function (data, index) {
      $('#show').append(`
      <tr><td></td>
                        <td>${index}</td>
                        <td> <img src="${data.avatar_url}" style="width:100px; height:100px;" alt=""></td>
                        <td>${data.login}</td>
                        <td>${data.id}</td>
                        <td>${data.html_url}</td>
                      </tr>
      `);
        //  document.getElementById("show").innerHTML +="Follower Name is " + data.login +"<br>";
        //  document.getElementById("show").innerHTML +="Follower Id is " + data.id +"<br>";
         })
  })
  .catch(function(err){
    console.log("not found",err);
    $('#errormesg').show();
  })
  }