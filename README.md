# Glide 🚀

**Glide** is a full-stack web application for **file storage and sharing**, enhanced with **AI-powered features** and advanced **security controls**. It offers a smooth, modern UI and powerful functionalities, making file management intuitive, secure, and efficient.  

---

## Features ✨

- **Secure Authentication:** Powered by **JWT**, **bcrypt** and **Cookie-Parser**.
- **CRUD Features:** Upload file(s) (both single and batch uploads are supported), download files, update access controls, delete files. 
- **AI-Powered Summarization:** Quickly summarize text and images using **Gemini AI**.  
- **Secure Privacy Controls:** Fine-grained access permissions for your files.  
- **Malware Protection:** Files can be scanned via **MetaDefender API** for added security.  
- **File Sharing:** Generate links for easy sharing of your files, using ***Glide Downloads*** URLs.  
- **Smooth UI & Animations:** Built with **React 3 Fiber**, **GSAP**, **Swiper.js**, and **Lenis** for a fluid experience.  
- **Responsive Design:** Styled using **Tailwind CSS** for a clean and modern look.

---

## Tech Stack 🛠️

- **Frontend:**  
  - React  
  - React Three Fiber  
  - Swiper.js  
  - Lenis (smooth scrolling)  
  - GSAP (animations)  
  - Tailwind CSS  

- **Backend:**  
  - Node.js & Express  
  - MongoDB Atlas  

- **APIs & Integrations:**  
  - Gemini API (AI summarization)  
  - MetaDefender API (malware scanning)  
  - Dropbox API (file storage & retrieval)

---
## Deployed Link : Coming Soon.

## Getting Started  (Local Installation)⚡

### Prerequisites

- Node.js v16+  
- npm / yarn  
- MongoDB Atlas account  
- Dropbox Developer account (for API integration)  
- Gemini AI & MetaDefender API keys  

### Installation 
#### (project Size ~480MB)

1. Clone the repository:  
```bash
git clone https://github.com/AtharvDubey12/Glide-Codebase.git
cd glide
```

2. Install dependencies 
```bash
cd frontend
npm i
cd ../backend
npm i
```

3. Set up Environment variables

```env
MONGO_URI=<your_mongodb_uri>
DROPBOX_ACCESS_TOKEN=<your_dropbox_token>
GEMINI_API_KEY=<your_gemini_api_key>
METADEFENDER_API_KEY=<your_metadefender_api_key>
```

4. Run server
```bash
npm run dev    --> in /frontend
npm run server --> in /backend
```

5. visit URL
```url
http://localhost:5173/
```

### LICENCE
The project is licenced under MIT Licence

### Future Enhancement
* Implementation of a Folder system like Google Drive
* Breadcrumb traversal implementation
* Ability to create and upload markdown and plain text files directly on Glide.

### Contact the Developer
Gmail : athdubey120904@gmail.com
