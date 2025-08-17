# Sistema de Refresh Tokens

Este documento explica cómo funciona el sistema de refresh tokens implementado en la aplicación.

## ¿Qué es un Refresh Token?

Un refresh token es un token de larga duración que se usa para obtener nuevos access tokens sin requerir que el usuario se autentique nuevamente. Esto mejora la seguridad y la experiencia del usuario.

## Estructura del Sistema

### 1. Tipos de Tokens

- **Access Token**: Token de corta duración (15 minutos) usado para autenticar requests
- **Refresh Token**: Token de larga duración (7 días) usado para obtener nuevos access tokens

### 2. Archivos Principales

#### `lib/JWT.ts`

- `createJWT()`: Crea access tokens (15 minutos)
- `createRefreshToken()`: Crea refresh tokens (7 días)
- `verifyJWT()`: Verifica access tokens
- `verifyRefreshToken()`: Verifica refresh tokens específicamente

#### `lib/tokenManager.ts`

- `refreshTokenIfNeeded()`: Verifica si el token necesita ser refrescado y lo hace automáticamente
- `clearTokens()`: Limpia todos los tokens del localStorage y cookies
- `setupTokenRefreshInterceptor()`: Configura interceptores para requests automáticos
- `verifyTokensOnPageLoad()`: Verifica tokens al cargar la página

#### `lib/apiHelpers.ts`

- `authenticatedRequest()`: Función principal para hacer requests autenticadas
- `authenticatedGet()`, `authenticatedPost()`, etc.: Helpers específicos para cada método HTTP

#### `routes/api/jwt/refresh.tsx`

- Endpoint POST que recibe un refresh token y devuelve nuevos tokens

### 3. Componentes

#### `islands/helpers/TokenInitializer.tsx`

- Componente que inicializa el sistema de tokens en toda la aplicación
- Se incluye automáticamente en `_app.tsx`

## Cómo Funciona

### 1. Login

```typescript
// En login, ahora se reciben ambos tokens
const { accessToken, refreshToken, token } = response.data;

// Se guardan en localStorage
localStorage.setItem("jwtToken", accessToken || token);
localStorage.setItem("refreshToken", refreshToken);
```

### 2. Requests Automáticas

```typescript
// Usar los helpers para requests automáticas con refresh
import { authenticatedGet, authenticatedPost } from "../../lib/apiHelpers.ts";

// GET request
const response = await authenticatedGet("api/users/user");

// POST request
const response = await authenticatedPost("api/courses/course", courseData);
```

### 3. Refresh Automático

El sistema automáticamente:

1. Verifica si el access token expira en menos de 5 minutos
2. Si es así, usa el refresh token para obtener nuevos tokens
3. Actualiza el localStorage con los nuevos tokens
4. Continúa con el request original

### 4. Manejo de Errores

Si el refresh token también expira:

1. Se limpian todos los tokens
2. Se redirige al usuario al login
3. Se muestra un mensaje apropiado

## Implementación en Componentes

### Ejemplo Básico

```typescript
import { authenticatedGet } from "../../lib/apiHelpers.ts";

const MyComponent = () => {
  const fetchData = async () => {
    try {
      // El sistema maneja automáticamente el refresh si es necesario
      const response = await authenticatedGet("api/data");
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      // Si llega aquí, probablemente el usuario necesita hacer login
    }
  };

  return <button onClick={fetchData}>Fetch Data</button>;
};
```

### Ejemplo con POST

```typescript
import { authenticatedPost } from "../../lib/apiHelpers.ts";

const createCourse = async (courseData) => {
  try {
    const response = await authenticatedPost("api/courses/course", courseData);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};
```

## Configuración en localStorage

El sistema maneja automáticamente:

- `jwtToken`: Access token actual
- `refreshToken`: Refresh token para obtener nuevos access tokens
- `auth`: Estado de autenticación
- `user`: Información del usuario
- `userInfo`: Payload decodificado del token

## Ventajas

1. **Seguridad**: Access tokens de corta duración reducen el riesgo si son comprometidos
2. **UX**: El usuario no necesita hacer login frecuentemente
3. **Automático**: El sistema maneja el refresh transparentemente
4. **Resiliente**: Maneja automáticamente errores de expiración

## Migración de Código Existente

Para migrar código existente:

### Antes:

```typescript
const response = await axiod.get("api/data", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Después:

```typescript
const response = await authenticatedGet("api/data");
```

El nuevo sistema es más simple y maneja automáticamente la autenticación y el refresh de tokens.
