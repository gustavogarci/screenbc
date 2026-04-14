#!/bin/bash

# ==============================================================================
# CheckUp BC - Developer Quickstart Script
# Run this script to instantly scaffold the frontend project and save 2 hours.
# ==============================================================================

echo "🚀 Bootstrapping CheckUp BC Next.js Project..."

# 1. Initialize Next.js with the App Router, Tailwind, and TypeScript
npx create-next-app@latest checkup-bc-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm \
  --yes

cd checkup-bc-app

# 2. Install Vercel AI SDK and UI Components
echo "🤖 Installing Vercel AI SDK & Chat components..."
npm install ai @ai-sdk/react @ai-sdk/openai @ai-sdk/anthropic lucide-react class-variance-authority clsx tailwind-merge

# 3. Initialize shadcn/ui for beautiful, accessible components
echo "🎨 Initializing shadcn/ui..."
npx shadcn@latest init -d

# 4. Add common shadcn components the PRDs will likely need
echo "🧩 Adding core UI components..."
npx shadcn@latest add button card input label table badge dialog sheet --yes

# 5. Add Vercel AI Elements (Mandatory for rendering AI text/markdown correctly)
echo "💬 Adding AI Elements (Chat UI)..."
npx ai-elements@latest

echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. cd checkup-bc-app"
echo "2. npm run dev"
echo "3. Open http://localhost:3000"
echo "Let's win this hackathon! 🏆"
