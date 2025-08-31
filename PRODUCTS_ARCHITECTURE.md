# Arquitectura de Productos Shopify

## Estructura de la nueva implementación

La integración con Shopify ahora está separada en diferentes capas para mejor mantenibilidad y reutilización:

### 📁 Estructura de archivos

```
/routes/api/products.ts         # API endpoint para productos
/lib/useProducts.ts             # Hook personalizado para manejo de estado
/types/product.ts               # Tipo TypeScript compartido
/islands/main/aulaConnect/Pricing.tsx  # Componente UI (Island)
```

### 🔄 Flujo de datos

1. **API Route** (`/routes/api/products.ts`)

   - Se conecta directamente a Shopify GraphQL API
   - Maneja errores y transformación de datos
   - Devuelve JSON con productos o errores

2. **Custom Hook** (`/lib/useProducts.ts`)

   - Consume la API interna `/api/products`
   - Maneja estados de loading, error y datos
   - Proporciona reactividad automática

3. **Island Component** (`/islands/main/aulaConnect/Pricing.tsx`)
   - Usa el hook para obtener productos
   - Renderiza UI con loading, error y success states
   - Completamente reactivo del lado del cliente

### ✅ Ventajas de esta arquitectura

1. **Separación de responsabilidades**

   - API maneja la lógica de datos
   - Hook maneja el estado
   - Componente maneja la UI

2. **Reutilización**

   - El hook `useProducts` puede usarse en otros componentes
   - El tipo `Product` es compartido
   - La API puede ser consumida por otros clientes

3. **Mejor manejo de errores**

   - Estados de loading y error claramente definidos
   - Mensajes de error informativos
   - Botón de reintentar en caso de fallos

4. **Performance**
   - Solo se ejecuta en el cliente cuando es necesario
   - Fresh hidrata el island solo cuando se usa

### 🛠️ Uso

Para usar los productos en otro componente:

```tsx
import { useProducts } from "../lib/useProducts.ts";

function MyComponent() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
```

### 🔧 Configuración

1. Configura las variables de entorno en `.env`:

   ```
   SHOPIFY_DOMAIN=tu-tienda.myshopify.com
   SHOPIFY_STOREFRONT_TOKEN=tu-token
   ```

2. El endpoint estará disponible en: `GET /api/products`

3. El componente Pricing se renderiza automáticamente como island

### 📝 API Response

La API devuelve un array de productos con esta estructura:

```typescript
interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  image?: string;
  price: string;
}
```

En caso de error, devuelve:

```json
{
  "error": "Descripción del error",
  "details": "Detalles adicionales (opcional)"
}
```
