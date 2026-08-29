# Async Rust Glossary

Terms earned through lessons. Add a term only after you can use it correctly.

## Terms

**Future**:
A value that represents async work that may not be finished yet. Calling an `async fn` builds a Future; `.await` drives it.
_Avoid_: Promise (JS sense), thread, “background job” as a synonym

**Runtime**:
The engine (here: Tokio) that drives Futures to completion — scheduling, I/O, timers.
_Avoid_: Operating system, “just the main thread”
