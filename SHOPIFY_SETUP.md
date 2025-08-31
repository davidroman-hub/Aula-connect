# Configuración de Shopify

## Pasos para configurar la integración con Shopify:

### 1. Configurar una App en Shopify

1. Ve a tu admin de Shopify: `https://tu-tienda.myshopify.com/admin`
2. Navega a **Apps** > **App and sales channel settings** > **Develop apps**
3. Haz clic en **Create an app**
4. Dale un nombre a tu app (ej: "Mi Ecommerce")

### 2. Configurar permisos del Storefront API

1. En tu app, ve a la pestaña **Configuration**
2. En la sección **Storefront API access scopes**, selecciona:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_products`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_collections`

### 3. Instalar y generar tokens

1. Haz clic en **Install app**
2. Una vez instalada, ve a **API credentials**
3. Copia el **Storefront access token**

### 4. Configurar variables de entorno

1. Copia el archivo `.env.example` a `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` con tus datos:
   ```
   SHOPIFY_DOMAIN=tu-tienda.myshopify.com
   SHOPIFY_STOREFRONT_TOKEN=tu-storefront-access-token
   ```

### 5. Verificar la conexión

Ejecuta tu aplicación y navega a la sección de pricing para ver si los productos se cargan correctamente.

## Solución de problemas

- **No se muestran productos**: Verifica que tengas productos publicados en tu tienda
- **Error de autenticación**: Verifica que el token del Storefront API sea correcto
- **Error de dominio**: Asegúrate de que el dominio no incluya `https://`

## GraphQL Query

El componente utiliza esta query de GraphQL para obtener los productos:

```graphql
{
  products(first: 20) {
    edges {
      node {
        id
        title
        description
        handle
        images(first: 1) {
          edges {
            node {
              src
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  }
}
```
