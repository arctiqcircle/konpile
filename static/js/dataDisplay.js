/*

*/

var jsonCodeElement = document.getElementById("json-code");

var errorContainer = document.getElementById("error-container");

// JSON data to be updated, displayed, and sent to the server
var JsonData = {
};

var Display = {

  updateView: function updateJsonViewer(data) {
    if (Object.keys(data).length > 0) {
      jsonCodeElement.textContent = JSON.stringify(data, null, 2);
    } else {
      jsonCodeElement.textContent = "No data to display";
    }
  },

  updateData: function updateJsonData(data) {
    // Merge the new data with the existing jsonData using Object.assign
    JsonData = Object.assign({}, JsonData, data);
    this.updateView(JsonData);
  },

  showErrorMessage: function showErrorMessage(message) {
    // Display an error message
    errorContainer.innerHTML = "";
    var errorMessage = document.createElement("p");
    errorMessage.textContent = message
    errorMessage.classList.add("error-message");
    setTimeout(function () {
      errorMessage.classList.add("show");
    }, 10);
    errorContainer.appendChild(errorMessage);
  }
  
}

// Call the createJsonViewer function with the initial jsonData and dictionaryContent
Display.updateView(JsonData);