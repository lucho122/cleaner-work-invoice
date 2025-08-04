# 🚀 Guía de Deploy en GitHub Pages

## 📋 Pasos para Desplegar

### 1. Crear Repositorio en GitHub
- Ve a [GitHub](https://github.com)
- Crea un nuevo repositorio llamado `cleaner-work-invoice`
- **NO** inicialices con README, .gitignore o license

### 2. Actualizar package.json
Cambia la línea en `package.json`:
```json
"homepage": "https://TU-USUARIO.github.io/cleaner-work-invoice"
```
Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub.

### 3. Inicializar Git y Subir a GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cleaner-work-invoice.git
git push -u origin main
```

### 4. Desplegar
```bash
npm run deploy
```

### 5. Configurar GitHub Pages
- Ve a Settings > Pages en tu repositorio
- Source: Deploy from a branch
- Branch: gh-pages
- Folder: / (root)
- Save

## 🌐 URLs de Ejemplo
- **Tu sitio estará en:** `https://TU-USUARIO.github.io/cleaner-work-invoice`
- **Ejemplo:** `https://johndoe.github.io/cleaner-work-invoice`

## 🔄 Actualizaciones Futuras
Para actualizar el sitio después de cambios:
```bash
git add .
git commit -m "Update description"
git push
npm run deploy
```

## ⚠️ Notas Importantes
- El primer deploy puede tomar 5-10 minutos
- Asegúrate de que la URL en `homepage` coincida exactamente con tu repositorio
- Si cambias el nombre del repositorio, actualiza la URL en `package.json` 