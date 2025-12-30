# PDF and Image Files Instructions

## Folder Structure

Place your files in the following locations:

### CV/Resume
- **Location**: `public/assets/pdfs/cv/`
- **Expected filename**: `Mark_Lester_Salonga_CV.pdf`
- **Format**: PDF file
- **Usage**: Opens in new tab when "View CV" button is clicked in the Hero section

### Certifications
- **PDF Certificates Location**: `public/assets/pdfs/certifications/`
- **Image Certificates Location**: `public/assets/images/certifications/`
- **Expected filenames**:
  - `Salesforce_Agentblazer_Champion.pdf` (PDF)
  - `Huawei_HCIA_Cloud_Service.png` (PNG Image)
  - `Huawei_HCIA_Cloud_Computing.png` (PNG Image)
  - `Huawei_HCIA_AI.png` (PNG Image)
  - `HP_Life_AI_Business.pdf` (PDF)
  - `HP_Life_Cybersecurity.pdf` (PDF)
  - `Microsoft_Excel_2019.pdf` (PDF)
  - `Oracle_Java_Programming.pdf` (PDF)

## How to Add Your Files

1. **Copy your CV** to `public/assets/pdfs/cv/Mark_Lester_Salonga_CV.pdf`
2. **Copy PDF certificates** to `public/assets/pdfs/certifications/` with the exact filenames listed above
3. **Copy PNG certificates** to `public/assets/images/certifications/` with the exact filenames listed above
4. **Rename your files** to match the expected filenames if needed

## Features

- **New Tab Opening**: Both PDFs and images open in a new browser tab
- **Mixed Format Support**: Handles both PDF documents and PNG images seamlessly
- **Direct Access**: Users can view, download, print, or bookmark files directly
- **Mobile Friendly**: Works seamlessly on all devices and browsers
- **Fast Loading**: No modal overlays, just direct file access

## File Naming Convention

Use descriptive names with underscores instead of spaces:
- ✅ `Huawei_HCIA_Cloud_Service.png`
- ✅ `Salesforce_Agentblazer_Champion.pdf`
- ❌ `Huawei HCIA Cloud Service.png`
- ❌ `cert1.pdf`

## Supported Formats

### PDF Files
- **Extension**: `.pdf`
- **Maximum recommended size**: 10MB per file
- **Ensure PDFs are not password protected** for web viewing

### Image Files
- **Extension**: `.png` (preferred for certificates)
- **Maximum recommended size**: 5MB per file
- **Recommended resolution**: 1200px width minimum for readability
- **Format**: PNG for best quality and transparency support

## File Organization

```
public/assets/
├── pdfs/
│   ├── cv/
│   │   └── Mark_Lester_Salonga_CV.pdf
│   └── certifications/
│       ├── Salesforce_Agentblazer_Champion.pdf
│       ├── HP_Life_AI_Business.pdf
│       ├── HP_Life_Cybersecurity.pdf
│       ├── Microsoft_Excel_2019.pdf
│       └── Oracle_Java_Programming.pdf
└── images/
    └── certifications/
        ├── Huawei_HCIA_Cloud_Service.png
        ├── Huawei_HCIA_Cloud_Computing.png
        └── Huawei_HCIA_AI.png
```

## Testing

After adding your files:
1. Click "View CV" button in Hero section - should open CV PDF in new tab
2. Click the external link icon (↗) on any certification card:
   - PDF certificates should open in browser's PDF viewer
   - PNG certificates should open as images in new tab
3. Test on different browsers and devices
4. Verify all files load properly and are viewable

## Browser Compatibility

This approach works with all modern browsers:
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Built-in PDF viewers and image viewers in all browsers
- ✅ Fallback to download if browser doesn't support viewing