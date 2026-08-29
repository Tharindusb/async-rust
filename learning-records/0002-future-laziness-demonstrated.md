# Demonstrated: async call builds a Future; await runs it

User ran the lesson 0001 demo both with `.await` (output `hello` then `world`) and without (only `hello`, unused-Future warning). This is evidence they can use the lazy-Future model in practice, so the next lesson can move to a real TCP `.await` against mini-Redis without re-teaching laziness.

**Implications:** Glossary term Future can be promoted after they confirm the quizzes still feel obvious; do not re-teach recipe/Future in 0002 beyond a one-line reminder.
