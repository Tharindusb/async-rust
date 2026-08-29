/**
 * Lesson simulators: Future (recipe) and TCP (phone-line / handshake).
 * Markup: <figure class="sim" data-sim="future|tcp"> with data-role hooks.
 */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(root, role) {
    return root.querySelector("[data-role=\"" + role + "\"]");
  }

  function playQueue(steps, onDone) {
    let i = 0;
    let timer = null;
    let stopped = false;

    function tick() {
      if (stopped) return;
      if (i >= steps.length) {
        onDone();
        return;
      }
      const step = steps[i++];
      step.run();
      const wait = reduced ? 0 : step.ms;
      timer = setTimeout(tick, wait);
    }

    tick();
    return function stop() {
      stopped = true;
      clearTimeout(timer);
    };
  }

  function initFuture(root) {
    const caption = $(root, "caption");
    const playBtn = $(root, "play");
    const resetBtn = $(root, "reset");
    const awaitBox = $(root, "await");
    const recipe = $(root, "recipe");
    const recipeBody = $(root, "recipe-body");
    const badge = $(root, "badge");
    const consoleEl = $(root, "console");
    const lines = Array.from(root.querySelectorAll(".future-sim-code .line"));
    let stop = null;

    function setLine(id) {
      lines.forEach(function (el) {
        el.classList.toggle("is-on", el.dataset.line === id);
      });
    }

    function setBadge(text, tone) {
      badge.textContent = text;
      badge.dataset.tone = tone;
    }

    function reset() {
      if (stop) stop();
      stop = null;
      setLine("");
      recipe.className = "recipe is-idle";
      recipeBody.innerHTML = "<em>empty shelf — no Future yet</em>";
      setBadge("not built", "idle");
      consoleEl.innerHTML = '<span class="prompt">$</span>';
      caption.textContent =
        "Press Play. Watch: calling builds a recipe (Future); cooking starts only at .await.";
      playBtn.disabled = false;
    }

    function play() {
      if (stop) stop();
      playBtn.disabled = true;
      const withAwait = awaitBox.checked;
      consoleEl.innerHTML = '<span class="prompt">$</span>';

      const steps = [
        {
          ms: 900,
          run: function () {
            setLine("call");
            recipe.className = "recipe is-idle";
            recipeBody.innerHTML =
              "Recipe: <code>say_world</code><br />body not cooked";
            setBadge("idle Future", "idle");
            caption.textContent =
              "let op = say_world() — you only got a recipe card. Nothing printed.";
          },
        },
        {
          ms: 1100,
          run: function () {
            setLine("hello");
            consoleEl.innerHTML =
              '<span class="prompt">$</span> <span class="out">hello</span>';
            caption.textContent =
              "println!(hello) is sync — it runs now. The Future still sits idle.";
          },
        },
      ];

      if (withAwait) {
        steps.push({
          ms: 1400,
          run: function () {
            setLine("await");
            recipe.className = "recipe is-cooking";
            recipeBody.innerHTML =
              "Recipe: <code>say_world</code><br />runtime is cooking…";
            setBadge("being driven", "pending");
            caption.textContent =
              "op.await — Tokio drives the Future. Now the body may run.";
          },
        });
        steps.push({
          ms: 400,
          run: function () {
            recipe.className = "recipe is-done";
            recipeBody.innerHTML =
              "Recipe: <code>say_world</code><br />cooked — Ready";
            setBadge("Ready", "ready");
            consoleEl.innerHTML =
              '<span class="prompt">$</span> <span class="out">hello</span>' +
              '<span class="out">world</span>';
            caption.textContent =
              "Body ran. Console: hello then world. Future is finished (one-shot).";
          },
        });
      } else {
        steps.push({
          ms: 700,
          run: function () {
            setLine("");
            recipe.className = "recipe is-unused";
            recipeBody.innerHTML =
              "Recipe: <code>say_world</code><br />never cooked — dropped";
            setBadge("unused", "error");
            caption.textContent =
              "No .await — recipe thrown away. world never prints. Rust warns: unused Future.";
          },
        });
      }

      stop = playQueue(steps, function () {
        playBtn.disabled = false;
        stop = null;
      });
    }

    playBtn.addEventListener("click", play);
    resetBtn.addEventListener("click", reset);
    awaitBox.addEventListener("change", reset);
    reset();
  }

  function initTcp(root) {
    const caption = $(root, "caption");
    const playBtn = $(root, "play");
    const resetBtn = $(root, "reset");
    const serverBox = $(root, "server-on");
    const client = $(root, "client");
    const server = $(root, "server");
    const pipe = $(root, "pipe");
    const packet = $(root, "packet");
    const badge = $(root, "badge");
    const log = $(root, "log");
    let stop = null;
    let moveTimer = null;

    function setBadge(text, tone) {
      badge.textContent = text;
      badge.dataset.tone = tone;
    }

    function movePacket(label, toServer, kind, done) {
      packet.textContent = label;
      packet.className = "tcp-packet is-show" + (kind ? " " + kind : "");
      const start = toServer ? 8 : 92;
      const end = toServer ? 92 : 8;
      packet.style.left = start + "%";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          packet.style.left = end + "%";
        });
      });
      const ms = reduced ? 0 : 850;
      moveTimer = setTimeout(function () {
        done();
      }, ms);
    }

    function hidePacket() {
      packet.className = "tcp-packet";
      packet.style.left = "8%";
    }

    function reset() {
      if (stop) stop();
      stop = null;
      clearTimeout(moveTimer);
      hidePacket();
      client.className = "tcp-host";
      server.className = "tcp-host" + (serverBox.checked ? "" : " is-down");
      pipe.className = "tcp-pipe";
      setBadge("no Future yet", "idle");
      log.textContent = "";
      caption.textContent =
        "TCP is a private phone line: knock three times (handshake), then talk in order. Press Play.";
      playBtn.disabled = false;
    }

    function play() {
      if (stop) stop();
      clearTimeout(moveTimer);
      playBtn.disabled = true;
      const live = serverBox.checked;
      hidePacket();
      client.className = "tcp-host";
      server.className = "tcp-host" + (live ? "" : " is-down");
      pipe.className = "tcp-pipe";

      const steps = [
        {
          ms: 700,
          run: function () {
            client.classList.add("is-live");
            setBadge("Pending", "pending");
            log.textContent = "client::connect(\"127.0.0.1:6379\").await";
            caption.textContent =
              "connect() built a Future. It is Pending — waiting for a TCP connection.";
          },
        },
        {
          ms: reduced ? 0 : 950,
          run: function () {
            caption.textContent =
              "Knock 1 — SYN: “Can we talk?” (client → server). Analogy: you pick up the phone.";
            movePacket("SYN", true, "", function () {});
          },
        },
      ];

      if (!live) {
        steps.push({
          ms: 900,
          run: function () {
            hidePacket();
            packet.className = "tcp-packet is-show is-err";
            packet.style.left = "50%";
            packet.textContent = "refused";
            setBadge("error", "error");
            log.textContent = "Error: Connection refused";
            caption.textContent =
              "Nobody home — you already saw this when mini-redis-server was off. Future never becomes Ready.";
          },
        });
      } else {
        steps.push({
          ms: reduced ? 0 : 950,
          run: function () {
            server.classList.add("is-live");
            caption.textContent =
              "Knock 2 — SYN-ACK: “Yes, and can you hear me?” Server is listening.";
            movePacket("SYN-ACK", false, "is-ack", function () {});
          },
        });
        steps.push({
          ms: reduced ? 0 : 950,
          run: function () {
            caption.textContent =
              "Knock 3 — ACK: “Yes.” Line is open. Handshake done (RFC 9293 three-way).";
            movePacket("ACK", true, "is-ack", function () {});
          },
        });
        steps.push({
          ms: 700,
          run: function () {
            hidePacket();
            pipe.classList.add("is-open");
            setBadge("Ready", "ready");
            log.textContent = "connect.await → Ok(client)  // ESTABLISHED";
            caption.textContent =
              ".await returns. You have a reliable, ordered byte pipe — that is TCP.";
          },
        });
        steps.push({
          ms: reduced ? 0 : 950,
          run: function () {
            setBadge("Pending", "pending");
            log.textContent = "client.set(\"hello\", \"world\").await";
            caption.textContent =
              "SET is another Future on the same pipe. Bytes go in order; TCP resends if lost.";
            movePacket("SET hello", true, "", function () {});
          },
        });
        steps.push({
          ms: reduced ? 0 : 950,
          run: function () {
            log.textContent = "client.get(\"hello\").await";
            caption.textContent =
              "GET rides the same connection. Ordered stream — not a pile of postcards.";
            movePacket("GET hello", true, "", function () {});
          },
        });
        steps.push({
          ms: 500,
          run: function () {
            setBadge("Ready", "ready");
            log.textContent = "Some(b\"world\")";
            caption.textContent =
              "Reply comes back on the pipe. Same story as cargo run: got value … Some(b\"world\").";
            movePacket("world", false, "is-ack", function () {});
          },
        });
      }

      stop = playQueue(steps, function () {
        playBtn.disabled = false;
        stop = null;
      });
    }

    playBtn.addEventListener("click", play);
    resetBtn.addEventListener("click", reset);
    serverBox.addEventListener("change", reset);
    reset();
  }

  document.querySelectorAll("[data-sim=\"future\"]").forEach(initFuture);
  document.querySelectorAll("[data-sim=\"tcp\"]").forEach(initTcp);
})();
