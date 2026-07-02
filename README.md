# lernhelden_4

LernHeld ist eine Lernplattform fuer Kinder von 8-14 Jahren mit Lerntechniken,
einer interaktiven Lern-App zur Hausaufgabenanalyse und einem Bereich zu KI-Sicherheit.

## Projektstruktur

```
lernhelden_4/
├── client/                    Frontend (React + Vite)
│   └── src/
│       ├── pages/              5 Seiten: Start, Lerntechniken, Lern-App, KI sicher, Fuer Eltern
│       ├── components/         Layout, Navbar, Footer, HomeworkUpload
│       └── data/                Lerntechniken, KI-Content, Masterfaehigkeiten
├── server/                    Backend (Express + Mistral AI)
│   └── src/
│       ├── index.ts             Server-Einstiegspunkt
│       ├── prompts.ts           LLM-Prompt-Vorlagen
│       ├── routes/homework.ts   Upload-Endpunkt
│       └── services/            OCR, Mistral-Anbindung, Flashcards
└── .ionos.yaml                 Deploy-Now-Konfiguration (IONOS)
```

## Deployment

- Frontend: IONOS Deploy Now, Projektname `lernhelden_4`, verbunden mit diesem Repository.
- Backend: Render Web Service, laeuft unter `https://lernheldenserver.onrender.com`.

## Umgebungsvariablen (Server)

Siehe `server/.env.example`:

- `MISTRAL_API_KEY`
- `ALLOWED_ORIGINS` (z. B. `https://trissler.online`)
- `PORT`
- `NODE_ENV`
