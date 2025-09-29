/* ---------- DATA ---------- */
const testimonials = [
	{
		text: `I completely agree and join in the praise described above. Anton and the team, you guys are awesome! Making a complex product so accessible to users with zero knowledge and understanding of nodes (which included me :) is incredibly hard work. Simply writing a script and saying “figure it out” is one thing, but your approach of explaining everything in detail is amazing! Everything is accessible and understandable, without unnecessary technicalities, but with learning moments, it's just perfect! For my part, I will note that I never really understood Linux (although I have to deal with it at work sometimes :)), and I didn't think that nodes ran on it, but you have greatly broadened my horizons. Keep up the good work! I am incredibly happy to have the honor of being part of this community, and I wish everyone the greatest success!`,
		author: 'DEN',
		link: 'https://t.me/c/2490268762/33'
	},
	{
		text: `Guys, you are awesome! Everything is clearly structured: both in Notion and in Telegram. The support is top-notch, and a special thank you for your patience. No question is left unanswered—there are no responses like “this has already been discussed” or “look above.” You delve into every question and resolve it. To describe your approach briefly, it's simplicity. And simplicity, as Leonardo da Vinci said, is a complex thing. You know how to make the complex simple, which is certainly not easy.
I also really like that when someone suggests something to improve, change, or add, and you see the point in it, you implement it right away.
I thought I'd try it for a month and see if I liked it, and if not, I'd leave. But no, I'm not leaving, I'll keep bothering you! To be honest, I'm hooked on your approach!`,
		author: 'dysh',
		link: 'https://t.me/c/2490268762/30'
	},
	{
		text: `I got into Nodes months before I came here to the Club. I liked the team I met and fell in love with Nodes. My mentor (literally Katya) helped me a lot, and I already wanted more. And quite by accident, I ended up here... Some strange bots that accept payment 9. Matvey, who helped me
when I messed up with the payment, of course, and here are the coveted guides that were revealed to me...
To say “thank you” is not enough! A strong professional team, generous and absolutely kind and warm-hearted. Thank you, guys!
The guides are written in such a way that every little detail is discussed, so it's impossible to mess up! The help and support is such that you feel like you're constantly being carried on their hands.
And I like such deep and lively streams. I like them very much.
In general... I have nothing to add except enthusiasm and admiration.
And also... Understanding comes. Thanks to you.
It's no longer a meaningless set of letters and symbols, but all these lines, which used to be just something like “what if it works” for me, have started to convey information that I can see and understand. Not everything, but a lot is becoming clear. Like signs
on the road, like musical notation. In short, I'm lucky. Very lucky! Thank you, thank you, thank you!`,
		author: 'Olga',
		link: 'https://t.me/c/2490268762/24'
	},
	{
		text: `If you are considering joining the private Profit Nodes group and are unsure whether to do so, I would like to share
my experience.
This is not just a closed chat, but an entire ecosystem with well-designed tools, detailed text instructions with screenshots, video reviews, and training materials in Notion, Telegram, and YouTube.
Everything is explained as clearly as possible — from choosing and renting a server to installing a node with just a couple of commands thanks to convenient scripts prepared by the team. Even those who have never dealt with this before will be able to figure it out.
Behind all this are knowledgeable and responsive people who not only create materials but also actively help participants in chat rooms, patiently answering any questions that arise.
In three weeks, I not only gained new knowledge and valuable practical experience, but also became interested in new areas of learning. I now have 8 nodes working steadily, and I would like to get something for them.
If you are interested in this topic, I recommend giving it a try. The Profit Nodes community is truly amazing!
P.S. This may sound like an advertisement, but my review is the absolute truth. I tried to describe everything in detail as a token of my gratitude to the team for their work!`,
		author: 'Andrey',
		link: 'https://t.me/c/2490268762/17'
	},
	{
		text: `Gentlemen, I am infinitely grateful to you for such a fantastic product! Profit Nodes is not just a bunch of dry scripts. Everything here is top notch: organization, guides, support, community! Over the past two months, I have gained tremendous knowledge in a field that was completely new to me.
Special thanks for your patience, tolerance, and incredible work ethic!`,
		author: 'Marina',
		link: 'https://t.me/c/2490268762/22'
	},
	{
		text: `I never thought that setting up a node would be so easy. Every time I heard on the channels that a project had been released and I needed to set up a node, I skipped it. Thanks to the team, I gained knowledge about how the terminal works.
I have already memorized a number of key commands and noticed that I am starting to visit the beginner's thread less often. Thank you very much for the knowledge, thank you for the opportunity to learn and earn money at the same time.`,
		author: 'BenBatton',
		link: 'https://t.me/c/2490268762/22'
	}
];

/* ---------- SETTINGS ---------- */
const clampChars = 220; // сколько символов показывать до «Читать полностью»
const gap = 16; // px, горизонтальный пробел между карточками
const track = document.getElementById('tstTrack');
const viewport = document.getElementById('tstViewport');
const btnPrev = document.getElementById('tstPrev');
const btnNext = document.getElementById('tstNext');
const dotsWrap = document.getElementById('tstDots');

let slidesPerView = 1;      // вычисляем по ширине экрана
let currentPage = 0;        // страница, а не индекс карточки
let pages = 0;              // всего страниц
let cardWidth = 0;          // ширина карточки (px)

