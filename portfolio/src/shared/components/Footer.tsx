export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10">
      <div className="mx-auto w-full max-w-5xl px-6 py-6 text-sm text-zinc-600">
        © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
