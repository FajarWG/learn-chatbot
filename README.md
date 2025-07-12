# Human-AI Co-Creation Studio

Platform kolaborasi kreatif antara manusia dan AI menggunakan React + Vite yang terintegrasi dengan SumoPod AI API. Aplikasi ini dirancang khusus untuk mendukung **human-AI co-creation** - proses penciptaan kolaboratif dimana AI berperan sebagai partner berpikir, bukan hanya sebagai alat.

## 🎯 Tentang Human-AI Co-Creation

Aplikasi ini menggunakan system prompt khusus yang membuat AI berperan sebagai:

- **Partner kreatif** yang aktif berdiskusi dan mengajukan pertanyaan
- **Kolaborator setara** yang memberikan saran dan melengkapi gagasan
- **Fasilitator inovasi** yang mendorong eksplorasi potensi kreatif
- **Pemikir kritis** yang membantu mengembangkan ide secara mendalam

AI tidak mengambil alih proses kreatif, tetapi bekerja bersama manusia untuk menghasilkan hasil yang lebih baik dari yang bisa dicapai sendiri-sendiri.

## Setup

1. Clone repository ini
2. Install dependencies:

```bash
npm install
```

3. Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

4. Edit file `.env` dan ganti `VITE_OPENAI_API_KEY` dengan API key SumoPod AI Anda:

```
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
```

5. Jalankan aplikasi:

```bash
npm run dev
```

## Fitur

- ✅ **Multiple AI Models**: Pilih dari 5 model AI berbeda:
  - GPT-4.1 (Latest flagship model)
  - GPT-4.1 Mini (Optimized for speed)
  - GPT-4.1 Nano (Ultra-fast responses)
  - GPT-4o (Multimodal capabilities)
  - GPT-4o Mini (Balanced performance - default)
- ✅ **Human-AI Co-Creation System**: AI berperan sebagai partner kreatif, bukan hanya alat
- ✅ **Rich Markdown Support**: Response AI terformat dengan baik menggunakan Markdown
  - **Bold** dan _italic_ text
  - Daftar bullet dan numbered
  - `Code blocks` dan inline code
  - > Blockquotes untuk insight
  - Headings dan sub-headings
  - Links dan horizontal rules
  - Tables untuk data terstruktur
- ✅ **Intelligent Collaboration**: System prompt khusus untuk kolaborasi kreatif
- ✅ **Dynamic Model Switching**: Ganti model AI secara real-time
- ✅ Chat interface yang modern dan responsif
- ✅ Real-time messaging
- ✅ Error handling
- ✅ Loading states
- ✅ Clear chat functionality
- ✅ Beautiful UI dengan Tailwind CSS

## 🚀 Cara Memulai Kolaborasi

### Quick Start untuk Co-Creation:

1. **Bagikan Proyek/Ide**: Ceritakan proyek, masalah, atau ide yang ingin Anda kembangkan
2. **Pilih Model AI**: Gunakan dropdown untuk memilih model yang sesuai dengan kebutuhan
3. **Mulai Berkolaborasi**: AI akan bertanya, memberikan saran, dan membantu mengembangkan ide
4. **Eksplorasi Bersama**: Manfaatkan dynamic thinking dan creative problem-solving

### Tips untuk Kolaborasi Efektif:

- 💡 **Mulai dengan konteks**: Jelaskan latar belakang proyek atau masalah Anda
- 🎯 **Bersikap terbuka**: AI akan mengajukan pertanyaan untuk memahami visi Anda
- 🔄 **Iterasi ide**: Biarkan proses berlangsung bolak-balik untuk hasil optimal
- 🤝 **Partner thinking**: Anggap AI sebagai rekan tim, bukan hanya tool

### Contoh Use Case:

- **Creative Writing**: Kolaborasi menulis cerita, artikel, atau konten kreatif
- **Problem Solving**: Brainstorming solusi untuk tantangan bisnis atau teknis
- **Product Development**: Merancang fitur, UX, atau strategi produk
- **Research & Analysis**: Mengeksplorasi topik kompleks dari berbagai sudut pandang
- **Innovation Projects**: Mengembangkan ide-ide breakthrough atau inovasi

## Cara Menggunakan Interface

1. **Pilih Model AI**: Gunakan dropdown di header untuk memilih model AI yang sesuai
2. **Mulai Kolaborasi**: Bagikan ide atau proyek Anda di chat box
3. **Ganti Model**: Model dapat diganti kapan saja untuk mendapatkan perspektif berbeda
4. **Clear Chat**: Reset percakapan untuk memulai kolaborasi baru

## Tech Stack

- React 19
- Vite
- OpenAI SDK
- Tailwind CSS
- Radix UI Components
- Lucide React Icons

## API Configuration

Aplikasi ini dikonfigurasi untuk menggunakan:

- **Base URL**: `https://ai.sumopod.com/v1`
- **Model**: `gpt-4o-mini`
- **Max Tokens**: 1000
- **Temperature**: 0.7
