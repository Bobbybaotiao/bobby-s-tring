import { sectionCustomFields } from '../data/mockData';

/**
 * 自定义字段展示组件：从 mockData 的 sectionCustomFields 读取
 * 指定 section 的 key-value 列表，在页面分区底部以简洁列表形式渲染。
 * 如果该 section 没有自定义字段，什么都不渲染。
 *
 * 用法：<CustomFieldsDisplay section="siteConfig" />
 */
export default function CustomFieldsDisplay({ section }: { section: string }) {
  const fields = sectionCustomFields[section] || [];
  if (fields.length === 0) return null;

  return (
    <div className="py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {fields.map((f, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <span className="text-bobby-gold text-sm uppercase tracking-wider shrink-0">
                {f.key}
              </span>
              <span className="text-white/80 text-sm break-all">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
