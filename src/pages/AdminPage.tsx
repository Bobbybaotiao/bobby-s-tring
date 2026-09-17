/* ====================================================================
 *  🛠️ 网站后台管理页面
 * ====================================================================
 *
 *  访问地址：/admin
 *  使用步骤：
 *    1. 输入管理密码（默认 omier2024，可在下方 ADMIN_PASSWORD 改）
 *    2. 首次使用按提示创建 GitHub Personal Access Token 并粘贴
 *    3. 进入表单编辑界面，修改文字/价格/图片地址
 *    4. 点「保存全部修改」→ 自动提交到 GitHub → Actions 自动发布
 *
 *  说明：真正的安全靠 GitHub Token —— 没有 Token 的人无法保存任何修改。
 *
 * ==================================================================== */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Lock, Save, Plus, Trash2, LogOut, ExternalLink, Loader2, XCircle, Upload } from 'lucide-react';

const REPO_OWNER = 'Bobbybaotiao';
const REPO_NAME = 'bobby-s-tring';
const JSON_PATH = 'src/data/site-content.json';
const ADMIN_PASSWORD = 'omier2024';
const TOKEN_KEY = 'omier_github_pat';
const AUTH_KEY = 'omier_admin_authed';

/* ---- UTF-8 安全的 base64 编解码（处理中文） ---- */
function encodeBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}
function decodeBase64(b64: string): string {
  try {
    return decodeURIComponent(escape(atob(b64.replace(/\n/g, ''))));
  } catch {
    return atob(b64);
  }
}

/* ---- 图片地址解析：https:// 开头直接用，文件名自动指向 images 文件夹 ---- */
function resolveImage(src: string): string {
  const value = (src || '').trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `${import.meta.env.BASE_URL}images/${value.replace(/^\/+/, '')}`;
}

/* ---- 类型定义（仅用于编辑器内部状态） ---- */
type Content = {
  siteConfig: {
    brandName: string;
    foundedYear: number;
    wechat: string;
    phone: string;
    address: string;
    city: string;
    hours: string;
    footerIntro: string;
    storeIntro: string;
    contactIntro: string;
    pushplusToken: string;
  };
  heroSlides: Array<{ title: string; subtitle: string; image: string }>;
  hotItems: Array<{
    name: string;
    price: number;
    originalPrice: number;
    description: string;
    image: string;
    badge: string;
    features: string[];
    soldCount: number;
    rating: number;
    showOnHome: boolean;
  }>;
  homeStory: {
    image: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    paragraphs: string[];
    stats: Array<{ value: string; label: string }>;
  };
  products: Array<{
    name: string;
    description: string;
    price: number;
    category: string;
    series: string;
    image: string;
  }>;
  timelineEvents: Array<{ year: string; title: string; description: string }>;
  storyPage: {
    intro: string[];
    values: Array<{ title: string; text: string }>;
    futureImage: string;
    futureTitle: string;
    futureText: string;
  };
  /* 每个分区的自定义字段（key-value，想加什么加什么） */
  sectionCustomFields: Record<string, Array<{ key: string; value: string }>>;
};

type SectionId =
  | 'siteConfig'
  | 'heroSlides'
  | 'hotItems'
  | 'homeStory'
  | 'products'
  | 'timelineEvents'
  | 'storyPage';

const SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: 'siteConfig', label: '店铺基本信息' },
  { id: 'heroSlides', label: '首页轮播大图' },
  { id: 'hotItems', label: '当季爆款' },
  { id: 'homeStory', label: '首页品牌故事' },
  { id: 'products', label: '全部商品' },
  { id: 'timelineEvents', label: '发展历程' },
  { id: 'storyPage', label: '故事页内容' },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [token, setToken] = useState('');
  const [content, setContent] = useState<Content | null>(null);
  const [sha, setSha] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [deployStatus, setDeployStatus] = useState('');
  const [activeSection, setActiveSection] = useState<SectionId>('siteConfig');

  // 挂载时检查 localStorage
  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) === 'yes') {
      const tok = localStorage.getItem(TOKEN_KEY) || '';
      if (tok) {
        setAuthed(true);
        setToken(tok);
      }
    }
  }, []);

  const loadContent = useCallback(async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${JSON_PATH}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setSha(data.sha);
      const text = decodeBase64(data.content);
      setContent(JSON.parse(text));
    } catch (e) {
      setMessage('加载失败：' + (e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (authed && token && !content) loadContent();
  }, [authed, token, content, loadContent]);

  /* ---- 轮询 GitHub Actions 发布状态 ---- */
  const pollDeploy = useCallback(async () => {
    let tries = 0;
    const poll = async () => {
      if (tries > 36) {
        setDeployStatus('⏱️ 查询超时，但内容已保存，可稍后刷新网站查看');
        return;
      }
      tries++;
      try {
        const res = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs?per_page=1`
        );
        const data = await res.json();
        const run = data.workflow_runs?.[0];
        if (!run) {
          setDeployStatus('未找到工作流运行，但内容已保存');
          return;
        }
        if (run.status === 'completed') {
          if (run.conclusion === 'success') {
            setDeployStatus('✅ 发布完成！可刷新网站 https://bobbybaotiao.github.io/bobby-s-tring/ 查看最新内容');
          } else {
            setDeployStatus('⚠️ 发布结束但状态：' + run.conclusion + '，请到 GitHub Actions 页面查看');
          }
          return;
        }
        setDeployStatus(
          `🚀 正在自动发布... (${run.status === 'in_progress' ? '构建中' : '排队中'}, 已等 ${tries * 10} 秒)`
        );
        setTimeout(poll, 10000);
      } catch {
        setDeployStatus('发布状态查询失败，但内容已保存，可稍后刷新网站查看');
      }
    };
    poll();
  }, []);

  /* ---- 保存到 GitHub ---- */
  const save = async () => {
    if (!content) return;
    setSaving(true);
    setMessage('');
    setDeployStatus('');
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${JSON_PATH}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: '网站内容更新（通过后台管理）',
            content: encodeBase64(JSON.stringify(content, null, 2)),
            sha,
            branch: 'main',
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setSha(data.content.sha);
      setMessage('✅ 保存成功！正在自动发布，请稍候...');
      pollDeploy();
    } catch (e) {
      setMessage('❌ 保存失败：' + (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
    setToken('');
    setContent(null);
    setMessage('');
    setDeployStatus('');
  };

  /* ---- 通用编辑辅助函数 ---- */
  const updateField = <K extends keyof Content>(section: K, field: string, value: unknown) => {
    setContent((prev) => {
      if (!prev) return prev;
      return { ...prev, [section]: { ...prev[section], [field]: value } };
    });
  };

  const updateListItem = (section: keyof Content, index: number, updates: Record<string, unknown>) => {
    setContent((prev) => {
      if (!prev) return prev;
      const list = [...(prev[section] as Array<Record<string, unknown>>)];
      list[index] = { ...list[index], ...updates };
      return { ...prev, [section]: list };
    });
  };

  const addListItem = (section: keyof Content, template: Record<string, unknown>) => {
    setContent((prev) => {
      if (!prev) return prev;
      return { ...prev, [section]: [...(prev[section] as Array<Record<string, unknown>>), template] };
    });
  };

  const removeListItem = (section: keyof Content, index: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const list = [...(prev[section] as Array<Record<string, unknown>>)];
      list.splice(index, 1);
      return { ...prev, [section]: list };
    });
  };

  const updateStringArray = (
    section: keyof Content,
    field: string,
    index: number,
    value: string
  ) => {
    setContent((prev) => {
      if (!prev) return prev;
      const target = prev[section] as Record<string, unknown>;
      const arr = [...(target[field] as string[])];
      arr[index] = value;
      return { ...prev, [section]: { ...target, [field]: arr } };
    });
  };

  const addStringArrayItem = (section: keyof Content, field: string, emptyValue = '') => {
    setContent((prev) => {
      if (!prev) return prev;
      const target = prev[section] as Record<string, unknown>;
      const arr = [...(target[field] as string[]), emptyValue];
      return { ...prev, [section]: { ...target, [field]: arr } };
    });
  };

  const removeStringArrayItem = (section: keyof Content, field: string, index: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const target = prev[section] as Record<string, unknown>;
      const arr = [...(target[field] as string[])];
      arr.splice(index, 1);
      return { ...prev, [section]: { ...target, [field]: arr } };
    });
  };

  const updateNestedArray = (
    section: keyof Content,
    field: string,
    index: number,
    subField: string,
    value: string
  ) => {
    setContent((prev) => {
      if (!prev) return prev;
      const target = prev[section] as Record<string, unknown>;
      const arr = [...(target[field] as Array<Record<string, string>>)];
      arr[index] = { ...arr[index], [subField]: value };
      return { ...prev, [section]: { ...target, [field]: arr } };
    });
  };

  const addNestedArrayItem = (section: keyof Content, field: string, template: Record<string, string>) => {
    setContent((prev) => {
      if (!prev) return prev;
      const target = prev[section] as Record<string, unknown>;
      const arr = [...(target[field] as Array<Record<string, string>>), template];
      return { ...prev, [section]: { ...target, [field]: arr } };
    });
  };

  const removeNestedArrayItem = (section: keyof Content, field: string, index: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const target = prev[section] as Record<string, unknown>;
      const arr = [...(target[field] as Array<Record<string, string>>)];
      arr.splice(index, 1);
      return { ...prev, [section]: { ...target, [field]: arr } };
    });
  };

  /* ---- 图片上传 ---- */
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const uploadImage = async (file: File): Promise<string> => {
    if (!token) {
      setUploadError('未登录，无法上传');
      throw new Error('未登录');
    }
    setUploading(true);
    setUploadError('');
    try {
      const reader = new FileReader();
      const base64: string = await new Promise((resolve, reject) => {
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      // 生成唯一文件名：时间戳 + 原始扩展名
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const stamp = new Date()
        .toISOString()
        .replace(/[:.]/g, '-')
        .replace('T', '_')
        .slice(0, 19);
      const filename = `${stamp}.${ext}`;
      const path = `public/images/${filename}`;

      // 先检查文件是否已存在（获取 sha）
      let sha: string | null = null;
      try {
        const check = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (check.ok) {
          const existing = await check.json();
          sha = existing.sha;
        }
      } catch { /* 文件不存在是正常的 */ }

      // PUT 上传
      const res = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `上传图片 ${filename}（通过后台）`,
            content: base64,
            sha,
            branch: 'main',
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      return filename;
    } catch (e) {
      setUploadError((e as Error).message);
      throw e;
    } finally {
      setUploading(false);
    }
  };

  /* ---- 通用自定义字段（每个分区都有一组，key-value） ---- */
  const getCustomFields = (section: string) =>
    content?.sectionCustomFields?.[section] ?? [];
  const updateCustomField = (section: string, index: number, key: string, value: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const list = [...(prev.sectionCustomFields[section] || [])];
      list[index] = { key, value };
      return {
        ...prev,
        sectionCustomFields: { ...prev.sectionCustomFields, [section]: list },
      };
    });
  };
  const addCustomField = (section: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const list = [...(prev.sectionCustomFields[section] || []), { key: '新字段', value: '新值' }];
      return {
        ...prev,
        sectionCustomFields: { ...prev.sectionCustomFields, [section]: list },
      };
    });
  };
  const removeCustomField = (section: string, index: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const list = [...(prev.sectionCustomFields[section] || [])];
      list.splice(index, 1);
      return {
        ...prev,
        sectionCustomFields: { ...prev.sectionCustomFields, [section]: list },
      };
    });
  };

  /* ============ 登录界面 ============ */
  if (!authed) {
    return <LoginScreen onSuccess={(tok) => {
      setToken(tok);
      setAuthed(true);
    }} />;
  }

  /* ============ 加载中 ============ */
  if (loading || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          正在从 GitHub 加载网站内容...
        </div>
      </div>
    );
  }

  /* ============ 主编辑界面 ============ */
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* 顶部栏 */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded bg-gradient-to-br from-amber-500 to-yellow-700 flex items-center justify-center text-white font-bold shrink-0">
              管
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold truncate">欧蜜儿网站后台</h1>
              <p className="text-xs text-gray-500 truncate">修改完点右边「保存」即可发布</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? '正在保存...' : '保存全部修改'}
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              退出
            </button>
          </div>
        </div>
      </header>

      {/* 消息条 */}
      {(message || deployStatus) && (
        <div className="sticky top-[57px] z-20 bg-amber-50 border-b border-amber-200">
          <div className="max-w-6xl mx-auto px-4 py-2 text-sm text-amber-900 space-y-1">
            {message && <p>{message}</p>}
            {deployStatus && <p>{deployStatus}</p>}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* 左侧导航 */}
        <aside className="md:sticky md:top-[80px] md:self-start">
          <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 bg-white md:bg-transparent rounded-lg md:rounded-none p-2 md:p-0 border md:border-0 border-gray-200">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`whitespace-nowrap text-left px-3 py-2 rounded text-sm transition-colors ${
                  activeSection === s.id
                    ? 'bg-amber-100 text-amber-800 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {s.label}
              </button>
            ))}
            <a
              href="https://bobbybaotiao.github.io/bobby-s-tring/"
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap text-left px-3 py-2 rounded text-sm text-blue-600 hover:bg-blue-50 inline-flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              打开网站
            </a>
          </nav>
        </aside>

        {/* 右侧编辑区 */}
        <main className="min-w-0">
          {activeSection === 'siteConfig' && (
            <SectionCard title="店铺基本信息" desc="品牌名、联系方式、营业时间等核心信息">
              <TextField label="品牌名称" value={content.siteConfig.brandName} onChange={(v) => updateField('siteConfig', 'brandName', v)} />
              <NumberField label="品牌创立年份" value={content.siteConfig.foundedYear} onChange={(v) => updateField('siteConfig', 'foundedYear', v)} />
              <TextField label="微信号" value={content.siteConfig.wechat} onChange={(v) => updateField('siteConfig', 'wechat', v)} />
              <TextField label="联系电话（只填数字）" value={content.siteConfig.phone} onChange={(v) => updateField('siteConfig', 'phone', v)} />
              <TextField label="门店地址" value={content.siteConfig.address} onChange={(v) => updateField('siteConfig', 'address', v)} />
              <TextField label="所在城市" value={content.siteConfig.city} onChange={(v) => updateField('siteConfig', 'city', v)} />
              <TextField label="营业时间" value={content.siteConfig.hours} onChange={(v) => updateField('siteConfig', 'hours', v)} />
              <TextareaField label="页脚品牌简介" value={content.siteConfig.footerIntro} onChange={(v) => updateField('siteConfig', 'footerIntro', v)} />
              <TextareaField label="首页门店区块介绍" value={content.siteConfig.storeIntro} onChange={(v) => updateField('siteConfig', 'storeIntro', v)} />
              <TextareaField label="联系页顶部说明" value={content.siteConfig.contactIntro} onChange={(v) => updateField('siteConfig', 'contactIntro', v)} />

              <TextField
                label="PushPlus Token（微信推送令牌，留空则表单不推送）"
                value={content.siteConfig.pushplusToken}
                onChange={(v) => updateField('siteConfig', 'pushplusToken', v)}
              />

              <CustomFieldsBlock
                sectionId="siteConfig"
                sectionLabel="店铺基本信息"
                fields={getCustomFields('siteConfig')}
                onUpdate={updateCustomField}
                onAdd={addCustomField}
                onRemove={removeCustomField}
              />
            </SectionCard>
          )}

          {activeSection === 'heroSlides' && (
            <SectionCard title="首页轮播大图" desc="首页自动切换的几张图片，每张配大标题、小标题和图片地址">
              {content.heroSlides.map((slide, i) => (
                <ItemCard
                  key={i}
                  index={i + 1}
                  title={`第 ${i + 1} 张大图`}
                  onRemove={() => removeListItem('heroSlides', i)}
                  imagePreview={slide.image}
                >
                  <TextField label="大标题" value={slide.title} onChange={(v) => updateListItem('heroSlides', i, { title: v })} />
                  <TextField label="小标题" value={slide.subtitle} onChange={(v) => updateListItem('heroSlides', i, { subtitle: v })} />
                  <ImageField label="图片地址" value={slide.image} onChange={(v) => updateListItem('heroSlides', i, { image: v })} onUpload={uploadImage} uploading={uploading} uploadError={uploadError} />
                </ItemCard>
              ))}
              <AddButton label="添加一张大图" onClick={() => addListItem('heroSlides', { title: '新大标题', subtitle: '新小标题', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20fashion%20model&image_size=landscape_16_9' })} />

              <CustomFieldsBlock
                sectionId="heroSlides"
                sectionLabel="首页轮播大图"
                fields={getCustomFields('heroSlides')}
                onUpdate={updateCustomField}
                onAdd={addCustomField}
                onRemove={removeCustomField}
              />
            </SectionCard>
          )}

          {activeSection === 'hotItems' && (
            <SectionCard title="当季爆款" desc="首页爆款区和爆款页面共用。showOnHome=true 同时显示在首页">
              {content.hotItems.map((item, i) => (
                <ItemCard
                  key={i}
                  index={i + 1}
                  title={item.name || `爆款 ${i + 1}`}
                  onRemove={() => removeListItem('hotItems', i)}
                  imagePreview={item.image}
                >
                  <TextField label="商品名" value={item.name} onChange={(v) => updateListItem('hotItems', i, { name: v })} />
                  <div className="grid grid-cols-2 gap-3">
                    <NumberField label="现价（数字）" value={item.price} onChange={(v) => updateListItem('hotItems', i, { price: v })} />
                    <NumberField label="原价（数字）" value={item.originalPrice} onChange={(v) => updateListItem('hotItems', i, { originalPrice: v })} />
                  </div>
                  <TextareaField label="商品描述" value={item.description} onChange={(v) => updateListItem('hotItems', i, { description: v })} />
                  <ImageField label="图片地址（网址或 images 文件夹里的文件名）" value={item.image} onChange={(v) => updateListItem('hotItems', i, { image: v })} onUpload={uploadImage} uploading={uploading} uploadError={uploadError} />
                  <TextField label="角标文字（如「人气爆款」）" value={item.badge} onChange={(v) => updateListItem('hotItems', i, { badge: v })} />
                  <div className="grid grid-cols-2 gap-3">
                    <NumberField label="已售数量" value={item.soldCount} onChange={(v) => updateListItem('hotItems', i, { soldCount: v })} />
                    <NumberField label="星级（1-5，可填 4.9）" value={item.rating} onChange={(v) => updateListItem('hotItems', i, { rating: v })} step="0.1" />
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">特点标签（每行一个）</p>
                    {item.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={f}
                          onChange={(e) => {
                            const arr = [...item.features];
                            arr[j] = e.target.value;
                            updateListItem('hotItems', i, { features: arr });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            const arr = [...item.features];
                            arr.splice(j, 1);
                            updateListItem('hotItems', i, { features: arr });
                          }}
                          className="text-red-500 hover:bg-red-50 p-2 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => updateListItem('hotItems', i, { features: [...item.features, '新特点'] })}
                      className="text-sm text-amber-600 hover:bg-amber-50 px-3 py-1 rounded inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      添加特点
                    </button>
                  </div>
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.showOnHome}
                      onChange={(e) => updateListItem('hotItems', i, { showOnHome: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">同时显示在首页</span>
                  </label>
                </ItemCard>
              ))}
              <AddButton
                label="添加一个爆款"
                onClick={() => addListItem('hotItems', {
                  name: '新爆款',
                  price: 0,
                  originalPrice: 0,
                  description: '',
                  image: '',
                  badge: '新品',
                  features: ['特点1'],
                  soldCount: 0,
                  rating: 5,
                  showOnHome: true,
                })}
              />

              <CustomFieldsBlock
                sectionId="hotItems"
                sectionLabel="当季爆款"
                fields={getCustomFields('hotItems')}
                onUpdate={updateCustomField}
                onAdd={addCustomField}
                onRemove={removeCustomField}
              />
            </SectionCard>
          )}

          {activeSection === 'homeStory' && (
            <SectionCard title="首页品牌故事区块" desc="首页品牌故事区的图片、标题、正文、数据">
              <ImageField label="配图地址" value={content.homeStory.image} onChange={(v) => updateField('homeStory', 'image', v)} onUpload={uploadImage} uploading={uploading} uploadError={uploadError} />
              <TextField label="图片旁小英文" value={content.homeStory.eyebrow} onChange={(v) => updateField('homeStory', 'eyebrow', v)} />
              <TextField label="大标题第一行" value={content.homeStory.titleLine1} onChange={(v) => updateField('homeStory', 'titleLine1', v)} />
              <TextField label="大标题第二行（金色字）" value={content.homeStory.titleLine2} onChange={(v) => updateField('homeStory', 'titleLine2', v)} />

              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">正文段落</p>
                {content.homeStory.paragraphs.map((p, j) => (
                  <div key={j} className="flex items-start gap-2 mb-2">
                    <textarea
                      value={p}
                      onChange={(e) => updateStringArray('homeStory', 'paragraphs', j, e.target.value)}
                      rows={3}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none resize-y"
                    />
                    <button onClick={() => removeStringArrayItem('homeStory', 'paragraphs', j)} className="text-red-500 hover:bg-red-50 p-2 rounded mt-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={() => addStringArrayItem('homeStory', 'paragraphs', '新段落')} className="text-sm text-amber-600 hover:bg-amber-50 px-3 py-1 rounded inline-flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  添加段落
                </button>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">数据展示（如「17年」「品牌沉淀」）</p>
                {content.homeStory.stats.map((s, j) => (
                  <div key={j} className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2">
                    <input type="text" placeholder="数值（如 17年）" value={s.value} onChange={(e) => updateNestedArray('homeStory', 'stats', j, 'value', e.target.value)} className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none" />
                    <input type="text" placeholder="说明（如 品牌沉淀）" value={s.label} onChange={(e) => updateNestedArray('homeStory', 'stats', j, 'label', e.target.value)} className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none" />
                    <button onClick={() => removeNestedArrayItem('homeStory', 'stats', j)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={() => addNestedArrayItem('homeStory', 'stats', { value: '新数值', label: '新说明' })} className="text-sm text-amber-600 hover:bg-amber-50 px-3 py-1 rounded inline-flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  添加数据
                </button>
              </div>

              <CustomFieldsBlock
                sectionId="homeStory"
                sectionLabel="首页品牌故事"
                fields={getCustomFields('homeStory')}
                onUpdate={updateCustomField}
                onAdd={addCustomField}
                onRemove={removeCustomField}
              />
            </SectionCard>
          )}

          {activeSection === 'products' && (
            <SectionCard title="全部商品" desc="产品系列页和首页「当季新品」共用。首页自动取前 6 件">
              {content.products.map((p, i) => (
                <ItemCard
                  key={i}
                  index={i + 1}
                  title={p.name || `商品 ${i + 1}`}
                  onRemove={() => removeListItem('products', i)}
                  imagePreview={p.image}
                >
                  <TextField label="商品名" value={p.name} onChange={(v) => updateListItem('products', i, { name: v })} />
                  <TextareaField label="商品描述" value={p.description} onChange={(v) => updateListItem('products', i, { description: v })} />
                  <NumberField label="价格（数字）" value={p.price} onChange={(v) => updateListItem('products', i, { price: v })} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                    <select
                      value={p.category}
                      onChange={(e) => updateListItem('products', i, { category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="女装">女装</option>
                      <option value="配饰">配饰</option>
                    </select>
                  </div>
                  <TextField label="系列（如「2024 秋冬系列」）" value={p.series} onChange={(v) => updateListItem('products', i, { series: v })} />
                  <ImageField label="图片地址" value={p.image} onChange={(v) => updateListItem('products', i, { image: v })} onUpload={uploadImage} uploading={uploading} uploadError={uploadError} />
                </ItemCard>
              ))}
              <AddButton
                label="添加一件商品"
                onClick={() => addListItem('products', {
                  name: '新商品',
                  description: '',
                  price: 0,
                  category: '女装',
                  series: '2024 系列',
                  image: '',
                })}
              />

              <CustomFieldsBlock
                sectionId="products"
                sectionLabel="全部商品"
                fields={getCustomFields('products')}
                onUpdate={updateCustomField}
                onAdd={addCustomField}
                onRemove={removeCustomField}
              />
            </SectionCard>
          )}

          {activeSection === 'timelineEvents' && (
            <SectionCard title="发展历程" desc="故事页的时间轴，按年份从早到晚">
              {content.timelineEvents.map((e, i) => (
                <ItemCard key={i} index={i + 1} title={`${e.year} - ${e.title}`} onRemove={() => removeListItem('timelineEvents', i)}>
                  <TextField label="年份" value={e.year} onChange={(v) => updateListItem('timelineEvents', i, { year: v })} />
                  <TextField label="标题" value={e.title} onChange={(v) => updateListItem('timelineEvents', i, { title: v })} />
                  <TextareaField label="描述" value={e.description} onChange={(v) => updateListItem('timelineEvents', i, { description: v })} />
                </ItemCard>
              ))}
              <AddButton label="添加一条历程" onClick={() => addListItem('timelineEvents', { year: '2026', title: '新历程', description: '描述' })} />

              <CustomFieldsBlock
                sectionId="timelineEvents"
                sectionLabel="发展历程"
                fields={getCustomFields('timelineEvents')}
                onUpdate={updateCustomField}
                onAdd={addCustomField}
                onRemove={removeCustomField}
              />
            </SectionCard>
          )}

          {activeSection === 'storyPage' && (
            <SectionCard title="故事页内容" desc="故事页顶部介绍、三个理念卡片、底部展望">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">页面顶部介绍（可多段）</p>
                {content.storyPage.intro.map((p, j) => (
                  <div key={j} className="flex items-start gap-2 mb-2">
                    <textarea
                      value={p}
                      onChange={(e) => updateStringArray('storyPage', 'intro', j, e.target.value)}
                      rows={3}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none resize-y"
                    />
                    <button onClick={() => removeStringArrayItem('storyPage', 'intro', j)} className="text-red-500 hover:bg-red-50 p-2 rounded mt-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={() => addStringArrayItem('storyPage', 'intro', '新段落')} className="text-sm text-amber-600 hover:bg-amber-50 px-3 py-1 rounded inline-flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  添加段落
                </button>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">理念卡片（编号 01/02/03 自动生成）</p>
                {content.storyPage.values.map((v, j) => (
                  <div key={j} className="border border-gray-200 rounded p-3 mb-2 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500">第 {j + 1} 张</span>
                      <button onClick={() => removeNestedArrayItem('storyPage', 'values', j)} className="ml-auto text-red-500 hover:bg-red-50 p-1 rounded">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <TextField label="标题" value={v.title} onChange={(val) => updateNestedArray('storyPage', 'values', j, 'title', val)} />
                    <TextareaField label="正文" value={v.text} onChange={(val) => updateNestedArray('storyPage', 'values', j, 'text', val)} />
                  </div>
                ))}
                <button onClick={() => addNestedArrayItem('storyPage', 'values', { title: '新理念', text: '正文内容' })} className="text-sm text-amber-600 hover:bg-amber-50 px-3 py-1 rounded inline-flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  添加理念卡片
                </button>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <ImageField label="底部大图地址" value={content.storyPage.futureImage} onChange={(v) => updateField('storyPage', 'futureImage', v)} onUpload={uploadImage} uploading={uploading} uploadError={uploadError} />
                <TextField label="底部标题" value={content.storyPage.futureTitle} onChange={(v) => updateField('storyPage', 'futureTitle', v)} />
                <TextareaField label="底部正文" value={content.storyPage.futureText} onChange={(v) => updateField('storyPage', 'futureText', v)} />
              </div>

              <CustomFieldsBlock
                sectionId="storyPage"
                sectionLabel="故事页内容"
                fields={getCustomFields('storyPage')}
                onUpdate={updateCustomField}
                onAdd={addCustomField}
                onRemove={removeCustomField}
              />
            </SectionCard>
          )}

          {/* 底部保存按钮 */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? '正在保存...' : '保存全部修改并发布'}
            </button>
            <span className="text-xs text-gray-500">保存后会自动提交到 GitHub 并触发自动部署</span>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ============ 子组件 ============ */

function CustomFieldsBlock({
  sectionId,
  sectionLabel,
  fields,
  onUpdate,
  onAdd,
  onRemove,
}: {
  sectionId: string;
  sectionLabel: string;
  fields: Array<{ key: string; value: string }>;
  onUpdate: (section: string, index: number, key: string, value: string) => void;
  onAdd: (section: string) => void;
  onRemove: (section: string, index: number) => void;
}) {
  return (
    <div className="border-t border-gray-200 pt-3 mt-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-gray-700">自定义字段（{sectionLabel}）</p>
          <p className="text-xs text-gray-400">
            想加什么就加什么（比如第二个电话、活动时间、促销文案）。
            注：自定义字段不会自动显示在网页上，需要展示时告诉我接哪个组件。
          </p>
        </div>
        <button
          onClick={() => onAdd(sectionId)}
          className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-2 py-1 rounded inline-flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          添加
        </button>
      </div>
      {fields.length === 0 && (
        <p className="text-xs text-gray-400 italic">还没有自定义字段，点上面「添加」开始</p>
      )}
      {fields.map((f, i) => (
        <div key={i} className="grid grid-cols-[140px_1fr_auto] gap-2 mb-2">
          <input
            type="text"
            placeholder="字段名"
            value={f.key}
            onChange={(e) => onUpdate(sectionId, i, e.target.value, f.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="字段值"
            value={f.value}
            onChange={(e) => onUpdate(sectionId, i, f.key, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none"
          />
          <button
            onClick={() => onRemove(sectionId, i)}
            className="text-red-500 hover:bg-red-50 p-2 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

function SectionCard({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {desc && <p className="text-sm text-gray-500 mt-1 mb-4">{desc}</p>}
      <div className="space-y-4 mt-4">{children}</div>
    </div>
  );
}

function ItemCard({
  index,
  title,
  onRemove,
  imagePreview,
  children,
}: {
  index: number;
  title: string;
  onRemove: () => void;
  imagePreview?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-7 h-7 rounded-full bg-amber-600 text-white text-sm flex items-center justify-center shrink-0">
          {index}
        </span>
        <h3 className="font-medium text-gray-900 flex-1 truncate">{title}</h3>
        {imagePreview && (
          <img src={imagePreview} alt="" className="w-12 h-12 object-cover rounded border border-gray-300" />
        )}
        <button onClick={onRemove} className="text-red-500 hover:bg-red-100 p-2 rounded" title="删除">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full border-2 border-dashed border-gray-300 hover:border-amber-400 hover:bg-amber-50 text-gray-500 hover:text-amber-700 py-3 rounded-lg text-sm transition-colors inline-flex items-center justify-center gap-2"
    >
      <Plus className="w-4 h-4" />
      {label}
    </button>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 pr-9 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-1"
            title="清空"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function TextareaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 pr-9 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none resize-y"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 text-gray-400 hover:text-red-500 p-1"
            title="清空"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function NumberField({ label, value, onChange, step }: { label: string; value: number; onChange: (v: number) => void; step?: string }) {
  const hasValue = value !== null && value !== undefined && !Number.isNaN(value) && value !== 0;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={Number.isNaN(value) ? 0 : value}
          step={step}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
          className="w-full px-3 py-2 pr-9 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none"
        />
        {hasValue && (
          <button
            type="button"
            onClick={() => onChange(0)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-1"
            title="清零"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onUpload,
  uploading,
  uploadError,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onUpload?: (file: File) => Promise<string>;
  uploading?: boolean;
  uploadError?: string;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && onUpload) {
      try {
        const filename = await onUpload(f);
        onChange(filename);
      } catch { /* 错误已在 uploadError 显示 */ }
      e.target.value = '';
    }
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-start gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="可填 https:// 开头的网址，或 images 文件夹里的文件名"
            className="w-full px-3 py-2 pr-9 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-1"
              title="清空"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
        {onUpload && (
          <>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="px-3 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white rounded text-sm whitespace-nowrap inline-flex items-center gap-1"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? '上传中' : '上传'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </>
        )}
        {value && (
          <img
            src={resolveImage(value)}
            alt=""
            className="w-16 h-16 object-cover rounded border border-gray-300 shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.opacity = '0.3';
            }}
          />
        )}
      </div>
      {uploadError && (
        <p className="text-xs text-red-600 mt-1">上传失败：{uploadError}</p>
      )}
      <p className="text-xs text-gray-400 mt-1">
        点「上传」可直接选本地图片，上传后自动填入文件名；或手动填网址 / images 文件夹文件名
      </p>
    </div>
  );
}

/* ============ 登录界面 ============ */

function LoginScreen({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [step, setStep] = useState<'password' | 'token'>('password');
  const [password, setPassword] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [error, setError] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const submitPassword = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'yes');
      setStep('token');
      setError('');
    } else {
      setError('密码不对，请再试一次');
    }
  };

  const submitToken = async () => {
    setVerifying(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${JSON_PATH}`,
        { headers: { Authorization: `Bearer ${tokenInput.trim()}` } }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      localStorage.setItem(TOKEN_KEY, tokenInput.trim());
      onSuccess(tokenInput.trim());
    } catch (e) {
      setError('Token 验证失败：' + (e as Error).message + '。请确认 Token 有 repo 权限且未过期。');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-700 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
            管
          </div>
          <h1 className="text-2xl font-bold text-gray-900">欧蜜儿网站后台</h1>
          <p className="text-sm text-gray-500 mt-1">只有授权用户可以登录修改网站内容</p>
        </div>

        {step === 'password' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">管理密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitPassword()}
                  placeholder="请输入管理密码"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              onClick={submitPassword}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded text-sm font-medium transition-colors"
            >
              下一步
            </button>
            <p className="text-xs text-gray-400 text-center">默认密码：omier2024（可让技术人员帮你改）</p>
          </div>
        )}

        {step === 'token' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-900 space-y-2">
              <p className="font-medium">首次使用，请创建一个 GitHub Token：</p>
              <ol className="list-decimal ml-5 space-y-1 text-xs">
                <li>
                  打开{' '}
                  <a href="https://github.com/settings/tokens/new?scopes=repo&description=bobby-admin" target="_blank" rel="noreferrer" className="text-amber-700 underline">
                    GitHub Token 创建页面
                  </a>
                </li>
                <li>勾选「repo」整个大项（包含所有子项）</li>
                <li>页面底部点绿色按钮「Generate token」</li>
                <li>复制页面上方显示的 token 字符串（以 ghp_ 开头）</li>
                <li>粘贴到下方输入框，点「验证并登录」</li>
              </ol>
              <p className="text-xs">Token 只会保存在本浏览器，不会发到任何服务器。下次在同一设备同一浏览器打开后台，无需再输入。</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Personal Access Token</label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxx"
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded text-sm font-mono text-gray-900 bg-white focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showToken ? '隐藏' : '显示'}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-600 whitespace-pre-wrap">{error}</p>}
            <button
              onClick={submitToken}
              disabled={verifying || !tokenInput.trim()}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white py-2.5 rounded text-sm font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {verifying ? '正在验证...' : '验证并登录'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
