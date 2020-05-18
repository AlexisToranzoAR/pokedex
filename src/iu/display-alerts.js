export function displayTopAlert(strongText, text, alertType) {
  $('#top-alert').html(`
    <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
        <strong>${strongText}</strong>
        <span>${text}</span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" id="close-button">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
  `);
}
