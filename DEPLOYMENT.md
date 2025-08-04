# 🚀 Deployment Guide - Sparkle Pro Cleaning

## 📋 Opciones de Deployment

### **1. Vercel (Recomendado) - GRATIS**

#### Pasos:
1. **Crear cuenta** en [vercel.com](https://vercel.com)
2. **Conectar GitHub** y seleccionar este repositorio
3. **Configurar variables de entorno** en el dashboard de Vercel:

```
REACT_APP_GOOGLE_SHEETS_API_KEY=AIzaSyAA4xcoLiBgFD4dhO12B0cM_MGWcBwZBPo
REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID=1LKY_QRGT4CoWgfjb0VUeX1_2_MvwlG-u4MLfkw_exkQ
REACT_APP_GOOGLE_SHEETS_BUILDINGS_SHEET=Buildings
REACT_APP_GOOGLE_SHEETS_UNITS_SHEET=Units
```

4. **Deploy automático** - Vercel detectará los cambios y hará deploy

#### Ventajas:
- ✅ Variables de entorno seguras
- ✅ Deploy automático desde GitHub
- ✅ Dominio personalizado incluido
- ✅ SSL automático
- ✅ PWA support nativo

### **2. Netlify - GRATIS**

#### Pasos:
1. **Crear cuenta** en [netlify.com](https://netlify.com)
2. **Conectar GitHub** y seleccionar este repositorio
3. **Configurar variables de entorno** en el dashboard de Netlify
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `build`

### **3. GitHub Pages (con GitHub Actions)**

#### Pasos:
1. **Crear GitHub Secrets** en Settings > Secrets and variables > Actions:
   - `REACT_APP_GOOGLE_SHEETS_API_KEY`
   - `REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID`
   - `REACT_APP_GOOGLE_SHEETS_BUILDINGS_SHEET`
   - `REACT_APP_GOOGLE_SHEETS_UNITS_SHEET`

2. **Crear workflow** `.github/workflows/deploy.yml`

## 🔒 Seguridad

### Variables de Entorno:
- ❌ **NUNCA** subir `.env` al repositorio
- ✅ Usar **secrets** en la plataforma de deployment
- ✅ **API Key** es segura para frontend (Google Sheets público)

### Google Sheets:
- ✅ **Documento público** configurado
- ✅ **API Key** con restricciones apropiadas
- ✅ **CORS** configurado correctamente

## 🎯 Resultado

La aplicación estará disponible en:
- **Vercel:** `https://tu-proyecto.vercel.app`
- **Netlify:** `https://tu-proyecto.netlify.app`
- **GitHub Pages:** `https://tu-usuario.github.io/cleaner-work-invoice`

## 📱 PWA Features

La aplicación incluye:
- ✅ **Instalable** como app nativa
- ✅ **Offline support** con cache
- ✅ **Push notifications** (futuro)
- ✅ **App-like experience** 