
## Markdown: sequence diagram

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: New note posted
    deactivate server

    Note right of browser: The whole page is not loaded just new note added cause of single page design

```