function changerImages(){
      var $active = $('#changer .active');
      var $next = ($active.next().length > 0) ? $active.next() : $('#changer img:first');
      $next.css('z-index',2);
      $active.fadeOut(1500,function(){
	  $active.css('z-index',1).show().removeClass('active');
          $next.css('z-index',3).addClass('active CoverImage');
      });
    }

$(document).ready(function(){

setInterval('changerImages()', 7000);
})