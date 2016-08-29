function Feed() {
  var that = this;

  this.init = function() {

    this.showSingleFeed();

    $('.get-feed').submit(function(e) {
      e.preventDefault();
      var url = $('.get-feed input').val();
      $('.get-feed input').val('');
      that.loadFeed(url, true);
    });

  };

  this.loadFeed = function(url, showSave) {
    var feed = new google.feeds.Feed(url);
    feed.setNumEntries(10);

    feed.load(function(data) {
      that.populateFeedHeading(data, url, showSave);
      that.populateFeedPosts(data);
    });
  };

  this.populateFeedHeading = function(data, url) {
    $('.feed-info').empty();
    var name     = $('<a>').html(data.feed.title).addClass('title')
                           .attr('href', url).attr('target', '_blank');
    $('.feed-info').append(name);
  };

  this.populateFeedPosts = function(data) {
    $('.content').empty();
    var entries = data.feed.entries;

    for (var i = 0; i < entries.length; i++) {
      var article = $('<article>');
      var title   = $('<p>').html(entries[i].title);
      var link    = $('<a>').attr('href', entries[i].link)
                    .attr('target','_blank');
      title.wrapInner(link);

      var content = $('<p>').html(entries[i].content)
      article.append(title).append(content);
      $('.content').append(article);
      /*var hide = $('<span>').html('<i class="fa fa-bookmark"></i> Hide')
                    .addClass('hide-feed');
      $('.content').append(hide);
*/

   
    }
    /* $('.hide-feed').click(function(e) { 
       e.preventDefault();

      $('.content article').hide().prev().one('click');
    });*/
  };


  this.showSingleFeed = function() {
    var id = location.hash;
    id     = id.slice(1, id.length);

    if (id != '') {
      $.ajax({
        url: '/feeds/'+id,
        method: 'get',
        dataType: 'json',
        success: function(data) {
          that.loadFeed(data.url, false);
      },
        error: function(err) { console.log(err); }
      });
    }
  };

  this.hideFeed = function() {
    
    var id = location.hash;
    id     = id.slice(1, id.length);

    $(this).hide();
  };

  this.init();
}
