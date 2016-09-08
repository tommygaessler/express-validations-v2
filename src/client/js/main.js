(function () {

  console.log('sanity check!');

  $(document).on('click', '.delete', function() {

    const answer = confirm('Are you sure?');

    if (answer) {
      const $this = $(this);
      const $id = $this.attr('data-id');

      $.ajax({
        type: 'DELETE',
        url: `/emojis/delete/${$id}`
      })
      .done((emoji) => {
        location.reload();
        console.log(emoji);
      })
      .fail((error) => {
        console.log(error);
      });
    }
  });

  $(document).on('click', '.edit', function() {
    const $this = $(this);
    const $id = $this.attr('data-id');
    const $emoji = $this.attr('data-emoji');
    const $emotion = $this.attr('data-emotion');
    $('#emoji').val($emoji);
    $('#emotion').val($emotion);
    $('#id').val($id);
  });

  $(document).on('submit', '#modal-form', function(e) {
    e.preventDefault();
    const $editedEmoji = $('#emoji').val();
    const $editedEmotion = $('#emotion').val();
    const $id = $('#id').val();
    const payload = {
      emoji: $editedEmoji,
      emotion: $editedEmotion
    };
    $.ajax({
      type: 'PUT',
      url: `/emojis/edit/${$id}`,
      data: payload
    })
    .done((data) => {
      $('#myModal').modal('toggle');
      location.reload();
    })
    .fail((error) => {
      console.log(error);
    });
  });
})();
