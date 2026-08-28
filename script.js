(function(){
  var chips = document.querySelectorAll('.chip');
  var sections = document.querySelectorAll('.category');
  var map = {};
  chips.forEach(function(c){ map[c.dataset.target] = c; });

  chips.forEach(function(c){
    c.addEventListener('click', function(e){
      e.preventDefault();
      var el = document.getElementById(c.dataset.target);
      if(el){
        var y = el.getBoundingClientRect().top + window.pageYOffset - 96;
        window.scrollTo({top:y, behavior:'smooth'});
      }
    });
  });

  if('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var chip = map[entry.target.id];
        if(!chip) return;
        if(entry.isIntersecting){
          chips.forEach(function(c){ c.classList.remove('active'); });
          chip.classList.add('active');
          chip.scrollIntoView({block:'nearest', inline:'center', behavior:'smooth'});
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function(s){ obs.observe(s); });
  }
})();
