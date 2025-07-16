# Truek-e - Plataforma de Intercambio

## 🎯 Descripción
Truek-e es una plataforma web completa para intercambio de objetos donde los usuarios pueden registrarse, publicar sus productos y realizar intercambios con otros usuarios.

## 🔐 Sistema de Autenticación

### **Usuarios de Prueba**
La plataforma incluye 3 usuarios demo con productos únicos:

| Usuario | Email | Contraseña | Productos |
|---------|-------|------------|-----------|
| María González | maria@trueke.com | 123456 | Cámara Canon, Libros cocina, Vestido vintage, Lámpara |
| Carlos López | carlos@trueke.com | 123456 | Bicicleta Trek, Guitarra Fender, PlayStation 4, Mochila |
| Ana Martínez | ana@trueke.com | 123456 | Máquina Singer, Vajilla japonesa, Plantas, Libros arte |

### **Funcionalidad de Autenticación**
- ✅ **Login/Logout** completo
- ✅ **Protección de páginas** - Solo usuarios autenticados pueden acceder
- ✅ **Sesiones persistentes** con localStorage
- ✅ **Simulación de verificación por email** para nuevos registros
- ✅ **Experiencia personalizada** por usuario

## 🚀 Características Principales

### **Para Usuarios No Autenticados**
- Página de bienvenida con información sobre la plataforma
- Formularios de registro e inicio de sesión
- Acceso limitado - No pueden ver productos ni usar funcionalidades

### **Para Usuarios Autenticados**
- **Dashboard personalizado** con productos específicos del usuario
- **Navegación completa** con todas las opciones disponibles
- **Búsqueda y filtrado** de productos
- **Gestión de favoritos**
- **Perfil de usuario** con estadísticas
- **Publicación de objetos**
- **Gestión de intercambios**

## 📁 Estructura del Proyecto

```
truek-e/
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos principales
│   ├── components.css      # Componentes reutilizables
│   ├── pages.css          # Estilos específicos de páginas
│   └── responsive.css     # Responsive design
├── js/
│   ├── auth.js            # Sistema de autenticación
│   └── main.js            # Funcionalidad principal
├── pages/
│   ├── login.html         # Página de inicio de sesión
│   ├── register.html      # Página de registro
│   ├── profile.html       # Perfil de usuario
│   ├── publish.html       # Publicar objetos
│   └── my-exchanges.html  # Gestión de intercambios
└── assets/
    └── images/           # Imágenes del proyecto
```

## 💻 Instalación y Uso

### **Método 1: Servidor Local Simple**
```bash
# Navegar al directorio del proyecto
cd truek-e

# Iniciar servidor HTTP simple (Python)
python -m http.server 8000

# Abrir en navegador
# http://localhost:8000
```

### **Método 2: VS Code Live Server**
1. Instalar extensión "Live Server" en VS Code
2. Abrir el proyecto en VS Code
3. Clic derecho en `index.html` → "Open with Live Server"

### **Método 3: Abrir directamente**
- Abrir `index.html` directamente en el navegador

## 🔧 Funcionalidades Implementadas

### **Autenticación**
- [x] Login con validación
- [x] Logout con limpieza de sesión
- [x] Protección de páginas
- [x] Sesiones persistentes
- [x] Simulación de verificación por email

### **Interfaz de Usuario**
- [x] Diseño responsive
- [x] Navegación condicional (logueado/no logueado)
- [x] Interfaz personalizada por usuario
- [x] Notificaciones interactivas
- [x] Página de perfil completa

### **Funcionalidad de Productos**
- [x] Visualización de productos por usuario
- [x] Búsqueda en tiempo real
- [x] Filtrado por categorías
- [x] Sistema de favoritos
- [x] Estados de productos (disponible/intercambiado)

### **Experiencia de Usuario**
- [x] Landing page para usuarios no autenticados
- [x] Dashboard personalizado para usuarios autenticados
- [x] Restricciones de acceso claras
- [x] Feedback visual en todas las interacciones

## 🎨 Diseño y Estilo

