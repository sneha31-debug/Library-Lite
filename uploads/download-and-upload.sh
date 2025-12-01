#!/bin/bash

echo "📥 Downloading Frankenstein PDF from Project Gutenberg..."
curl -o ~/Downloads/Frankestein/frankenstein.pdf https://www.gutenberg.org/files/84/84-pdf.pdf

if [ -f ~/Downloads/Frankestein/frankenstein.pdf ]; then
    echo "✅ PDF downloaded successfully!"
    echo ""
    
    # Now run the upload process
    echo "🚀 Starting upload process..."
    /Users/ramanthakur/.gemini/antigravity/scratch/library-lite-login/uploads/auto-upload-frankenstein.sh
else
    echo "❌ Failed to download PDF"
    exit 1
fi
