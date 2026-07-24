window.XQ = window.XQ || {};

window.XQ.SlotDialogs = (() => {
  function choose(title, intro, cards) {
    return new Promise((resolve) => {
      const Render = window.XQ.Render;
      if (!Render?.showCards) {
        console.error("slot dialog unavailable: Render.showCards is missing");
        resolve("cancel");
        return;
      }
      Render.showCards(title, intro, cards, (card) => {
        Render.hideRewards();
        resolve(card.id);
      }, "locked");
    });
  }

  async function purchase(score, cost) {
    const intro = "一个黑市商人神秘地凑过来搭话“想要探索曌帝的宝库？我倒是有门路，不过价格嘛…”是否支付1500积分购买宝库线索";
    if (score < cost) {
      await choose("黑市线索", intro, [{
        id: "cancel",
        name: "积分不足",
        rarity: "white",
        text: `当前持有 ${score} 积分，还差 ${cost - score} 积分。`,
      }]);
      return false;
    }
    return await choose("黑市线索", intro, [
      { id: "confirm", name: "支付1500积分", rarity: "gold", text: "购买线索并立即开始搜寻。" },
      { id: "cancel", name: "暂不购买", rarity: "white", text: "离开商人，不消耗积分。" },
    ]) === "confirm";
  }

  async function settlement() {
    return choose("选择物资去向", "曌帝近卫军正在赶来，立刻决定如何处理搜寻到的物资。", [
      { id: "slot-supply", name: "交给军需处", rarity: "green", text: "按物资价值直接兑换为共享积分。" },
      { id: "market", name: "送往黑市", rarity: "red", text: "50% 概率价值翻倍；失败则被近卫军截获，只获得 10%。" },
    ]);
  }

  async function notice(title, text, rarity = "gold") {
    await choose(title, text, [{ id: "close", name: "收下物资", rarity, text: "关闭提示，返回曌帝的私库。" }]);
  }

  return { notice, purchase, settlement };
})();
