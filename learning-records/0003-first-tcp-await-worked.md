# Demonstrated: first TCP await against mini-Redis

User ran the Hello Tokio client successfully (`got value from the server; result=Some(b"world")`), then hit `Connection refused` with the server off, then recovered with the server up again. They have lived both the happy path and the “nobody listening” path.

**Implications:** Next lesson can explain TCP as the pipe under `connect().await` using that refused error as evidence. Do not re-teach the client setup steps.
