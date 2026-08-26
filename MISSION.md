# Mission: Async Rust via Tokio mini-Redis

## Why
Build durable async Rust skill as a career asset—enough to answer interview questions confidently and contribute to Tokio-based codebases—by implementing the official Tokio mini-Redis tutorial end to end.

## Success looks like
- Explain why Rust needs a runtime, what `.await` does, and why an `async fn` is lazy
- Write and reason about concurrent TCP server code using `tokio::spawn`
- Implement a working subset of Redis (GET/SET) following the Tokio tutorial
- Diagnose common async pitfalls (blocking inside async, `Send` bounds, shared state)

## Constraints
- Still early in Rust; introduce only the language needed for the next async skill
- Prefer the official Tokio tutorial and Rust Book Chapter 17 over blog posts
- Short lessons; one tangible win each

## Out of scope
- Production Redis clients (`redis` crate) and ops
- Embedded runtimes (embassy) or alternative runtimes (smol) as the primary path
- Deep `Future` / `Pin` / unsafe until the tutorial actually requires them
- A full Rust language course separate from what async needs
