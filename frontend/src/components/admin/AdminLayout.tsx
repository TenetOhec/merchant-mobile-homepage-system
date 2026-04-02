import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[#f4f1ec] px-4 py-6 text-textMain">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">首页配置后台</h1>
            <p className="mt-1 text-sm text-textSub">修改后保存即可影响移动端首页展示。</p>
          </div>
          <Link to="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
            返回首页预览
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
