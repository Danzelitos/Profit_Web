// ===== JS: burger + render cards ===== 
// mobile menu
const burger = document.getElementById('burger');
const mnav = document.getElementById('mnav');
burger?.addEventListener('click', () => mnav.classList.toggle('hidden'));

// ---------- DATA ----------

const mainnetProjects = [
	{
		name: 'Hippo',
		tag: 'Layer 1',
		logo: 'assets/projects/hippo.png',
		stakeUrl: 'https://polkachu.com/validator_entities/F5EE4DC4C7F7E2D2', 
	},
	{
		name: 'Massa',
		tag: 'Layer 1',
		logo: 'assets/projects/massa.png',
		stakeUrl: 'https://massa.net', 
	},
	{
		name: 'Gravity Bridge',
		tag: 'Interchain',
		logo: 'assets/projects/gravity.jpg',
		stakeUrl: 'https://www.mintscan.io/gravity-bridge/validators/gravityvaloper1nha43p3maszz334r6wakkm0rwm70u3rtw839gx',
	},
];

const testnetProjects = [
	{
		name: 'Ritual',
		tag: 'AI',
		logo: 'assets/projects/Ritual.png'
	},
	{
		name: 'Cysic',
		tag: 'zk-Proofs',
		logo: 'assets/projects/cysic.png'
	},
	{
		name: 'Gensyn',
		tag: 'Layer 1 / AI',
		logo: 'assets/projects/gensyn.png'
	},
	{
		name: 'Nexus',
		tag: 'Layer 1 / ZK-Proofs',
		logo: 'assets/projects/nexus.png'
	},
	{
		name: 'Aztec',
		tag: 'Layer 2 / ZK-Rollup',
		logo: 'assets/projects/aztec.png'
	},
	{
		name: 'Unichain',
		tag: 'Layer 2 / Superchain',
		logo: 'assets/projects/unichain.png'
	},
	{
		name: '0G Labs',
		tag: 'Layer 1 / AI',
		logo: 'assets/projects/0G-Logo.png'
	},
	{
		name: 'Dill',
		tag: 'Blockchain Infrastructure',
		logo: 'assets/projects/dill.png'
	},
	{
		name: 'Pipe Network',
		tag: 'DePIN',
		logo: 'assets/projects/pipe.png'
	},
	{
		name: 'Dria',
		tag: 'AI',
		logo: 'assets/projects/dria.png'
	},
	{
		name: 'Datagram',
		tag: 'DePIN / IoT',
		logo: 'assets/projects/datagram.png'
	},
	{
		name: 'Drosera',
		tag: 'Incident Protocol',
		logo: 'assets/projects/drosera.png'
	},
	{
		name: 'Multisynq',
		tag: 'DePIN / Cloud',
		logo: 'assets/projects/multisynq.png'
	},
	{
		name: 'Inference',
		tag: 'AI',
		logo: 'assets/projects/kuzco.png'
	},
	{
		name: 'Blockcast',
		tag: 'Blockchain service',
		logo: 'assets/projects/blockcast.png'
	},
];

// ---------- TEMPLATES ----------
const mainnetCard = (p) => `
	<article class="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
		<img src="${p.logo}" alt="${p.name}" class="w-14 h-14 rounded-full object-contain bg-gray-50 p-2">
		<div class="flex-1">
			<div class="font-semibold">${p.name}</div>
			<div class="text-gray-500 text-sm">${p.tag || ''}</div>
		</div>
		${p.stakeUrl ? `
			<a href="${p.stakeUrl}" target="_blank" rel="noopener"
					class="px-4 py-2 rounded-full text-white bg-[color:var(--brand)] hover:opacity-90 whitespace-nowrap">
				Stake us
			</a>` : ''
		}
	</article>
`;

const testnetCard = (p) => `
	<article class="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
		<img src="${p.logo}" alt="${p.name}" class="w-14 h-14 rounded-full object-contain bg-gray-50 p-2">
		<div>
			<div class="font-semibold">${p.name}</div>
			<div class="text-gray-500 text-sm">${p.tag || ''}</div>
		</div>
	</article>
`;

// ---------- RENDER ----------
function renderProjects() {
	const mg = document.getElementById('mainnetGrid');
	const tg = document.getElementById('testnetGrid');
	mg.innerHTML = mainnetProjects.map(mainnetCard).join('');
	tg.innerHTML = testnetProjects.map(testnetCard).join('');
}

document.addEventListener('DOMContentLoaded', renderProjects);

// ---------- Как добавлять новые карточки ----------
// mainnetProjects.push({ name:'New Chain', tag:'Layer 1', logo:'assets/projects/new.png', stakeUrl:'https://...' });
// testnetProjects.push({ name:'New Testnet', tag:'ZK', logo:'assets/projects/new-test.png' });