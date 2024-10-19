import { HeaderLayout } from '@/components/header-layout';

export default function Home() {
  return (
    <HeaderLayout>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className='text-5xl font-medium'>Learn how Multi:Links can burst your productivity</h1>
      </main>
    </div>
    </HeaderLayout>
  );
}
