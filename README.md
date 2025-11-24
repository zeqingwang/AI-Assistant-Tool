# AI Assistant Tool — Code Explainer (Prototype)

Single-page Next.js + MUI app that accepts a short code snippet, sends it to the OpenAI Responses API, and returns an explanation plus suggested improvements. No database is required.

## Features
- Paste or type any short code snippet
- Get natural-language explanations and improvement ideas
- Configure the OpenAI model/key via `.env.local`

## Tech Stack
- Next.js (App Router)
- React 18
- Material UI (MUI)
- OpenAI Responses API

## Prerequisites
- Node.js 18+
- npm
- An OpenAI API key with Responses API access

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your env file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in the required values inside `.env.local`:
   ```bash
   OPENAI_API_KEY=your_key_here
   # Optional
   OPENAI_MODEL=gpt-5-nano
   ```

## Development
1. Start the dev server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000` in your browser.

## Troubleshooting
- Ensure your API key has sufficient quota and the Responses API enabled.
- Restart the dev server after updating environment variables.
- Check the browser console and terminal logs for detailed error messages.