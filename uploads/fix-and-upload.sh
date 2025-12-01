#!/bin/bash

echo "🔧 Fixing and uploading Frankenstein..."
echo ""

# Create fresh metadata.json in the extracted folder
cat > /Users/ramanthakur/.gemini/antigravity/scratch/library-lite-login/uploads/extracted/Frankestein/metadata.json << 'EOF'
[
  {
    "filename": "frankenstein.pdf",
    "title": "Frankenstein; or, The Modern Prometheus",
    "authors": "Mary Shelley",
    "description": "A classic Gothic novel about a scientist who creates a sapient creature in an unorthodox scientific experiment.",
    "categories": "Fiction, Gothic, Horror, Science Fiction, Classic Literature",
    "language": "English",
    "publishedDate": "1818-01-01",
    "pageCount": 280
  }
]
EOF

echo "✅ Metadata created in extracted folder"
echo ""

# Create new ZIP with metadata
echo "📦 Creating new ZIP with metadata..."
cd /Users/ramanthakur/.gemini/antigravity/scratch/library-lite-login/uploads/extracted
zip -r -q ../Frankestein-fixed.zip Frankestein/
echo "✅ ZIP created"
echo ""

# Run upload
echo "🚀 Uploading to website..."
cd /Users/ramanthakur/.gemini/antigravity/scratch/library-lite-login/backend
node bulk-upload.js ../uploads/Frankestein-fixed.zip

echo ""
echo "🎉 Done!"
