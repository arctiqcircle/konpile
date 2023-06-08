var formElement = document.getElementById("compile-form");

var textareaElement = document.getElementById("jinja2-textarea");

formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the textarea content
  var textareaContent = textareaElement.value;

  // Create a payload object with the textarea content and jsonData
  var payload = {
    template: textareaContent,
    data: JsonData,
  };

  // Send the payload to the "/compile" endpoint
  fetch("/compile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.blob())
    .then((blob) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "konpiled.txt";
      downloadLink.click();
    })
    .catch((error) => {
      console.error("Error:", error);
      Display.showErrorMessage(error.message);
    });
});
