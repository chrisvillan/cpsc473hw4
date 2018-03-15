(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      /*eslint-disable no-console*/
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.ajax(this.serverUrl + "coffeeorders/", {
      type: "GET",
      success: function(serverResponse) {
        /*eslint-disable no-console*/
        console.log(serverResponse);
        cb(serverResponse);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };


  RemoteDataStore.prototype.get = function(key, cb) {
    $.ajax("coffeeorders/" + key, {
      type: "GET",
      success: function(serverResponse) {
        /*eslint-disable no-console*/
        console.log(serverResponse);
        cb(serverResponse);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    $.ajax(this.serverUrl + "?emailAddress=" + key, {
      type: "GET",
      dataType: "json",
      success: function(serverResponse) {
        $.ajax("http://localhost:2403/coffeeorders" + "/" + serverResponse[0].id, {
          type: "DELETE",
          error: function(xhr) {
            alert(xhr.responseText);
          }
        });
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };


  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);
