const { clampPosition, decodePositions } = globalThis.PortfolioLogic;

const media = {
  video: {title:'圣诞主题 AI 场景视频', label:'AI GENERATED / VIDEO SAMPLE', type:'video', src:'assets/christmas-ai-sample-h264.mp4', poster:'assets/christmas-poster.jpg', description:'约 13 秒的 AI 场景视频样片。用于展示 AI 素材与场景表达，非实拍或使用效果证明。制作工具、本人贡献与迭代过程将在资料补齐后展示。'},
  'solar-ai': {title:'车顶灯 AI 商品创意视频', label:'AI CONTENT / SAVED VERSION', type:'video', src:'assets/solar-lamp-ai-original-h264.mp4', poster:'assets/solar-lamp-original-poster.jpg', description:'原始无水印文件暂未找到，当前展示带平台水印的留存版本。视频保留所提供文件的原画面与音轨，未做水印修补。制作工具与本人负责环节待补齐。'},
  'car-real': {title:'车内收纳产品 · 实拍演示', label:'REAL FOOTAGE / PRODUCT DEMO', type:'video', src:'assets/car-organizer-real-h264.mp4', poster:'assets/car-organizer-poster.jpg', description:'约 30 秒的实拍产品演示，展示车内收纳产品的外观、结构和安装过程。与 AI 素材分开展示，具体拍摄、剪辑及脚本分工待补齐。'},
  'car-source': {title:'车内收纳产品 · 实拍剪辑素材库', label:'REAL FOOTAGE / SOURCE MATERIALS', type:'image', src:'assets/car-organizer-source-library.jpg', description:'与车内收纳产品实拍成片配套的素材库截图。可见多个产品细节、手部操作和安装展示片段，以及部分“已添加”标记，用于展示素材准备和选择过程。'},
  'us-account': {title:'美区 TikTok 带货账号 · 主页记录', label:'US TIKTOK / ACCOUNT SNAPSHOT', type:'image', src:'assets/us-account-overview.png', description:'美区 TikTok 带货账号主页截图，显示 4980 粉丝、3535 赞及多条商品视频。数据为截图时点记录，不作为实时数据或成交金额展示。'},
  'us-content-grid': {title:'本人真人出镜 · 帽子与面罩产品展示', label:'US TIKTOK / ON-CAMERA PRODUCT PRESENTATION', type:'image', src:'assets/us-content-grid.png', description:'本人出镜的是第二排第1条：帽子与面罩产品展示，截图显示 4476 次播放，出镜身份已由本人确认。这里保留完整视频列表，便于结合其他商品内容查看；其他人物未标为本人，具体脚本、拍摄及剪辑分工另行补充。'},
  'us-video-views': {title:'域动像素 · 美区 TikTok 带货视频播放记录', label:'US TIKTOK / VIDEO VIEW SNAPSHOTS', type:'gallery', images:[{src:'assets/us-views-1742k.png',value:'174.2K'},{src:'assets/us-views-2404k.png',value:'240.4K'},{src:'assets/us-views-124k.png',value:'12.4K'},{src:'assets/us-views-353k.png',value:'35.3K'},{src:'assets/us-views-4807.png',value:'4807'}], description:'以下为域动像素美区 TikTok 带货视频的播放量截图，保留原始显示数值。重复的 4807 截图仅展示一次；记录尚未逐条对应本页样片或具体账号，不合计为去重总播放量。'},
  'car-clean': {title:'车用清洁工具 · 车内实拍演示', label:'REAL FOOTAGE / IN-CAR DEMO', type:'video', src:'assets/car-window-cleaner-real.mp4', poster:'assets/car-window-cleaner-poster.jpg', description:'约 35 秒的车内实拍演示：雨天上车前，用带长柄的车用清洁工具处理挡风玻璃内侧，竖屏拍摄，保留原始画外音与英文字幕。与 AI 素材分开展示；具体拍摄、出镜与剪辑分工待补齐。'},
  'agent-dashboard': {title:'LINE 聊天 Agent · 中控后台', label:'AI APPLICATION / DASHBOARD', type:'image', src:'assets/line-agent-dashboard.png', description:'企业聊天 Agent 的 LINE 中控后台截图，展示客户列表、自动回复控制、人工暂停、待人工处理、发送记录核实等界面。截图中的客户信息已遮挡。'},
  'agent-flow': {title:'企业聊天 Agent · 工作流与测试', label:'AI APPLICATION / PROCESS', type:'image', src:null, description:'用实际过程材料说明如何把需求推进到交付。', requested:['需求或功能流程图','自动回复规则与工作流','测试、优化或验收相关记录']},
  'account-domain': {title:'域动像素 · 美区账号运营', label:'TIKTOK / ACCOUNT EXECUTION', type:'image', src:null, description:'3 个万粉账号分别展示：1 个本人培育、2 个接手运营。', requested:['对应账号主页或历史截图','本人负责时间和具体工作','现有内容表现记录；只填写有依据的数据']},
  'content-process': {title:'商品资料 → 脚本 → AI 素材 → 成片', label:'CONTENT / MAKING OF', type:'image', src:null, description:'为作品补上制作过程，让个人贡献更容易理解。', requested:['真实原商品图或商品资料','脚本、参考内容与本人改动','生成素材、剪辑过程或成片版本']},
  'account-shayu': {title:'鲨娱传媒 · 海外社媒账号', label:'OVERSEAS SOCIAL / ACCOUNT EXECUTION', type:'image', src:null, description:'澳洲、北美、欧洲账号经历单独呈现，不与其他公司数据合并。', requested:['当时参与运营的账号主页','内容或现有数据记录','本人负责环节和时间范围']},
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const toast = document.querySelector('#toast');
let toastTimer;
function notify(message) {
  (document.querySelector('dialog[open]') ?? document.body).append(toast);
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
}

const board = document.querySelector('#sticker-board');
const stickers = [...board.querySelectorAll('.sticker'), board.querySelector('.sample-polaroid')];
const storageKey = 'xieyu-portfolio-stickers-v1';
let savedRaw = null;
try { savedRaw = localStorage.getItem(storageKey); } catch { /* Dragging still works when browser storage is unavailable. */ }
const saved = decodePositions(savedRaw, stickers.map((_, index) => `s${index}`));
const positions = new Map();
const initialPositions = stickers.map(sticker => ({ x:Number(sticker.dataset.x), y:Number(sticker.dataset.y) }));

function placeSticker(sticker, x, y, tilt = 0) {
  const rect = board.getBoundingClientRect();
  const extraX = Math.min(160, board.clientWidth * 0.4);
  const minX = Math.max(-extraX, 8 - rect.left);
  const maxX = Math.max(minX, Math.min(board.clientWidth - sticker.offsetWidth + extraX, window.innerWidth - rect.left - sticker.offsetWidth - 8));
  const minY = -Math.min(80, board.clientHeight * 0.15);
  const maxY = Math.max(minY, board.clientHeight - 31 - sticker.offsetHeight + 60);
  const bounded = {x:Math.min(maxX,Math.max(minX,x)),y:Math.min(maxY,Math.max(minY,y))};
  sticker.style.left = `${bounded.x}px`;
  sticker.style.top = `${bounded.y}px`;
  sticker.style.transform = `rotate(${Number(sticker.dataset.rotation) + tilt}deg)`;
  positions.set(sticker, bounded);
  return bounded;
}
function placeNormalized(sticker, point) {
  return placeSticker(sticker, point.x * Math.max(0, board.clientWidth - sticker.offsetWidth), point.y * Math.max(0, board.clientHeight - 31 - sticker.offsetHeight));
}
function getNormalized(sticker) {
  const point = positions.get(sticker);
  return { x:point.x / Math.max(1, board.clientWidth - sticker.offsetWidth), y:point.y / Math.max(1, board.clientHeight - 31 - sticker.offsetHeight) };
}
function saveLayout() {
  const layout = {};
  stickers.forEach((sticker,index) => { layout[`s${index}`] = getNormalized(sticker); });
  try { localStorage.setItem(storageKey, JSON.stringify(layout)); } catch { /* The current page retains its layout without persistent storage. */ }
}
stickers.forEach((sticker,index) => {
  placeNormalized(sticker, saved[`s${index}`] ?? initialPositions[index]);
  let dragging = null;
  let lastDragEnd = -Infinity;
  if (sticker.matches('.sample-polaroid')) sticker.addEventListener('click', event => {
    if (event.detail === 0 || performance.now() - lastDragEnd >= 400) return;
    lastDragEnd = -Infinity;
    event.preventDefault();
    event.stopImmediatePropagation();
  });
  sticker.addEventListener('pointerdown', event => {
    if (event.button !== 0 || dragging) return;
    const point = positions.get(sticker);
    dragging = {id:event.pointerId, originX:event.clientX, originY:event.clientY, x:point.x, y:point.y, moved:false};
    sticker.setPointerCapture(event.pointerId);
    sticker.classList.add('is-dragging');
    sticker.focus({preventScroll:true});
  });
  sticker.addEventListener('pointermove', event => {
    if (!dragging || event.pointerId !== dragging.id) return;
    const deltaX = event.clientX - dragging.originX;
    const deltaY = event.clientY - dragging.originY;
    if (Math.hypot(deltaX,deltaY) < 6 && !dragging.moved) return;
    dragging.moved = true;
    placeSticker(sticker, dragging.x + deltaX, dragging.y + deltaY, reducedMotion.matches ? 0 : Math.max(-7,Math.min(7,deltaX / 30)));
  });
  function finishDrag(event) {
    if (!dragging || event.pointerId !== dragging.id) return;
    const point = positions.get(sticker);
    const moved = dragging.moved;
    dragging = null;
    sticker.classList.remove('is-dragging');
    if (sticker.hasPointerCapture(event.pointerId)) sticker.releasePointerCapture(event.pointerId);
    placeSticker(sticker, point.x, point.y);
    if (moved) {
      saveLayout();
      if (sticker.matches('.sample-polaroid')) {
        lastDragEnd = performance.now();
      }
      if (!reducedMotion.matches) sticker.animate([{scale:'1.035'},{scale:'0.985'},{scale:'1'}], {duration:280,easing:'ease-out'});
    }
  }
  sticker.addEventListener('pointerup', finishDrag);
  sticker.addEventListener('pointercancel', finishDrag);
  sticker.addEventListener('lostpointercapture', finishDrag);
  sticker.addEventListener('keydown', event => {
    const directions = {ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
    if (event.key === 'Home') {
      event.preventDefault();
      placeNormalized(sticker, initialPositions[index]);
      saveLayout();
    } else if (directions[event.key]) {
      event.preventDefault();
      const point = positions.get(sticker);
      const [dx,dy] = directions[event.key];
      const step = event.shiftKey ? 24 : 8;
      placeSticker(sticker, point.x + dx * step, point.y + dy * step);
      saveLayout();
    }
  });
});
let lastWidth = board.clientWidth;
let lastHeight = board.clientHeight;
function resizeBoard() {
  if (lastWidth === board.clientWidth && lastHeight === board.clientHeight) return;
  const normalized = stickers.map(sticker => {
    const point = positions.get(sticker);
    return {x:point.x / Math.max(1,lastWidth - sticker.offsetWidth),y:point.y / Math.max(1,lastHeight - 31 - sticker.offsetHeight)};
  });
  lastWidth = board.clientWidth;
  lastHeight = board.clientHeight;
  stickers.forEach((sticker,index) => placeNormalized(sticker,normalized[index]));
}
if ('ResizeObserver' in window) new ResizeObserver(resizeBoard).observe(board);
else window.addEventListener('resize', resizeBoard);
document.querySelector('#reset-stickers').addEventListener('click', () => {
  stickers.forEach((sticker,index) => placeNormalized(sticker, initialPositions[index]));
  saveLayout();
  notify('贴纸和视频卡片已回到原位');
});

const flip = document.querySelector('#profile-flip');
flip.addEventListener('click', () => {
  const isBack = flip.getAttribute('aria-pressed') !== 'true';
  flip.setAttribute('aria-pressed', String(isBack));
  board.classList.toggle('profile-open', isBack);
  flip.setAttribute('aria-label', isBack ? '翻转名片，返回个人名片正面' : '翻转名片，查看个人介绍');
});

const mediaDialog = document.querySelector('#media-dialog');
const mediaContent = document.querySelector('#media-content');
function openMedia(key) {
  const item = media[key];
  if (!item) return;
  mediaContent.replaceChildren();
  document.querySelector('#media-title').textContent = item.title;
  document.querySelector('#media-label').textContent = item.label;
  if (item.src && item.type === 'video') {
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = item.src;
    video.poster = item.poster;
    video.className = 'video-player';
    video.setAttribute('aria-label', item.title);
    mediaContent.append(video);
    video.addEventListener('error', () => notify('视频加载失败，请稍后重试'));
    // Playback starts with the visitor's own play action, keeping audio under their control.
  } else if (item.type === 'gallery') {
    const contact = document.createElement('aside');
    contact.className = 'proof-contact';
    const message = document.createElement('p');
    message.textContent = '如需查看具体视频并确认作品，请加微信和我联系。';
    const wechat = document.createElement('span');
    wechat.textContent = '微信：19720601617 · 添加时请备注来意';
    const copy = document.createElement('button');
    copy.type = 'button'; copy.className = 'button button-dark'; copy.textContent = '复制微信号 ⧉';
    copy.addEventListener('click', async () => {
      const copied = await copyText('19720601617');
      notify(copied ? '微信号已复制，添加时请备注来意' : '未能自动复制，微信号：19720601617');
    });
    contact.append(message,wechat,copy);
    mediaContent.append(contact);
    const collection = document.createElement('section');
    collection.className = 'proof-collection';
    collection.setAttribute('aria-label','美区带货视频播放量原截图合集');
    const heading = document.createElement('h3');
    heading.textContent = '播放量截图合集';
    const hint = document.createElement('p');
    hint.textContent = '点击任意截图，查看原图';
    const grid = document.createElement('div');
    grid.className = 'playback-proofs';
    item.images.forEach((record,index) => {
      const figure = document.createElement('figure'); figure.className = 'playback-proof';
      const caption = document.createElement('figcaption');
      caption.textContent = `${String(index+1).padStart(2,'0')} / ${record.value}`;
      const link = document.createElement('a'); link.href = record.src; link.target = '_blank'; link.rel = 'noopener'; link.setAttribute('aria-label',`打开显示 ${record.value} 播放量的原截图`);
      const image = document.createElement('img'); image.src = record.src; image.alt = `原截图显示视频播放量 ${record.value}`;
      link.append(image); figure.append(link,caption); grid.append(figure);
    });
    collection.append(heading,hint,grid);
    mediaContent.append(collection);
  } else if (item.src) {
    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.title;
    image.className = 'media-image';
    mediaContent.append(image);
    const originalLink = document.createElement('a');
    originalLink.href = item.src;
    originalLink.target = '_blank';
    originalLink.rel = 'noopener';
    originalLink.className = 'media-original';
    originalLink.textContent = '查看原图 ↗';
    mediaContent.append(originalLink);
    image.addEventListener('error', () => notify('图片暂时无法加载'));
  } else {
    const frame = document.createElement('div');
    frame.className = 'pending-frame';
    const icon = document.createElement('span'); icon.textContent = '▧'; icon.setAttribute('aria-hidden','true');
    const title = document.createElement('strong'); title.textContent = '这个位置，留给真实截图。';
    const note = document.createElement('small'); note.textContent = '素材待补充 · 当前不是系统截图';
    frame.append(icon,title,note);
    mediaContent.append(frame);
  }
  const description = document.createElement('p');
  description.className = 'media-description'; description.textContent = item.description;
  mediaContent.append(description);
  if (!item.src && item.requested) {
    const list = document.createElement('ul'); list.className = 'pending-list';
    item.requested.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
    mediaContent.append(list);
  }
  mediaDialog.showModal();
}
document.querySelectorAll('[data-media]').forEach(button => button.addEventListener('click', () => openMedia(button.dataset.media)));
mediaDialog.addEventListener('close', () => {
  const video = mediaContent.querySelector('video');
  if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
  mediaContent.replaceChildren();
});
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('close', () => {
  toast.classList.remove('visible');
  document.body.append(toast);
}));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
}));
document.querySelector('#open-materials').addEventListener('click', () => document.querySelector('#materials-dialog').showModal());

