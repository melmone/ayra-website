// js/product-soldout.js
document.addEventListener("DOMContentLoaded", () => {
    // ① ページの <div id="product-info"> に data-product-id 属性を付けた想定
    const infoEl = document.getElementById("product-info");
    if (!infoEl) return;   // 商品ページ以外では何もしない
    const productId = infoEl.dataset.productId;
    if (!productId) return; // data-product-id が無いときは抜ける
  
    // ② soldOut オーバーレイ要素を用意（なければ動的に作る）
    let overlay = document.getElementById("sold-out-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "sold-out-overlay";
      Object.assign(overlay.style, {
        display: "none",
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(255,255,255,0.8)",
        color: "#e00",
        fontSize: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10
      });
      overlay.textContent = "SOLD OUT";
      infoEl.style.position = "relative";
      infoEl.appendChild(overlay);
    }
  
    // ③ カートボタンを取得
    const buyBtn = infoEl.querySelector(".buy-button");
  
    // ④ RealtimeDB を監視
    db.ref(`products/${productId}/soldOut`)
      .on("value", snap => {
        const sold = snap.val();
        if (sold) {
          overlay.style.display = "flex";
          if (buyBtn) {
            buyBtn.disabled = true;
            buyBtn.style.backgroundColor = "#ccc";
            buyBtn.style.cursor = "not-allowed";
          }
        } else {
          overlay.style.display = "none";
          if (buyBtn) {
            buyBtn.disabled = false;
            buyBtn.style.backgroundColor = "";
            buyBtn.style.cursor = "";
          }
        }
      });
  });
  