document.addEventListener('DOMContentLoaded', function() {

  function playVideo(v) {
    var p = v.play();
    if (p && typeof p.catch === 'function') { p.catch(function() {}); }
  }

  var taskVideos = document.querySelectorAll('.task-videos video');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          playVideo(v);
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    taskVideos.forEach(function(v) { observer.observe(v); });
  } else {
    taskVideos.forEach(playVideo);
  }

  document.querySelectorAll('.variant-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var card = btn.closest('.task-card');
      card.querySelectorAll('.variant-btn').forEach(function(b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');

      var instr = card.querySelector('.instruction-text');
      if (instr && btn.dataset.instr) { instr.textContent = btn.dataset.instr; }

      var baseVideo = card.querySelector('.video-base');
      var oursVideo = card.querySelector('.video-ours');
      [[baseVideo, btn.dataset.base], [oursVideo, btn.dataset.ours]].forEach(function(pair) {
        var v = pair[0], src = pair[1];
        if (!v || !src) { return; }
        if (v.getAttribute('src') !== src) {
          v.setAttribute('src', src);
          v.load();
        }
        playVideo(v);
      });
    });
  });

});
