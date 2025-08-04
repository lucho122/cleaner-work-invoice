# 🔗 Configuración de Google Sheets

## 📋 **PASOS PARA CONECTAR CON GOOGLE SHEETS REAL**

### **1. 🗂️ Crear Google Sheets**

#### **A. Crear el Spreadsheet:**
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea un nuevo spreadsheet
3. Copia el **Spreadsheet ID** de la URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

#### **B. Configurar la Hoja "Buildings":**
```
| ID          | Name              | Address           | City         | State | ZipCode |
|-------------|-------------------|-------------------|--------------|-------|---------|
| building-1  | Sunset Apartments | 123 Sunset Blvd  | Los Angeles  | CA    | 90210   |
| building-2  | Ocean View Condos | 456 Ocean Drive  | Miami Beach  | FL    | 33139   |
| building-3  | Downtown Lofts    | 789 Main Street  | New York     | NY    | 10001   |
```

#### **C. Configurar la Hoja "Units":**
```
| ID      | Name     | Building ID | Service Price | Type      | Bedrooms | Bathrooms | Square Footage |
|---------|----------|-------------|---------------|-----------|----------|-----------|----------------|
| unit-1  | Unit 101 | building-1  | 120          | apartment | 2        | 1         | 850            |
| unit-2  | Unit 102 | building-1  | 140          | apartment | 2        | 2         | 950            |
| unit-3  | Unit 201 | building-2  | 180          | condo     | 3        | 2         | 1200           |
| unit-4  | Unit 202 | building-2  | 200          | condo     | 3        | 2.5       | 1400           |
| unit-5  | Loft A   | building-3  | 160          | loft      | 1        | 1         | 1100           |
```

### **2. 🔑 Configurar Google Sheets API**

#### **A. Habilitar Google Sheets API:**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** > **Library**
4. Busca "Google Sheets API" y habilítala

#### **B. Crear Credenciales:**
1. Ve a **APIs & Services** > **Credentials**
2. Haz clic en **"Create Credentials"** > **"API Key"**
3. Copia la API Key generada

#### **C. Configurar Restricciones (Opcional pero Recomendado):**
1. En la API Key creada, haz clic en **"Edit"**
2. En **"Application restrictions"** selecciona **"HTTP referrers"**
3. Agrega tu dominio: `https://tu-dominio.com/*`
4. En **"API restrictions"** selecciona **"Restrict key"**
5. Selecciona **"Google Sheets API"**

### **3. ⚙️ Configurar Variables de Entorno**

#### **A. Crear archivo `.env`:**
```bash
# En la raíz del proyecto
touch .env
```

#### **B. Agregar configuración:**
```env
# Google Sheets API Configuration
REACT_APP_GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID=tu_spreadsheet_id_aqui

# Optional: Custom sheet names
REACT_APP_GOOGLE_SHEETS_BUILDINGS_SHEET=Buildings
REACT_APP_GOOGLE_SHEETS_UNITS_SHEET=Units
```

### **4. 🔒 Configurar Permisos del Spreadsheet**

#### **A. Hacer el Spreadsheet Público (Solo Lectura):**
1. En tu Google Sheets, haz clic en **"Share"**
2. Cambia a **"Anyone with the link"**
3. Selecciona **"Viewer"**
4. Haz clic en **"Done"**

#### **B. O Configurar Permisos Específicos:**
1. En **"Share"** agrega tu email de servicio
2. Dale permisos de **"Viewer"**

### **5. 🧪 Probar la Conexión**

#### **A. Verificar en el Navegador:**
```javascript
// Abre la consola del navegador y prueba:
fetch(`https://sheets.googleapis.com/v4/spreadsheets/TU_SPREADSHEET_ID?key=TU_API_KEY`)
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
```

#### **B. Verificar en la Aplicación:**
1. Reinicia la aplicación: `npm start`
2. Abre las herramientas de desarrollador
3. Ve a la pestaña **Console**
4. Busca mensajes de conexión exitosa

### **6. 🚨 Solución de Problemas**

#### **A. Error 403 (Forbidden):**
- Verifica que la API Key sea correcta
- Asegúrate de que Google Sheets API esté habilitada
- Verifica los permisos del spreadsheet

#### **B. Error 404 (Not Found):**
- Verifica que el Spreadsheet ID sea correcto
- Asegúrate de que el spreadsheet exista y sea accesible

#### **C. Error de CORS:**
- La API de Google Sheets no tiene problemas de CORS
- Si persiste, verifica la configuración de restricciones de la API Key

#### **D. Datos No Se Cargan:**
- Verifica que los nombres de las hojas sean exactos
- Asegúrate de que la primera fila contenga los headers
- Verifica que los datos estén en el formato correcto

### **7. 📊 Estructura de Datos Esperada**

#### **A. Hoja "Buildings":**
```csv
ID,Name,Address,City,State,ZipCode
building-1,Sunset Apartments,123 Sunset Blvd,Los Angeles,CA,90210
building-2,Ocean View Condos,456 Ocean Drive,Miami Beach,FL,33139
```

#### **B. Hoja "Units":**
```csv
ID,Name,Building ID,Service Price,Type,Bedrooms,Bathrooms,Square Footage
unit-1,Unit 101,building-1,120,apartment,2,1,850
unit-2,Unit 102,building-1,140,apartment,2,2,950
```

### **8. 🔄 Actualización Automática**

#### **A. Cache:**
- Los datos se cachean por 5 minutos
- Para forzar actualización, usa el botón "Retry"

#### **B. Fallback:**
- Si Google Sheets no está disponible, usa datos mock
- Los datos mock se muestran en la consola

### **9. 🛡️ Seguridad**

#### **A. API Key:**
- Nunca commits la API Key al repositorio
- Usa variables de entorno
- Configura restricciones en Google Cloud Console

#### **B. Permisos:**
- Solo permisos de lectura son necesarios
- No configures permisos de escritura

### **10. 📈 Monitoreo**

#### **A. Logs:**
- Revisa la consola del navegador para errores
- Los errores se muestran en la interfaz

#### **B. Métricas:**
- Tiempo de carga de datos
- Tasa de éxito de conexión
- Uso de cache vs. llamadas API

---

## 🎯 **RESUMEN RÁPIDO:**

1. **Crear Google Sheets** con hojas "Buildings" y "Units"
2. **Habilitar Google Sheets API** en Google Cloud Console
3. **Crear API Key** con restricciones apropiadas
4. **Configurar variables de entorno** en `.env`
5. **Hacer spreadsheet público** o configurar permisos
6. **Probar conexión** y verificar datos
7. **Monitorear** logs y métricas

¡Con estos pasos tendrás Google Sheets funcionando en tu aplicación! 🚀 