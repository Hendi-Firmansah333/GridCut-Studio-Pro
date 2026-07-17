// Edge AI Vision & Smart Caption Generator Engine
// Analyzes image pixels, color palette, dimensions, filename metadata, and grid structure
// to generate tailored Instagram captions and relevant hashtags in Bahasa Indonesia or English.

export async function analyzeImageContent(sourceImage, tiles = [], filename = '') {
  // Default fallback info
  let result = {
    category: 'portrait',
    categoryLabel: '✨ Aesthetic & Lifestyle Portrait',
    dominantColor: '#00f2fe',
    colorVibe: 'Cool & Crisp Neon',
    brightnessLabel: 'Balanced High-Def',
    dimensionsLabel: `${tiles[0]?.width || 1080}×${tiles[0]?.height || 1350} px`,
    detectedKeywords: ['Aesthetic', 'Super HD Grid', 'Instagram Feed'],
    confidence: 94,
    tags: ['#gridcutstudiopro', '#instagramgrid', '#seamlesscarousel', '#aestheticfeed', '#photooftheday', '#creativelayout', '#visualart', '#highres', '#instadaily']
  };

  try {
    // 1. Analyze Filename & Text Metadata
    const lowerName = (filename || '').toLowerCase();
    const categories = [
      {
        id: 'academic',
        label: '🎓 Sertifikat, Prestasi & Event Akademik',
        keywords: ['sertifikat', 'certificate', 'piagam', 'akreditasi', 'anniversary', 'trpl', 'kampus', 'polinela', 'lampung', 'wisuda', 'kelulusan', 'penghargaan', 'lomba', 'juara', 'seminar', 'kuliah', 'dosen', 'mahasiswa'],
        tags: ['#Sertifikat', '#Prestasi', '#Apresiasi', '#Bangga', '#Mahasiswa', '#Polinela', '#CampusLife', '#Achievement', '#CareerGoals', '#GridCutStudioPro', '#HighDefGrid', '#Lampung']
      },
      {
        id: 'branding',
        label: '🚀 Branding Bisnis, Promo & Launching Produk',
        keywords: ['promo', 'diskon', 'sale', 'product', 'produk', 'grand', 'opening', 'banner', 'brand', 'katalog', 'menu', 'kuliner', 'bisnis', 'marketing', 'agency', 'toko', 'shop', 'kopi', 'cafe', 'poster'],
        tags: ['#BrandIdentity', '#DigitalMarketing', '#Promo', '#BusinessGrowth', '#ProductLaunch', '#CreativeAgency', '#InstagramGrid', '#VisualMarketing', '#GridCutStudioPro', '#BrandingDesign', '#ContentCreator']
      },
      {
        id: 'landscape',
        label: '🌅 Landscape Alam, Panorama & Travel',
        keywords: ['landscape', 'panorama', 'travel', 'pantai', 'gunung', 'liburan', 'alam', 'sunset', 'sunrise', 'vacation', 'sea', 'nature', 'sky', 'trip', 'adventure', 'scenic'],
        tags: ['#TravelPhotography', '#Panorama', '#NatureLovers', '#Wanderlust', '#SunsetGlow', '#GoldenHour', '#ExploreMore', '#SeamlessCarousel', '#GridCutStudioPro', '#ScenicView', '#Outdoor']
      },
      {
        id: 'cyberpunk',
        label: '⚡ Tech, Gaming & Cyberpunk Visuals',
        keywords: ['cyber', 'cyberpunk', 'neon', 'tech', 'setup', 'pc', 'gaming', 'gamer', 'ai', 'digital', 'futuristic', 'led', 'code', 'coding', 'studio'],
        tags: ['#Cyberpunk', '#NeonAesthetic', '#TechSetup', '#DigitalArt', '#Futuristic', '#GamingCommunity', '#GridCutStudioPro', '#VisualEffects', '#Synthwave', '#TechLife']
      },
      {
        id: 'portrait',
        label: '🌸 Aesthetic Portrait & Lifestyle',
        keywords: ['portrait', 'selfie', 'model', 'ootd', 'fashion', 'style', 'photo', 'girl', 'boy', 'photoshoot', 'lifestyle', 'mood'],
        tags: ['#PortraitPhotography', '#AestheticFeed', '#OOTD', '#PhotoOfTheDay', '#CreativeLayout', '#VisualArt', '#SuperHD', '#InstaDaily', '#GridCutStudioPro', '#Lifestyle']
      }
    ];

    let matchedCategory = null;
    let matchCount = 0;

    for (const cat of categories) {
      const matches = cat.keywords.filter(kw => lowerName.includes(kw));
      if (matches.length > matchCount) {
        matchCount = matches.length;
        matchedCategory = cat;
      }
    }

    // Also infer from tile layout if not matched by filename
    if (!matchedCategory) {
      if (tiles.length === 3 && tiles[0] && tiles[0].width > tiles[0].height * 1.5) {
        matchedCategory = categories.find(c => c.id === 'landscape');
      } else if (tiles.length === 4 && tiles[0] && tiles[0].width === tiles[0].height) {
        matchedCategory = categories.find(c => c.id === 'portrait');
      } else {
        matchedCategory = categories[0]; // Check if visual text check applies
      }
    }

    if (matchedCategory) {
      result.category = matchedCategory.id;
      result.categoryLabel = matchedCategory.label;
      result.tags = [...matchedCategory.tags];
    }

    // 2. Perform Visual Pixel Color & Brightness Analysis using Canvas
    if (sourceImage || (tiles.length > 0 && tiles[0]?.dataUrl)) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 100;
      canvas.height = 100;

      if (sourceImage && sourceImage.width > 0) {
        ctx.drawImage(sourceImage, 0, 0, 100, 100);
      } else if (tiles[0]?.dataUrl) {
        await new Promise((resolve) => {
          const tempImg = new Image();
          tempImg.onload = () => {
            ctx.drawImage(tempImg, 0, 0, 100, 100);
            resolve();
          };
          tempImg.onerror = () => resolve();
          tempImg.src = tiles[0].dataUrl;
        });
      }

      const imgData = ctx.getImageData(0, 0, 100, 100).data;
      let rTotal = 0, gTotal = 0, bTotal = 0;
      let count = 0;
      for (let i = 0; i < imgData.length; i += 16) {
        rTotal += imgData[i];
        gTotal += imgData[i + 1];
        bTotal += imgData[i + 2];
        count++;
      }

      const avgR = Math.round(rTotal / count);
      const avgG = Math.round(gTotal / count);
      const avgB = Math.round(bTotal / count);

      // Dominant hex
      const toHex = (n) => n.toString(16).padStart(2, '0');
      result.dominantColor = `#${toHex(avgR)}${toHex(avgG)}${toHex(avgB)}`;

      // Brightness level
      const luminance = 0.299 * avgR + 0.587 * avgG + 0.114 * avgB;
      if (luminance > 180) {
        result.brightnessLabel = '☀️ High-Key Clean (Cerah & Jelas)';
      } else if (luminance > 90) {
        result.brightnessLabel = '⚖️ Balanced High-Def (Kontras Harmonis)';
      } else {
        result.brightnessLabel = '🌙 Low-Key Moody (Elegan & Dramatis)';
      }

      // Color Vibe classification
      if (avgR > avgG + 30 && avgR > avgB + 30) {
        result.colorVibe = '🔥 Warm Sunset / Rich Red & Orange';
        if (!result.detectedKeywords.includes('Warm Sunset')) result.detectedKeywords.push('Warm Golden Vibe');
      } else if (avgG > avgR + 20 && avgG > avgB + 20) {
        result.colorVibe = '🌿 Natural Emerald / Lush Greenery';
        if (!result.detectedKeywords.includes('Natural Green')) result.detectedKeywords.push('Fresh Nature');
      } else if (avgB > avgR + 20 && avgB > avgG + 20) {
        result.colorVibe = '🌊 Deep Navy / Cyan Tech Vibe';
        if (!result.detectedKeywords.includes('Deep Blue')) result.detectedKeywords.push('Cool Corporate Blue');
      } else if (avgR > 180 && avgG > 180 && avgB > 180) {
        result.colorVibe = '✨ Clean Minimalist White & Bright';
        if (!result.detectedKeywords.includes('Minimalist')) result.detectedKeywords.push('Minimalist White');
      } else if (avgR < 70 && avgG < 70 && avgB < 70) {
        result.colorVibe = '🖤 Sleek Moody Dark / Obsidian';
        if (!result.detectedKeywords.includes('Moody Dark')) result.detectedKeywords.push('Sleek Obsidian');
      } else {
        result.colorVibe = '🎨 Harmonious Multi-Palette';
      }

      // Add category specific keyword if not present
      if (matchedCategory && !result.detectedKeywords.includes(matchedCategory.id)) {
        result.detectedKeywords.unshift(matchedCategory.label.split(' ')[1] || 'Detected');
      }
    }
  } catch (err) {
    console.warn('AI Vision analysis minor issue, using defaults:', err);
  }

  return result;
}

