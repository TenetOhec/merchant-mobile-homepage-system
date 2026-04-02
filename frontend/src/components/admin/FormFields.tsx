import type { ChangeEvent } from 'react';
import { clsx } from '../../lib/helpers';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: string;
}

export function TextInput({ label, value, onChange, placeholder, className, type = 'text' }: InputProps) {
  return (
    <label className={clsx('flex flex-col gap-2', className)}>
      <span className="text-sm font-medium text-textSub">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-softLine bg-[#fafafa] px-4 py-3 outline-none ring-0 transition focus:border-[#ff7b66]"
      />
    </label>
  );
}

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ImageUploadInput({ label, value, onChange, className }: ImageUploadProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <span className="text-sm font-medium text-textSub">{label}</span>
      <div className="rounded-2xl border border-softLine bg-[#fafafa] p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-20 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
            {value ? <img src={value} alt={label} className="h-full w-full object-cover" /> : <span className="text-xs text-textSub">未上传</span>}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-full bg-appRed px-4 py-2 text-sm font-semibold text-white">
              选择图片
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
            <button
              type="button"
              onClick={() => onChange('')}
              className="inline-flex w-fit items-center justify-center rounded-full bg-white px-4 py-2 text-sm text-textSub shadow-sm"
            >
              清空图片
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center justify-between rounded-2xl border border-softLine bg-[#fafafa] px-4 py-3">
      <span className="text-sm font-medium text-textMain">{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}