/* ---------- TEMPLATE ---------- */
const card = (item, idx) => {
	const full = item.text.trim();
	const short = full.length > clampChars ? full.slice(0, clampChars).trim() + '…' : full;

	return `
		<article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col h-full"
							style="flex: 0 0 ${cardWidth}px; margin-right:${gap}px">
			<div class="flex-1">
				<div class="text-gray-900 text-base leading-relaxed">
					<span id="tst-short-${idx}">${short}</span>
					<span id="tst-full-${idx}" class="hidden">${full}</span>
				</div>
				${full.length > clampChars
					? `<button data-toggle="${idx}"
							class="mt-2 text-[color:var(--brand)] text-sm font-medium hover:underline">
							Read more
						</button>`
					: ''
				}
			</div>
			<div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
				<div class="font-semibold">${item.author}</div>
				<a href="${item.link}" target="_blank" rel="noopener"
						class="text-sm text-[color:var(--brand)] hover:underline">Original source ↗</a>
			</div>
		</article>
	`;
};

/* ---------- RENDER ---------- */
function computeLayout() {
	const w = viewport.clientWidth;
	slidesPerView = w >= 1024 ? 3 : (w >= 640 ? 2 : 1);
	cardWidth = Math.floor((w - gap * (slidesPerView - 1)) / slidesPerView);
}

function render() {
	computeLayout();
	track.innerHTML = testimonials.map((t, i) => card(t, i)).join('');
	// ширина трека для корректного сдвига
	track.style.width = `${testimonials.length * (cardWidth + gap)}px`;

	pages = Math.max(1, Math.ceil(testimonials.length / slidesPerView));
	currentPage = Math.min(currentPage, pages - 1);

	// dots
	dotsWrap.innerHTML = '';
	for (let i = 0; i < pages; i++) {
		const b = document.createElement('button');
		b.className = `w-2.5 h-2.5 rounded-full ${i === currentPage ? 'bg-[color:var(--brand)]' : 'bg-gray-300'}`;
		b.addEventListener('click', () => goTo(i));
		dotsWrap.appendChild(b);
	}

	// повесим «Read more»
	document.querySelectorAll('[data-toggle]').forEach(btn => {
		btn.onclick = () => {
			const id = btn.getAttribute('data-toggle');
			const s = document.getElementById(`tst-short-${id}`);
			const f = document.getElementById(`tst-full-${id}`);
			const expanded = f.classList.contains('hidden') === false;
			if (expanded) {
				f.classList.add('hidden'); s.classList.remove('hidden'); btn.textContent = 'Read more';
			} else {
				s.classList.add('hidden'); f.classList.remove('hidden'); btn.textContent = 'Collapse';
			}
		};
	});

	update();
}

function update() {
	const w = viewport.clientWidth;
	const offset = currentPage * w; // сдвигаем на ширину viewport-страницы
	track.style.transform = `translateX(-${offset}px)`;
	[...dotsWrap.children].forEach((d, i) =>
		d.className = `w-2.5 h-2.5 rounded-full ${i === currentPage ? 'bg-[color:var(--brand)]' : 'bg-gray-300'}`
	);
}

function goTo(page) {
	currentPage = Math.max(0, Math.min(pages - 1, page));
	update();
}

btnPrev.addEventListener('click', () => goTo(currentPage - 1));
btnNext.addEventListener('click', () => goTo(currentPage + 1));
window.addEventListener('resize', () => {
	const prevSlides = slidesPerView;
	computeLayout();
	if (prevSlides !== slidesPerView) render();
	else update();
});

// init
render();

   // Burger
document.getElementById('burger')?.addEventListener('click', () => {
	document.getElementById('mnav')?.classList.toggle('hidden');
});

// Reveal
const io = new IntersectionObserver((entries)=>{
	entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('is-visible'); });
}, {threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Carousel
(function initCarousel(){
	const track = document.getElementById('carouselTrack');
	const viewport = document.getElementById('carouselViewport');
	const prev = document.getElementById('prevBtn');
	const next = document.getElementById('nextBtn');
	const dotsWrap = document.getElementById('dots');
	const slides = Array.from(track.children);
	let index = 0;

	// ширина слайда = ширина viewport
	function slideWidth(){ return viewport.clientWidth; }

	// точки
	slides.forEach((_,i)=>{
		const dot = document.createElement('button');
		dot.className = 'w-2.5 h-2.5 rounded-full bg-gray-300';
		dot.addEventListener('click', ()=>go(i));
		dotsWrap.appendChild(dot);
	});

	function refreshDots(){
		dotsWrap.querySelectorAll('button').forEach((d,i)=>{
			d.className = 'w-2.5 h-2.5 rounded-full ' + (i===index? 'bg-[color:var(--brand)]':'bg-gray-300');
		});
	}

	function go(i){
		index = (i+slides.length) % slides.length;
		track.style.transform = `translateX(-${index*slideWidth()}px)`;
		refreshDots();
	}

	next.addEventListener('click',()=>go(index+1));
	prev.addEventListener('click',()=>go(index-1));
	window.addEventListener('resize', ()=>go(index));

	// автопрокрутка
	let timer = setInterval(()=>go(index+1), 5000);
	viewport.addEventListener('mouseenter', ()=>clearInterval(timer));
	viewport.addEventListener('mouseleave', ()=>timer=setInterval(()=>go(index+1), 5000));

	// старт
	go(0);
})();