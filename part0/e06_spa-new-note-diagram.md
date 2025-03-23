# Exercise 0.6: New note in SPA diagram
```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    
    user->>browser: Types "new note!" into the text field
    activate user
    user->>browser: Clicks "Save" button
    deactivate user

    Note over browser: Re-renders notes
    Note right of browser: {"content": "new note!", "date": 2025-1-1}
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa 
    activate server
    Note over server: Creates a new note from the request
    Note over server: Updates notes from server
    server-->>browser: 201 Created 
    deactivate server
    Note over browser: Logs {"message": "note created"}
```