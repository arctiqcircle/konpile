function uploadFileForm(form) {
  try {
    fetch("/process", {
      method: "POST",
      body: form,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in API response");
        }
        return response.json();
      })
      .then((data) => {
        // Update the jsonData variable with the retrieved data
        Display.updateData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        Display.showErrorMessage(error.message);
      });
  } catch (error) {
    console.error("Error:", error);
    Display.showErrorMessage(error.message);
  }
}

var dragDropBox = document.getElementById("upload-box");

var uploadForm = document.getElementById("upload-form");

dragDropBox.addEventListener("dragenter", function (e) {
  e.preventDefault();
  dragDropBox.classList.add("dragging");
});

dragDropBox.addEventListener("dragleave", function (e) {
  e.preventDefault();
  dragDropBox.classList.remove("dragging");
});

dragDropBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dragDropBox.addEventListener("drop", function (e) {
  e.preventDefault();
  dragDropBox.classList.remove("dragging");
  var file = e.dataTransfer.files[0];
  var formData = new FormData();
  formData.append("file", file);
  uploadFileForm(formData);
});

uploadForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var file = e.target[0].files[0];
  var formData = new FormData();
  formData.append("file", file);
  uploadFileForm(formData);
});
