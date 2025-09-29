// ------------- ДАННЫЕ -------------
const projects = {
  testnet: [
    { name: 'Ritual',  tag: 'AI',      logo: './assets/testnet/Ritual.png',  url: 'https://ritual.net/about' },
    { name: 'Cysic',  tag: 'zk-Proofs',   logo: './assets/projects/cysic.png',     url: 'https://docs.cysic.xyz/' },
    { name: 'Gensyn',  tag: 'Layer 1 / AI',    logo: 'assets/projects/gensyn.png',     url: 'https://docs.gensyn.ai/' },
    { name: 'Nexus',  tag: 'Layer 1 / zk-Proofs',      logo: 'assets/projects/nexus.png',     url: '#' },
  ],
  mainnet: [
    { name: 'Massa',   tag: 'Layer 1', logo: './assets/mainnet/massa.png',   url: 'https://docs.massa.net/' },
    { name: 'Hippo',     tag: 'Layer 1',      logo: 'assets/projects/hippo.png',     url: 'https://whitepaper.hippoprotocol.ai/' },
    { name: 'Gravity Bridge',tag: 'Interchain',      logo: 'assets/projects/gravity.jpg' ,url: 'https://www.gravitybridge.net/faq' },
    { name: 'Nolus',   tag: 'DeFi',    logo: './assets/mainnet/nolus.png',   url: '#' },
  ]
};

// -------- ШАБЛОНЫ --------
const cardTemplate = (p) => `
  <div class="pn-card rounded-xl p-5 sm:p-6 flex flex-col justify-between h-full bg-white shadow-sm">
    <div>
      <h3 class="text-black font-semibold text-xl sm:text-2xl mb-1">${p.name}</h3>
      <p class="text-gray-500 text-sm sm:text-base">${p.tag ?? ''}</p>
    </div>
    <div class="flex justify-between items-end mt-6">
      <a href="${p.url || '#'}" target="${p.url ? '_blank' : '_self'}"
         class="text-[color:var(--brand)] text-sm sm:text-base font-medium">read more</a>
      <img src="${p.logo}" alt="${p.name}"
           class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain rounded-2xl" />
    </div>
  </div>
`;

// карточка-тизер с блюром и надписью See more + анимированная рамка при hover
const moreCardTemplate = (to = 'projects.html') => `
  <a href="${to}" class="relative rounded-xl overflow-hidden block bg-white/70 border border-white/50">
    <div class="h-full min-h-[168px] sm:min-h-[200px] flex items-center justify-center">
      <!-- слой блюра -->
      <div class="absolute inset-0 bg-white/30 backdrop-blur-md"></div>

      <!-- “See more” -->
      <span class="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full
                   text-white bg-black/70 transition duration-300
                   before:absolute before:inset-0 before:rounded-full before:p-[2px] before:bg-gradient-to-r before:from-[color:var(--brand)] before:to-purple-400
                   before:opacity-0 hover:before:opacity-100 before:-z-10 before:transition-opacity before:duration-500">
        See more
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="currentColor" d="m13 5l7 7l-7 7v-4H4v-6h9V5Z"/>
        </svg>
      </span>
    </div>
    <!-- мягкая подсветка рамки карточки -->
    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/60"></div>
  </a>
`;

// -------- РЕНДЕР (3 проекта + 1 тизер) --------
function renderProjects() {
  const tn = document.getElementById('testnet-projects');
  const mn = document.getElementById('mainnet-projects');

  const build = (arr) => {
    const first3 = arr.slice(0, 3).map(cardTemplate).join('');
    return first3 + moreCardTemplate('projects.html');
  };

  tn.innerHTML = build(projects.testnet);
  mn.innerHTML = build(projects.mainnet);
}

