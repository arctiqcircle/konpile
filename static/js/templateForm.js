var textareaElement = document.getElementById('jinja2-textarea');

textareaElement.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    e.preventDefault();

    // Get the current cursor position
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // Insert a tab character at the cursor position
    this.value = this.value.substring(0, start) + (' ' * 4) + this.value.substring(end);

    // Set the new cursor position after the inserted tab character
    this.selectionStart = this.selectionEnd = start + 1;
  }
});
