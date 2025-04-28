// js/product-soldout.js
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {
  // ① 商品コンテナから productId を取得
  const infoEl    = document.getElementById("product-info");
  if (!infoEl) return;
  const productId = infoEl.dataset.productId;
  if (!productId) return;

  // ② SOLD OUT オーバーレイ要素を作成（なければ）
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

  // ④ Realtime Database の soldOut フラグをリアルタイム監視
  onValue(
    ref(window.db, `products/${productId}/soldOut`),
    snapshot => {
      const sold = snapshot.val();
      if (sold) {
        // 売り切れ時の表示切り替え
        overlay.style.display = "flex";
        if (buyBtn) {
          buyBtn.disabled             = true;
          buyBtn.style.backgroundColor = "#ccc";
          buyBtn.style.cursor         = "not-allowed";
          buyBtn.textContent           = "SOLD OUT";
        }
      } else {
        // 売り切れ解除時の表示切り替え（デバッグ用）
        overlay.style.display = "none";
        if (buyBtn) {
          buyBtn.disabled             = false;
          buyBtn.style.backgroundColor = "";
          buyBtn.style.cursor         = "";
          buyBtn.textContent           = "カートに入れる";
        }
      }
    }
  );
});
