export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 bg-ctp-base p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <div className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-lg">
          Hello @, World!
        </div>
        <div className="text-ctp-mauve-700">
          a@nother <span className="italic">one@</span>
        </div>
      </main>
    </div>
  );
}
