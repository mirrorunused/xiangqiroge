window.XQ = window.XQ || {};

window.XQ.StoryGallery = (() => {
  function open(state) {
    const t = state.talents || {};
    const cards = [
      galleryCard(
        "capture",
        "棋子被俘剧情图鉴",
        t.captureGalleryUnlocked,
        "首次战败后解锁。",
        "浏览全部兵种的俘获剧情与插图。",
      ),
      galleryCard(
        "prison",
        "关押剧情图鉴",
        t.prisonGalleryUnlocked,
        "义军通关第 15 关后解锁。",
        "浏览全部兵种的关押记录与棋盒插图。",
      ),
      galleryCard(
        "defeat",
        "义军兵败剧情图鉴",
        t.defeatGalleryUnlocked,
        "义军通关第 15 关后解锁。",
        "浏览前期红帅关押与后期指挥官被俘两则剧情。",
      ),
    ];
    window.XQ.Render.showCards("剧情画廊", "浏览已解锁的剧情图鉴。", cards, (card) => {
      if (!card.unlocked) return window.XQ.Render.banner(card.lockedText);
      window.XQ.Render.hideRewards();
      return window.XQ.CaptureStory.openGallery(card.gallery, state, { returnToGallery: true });
    }, "story");
  }

  function galleryCard(gallery, name, unlocked, lockedText, text) {
    return {
      id: `${gallery}-gallery`,
      gallery,
      name,
      rarity: "purple",
      unlocked: Boolean(unlocked),
      lockedText,
      text: unlocked ? text : lockedText,
    };
  }

  return { open };
})();
