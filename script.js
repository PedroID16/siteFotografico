  // Filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.grid-item').forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.style.opacity = show ? '1' : '0.2';
        item.style.pointerEvents = show ? 'auto' : 'none';
        item.style.transition = 'opacity 0.4s';
      });
    });
  });

  // Lightbox
  function openLightbox(src, title, cat) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-cat').textContent = cat;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(e) {
    if (!e || e.target !== document.getElementById('lightbox-img')) {
      document.getElementById('lightbox').classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

 // Form
async function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  document.getElementById('form-success').style.display = 'none';
  document.getElementById('form-error').style.display = 'none';
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xbdpqnkg', {
      method: 'POST',
      body: new FormData(e.target),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      document.getElementById('form-success').style.display = 'block';
      btn.textContent = 'Sent ✓';
      btn.style.background = 'var(--accent-dark)';
      e.target.reset();
    } else {
      throw new Error();
    }
  } catch {
    document.getElementById('form-error').style.display = 'block';
    btn.textContent = 'Send Enquiry →';
    btn.disabled = false;
  }
}

  // Nav scroll shadow
  window.addEventListener('scroll', () => {
    document.querySelector('nav').style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(26,24,20,0.08)' : 'none';
  });
