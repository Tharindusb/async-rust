//! Lesson 0001 demo: async is lazy.
//! Calling `say_world()` builds a future; the body runs only at `.await`.
//! See `lessons/0001-async-is-lazy.html`.

async fn say_world() {
    println!("world");
}

#[tokio::main]
async fn main() {
    // Calling `say_world()` does not execute the body yet.
    let op = say_world();

    // This prints first.
    println!("hello");

    // `.await` drives the future — now "world" prints.
    op.await;
}
