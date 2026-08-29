# Async Rust Resources

## Knowledge

- [Tutorial: Tokio — Setup & Mini-Redis overview](https://tokio.rs/tokio/tutorial/setup)
  Official path we are following. Use for: project shape, installing `mini-redis-server`, what is in/out of scope for the learning server.
- [Tutorial: Tokio — Hello Tokio](https://tokio.rs/tokio/tutorial/hello-tokio)
  First runnable Tokio app and the lazy-`async` mental model. Use for: `#[tokio::main]`, `.await`, why calling an `async fn` does nothing by itself, and why TCP connect is an await point.
- [Spec: RFC 9293 — Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc9293.html)
  IETF TCP specification. Use for: TCP is a reliable in-order byte stream; connection-oriented; three-way handshake.
- [Glossary: MDN — TCP](https://developer.mozilla.org/en-US/docs/Glossary/TCP)
  Short definition of TCP (reliable ordered delivery). Use for: beginner wording.
- [Glossary: MDN — TCP handshake](https://developer.mozilla.org/en-US/docs/Glossary/TCP_handshake)
  SYN → SYN-ACK → ACK. Use for: what `connect().await` is waiting for.
- [Book: The Rust Programming Language — Ch. 17 Async](https://doc.rust-lang.org/book/ch17-00-async-await.html)
  Official language book chapter on futures, `async`/`await`, concurrency vs parallelism. Use for: vocabulary and concepts without Tokio-specific APIs.
- [Book: Asynchronous Programming in Rust (async-book)](https://rust-lang.github.io/async-book/index.html)
  Community guide (rewrite in progress). Use for: beginner path and deeper topics after the Tokio tutorial chapters we cover.
- [Crate docs: tokio](https://docs.rs/tokio/latest/tokio/)
  API reference for the runtime. Use for: exact signatures when writing or reading code.
- [Repo: tokio-rs/mini-redis](https://github.com/tokio-rs/mini-redis)
  Reference implementation of the tutorial project. Use for: comparing our code to an idiomatic finished version (not for copying blindly).

## Wisdom (Communities)

- [Tokio Discord](https://discord.gg/tokio)
  Official Tokio help channels; beginners welcome. Use for: stuck on a tutorial step or runtime behaviour.
- [Tokio GitHub Discussions](https://github.com/tokio-rs/tokio/discussions)
  Longer-form questions with searchable history. Use for: design questions that benefit from written answers.
- [users.rust-lang.org](https://users.rust-lang.org/)
  Moderated Rust users forum. Use for: language-level confusion that is not Tokio-specific.

## Gaps

- No single “async Rust interview checklist” from the Rust project; we will derive interview talking points from the tutorial skills as we earn them.
