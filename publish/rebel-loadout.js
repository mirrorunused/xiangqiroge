window.XQ = window.XQ || {};

window.XQ.RebelLoadout = (() => {
  function eligible(state) {
    return (state.talents?.outerItems || []).filter((item) => item.id !== "tempo");
  }

  async function choose(state, render) {
    if (state.mode !== "rebel" || window.XQ.Mode.activeOuterItems(state).length) return true;
    const items = eligible(state);
    if (!items.length) return true;
    return new Promise((resolve) => {
      const cards = items.map((item) => ({
        ...item,
        name: `带入 ${item.name}`,
        text: `${item.text} 本轮义军征程仅此一件局外道具生效。`,
      }));
      window.XQ.Render.showCards(
        "选择义军局外道具",
        "义军破敌每轮只能带入一件已拥有的局外道具，选定后本轮不可更换。",
        cards,
        async (card) => {
          state.rebelOuterUid = card.uid;
          window.XQ.Render.hideRewards();
          render();
          resolve(true);
        },
        "locked",
      );
    });
  }

  return { choose, eligible };
})();