const filters = [...document.querySelectorAll('[data-filter]')];
const galleryCards = [...document.querySelectorAll('.gallery-card')];
document.querySelector('#works-count').textContent = `${galleryCards.length} 个展示位置`;
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed',String(active)); });
  let visible = 0;
  galleryCards.forEach(card => {
    const show = category === 'all' || card.dataset.category === category;
    card.hidden = !show;
    if (show) {
      visible++;
      if (!reducedMotion.matches) card.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:250,easing:'ease-out'});
    }
  });
  document.querySelector('#works-count').textContent = `${visible} 个展示位置`;
}));

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(text); return true; } catch { /* Try the document fallback after a denied clipboard request. */ }
  }
  const active = document.activeElement;
  const area = document.createElement('textarea');
  area.value = text;
  area.style.cssText = 'position:fixed;left:-9999px;top:0';
  (document.querySelector('dialog[open]') ?? document.body).append(area);
  area.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch { copied = false; }
  area.remove();
  active?.focus({preventScroll:true});
  return copied;
}
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  const copied = await copyText(button.dataset.copy);
  const label = button.dataset.copyLabel || '联系电话';
  const note = button.dataset.copyNote ? `，${button.dataset.copyNote}` : '';
  notify(copied ? `${label}已复制${note}` : `未能自动复制，${label}：${button.dataset.copy}`);
}));
document.querySelector('#copy-materials').addEventListener('click', async () => {
  const text = [...document.querySelectorAll('#material-checklist section')].map(section => section.querySelector('h3').textContent + '\n' + [...section.querySelectorAll('li')].map(li => '· '+li.textContent).join('\n')).join('\n\n');
  notify(await copyText(text) ? '素材清单已复制，按项目找图即可' : '未能自动复制，可以直接选中清单复制');
});

