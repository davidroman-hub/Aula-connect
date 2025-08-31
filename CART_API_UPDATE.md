# Actualización API de Checkout - Cart API

## 🔄 Cambios realizados

Se ha actualizado la integración de checkout para usar la nueva **Cart API** de Shopify en lugar de la deprecated **Checkout API**.

## ⚠️ Problema resuelto

**Error anterior:**

```
"message": "Field 'checkoutCreate' doesn't exist on type 'Mutation'"
```

**Causa:** La mutación `checkoutCreate` fue deprecada en versiones recientes de la Storefront API de Shopify.

## 🛠️ Actualización implementada

### 1. **Nueva mutación Cart API**

```graphql
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

### 2. **Cambios en tipos TypeScript**

**Antes:**

```typescript
interface CheckoutData {
  productId: string;
  // ...
}

interface Product {
  id: string;
  // ...
}
```

**Después:**

```typescript
interface CheckoutData {
  variantId: string; // Cambio: productId -> variantId
  // ...
}

interface Product {
  id: string;
  variantId: string; // Nuevo: ID de la variante
  // ...
}
```

### 3. **API de productos actualizada**

Ahora obtenemos tanto el ID del producto como el ID de la variante:

```typescript
return {
  id: node.id, // ID del producto
  variantId: variant?.id || "", // ID de la variante (para checkout)
  title: node.title,
  // ...
};
```

### 4. **Respuesta de checkout actualizada**

**Antes:**

```json
{
  "success": true,
  "checkoutUrl": "...",
  "checkoutId": "...",
  "total": { ... }
}
```

**Después:**

```json
{
  "success": true,
  "checkoutUrl": "...",
  "cartId": "...",        // Cambio: checkoutId -> cartId
  "total": { ... }
}
```

## 📁 Archivos modificados

1. **`/routes/api/checkout.ts`**

   - Cambio de `checkoutCreate` a `cartCreate`
   - Actualización de variables de entrada
   - Cambio de `productId` a `variantId`

2. **`/routes/api/products.ts`**

   - Agregado `variantId` a la respuesta
   - Obtención del ID de la primera variante

3. **`/types/product.ts`**

   - Agregado campo `variantId` al tipo `Product`

4. **`/islands/main/aulaConnect/Pricing.tsx`**
   - Envío de `variantId` en lugar de `productId`

## ✅ Ventajas de Cart API

1. **API actual**: No está deprecada
2. **Mejor funcionalidad**: Más opciones para manejo de carrito
3. **Futuro-proof**: Compatible con versiones recientes
4. **Más flexible**: Permite modificar el carrito antes del checkout

## 🔧 Compatibilidad

- **Shopify Storefront API**: 2024-07 y versiones posteriores
- **Deno Fresh**: Totalmente compatible
- **TypeScript**: Tipos actualizados

## 🚀 Flujo actualizado

1. **Usuario selecciona producto** → Se obtiene `variantId`
2. **Se crea cart** con `cartCreate` mutation
3. **Shopify retorna** `checkoutUrl` del cart
4. **Usuario es redirigido** al checkout oficial

## ⚡ Próximos pasos opcionales

- [ ] Implementar gestión de carrito multi-producto
- [ ] Agregar funcionalidad de modificar cantidad
- [ ] Persistir carrito en localStorage
- [ ] Agregar descuentos y cupones

El checkout ahora debería funcionar correctamente con la nueva Cart API! 🎉
