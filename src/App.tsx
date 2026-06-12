import { HeroSection } from './components/sections/HeroSection'
import { ServicesSplitSection } from './components/sections/ServicesSplitSection'
import { BeforeAfterSection } from './components/sections/BeforeAfterSection'
import { CtaSection } from './components/sections/CtaSection'
import { FinancingTeaserSection } from './components/sections/FinancingTeaserSection'
import { TeamTeaserSection } from './components/sections/TeamTeaserSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { VisitProcessSection } from './components/sections/VisitProcessSection'
import { WhyImpladentaSection } from './components/sections/WhyImpladentaSection'
import { TrustBarSection } from './components/sections/TrustBarSection'
import { NavigationBarSection } from './components/sections/NavigationBarSection'

function App() {
  return (
    <div className="min-h-screen">
      <NavigationBarSection />
      <main>
        <HeroSection />
        <TrustBarSection />
        <ServicesSplitSection />
        <WhyImpladentaSection />
        <VisitProcessSection />
        <TeamTeaserSection />
        <TestimonialsSection />
        <BeforeAfterSection />
        <FinancingTeaserSection />
        <CtaSection />
      </main>
    </div>
  )
}

export default App
