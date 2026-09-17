import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sendPushPlus } from '../utils/pushplus';

export default function CartDrawer() {
  const { items, totalCount, totalPrice, isOpen, closeCart, removeItem, setQty, clear } = useCart();
  const [stage, setStage] = useState<'cart' | 'checkout'>('cart');
  const [form, setForm] = useState({ name: '', phone: '', wechat: '', remark: '' });
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleClose = () => {
    closeCart();
    // 关闭后稍作延迟重置界面，避免下次打开闪现旧状态
    setTimeout(() => {
      if (submitState === 'success') {
        setStage('cart');
        setSubmitState('idle');
      }
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // 简单校验：姓名必填，电话/微信至少留一个
    if (!form.name.trim()) {
      setSubmitState('error');
      setErrorMsg('请填写姓名');
      return;
    }
    if (!form.phone.trim() && !form.wechat.trim()) {
      setSubmitState('error');
      setErrorMsg('电话和微信至少填写一个，方便我们联系您');
      return;
    }

    setSubmitState('loading');
    setErrorMsg('');

    const lines = items.map(
      (i, idx) => `${idx + 1}. ${i.name}\n   ¥${i.price} × ${i.qty} = ¥${i.price * i.qty}`
    );
    const content = `【欧蜜儿网站订单】\n\n姓名：${form.name}\n电话：${form.phone || '未填写'}\n微信：${form.wechat || '未填写'}\n备注：${form.remark || '无'}\n\n—— 商品清单 ——\n${lines.join('\n')}\n\n合计：${totalCount} 件 / ¥${totalPrice}`;

    try {
      await sendPushPlus('欧蜜儿 · 新订单', content);
      setSubmitState('success');
      clear();
      setForm({ name: '', phone: '', wechat: '', remark: '' });
    } catch (err) {
      setSubmitState('error');
      setErrorMsg((err as Error).message || '网络异常，请稍后重试');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* 抽屉面板 */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-bobby-black border-l border-white/10 flex flex-col shadow-2xl">
        {/* 顶栏 */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <h2 className="font-display text-xl text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-bobby-gold" />
            {stage === 'cart' ? `购物车（${totalCount}）` : '填写订单信息'}
          </h2>
          <button onClick={handleClose} className="text-white/60 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {submitState === 'success' ? (
            /* ---- 下单成功 ---- */
            <div className="text-center py-16">
              <CheckCircle2 className="w-16 h-16 text-bobby-gold mx-auto mb-6" />
              <p className="text-bobby-gold text-xl mb-3">订单提交成功！</p>
              <p className="text-white/60 text-sm leading-relaxed">
                我们已收到您的订单，会尽快通过电话或微信与您确认取货与付款方式。
              </p>
            </div>
          ) : items.length === 0 ? (
            /* ---- 空购物车 ---- */
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-6" />
              <p className="text-white/50 mb-2">购物车还是空的</p>
              <p className="text-white/30 text-sm">去商品页面挑选心仪的款式吧</p>
            </div>
          ) : stage === 'cart' ? (
            /* ---- 商品清单 ---- */
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3 bg-white/5 border border-white/10 p-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-24 object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-white text-sm leading-snug">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-white/30 hover:text-red-400 transition-colors p-1 shrink-0"
                        title="移除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-bobby-gold text-sm mt-1">¥{item.price.toLocaleString()}</p>
                    <div className="flex items-center justify-between mt-auto">
                      {/* 数量加减 */}
                      <div className="flex items-center border border-white/20">
                        <button
                          onClick={() => setQty(item.key, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-bobby-gold transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-white text-sm">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.key, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-bobby-gold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-white/80 text-sm">
                        小计 ¥{(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => { setStage('cart'); clear(); }}
                className="text-white/40 hover:text-red-400 text-xs transition-colors"
              >
                清空购物车
              </button>
            </div>
          ) : (
            /* ---- 下单表单 ---- */
            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 p-4">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">商品清单</p>
                {items.map((i) => (
                  <div key={i.key} className="flex justify-between text-sm mb-1.5 last:mb-0">
                    <span className="text-white/70 truncate mr-3">{i.name} × {i.qty}</span>
                    <span className="text-bobby-gold shrink-0">¥{(i.price * i.qty).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 mt-3 pt-3 flex justify-between text-sm">
                  <span className="text-white">合计 {totalCount} 件</span>
                  <span className="text-bobby-gold font-medium">¥{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">姓名 *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={submitState === 'loading'}
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="怎么称呼您"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">电话（和微信至少填一个）</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={submitState === 'loading'}
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="方便联系的电话"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">微信号（和电话至少填一个）</label>
                <input
                  type="text"
                  name="wechat"
                  value={form.wechat}
                  onChange={handleChange}
                  disabled={submitState === 'loading'}
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="方便联系的微信号"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">备注（选填）</label>
                <textarea
                  name="remark"
                  value={form.remark}
                  onChange={handleChange}
                  rows={3}
                  disabled={submitState === 'loading'}
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors resize-none disabled:opacity-50"
                  placeholder="颜色、尺码、拿货数量等特殊要求"
                />
              </div>

              <p className="text-white/40 text-xs leading-relaxed">
                提交订单后我们会尽快联系您确认库存与付款方式（微信转账 / 到店支付），网站暂不在线收款。
              </p>
            </div>
          )}
        </div>

        {/* 底栏按钮 */}
        {submitState !== 'success' && items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 shrink-0">
            {submitState === 'error' && (
              <p className="text-red-400 text-sm mb-3">{errorMsg || '提交失败，请稍后重试'}</p>
            )}
            {stage === 'cart' ? (
              <button
                onClick={() => { setStage('checkout'); setSubmitState('idle'); setErrorMsg(''); }}
                className="w-full bg-bobby-gold text-bobby-black py-4 text-sm uppercase tracking-widest hover:bg-bobby-gold/90 transition-colors flex items-center justify-center gap-3"
              >
                去下单
                <span className="font-medium">¥{totalPrice.toLocaleString()}</span>
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => { setStage('cart'); setSubmitState('idle'); setErrorMsg(''); }}
                  disabled={submitState === 'loading'}
                  className="px-6 py-4 border border-white/20 text-white/70 hover:border-white/40 transition-colors text-sm disabled:opacity-50"
                >
                  返回
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitState === 'loading'}
                  className="flex-1 bg-bobby-gold text-bobby-black py-4 text-sm uppercase tracking-widest hover:bg-bobby-gold/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitState === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      提交订单
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* 空购物车时也提供关闭引导 */}
        {items.length === 0 && submitState !== 'success' && (
          <div className="px-6 py-5 border-t border-white/10 shrink-0">
            <button
              onClick={handleClose}
              className="w-full border border-white/20 text-white/70 py-4 text-sm uppercase tracking-widest hover:border-bobby-gold hover:text-bobby-gold transition-colors"
            >
              继续逛逛
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
