# Clean My BNB - Sistema de Facturación

Un sistema moderno de facturación para servicios de limpieza de casas, recreado con React, TypeScript y Tailwind CSS.

## 🚀 Características

- **Interfaz moderna y oscura** - Diseño elegante con tema oscuro
- **Gestión completa de limpiadores** - Información personal y fechas de trabajo
- **Múltiples tipos de servicio** - Normal Clean, Deep Clean, Minor Task
- **Formularios dinámicos** - Agregar/eliminar servicios fácilmente
- **Cálculo automático** - Total de servicios y artículos
- **Generación de facturas** - Exportar datos de facturación
- **Responsive design** - Funciona en todos los dispositivos

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos y consistentes
- **Date-fns** - Manipulación de fechas

## 📦 Instalación

1. **Clona el repositorio:**
```bash
git clone <tu-repositorio>
cd cleaner-work-invoice
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Inicia el servidor de desarrollo:**
```bash
npm start
```

4. **Abre tu navegador en:**
```
http://localhost:3000
```

## 🎯 Funcionalidades Principales

### Información del Limpiador
- Nombre del limpiador
- Fecha de inicio y fin del trabajo
- Validación de campos obligatorios

### Tipos de Servicio
- **Normal Clean** - Limpieza estándar
- **Deep Clean** - Limpieza profunda
- **Minor Task** - Tareas específicas menores

### Detalles del Servicio
- Fecha del servicio
- Edificio seleccionado
- Monto del servicio
- Limpieza con compañero
- Tiempo extra
- Descripción de extras
- Artículos comprados y su costo

### Acciones Disponibles
- **Add Date** - Agregar nueva fecha de servicio
- **Add Check-in** - Registrar entrada del limpiador
- **Add Normal Cleaning** - Agregar nuevo servicio de limpieza
- **Generate Invoice** - Generar factura con totales
- **Reset Form** - Reiniciar todo el formulario

## 🎨 Personalización

### Colores del Tema
Los colores están definidos en `tailwind.config.js`:

```javascript
colors: {
  'dark-bg': '#1a1a1a',
  'dark-card': '#2d2d2d',
  'dark-input': '#3a3a3a',
  'primary-blue': '#3b82f6',
  'primary-pink': '#ec4899',
  'success-green': '#10b981',
  'danger-red': '#ef4444',
}
```

### Edificios
Puedes modificar la lista de edificios en `src/App.tsx`:

```typescript
const buildings = [
  { id: '1', name: 'Tu Edificio A' },
  { id: '2', name: 'Tu Edificio B' },
  // Agregar más edificios...
];
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Logo.tsx              # Logo y branding
│   ├── CleanerInfo.tsx       # Información del limpiador
│   ├── ServiceTypeSelector.tsx # Selector de tipo de servicio
│   ├── CleaningServiceForm.tsx # Formulario de servicio
│   └── ActionButtons.tsx     # Botones de acción
├── types/
│   └── index.ts              # Definiciones de TypeScript
├── App.tsx                   # Componente principal
├── index.tsx                 # Punto de entrada
└── index.css                 # Estilos globales
```

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de webpack

## 🚀 Despliegue

Para desplegar en producción:

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `build/`.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para tu empresa.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

---

**Desarrollado con ❤️ para tu empresa de limpieza** 