// -------- ПЕРЕКЛЮЧАТЕЛЬ ТАБОВ --------
function switchProjects(type) {
  const tn = document.getElementById('testnet-projects');
  const mn = document.getElementById('mainnet-projects');
  const btnT = document.getElementById('btn-testnet');
  const btnM = document.getElementById('btn-mainnet');

  const showTestnet = type === 'testnet';
  tn.classList.toggle('hidden', !showTestnet);
  mn.classList.toggle('hidden', showTestnet);

  btnT.classList.toggle('bg-white', showTestnet);
  btnT.classList.toggle('text-black', showTestnet);
  btnT.classList.toggle('bg-gray-900', !showTestnet);
  btnT.classList.toggle('text-white', !showTestnet);

  btnM.classList.toggle('bg-white', !showTestnet);
  btnM.classList.toggle('text-black', !showTestnet);
  btnM.classList.toggle('bg-gray-900', showTestnet);
  btnM.classList.toggle('text-white', showTestnet);
}
window.switchProjects = switchProjects;

// -------- ИНИЦИАЛИЗАЦИЯ --------
document.addEventListener('DOMContentLoaded', renderProjects);


// ------------- ШАБЛОН КАРТОЧКИ -------------
// const cardTemplate = (p) => `
//   <div class="pn-card rounded-xl p-5 sm:p-6 flex flex-col justify-between h-full bg-white is-visible">
//     <div>
//       <h3 class="text-black font-semibold text-xl sm:text-2xl mb-1">${p.name}</h3>
//       <p class="text-gray-500 text-sm sm:text-base">${p.tag ?? ''}</p>
//     </div>
//     <div class="flex justify-between items-end mt-6">
//       <a href="${p.url || '#'}" target="${p.url ? '_blank' : '_self'}"
//          class="text-[color:var(--brand)] text-sm sm:text-base font-medium">read more</a>
//       <img src="${p.logo}" alt="${p.name}"
//            class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain" />
//     </div>
//   </div>
// `;


// ВНИМАНИЕ: здесь исправлен <a ...> — раньше его не было, из-за чего ломалась разметка.
// Также убрал класс "reveal" и сразу добавил "is-visible", чтобы карточки были видимы
// даже без IntersectionObserver.

// ------------- РЕНДЕР -------------
// function renderProjects() {
//   const tn = document.getElementById('testnet-projects');
//   const mn = document.getElementById('mainnet-projects');

//   tn.innerHTML = projects.testnet.map(cardTemplate).join('');
//   mn.innerHTML = projects.mainnet.map(cardTemplate).join('');

//   // Если всё-таки используешь reveal-анимацию — добавь observer тут
//   if (window.observer) {
//     document.querySelectorAll('#projects .pn-card').forEach(el => el.classList.add('reveal'));
//     document.querySelectorAll('#projects .reveal').forEach(el => observer.observe(el));
//   }
// }



// // ------------- ПЕРЕКЛЮЧЕНИЕ ТАБОВ -------------
// function switchProjects(type) {
//   const tn = document.getElementById('testnet-projects');
//   const mn = document.getElementById('mainnet-projects');
//   const btnT = document.getElementById('btn-testnet');
//   const btnM = document.getElementById('btn-mainnet');

//   const showTestnet = type === 'testnet';
//   tn.classList.toggle('hidden', !showTestnet);
//   mn.classList.toggle('hidden', showTestnet);

//   btnT.classList.toggle('bg-white', showTestnet);
//   btnT.classList.toggle('text-black', showTestnet);
//   btnT.classList.toggle('bg-gray-900', !showTestnet);
//   btnT.classList.toggle('text-white', !showTestnet);

//   btnM.classList.toggle('bg-white', !showTestnet);
//   btnM.classList.toggle('text-black', !showTestnet);
//   btnM.classList.toggle('bg-gray-900', showTestnet);
//   btnM.classList.toggle('text-white', showTestnet);

//   // (опционально) повесим observer заново
//   if (window.observer) {
//     document.querySelectorAll('#projects .reveal').forEach(el => observer.observe(el));
//   }
// }
// window.switchProjects = switchProjects;

// // ------------- ИНИЦИАЛИЗАЦИЯ -------------
// document.addEventListener('DOMContentLoaded', renderProjects);