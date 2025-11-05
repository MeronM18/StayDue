'use client'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-lg mb-8">
          Used and loved by people at brilliant companies.
        </p>
        
        {/* Company Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="text-white text-xl font-semibold opacity-80">miro</div>
          <div className="text-white text-xl font-bold opacity-80">BB</div>
          <div className="text-white text-sm font-medium opacity-80">databricks</div>
          <div className="text-white text-lg font-semibold opacity-80">Linear</div>
          <div className="text-white text-lg font-semibold opacity-80">CIRCUS</div>
          <div className="text-white text-sm font-medium opacity-80">MER</div>
        </div>
      </div>
    </footer>
  )
}
