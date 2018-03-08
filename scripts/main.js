(function (window) {
  "use strict";
  var FORM_SELECTOR = "[data-coffee-order=\"form\"]";
  var FORM_PAYMENT = "[data-payment-info=\"form\"]";
  var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var myTruck = new Truck("ncc-1701", new DataStore());
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  var paymentHandler = new FormHandler(FORM_PAYMENT);


  formHandler.addSubmitHandler(function (data){
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });
  paymentHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));

})(window);