document.querySelectorAll('.case-jump').forEach(link => link.addEventListener('click', event => {
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  event.preventDefault();
  target.open = true;
  target.scrollIntoView({behavior:reducedMotion.matches ? 'instant' : 'smooth',block:'start'});
  history.replaceState(null,'',link.getAttribute('href'));
}));

function openHashDetails() {
  const target = document.getElementById(location.hash.slice(1));
  if (!(target instanceof HTMLDetailsElement) || target.closest('[hidden]')) return;
  target.open = true;
  requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
}
window.addEventListener('hashchange', openHashDetails);
openHashDetails();

if ('IntersectionObserver' in window) {
  if (!reducedMotion.matches) document.documentElement.classList.add('js-motion');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
  }, {threshold:0.06});
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  const navLinks = [...document.querySelectorAll('.site-header nav a')];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#'+entry.target.id;
        link.classList.toggle('active',active);
        if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin:'-12% 0px -50% 0px'});
  document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));
}
const progress = document.querySelector('#reading-progress');
let scrollFrame = null;
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? Math.max(0,Math.min(100,window.scrollY / max * 100)) : 0}%`;
  scrollFrame = null;
}
window.addEventListener('scroll', () => { if (scrollFrame === null) scrollFrame = requestAnimationFrame(updateProgress); },{passive:true});
window.addEventListener('resize', updateProgress);
document.querySelectorAll('details').forEach(details => details.addEventListener('toggle',updateProgress));
updateProgress();
