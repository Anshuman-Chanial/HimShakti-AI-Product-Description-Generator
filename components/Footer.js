// Footer.js — Bottom of every page

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-6 mt-auto">
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div>
          <p className="text-orange-400 font-bold text-lg">🌿 HimShakti AI</p>
          <p className="text-sm text-gray-400">AI-Powered Product Description Generator</p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/generate" className="hover:text-white">Generate</a>
          <a href="/about" className="hover:text-white">About</a>
        </div>

        {/* Intern info */}
        <div className="text-sm text-right">
          <p className="text-gray-400">TBI-GEU SIP 2026 · TBI-26100231</p>
          <a
            href="https://github.com/Anshuman-Chanial/HimShakti-AI-Product-Description-Generator"
            className="text-orange-400 hover:text-orange-300"
            target="_blank"
          >
            GitHub Repo ↗
          </a>
        </div>

      </div>

      {/* Bottom line */}
      <div className="text-center text-xs mt-8 text-gray-500">
        © 2026 HimShakti AI · Built by Anshuman Chanial · TBI-GEU Summer Internship Program
      </div>

    </footer>
  );
}