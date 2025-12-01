#!/bin/bash

echo "🚀 Starting Frankestein Upload Process..."
echo ""

# Check if Frankestein folder exists
if [ ! -d ~/Downloads/Frankestein ]; then
    echo "❌ Error: Frankestein folder not found in Downloads"
    exit 1
fi

# List PDF files in the folder
echo "📚 Found these files in Frankestein folder:"
ls ~/Downloads/Frankestein/
echo ""

# Find all PDF files
PDF_FILES=(~/Downloads/Frankestein/*.pdf)
PDF_COUNT=${#PDF_FILES[@]}

if [ $PDF_COUNT -eq 0 ]; then
    echo "❌ Error: No PDF files found in Frankestein folder"
    exit 1
fi

echo "📝 Creating metadata.json for $PDF_COUNT PDF file(s)..."

# Create metadata.json
cat > ~/Downloads/Frankestein/metadata.json << 'EOF'
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

# Get actual PDF filename and update metadata
ACTUAL_PDF=$(basename "${PDF_FILES[0]}")
if [ "$ACTUAL_PDF" != "frankenstein.pdf" ]; then
    echo "📝 Updating metadata with actual filename: $ACTUAL_PDF"
    sed -i '' "s/frankenstein.pdf/$ACTUAL_PDF/g" ~/Downloads/Frankestein/metadata.json
fi

echo "✅ Metadata created"
echo ""

# Create ZIP
echo "📦 Creating ZIP file..."
cd ~/Downloads
zip -r -q Frankestein.zip Frankestein/
echo "✅ ZIP created"
echo ""

# Move to uploads folder
echo "📂 Moving to uploads folder..."
mv Frankestein.zip /Users/ramanthakur/.gemini/antigravity/scratch/library-lite-login/uploads/
echo "✅ Moved to uploads folder"
echo ""

# Run upload script
echo "🚀 Starting upload process..."
cd /Users/ramanthakur/.gemini/antigravity/scratch/library-lite-login/backend
node bulk-upload.js ../uploads/Frankestein.zip

echo ""
echo "🎉 All done! Check the output above for results."
