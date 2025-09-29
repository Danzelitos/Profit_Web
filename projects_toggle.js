// Mobile menu toggle
    document.getElementById('burger')?.addEventListener('click', () => {
      document.getElementById('mnav')?.classList.toggle('hidden');
    });

    // Tabs toggle for projects
    function switchProjects(type) {
      const testnet = document.getElementById('testnet-projects');
      const mainnet = document.getElementById('mainnet-projects');
      const btnTestnet = document.getElementById('btn-testnet');
      const btnMainnet = document.getElementById('btn-mainnet');

      if (type === 'testnet') {
        testnet.classList.remove('hidden');
        mainnet.classList.add('hidden');
        btnTestnet.classList.add('bg-white','text-black');
        btnTestnet.classList.remove('bg-gray-900','text-white');
        btnMainnet.classList.add('bg-gray-900','text-white');
        btnMainnet.classList.remove('bg-white','text-black');
      } else {
        mainnet.classList.remove('hidden');
        testnet.classList.add('hidden');
        btnMainnet.classList.add('bg-white','text-black');
        btnMainnet.classList.remove('bg-gray-900','text-white');
        btnTestnet.classList.add('bg-gray-900','text-white');
        btnTestnet.classList.remove('bg-white','text-black');
      }
      // re-run reveal observer when switching
      observer && document.querySelectorAll('#' + (type==='testnet'?'testnet-projects':'mainnet-projects') + ' .reveal').forEach(el => observer.observe(el));
    }
    window.switchProjects = switchProjects;

    // IntersectionObserver for reveal animation
    const observer = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target);} });
    }, { threshold: 0.12 }) : null;

    if (observer) {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } else {
      // fallback
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    }