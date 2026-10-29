/* Legacy Portfolio Planner site — small, dependency-free behaviour. */
(function () {
  "use strict";

  // Mobile menu
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  // Screen tabs (home + demo)
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var img = root.querySelector("[data-shot-img]");
    var title = root.querySelector("[data-shot-title]");
    var text = root.querySelector("[data-shot-text]");
    var url = root.querySelector("[data-shot-url]");
    function select(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute("aria-selected", on ? "true" : "false");
        x.tabIndex = on ? 0 : -1;
      });
      if (img) { img.src = t.dataset.src; img.alt = t.dataset.alt; }
      if (title) title.textContent = t.dataset.title;
      if (text) text.textContent = t.dataset.text;
      if (url) url.textContent = t.dataset.url || "";
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t, false); });
      t.addEventListener("keydown", function (e) {
        var j = null;
        if (e.key === "ArrowRight") j = (i + 1) % tabs.length;
        if (e.key === "ArrowLeft") j = (i - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") j = 0;
        if (e.key === "End") j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); select(tabs[j], true); }
      });
    });
    // warm the cache for the other screens after load
    window.addEventListener("load", function () {
      setTimeout(function () { tabs.forEach(function (t) { var i = new Image(); i.src = t.dataset.src; }); }, 1500);
    });
  });

  // Copy e-mail address
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var text = b.getAttribute("data-copy");
      var done = function () { var o = b.textContent; b.textContent = "Copied"; setTimeout(function () { b.textContent = o; }, 1800); };
      var fallback = function () {
        var code = b.parentNode.querySelector("code");
        if (!code) return;
        var r = document.createRange(); r.selectNodeContents(code);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        b.textContent = "Selected — press Ctrl+C";
      };
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, fallback);
        } else { fallback(); }
      } catch (e) { fallback(); }
    });
  });

  // Support form: GitHub Pages has no server, so the form prepares an e-mail
  // in the visitor's own mail app. Nothing is stored or sent by this website.
  var form = document.getElementById("support-form");
  if (form) {
    var msg = document.getElementById("form-msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var missing = [];
      ["name", "email", "topic", "message"].forEach(function (k) { if (!f[k].value.trim()) missing.push(f[k]); });
      if (!f.noSensitive.checked) missing.push(f.noSensitive);
      if (missing.length) {
        msg.hidden = false; msg.className = "form-msg err";
        msg.textContent = "Please fill in your name, e-mail, topic and message, and tick the box to confirm you have not included passwords or licence keys.";
        missing[0].focus();
        return;
      }
      var subject = "[LPP Support] " + f.topic.value + " — " + f.name.value.trim();
      var body = "Name: " + f.name.value.trim() +
        "\nReply e-mail: " + f.email.value.trim() +
        "\nTopic: " + f.topic.value +
        "\nVersion / device: " + (f.device.value.trim() || "not given") +
        "\n\n" + f.message.value.trim() +
        "\n\n— Sent from the Legacy Portfolio Planner website contact form";
      var href = "mailto:support@legacyportfolioplanner.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      msg.hidden = false; msg.className = "form-msg";
      msg.textContent = "Your e-mail app should now open with the message ready. Press Send there to reach support. If nothing opens, copy the address above and e-mail us directly.";
      window.location.href = href;
    });
  }

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
