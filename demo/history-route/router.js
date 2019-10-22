(function () {

  var url = '内容展示';

  history.replaceState(url, null, ''); //最开始的状态，采用replace直接替换
  $('#box').html('<p>' + url + '</p>')

  $('a').on('click', function () {
    console.log(this.text)
    url = this.text;

    $('#box').html('<p>' + url + '</p>')
    history.pushState(url, null, '#/' + url);
  })
  window.addEventListener('popstate', function (e) {
    console.log(e.state);
    url = e.state
    $('#box').html('<p>' + url + '</p>')

  });
})()
