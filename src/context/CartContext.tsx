import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export interface CartItem {
  key: string;      // 唯一标识：来源-名称-价格
  name: string;
  price: number;
  imageUrl: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;          // 总件数（角标显示）
  totalPrice: number;          // 合计金额
  isOpen: boolean;             // 抽屉开关
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'omier_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // 首次渲染时从 localStorage 恢复
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  // 购物车变化时持久化
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* 存储不可用时忽略，购物车仍可在本次会话使用 */ }
  }, [items]);

  const addItem = (item: Omit<CartItem, 'qty'>, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.key === item.key);
      if (existing) {
        return prev.map((i) => (i.key === item.key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const setQty = (key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    );
  };

  const clear = () => setItems([]);

  const value = useMemo<CartContextValue>(() => {
    const totalCount = items.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    return {
      items,
      totalCount,
      totalPrice,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      setQty,
      clear,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart 必须在 CartProvider 内使用');
  return ctx;
}
