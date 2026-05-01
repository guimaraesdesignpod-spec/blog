export default function Footer() {
  return (
    <footer className="border-t border-[#232326] mt-auto">
      <div className="mx-auto max-w-[1100px] p-8 flex items-center justify-between flex-wrap gap-4">
        <span className="font-serif text-base tracking-tight text-[#52525B]">Blog</span>
        <span className="text-xs text-[#52525B]">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