export function generateSmartCaption({
  visionInfo,
  mood = 'aesthetic',
  language = 'id',
  tilesCount = 3,
  watermarkText = '',
  watermarkEnabled = false,
  customPrompt = '',
  selectedTags = []
}) {
  const handle = (watermarkEnabled && watermarkText) ? ` by ${watermarkText}` : '';
  const category = visionInfo?.category || 'portrait';
  const colorVibe = visionInfo?.colorVibe || 'Aesthetic High-Def';
  const tagsStr = selectedTags.length > 0 ? selectedTags.join(' ') : (visionInfo?.tags || []).join(' ');

  // Base AI generated text per Vibe & Language & Category
  let introText = '';
  let bodyText = '';

  if (language === 'id') {
    if (mood === 'aesthetic') {
      if (category === 'academic') {
        introText = `✨ Apresiasi & Pencapaian Membanggakan${handle}`;
        bodyText = `Setiap pencapaian adalah bukti dari dedikasi dan proses yang luar biasa. Dipotong menjadi ${tilesCount} bagian beresolusi Super HD agar setiap detail sertifikat dan momen berharga ini tampil sempurna.\n\n👉 Geser setiap slide sampai akhir atau kunjungi profil feed kami untuk melihat susunan visual utuhnya!`;
      } else if (category === 'branding') {
        introText = `🌟 Visual Etalase Brand & Kualitas Terbaik${handle}`;
        bodyText = `Menghadirkan pesona visual yang terstruktur dalam ${tilesCount} potongan feed beresolusi tinggi. Eksplorasi setiap sudut produk dan layanan kami yang didesain untuk kenyamanan dan estetika mata.\n\n👉 Swipe atau cek profil utama kami untuk menikmati layout grid yang menyatu!`;
      } else if (category === 'landscape') {
        introText = `🌅 Eksplorasi Cakrawala & Pesona Alam${handle}`;
        bodyText = `Menangkap keindahan bentang alam dengan nuansa warna ${colorVibe.split('/')[0].trim()} dalam ${tilesCount} panorama berkesinambungan (seamless carousel). Nikmati ketajaman detail High Definition di setiap geserannya.\n\n👉 Swipe right untuk menelusuri pemandangan lengkapnya!`;
      } else {
        introText = `✨ Estetika Visual & Harmoni Grid Feed${handle}`;
        bodyText = `Kombinasi warna ${colorVibe.split('/')[0].trim()} yang dikemas dalam ${tilesCount} potongan resolusi Super HD. Dibuat presisi agar profil Instagram tampil lebih rapi, elegan, dan artistik.\n\n👉 Geser atau kunjungi profil kami untuk melihat gambaran besarnya bersatu!`;
      }
    } else if (mood === 'brand') {
      introText = `💼 Profesional Visual & Executive Presence${handle}`;
      if (category === 'academic') {
        bodyText = `Secara resmi mempersembahkan pencapaian dan apresiasi berharga dalam tampilan ${tilesCount}-Tile Grid eksklusif. Komitmen terhadap standar kualitas dan inovasi berkelanjutan yang tercermin di setiap detailnya.\n\nKunjungi profil Instagram kami untuk melihat keseluruhan grid secara utuh.`;
      } else {
        bodyText = `Menampilkan identitas visual yang solid dan elegan terbagi dalam ${tilesCount} bagian resolusi tinggi. Dirancang khusus untuk memberikan pengalaman visual profesional bagi setiap audiens.\n\nJelajahi profil utama kami untuk menikmati susunan seamless feed.`;
      }
    } else if (mood === 'hype') {
      introText = `🔥 ABSOLUTE BANGER & MUST-SEE GRID! 🔥${handle}`;
      bodyText = `Jangan lewatkan satu slide pun! Potongan ${tilesCount} foto beresolusi Super HD ini punya vibe ${colorVibe.split('/')[0].trim()} yang super elegan dan beda dari yang lain.\n\n⚡ Langsung cek main feed kita sekarang biar liat hasil gabungan besarnya yang gokil abis!`;
    } else if (mood === 'story') {
      introText = `📖 Di Balik Karya & Cerita Visual${handle}`;
      if (category === 'academic') {
        bodyText = `Bukan sekadar lembaran sertifikat atau piagam, melainkan rekam jejak perjuangan, ilmu yang didapat, serta kolaborasi yang berharga. Terbagi dalam ${tilesCount} potongan agar setiap makna dapat dinikmati dengan lebih dekat.\n\nTerima kasih kepada semua yang telah mendukung perjalanan ini. Mari terus melangkah ke pencapaian berikutnya! ✨`;
      } else {
        bodyText = `Setiap foto memiliki kisahnya sendiri. Kami membagi momen spesial ini menjadi ${tilesCount} bagian yang saling melengkapi, menghadirkan sudut pandang baru dengan kualitas warna terbaik.\n\nNikmati alur ceritanya dari slide pertama hingga akhir.`;
      }
    } else {
      // minimal
      introText = `Bigger picture. Better quality.${handle} ⚡`;
      bodyText = `${tilesCount} Parts • Super HD Resolution (${colorVibe.split('/')[0].trim()}).\nCek profil feed untuk susunan lengkapnya.`;
    }
  } else {
    // English
    if (mood === 'aesthetic') {
      if (category === 'academic') {
        introText = `✨ Honoring Dedication & Milestones${handle}`;
        bodyText = `Every achievement represents countless hours of passion and commitment. Sliced into ${tilesCount} crisp Super HD parts so every single detail of this milestone shines bright on our Instagram grid.\n\n👉 Swipe through or visit our main profile to view the complete unified display!`;
      } else if (category === 'branding') {
        introText = `🌟 Premium Brand Showcase & Visual Appeal${handle}`;
        bodyText = `Presenting our latest visual series in ${tilesCount} high-definition pieces. Engineered with ${colorVibe.split('/')[0].trim()} aesthetics to elevate your brand experience.\n\n👉 Swipe or explore our profile grid for the seamless overview!`;
      } else if (category === 'landscape') {
        introText = `🌅 Horizon Chronicles & Seamless Panorama${handle}`;
        bodyText = `Capturing the breathtaking expanse in ${tilesCount} continuous high-res tiles. Immerse yourself in the ${colorVibe.split('/')[0].trim()} atmosphere across every single swipe.\n\n👉 Swipe right to travel through the scene!`;
      } else {
        introText = `✨ Seamless Grid & Visual Harmony${handle}`;
        bodyText = `Slide through the pieces of this ${tilesCount}-tile high-definition visual moment. Crafted specifically to maintain a clean, modern, and aesthetic profile grid.\n\n👉 Visit our main feed to see the full picture come to life!`;
      }
    } else if (mood === 'brand') {
      introText = `💼 Executive Excellence & Professional Grid${handle}`;
      bodyText = `Announcing our latest showcase delivered in ${tilesCount} precision-sliced HD posts. Highlighting the intersection of quality, detail, and visual identity.\n\nVisit our official profile to experience the complete synchronized grid layout.`;
    } else if (mood === 'hype') {
      introText = `🔥 ABSOLUTE NEXT-LEVEL GRID CAROUSEL 🔥${handle}`;
      bodyText = `Every piece of this ${tilesCount}-photo grid hits different in Super HD! ${colorVibe.split('/')[0].trim()} vibes all the way.\n\n⚡ Check our main feed right now to see the full bigger picture come together!`;
    } else if (mood === 'story') {
      introText = `📖 Behind the Visual Journey${handle}`;
      bodyText = `Behind every frame lies a story worth telling. We've divided this moment into ${tilesCount} interconnected chapters, inviting you to appreciate the details up close before seeing the grand picture on our feed.\n\nThank you for being part of this journey. ✨`;
    } else {
      introText = `Bigger picture. Better quality.${handle} ⚡`;
      bodyText = `${tilesCount} Parts • Super HD Upscaled Grid.\nCheck our profile feed for the full view.`;
    }
  }

  // Inject Custom Prompt additions if provided
  let customSection = '';
  if (customPrompt && customPrompt.trim() !== '') {
    customSection = `\n\n📌 Note / Highlight: ${customPrompt.trim()}`;
  }

  return `${introText}\n\n${bodyText}${customSection}\n.\n.\n.\n${tagsStr}`;
}