### **Sistema de Colores**
- **Primario**: Azul (#007bff)
- **Secundario**: Verde (#28a745)
- **Éxito**: Verde (#4CAF50)
- **Advertencia**: Naranja (#FF9800)
- **Error**: Rojo (#F44336)

### **Tipografía**
- **Fuente principal**: Inter (Google Fonts)
- **Pesos**: 400, 500, 600, 700

### **Responsive Design**
- ✅ Mobile First
- ✅ Breakpoints estándar
- ✅ Componentes adaptables
- ✅ Navegación móvil

## 🧪 Cómo Probar la Plataforma

### **Paso 1: Experiencia sin login**
1. Abrir `index.html`
2. Observar página de bienvenida
3. Intentar usar búsqueda/filtros (mostrará notificaciones)
4. Ver sección "¿Cómo funciona?"

### **Paso 2: Proceso de registro**
1. Clic en "Registrarse"
2. Completar formulario
3. Observe simulación de envío de email

### **Paso 3: Iniciar sesión**
1. Usar cualquiera de los 3 usuarios demo
2. Observar cambio completo de interfaz
3. Ver navegación completa disponible

### **Paso 4: Explorar funcionalidades**
1. Buscar productos
2. Filtrar por categorías
3. Agregar/quitar favoritos
4. Visitar perfil de usuario
5. Cerrar sesión

## 📧 Simulación de Email

Cuando un usuario se registra, el sistema simula el envío de un email de verificación:
- Se muestra una notificación de bienvenida
- Se registra en la consola del navegador
- En una implementación real, se enviaría un email verdadero

## 🔒 Seguridad

### **Implementado**
- Validación de credenciales
- Protección de páginas sensibles
- Gestión segura de sesiones
- Limpieza de datos al cerrar sesión

### **Para Producción (Pendiente)**
- Autenticación JWT
- Encriptación de contraseñas
- Validación del lado del servidor
- Rate limiting

## 🚧 Próximas Mejoras

- [ ] Base de datos real
- [ ] API REST backend
- [ ] Sistema de mensajería
- [ ] Notificaciones push
- [ ] Geolocalización
- [ ] Sistema de reviews
- [ ] Pagos integrados

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🤝 Contribución

Este es un proyecto de demostración. Para contribuir:
1. Fork el repositorio
2. Crear branch para features
3. Hacer commits descriptivos
4. Abrir Pull Request
# 📌 Endpoints necesarios para el backend de Truek-e

Este documento detalla los endpoints que el backend debe implementar para que el frontend funcione correctamente, según el diseño y diagrama de clases.

---

## 🔐 1. Autenticación de Usuario

| Acción           | Método | Endpoint          | Body (JSON)                                      | Respuesta esperada                        |
|------------------|--------|-------------------|-------------------------------------------------|------------------------------------------|
| Registrarse      | POST   | `/api/usuarios`   | `{nombre, apellido, correo, celular, contraseña}`| `{mensaje, id_usuario}`                   |
| Iniciar sesión   | POST   | `/api/login`      | `{correo, contraseña}`                           | `{token, usuario_id}`                     |

---

## 👤 2. Gestión de Perfil

| Acción           | Método | Endpoint                 | Body (JSON)                                   | Respuesta esperada             |
|------------------|--------|--------------------------|-----------------------------------------------|-------------------------------|
| Ver perfil propio | GET    | `/api/usuarios/:id`      | —                                             | `{datos del usuario}`          |
| Editar perfil    | PUT    | `/api/usuarios/:id`      | `{nombre, apellido, celular, fotoPerfil}`     | `{mensaje}`                   |
| Calificar usuario| POST   | `/api/calificaciones`    | `{puntuadorId, puntuadoId, valor, comentario}`| `{mensaje}`                   |

---

## 📦 3. Publicaciones (Objetos)

| Acción                  | Método | Endpoint             | Body (JSON)                                      | Respuesta esperada            |
|-------------------------|--------|----------------------|-------------------------------------------------|------------------------------|
| Listar objetos publicados| GET    | `/api/objetos`       | —                                               | `[lista de objetos]`          |
| Ver objeto específico   | GET    | `/api/objetos/:id`   | —                                               | `{detalle del objeto}`        |
| Publicar nuevo objeto   | POST   | `/api/objetos`       | `{nombre, descripcion, categoriaId, imagenes}` | `{mensaje, id}`               |
| Editar objeto           | PUT    | `/api/objetos/:id`   | `{nombre?, descripcion?, categoriaId?, imagenes?, estado?}` | `{mensaje}`                  |
| Eliminar objeto         | DELETE | `/api/objetos/:id`   | —                                               | `{mensaje}`                  |

---

## 🔄 4. Intercambios (Solicitudes)

| Acción                 | Método | Endpoint                     | Body (JSON)                                                            | Respuesta esperada           |
|------------------------|--------|------------------------------|------------------------------------------------------------------------|------------------------------|
| Enviar solicitud       | POST   | `/api/solicitudes`           | `{solicitanteId, receptorId, objetoSolicitadoId, objetoPropuestoId}`   | `{mensaje, id}`              |
| Ver solicitudes propias| GET    | `/api/solicitudes?usuarioId=…` | —                                                                    | `[lista de solicitudes]`     |
| Cambiar estado solicitud| PUT    | `/api/solicitudes/:id`       | `{estado}` donde estado ∈ EstadoSolicitud                              | `{mensaje}`                  |

---

## 🧑‍⚖️ 5. Moderación

| Acción                  | Método | Endpoint                    | Body (JSON)                     | Respuesta esperada          |
|-------------------------|--------|-----------------------------|--------------------------------|----------------------------|
| Ver objetos pendientes  | GET    | `/api/moderacion/pendientes`| —                              | `[lista de objetos]`        |
| Aprobar objeto          | PUT    | `/api/moderacion/aprobar/:id`| —                              | `{mensaje}`                 |
| Rechazar objeto         | PUT    | `/api/moderacion/rechazar/:id`| `{motivo}`                    | `{mensaje}`                 |

---

## 🛎️ 6. Notificaciones

| Acción                 | Método | Endpoint                      | Body (JSON) | Respuesta esperada          |
|------------------------|--------|-------------------------------|-------------|----------------------------|
| Ver notificaciones     | GET    | `/api/notificaciones/:idUsuario` | —           | `[notificaciones]`          |
| Marcar como leída      | PUT    | `/api/notificaciones/:id`      | —           | `{mensaje}`                 |

---

## Notas

- Todos los IDs deben ser UUID.
- El backend debe implementar autenticación (token JWT recomendado).
- Las respuestas siempre en JSON.
- Validar estados según enumeraciones definidas (`EstadoObjeto`, `EstadoSolicitud`, etc.).

## 📄 Licencia

MIT License - Uso libre para proyectos personales y comerciales.

---

**¡Disfruta explorando Truek-e!** 🎉
