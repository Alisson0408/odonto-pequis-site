(function () {
  // ===== CONTATO OFICIAL (altere só aqui) =====
  var WHATS = '5534998797441';

  var base = 'Olá! Conheci a Odonto Pequis pelo site ';
  var msgs = {
    geral: base + 'e gostaria de agendar uma avaliação.',
    hero: base + 'e quero agendar minha avaliação. Quais horários vocês têm disponíveis?',
    video: base + '(vi o vídeo da clínica) e gostaria de agendar uma avaliação.',
    prevencao: base + 'e tenho interesse em limpeza / restauração. Podem me passar horários disponíveis?',
    cirurgia: base + 'e tenho interesse em extração de siso ou implante. Gostaria de agendar uma avaliação.',
    orto: base + 'e tenho interesse em aparelho ortodôntico. Gostaria de agendar uma avaliação.',
    avaliacoes: base + '(vi as avaliações no Google) e gostaria de agendar uma consulta.',
    duvida: base + 'e tenho uma dúvida antes de agendar.',
    final: base + 'e quero cuidar do meu sorriso. Podem me ajudar a agendar?'
  };
  function wa(text) { return 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent(text); }

  document.querySelectorAll('.wa-link').forEach(function (a) {
    a.href = wa(msgs[a.dataset.msg] || msgs.geral);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });

  // ===== Formulário → mensagem pronta no WhatsApp =====
  var fbtn = document.getElementById('form-btn');
  if (fbtn) {
    var ids = ['f-nome', 'f-trat', 'f-periodo', 'f-primeira'];
    var build = function () {
      var v = {};
      ids.forEach(function (id) { var el = document.getElementById(id); v[id] = el ? (el.value || '').trim() : ''; });
      var t = 'Olá! ' + (v['f-nome'] ? 'Meu nome é ' + v['f-nome'] + '. ' : '') +
        'Conheci a Odonto Pequis pelo site e gostaria de agendar uma avaliação.\n\n' +
        '• Tratamento de interesse: ' + (v['f-trat'] || 'ainda não sei, quero uma avaliação') + '\n' +
        '• Melhor período: ' + (v['f-periodo'] || 'a combinar') + '\n' +
        '• Já sou paciente: ' + (v['f-primeira'] || 'não informado');
      fbtn.href = wa(t);
    };
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.addEventListener('input', build); el.addEventListener('change', build); }
    });
    build();
  }

  // ===== Vídeo com botão de play próprio =====
  document.querySelectorAll('[data-player]').forEach(function (box) {
    var vid = box.querySelector('video');
    var play = box.querySelector('.play');
    if (!play) return;
    play.addEventListener('click', function () {
      if (!vid) { // ainda sem vídeo: leva ao WhatsApp
        window.open(wa(msgs.video), '_blank', 'noopener');
        return;
      }
      vid.controls = true;
      play.classList.add('hide');
      var p = vid.play(); if (p && p.catch) p.catch(function () {});
    });
    if (vid) vid.addEventListener('ended', function () { play.classList.remove('hide'); vid.controls = false; vid.currentTime = 0; });
  });

  // ===== Cabeçalho ao rolar =====
  var h = document.querySelector('.header');
  if (h) {
    var onScroll = function () { h.classList.toggle('scrolled', window.scrollY > 30); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== Animação de entrada =====
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
