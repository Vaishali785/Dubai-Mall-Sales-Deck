import React, { useState } from 'react';
import { RetailBrandsSection } from './components/RetailBrandsSection';
import { DiningSection } from './components/DiningSection';
import { GrainOverlay } from './components/SharedUI';

function App() {
  const [activeSection, setActiveSection] = useState('retail')

  return (
    <main className="relative h-screen overflow-hidden bg-void-950 text-offwhite-100">
      <GrainOverlay />
      
      <RetailBrandsSection
        isActive={activeSection === 'retail'}
        onNextSection={() => setActiveSection('dining')}
      />
      
      <DiningSection
        isActive={activeSection === 'dining'}
        onPrevSection={() => setActiveSection('retail')}
      />
      
    </main>
  )
}

export default App
