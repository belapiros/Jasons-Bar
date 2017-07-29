//The MIT License (MIT)
//
//Copyright (c) 2016 SitePoint
//
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated //documentation files (the "Software"), to deal in the Software without restriction, including without //limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the //Software, and to permit persons to whom the Software is furnished to do so, subject to the following //conditions:
//
//The above copyright notice and this permission notice shall be included in all copies or substantial portions //of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED //TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL //THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF //CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER //DEALINGS IN THE SOFTWARE.

window.onload =  function initSmoothScrolling() {
                    if (isCssSmoothSCrollSupported()) {
                      document.getElementById('body').className = 'supported';
                      return;
                    }

                    var duration = 400;

                    var pageUrl = location.hash ?
                      stripHash(location.href) :
                      location.href;

                    delegatedLinkHijacking();
                    //directLinkHijacking();

                    function delegatedLinkHijacking() {
                      document.body.addEventListener('click', onClick, false);

                      function onClick(e) {
                        if (!isInPageLink(e.target))
                          return;

                        e.stopPropagation();
                        e.preventDefault();

                        jump(e.target.hash, {
                          duration: duration,
                          callback: function() {
                            setFocus(e.target.hash);
                          }
                        });
                      }
                    }

                    function directLinkHijacking() {
                      [].slice.call(document.querySelectorAll('a'))
                        .filter(isInPageLink)
                        .forEach(function(a) {
                          a.addEventListener('click', onClick, false);
                        });

                      function onClick(e) {
                        e.stopPropagation();
                        e.preventDefault();

                        jump(e.target.hash, {
                          duration: duration,
                        });
                      }

                    }

                    function isInPageLink(n) {
                      return n.tagName.toLowerCase() === 'a' &&
                        n.hash.length > 0 &&
                        stripHash(n.href) === pageUrl;
                    }

                    function stripHash(url) {
                      return url.slice(0, url.lastIndexOf('#'));
                    }

                    function isCssSmoothSCrollSupported() {
                      return 'scrollBehavior' in document.documentElement.style;
                    }

                    // Adapted from:
                    // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
                    // function setFocus(hash) {
                    //   var element = document.getElementById(hash.substring(1));
                    //
                    //   if (element) {
                    //     if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                    //       element.tabIndex = -1;
                    //     }
                    //
                    //     element.focus();
                    //   }
                    // }

                  }

                  function jump(target, options) {
                    var
                      start = window.pageYOffset,
                      opt = {
                        duration: options.duration,
                        offset: options.offset || 0,
                        callback: options.callback,
                        easing: options.easing || easeInOutQuad
                      },
                      distance = typeof target === 'string' ?
                      opt.offset + document.querySelector(target).getBoundingClientRect().top :
                      target,
                      duration = typeof opt.duration === 'function' ?
                      opt.duration(distance) :
                      opt.duration,
                      timeStart, timeElapsed;

                    requestAnimationFrame(function(time) {
                      timeStart = time;
                      loop(time);
                    });

                    function loop(time) {
                      timeElapsed = time - timeStart;

                      window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

                      if (timeElapsed < duration)
                        requestAnimationFrame(loop)
                      else
                        end();
                    }

                    function end() {
                      window.scrollTo(0, start + distance);

                      if (typeof opt.callback === 'function')
                        opt.callback();
                    }

                    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
                    function easeInOutQuad(t, b, c, d) {
                      t /= d / 2
                      if (t < 1) return c / 2 * t * t + b
                      t--
                      return -c / 2 * (t * (t - 2) - 1) + b
                    }

                  }
