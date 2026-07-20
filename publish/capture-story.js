window.XQ = window.XQ || {};

window.XQ.CaptureStory = (() => {
  const STORIES = {
    P: story("女兵·青禾", "曾陪同青禾入城搜捕抢掠的小队，此刻均逃作鸟兽散，只留她一人负隅顽抗。“你们不过是人多欺负人少！”堵嘴也止不住的怒骂，却在你一句“那些被抢掠的百姓，也是仗着人多欺负你吗”过后戛然无声。", "./assets/generated/capture-pawn.a544a2d4.webp"),
    A: story("书记官·砚秋", "砚秋替曌帝伪造罪名，编撰处决名册有功，被遣来前线镀金。遭俘时她正与主将耳鬓厮磨，以图上位。她双手护胸，柔媚的声线此刻颤抖不止。遭她残害者的死状让她急于否认罪证，却只能徒劳地重复“我是被逼的”。", "./assets/generated/capture-advisor.0d331202.webp"),
    B: story("骑象舞女·云岚", "云岚的裙下之臣多遭其暗害，七重纱艳舞之下无数风流亡魂，男人不过是其股间玩物。战象力竭后，她穿着缀铃轻纱战衣从象背跃下，被围后仍摆出妩媚舞姿拖延时间，直到藏在铃中的毒针被搜出。", "./assets/generated/capture-elephant.e83b0680.webp"),
    N: story("女骑手·照夜", "照夜以追猎逃民为乐。曾言“男人不如马”。然而照夜落逃时，马鞭都抽断了，只落得个摔马被俘的下场。遭擒的打击，远不如朝夕共寝的爱马弃她而去的打击大，在她眼中，男人又算什么呢？", "./assets/generated/capture-rider.0a64a20d.webp"),
    R: story("战车驾驶员·重霄", "当战车撞上铁壁，重霄只想起那些褴褛佝偻的俘虏男丁们，被捆缚、被车轮拖曳的时惨叫。异地处之，重霄被推倒在车辙旁时，她万念俱灰，泫然欲泣。", "./assets/generated/capture-rook.3408da1c.webp"),
    C: story("女控炮手·鸣砂", "鸣砂曾炮击拒绝纳贡的村镇。彼时她自认为不过是玩乐。辙乱旗靡、军阵大乱的当下，她面对义军调转的炮口，眼中只剩贪生的泪水。", "./assets/generated/capture-cannon.06a5a6df.webp"),
    K: story("女将·昭冥", "昭冥曾亲自签发多道屠村军令。在她眼中，百姓还不如投怀送抱的美人一根手指重要。营帐被围时她尚在颠鸾倒凤，匆忙之下找不到铠甲，手边仅余一顶证明身份的缨盔。", "./assets/generated/capture-king.e20faa22.webp"),
    S: story("女主教·弦月", "弦月用伪造神谕骗走无数家庭的男婴用作娈童。舶来教的教义被她肆意扭曲，只为一己私欲。虚伪的布道连同教袍一起被撕开时，露出了她方便性事而真空的胴体。", "./assets/generated/capture-bishop.b230e385.webp"),
    Q: story("皇妃·绯宸", "绯宸正是多次清洗行动的献策者。自恃曌帝之威无人能敌，疆场上仍贪图金银玉石。酒色淫乐深入骨髓的她，被俘时紧盯的不是长剑，而是幻想在持剑者裆下承欢。", "./assets/generated/capture-queen.cb601c30.webp"),
  };
  const REBEL_STORIES = Object.fromEntries(Object.entries(STORIES).map(([type, item]) => [type, {
    ...item,
    text: type === "P"
      ? item.text
      : `${item.text} 她面对为男丁复仇的义军并无悔意；义军没有回应她的败犬吠鸣，只记录罪证并将她严密看押，用以交换义军要员。`,
  }]));
  const REBEL_DEFEAT = story(
    "义军兵败",
    "义军兵败，作为指挥官的你被抓进囚笼，进献给曌帝。遭到曌帝亵玩",
    "./assets/generated/rebel-defeat-cage.3d86d415.png",
  );
  const $ = (id) => document.getElementById(id);
  let resolveStory = null;
  let galleryIndex = 0;
  let galleryItems = [];
  let galleryTitle = "";
  let currentImage = "";

  function story(title, text, image) {
    return { title, text, image };
  }

  function init() {
    $("captureCloseBtn").addEventListener("click", close);
    $("captureModal").addEventListener("click", (event) => {
      if (event.target === $("captureModal")) close();
    });
    $("capturePrevBtn").addEventListener("click", () => showGallery(galleryIndex - 1));
    $("captureNextBtn").addEventListener("click", () => showGallery(galleryIndex + 1));
    $("captureRetryBtn").addEventListener("click", () => loadImage(currentImage, true));
  }

  async function show(state, type) {
    if (["random", "quick"].includes(state?.mode)) return;
    const item = collection(state)[type];
    if (!item) return;
    if (state.settings?.captureStoryMode === "brief") {
      window.XQ.Render.banner(`首次俘获：${item.title}`);
      return;
    }
    fill(type, "本轮首次俘获", state);
    $("captureNav").classList.add("hidden");
    $("captureModal").classList.remove("hidden");
    await new Promise((resolve) => { resolveStory = resolve; });
    if (isPostRescue(state)) await showItem(window.XQ.PrisonStory.get(type), "关押记录");
  }

  async function showRescueNotice() {
    await showItem(window.XQ.PrisonStory.rescueNotice, "义军战报");
  }

  async function showItem(item, eyebrow) {
    if (!item) return;
    fillItem(item, eyebrow);
    $("captureNav").classList.add("hidden");
    $("captureModal").classList.remove("hidden");
    await new Promise((resolve) => { resolveStory = resolve; });
  }

  async function showRebelDefeat() {
    fillItem(REBEL_DEFEAT, "义军败局");
    $("captureNav").classList.add("hidden");
    $("captureModal").classList.remove("hidden");
    await new Promise((resolve) => { resolveStory = resolve; });
  }

  async function showRebelEarlyDefeat() {
    await showItem(window.XQ.PrisonStory.earlyDefeat, "义军败局");
  }

  function openSettings(state, render, save, reset, resetOuter) {
    return window.XQ.StorySettings.open(state, render, save, reset, resetOuter);
  }

  function openGallery(kind, state) {
    const galleries = {
      capture: [state.talents?.captureGalleryUnlocked, Object.values(STORIES), "棋子被俘剧情图鉴", "首次战败后解锁俘获图鉴"],
      prison: [state.talents?.prisonGalleryUnlocked, window.XQ.PrisonStory.list(), "关押剧情图鉴", "义军通关第 15 关后解锁关押图鉴"],
      defeat: [state.talents?.defeatGalleryUnlocked, [window.XQ.PrisonStory.earlyDefeat, REBEL_DEFEAT], "义军兵败剧情图鉴", "义军通关第 15 关后解锁兵败图鉴"],
    };
    const [unlocked, items, title, lockedText] = galleries[kind] || [];
    if (!unlocked) return window.XQ.Render.banner(lockedText || "图鉴尚未解锁");
    galleryItems = items;
    galleryTitle = title;
    showGallery(0);
    $("captureNav").classList.remove("hidden");
    $("captureModal").classList.remove("hidden");
  }

  function showGallery(index) {
    if (!galleryItems.length) return;
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    fillItem(galleryItems[galleryIndex], galleryTitle);
    $("captureIndex").textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
  }

  function fill(type, eyebrow, state) {
    const item = collection(state)[type];
    fillItem(item, eyebrow);
  }

  function fillItem(item, eyebrow) {
    $("captureEyebrow").textContent = eyebrow;
    $("captureTitle").textContent = item.title;
    $("captureText").textContent = item.text;
    $("captureImage").alt = `${item.title}被俘剧情插图`;
    currentImage = item.image;
    loadImage(item.image);
  }

  function loadImage(src, retry = false) {
    const image = $("captureImage");
    const error = $("captureImageError");
    image.classList.remove("hidden");
    error.classList.add("hidden");
    image.onload = () => error.classList.add("hidden");
    image.onerror = () => {
      image.classList.add("hidden");
      error.classList.remove("hidden");
    };
    const suffix = retry ? `${src.includes("?") ? "&" : "?"}retry=${Date.now()}` : "";
    image.src = `${src}${suffix}`;
  }

  function collection(state) {
    return state?.mode === "rebel" && !isPostRescue(state) ? REBEL_STORIES : STORIES;
  }

  function isPostRescue(state) {
    return state?.mode === "rebel" && state.level > 15;
  }

  function close() {
    $("captureModal").classList.add("hidden");
    const resolve = resolveStory;
    resolveStory = null;
    resolve?.();
  }

  return { init, openGallery, openSettings, show, showRebelDefeat, showRebelEarlyDefeat, showRescueNotice };
})();
