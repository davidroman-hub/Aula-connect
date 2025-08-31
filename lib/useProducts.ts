import { useEffect, useState } from "preact/hooks";
import { Product } from "../types/product.ts";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
