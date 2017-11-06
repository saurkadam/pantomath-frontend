	/* Set the width of the side navigation to 250px */
	function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	}
	/* Set the width of the side navigation to 0 */
	function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	}
	(function($) {
  $(".accordion > li:eq(0) a")
    .addClass("active")
    .next()
    .slideDown();

  $(".accordion a").click(function(j) {
    var dropDown = $(this)
      .closest("li")
      .find("p");

    $(this)
      .closest(".accordion")
      .find("p")
      .not(dropDown)
      .slideUp();

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(this)
        .closest(".accordion")
        .find("a.active")
        .removeClass("active");
      $(this).addClass("active");
    }

    dropDown.stop(false, true).slideToggle();

    j.preventDefault();
  });
})(jQuery);