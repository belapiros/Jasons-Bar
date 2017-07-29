window.addEventListener('scroll', function() {
  // close burger menu on scroll
  // note that clicking on a link create a scroll event, thus gets activated
  document.getElementById("checkbox").checked = false;
  // screen over 1000px
  if (window.innerWidth > 1000) {
    // this value is your scroll distance from the top
    var distance_from_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // this value has the style of the navigation
    var nav_container = document.getElementById("navigation").style;
    // this value is the total browser height minus the navigation
    var pic_size = window.innerHeight - 50;

    // the user has scrolled to the tippy top of the page, set appropriate style
    if (distance_from_top <= pic_size) {
      nav_container.position = "absolute";
      nav_container.top = "auto";
      nav_container.bottom = "0";
    }
    // the user has scrolled down the page, set appropriate style
    if(distance_from_top > pic_size) {
      nav_container.position = "fixed";
      nav_container.top = "0";
      nav_container.bottom = "auto";
    }
  }

});
