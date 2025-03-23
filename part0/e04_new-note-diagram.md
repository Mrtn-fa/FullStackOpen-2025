# Exercise 0.4: New note diagram
```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server
    
    user->>browser: Types "new note!" into the text field
    activate user
    user->>browser: Clicks "Save" button
    deactivate user

    Note right of browser: {"content": "new note!", "date": 2025-1-1}
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes 
    activate server
    Note over server: Creates a new note from the request
    Note over server: Updates notes from server
    server-->>browser: 302 Found
    deactivate server

    Note over browser: Redirects to /notes


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    Note left of server: HTML Document
    server-->>browser: 200 OK
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    Note left of server: CSS file
    server-->>browser: 200 OK
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    Note left of server: [{ "content": "note", "date": "2025-1-1"}, ...]
    server-->>browser: 200 OK
    deactivate server

    Note over browser: main.js runs and then requests data.js

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    Note left of server: JSON file with the current notes
    server-->>browser: 200 OK 
    deactivate server

    Note over browser: Renders the notes from the JSON using code from main.js
```