// Optional Direct AI Vision API Helper (if user enters a Gemini API Key)
export async function generateWithGeminiVision({
  apiKey,
  imageBase64,
  mood,
  language,
  customPrompt,
  tilesCount,
  filename
}) {
  if (!apiKey || !apiKey.startsWith('AIza')) {
    throw new Error('API Key Gemini tidak valid atau belum diisi.');
  }

  const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
  const langName = language === 'id' ? 'Bahasa Indonesia' : 'English';
  
  const promptText = `Anda adalah AI Social Media Specialist & Visual Inspector profesional.
Tolong deteksi dan analisis gambar yang diunggah ini (nama file: "${filename || 'foto'}") yang akan dipotong menjadi ${tilesCount} foto untuk Instagram Grid/Carousel.

Buat 1 Caption Instagram yang HANYA berisi caption dan hashtags yang sudah siap dipanggil dan disalin, dengan ketentuan:
1. Bahasa: ${langName}.
2. Tone / Vibe: ${mood.toUpperCase()} (Jika aesthetic/brand/hype/story/singkat).
3. Sesuaikan isi caption dengan objek nyata, teks (jika ada sertifikat/tulisan), warna, atau nuansa yang ada di gambar ini!
4. Tambahkan catatan pengguna ini jika relevan: "${customPrompt || '-'}"
5. Di akhir caption, sertakan 12-15 hashtag Instagram yang sangat relevan dengan topik gambar ini dan tambahkan hashtag #GridCutStudioPro #InstagramGrid #SeamlessCarousel.
Jangan tulis kata pengantar seperti "Tentu ini captionnya:", langsung kembalikan teks caption dan hashtag saja.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [
      {
        parts: [
          { text: promptText },
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: cleanBase64
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 600
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Gemini API Error: ${response.statusText}`);
  }

  const data = await response.json();
  const captionText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!captionText) {
    throw new Error('Respons AI tidak mengembalikan teks caption.');
  }

  return captionText.trim();
}
