import { createRoot } from 'react-dom/client';
import { Badge, Button, CodeBlock, Gauge, Panel, Theme } from '@k2x/evoker';
import { BrandLink } from './Brand.js';
import '../../react/src/styles.css';
import './launch.css';

const source = `import { Button } from '@kartikeyak/evoker';

<Button>Make your next move</Button>`;

function LaunchPoster() {
  return <Theme appearance="dark" reducedMotion className="launch-poster">
    <div className="launch-plane" aria-hidden="true" />
    <header className="launch-header">
      <BrandLink />
      <div className="launch-release"><Badge>Public beta</Badge><span>REACT / MIT LICENSE</span></div>
    </header>
    <main className="launch-main">
      <div className="launch-copy">
        <p className="launch-kicker">EVOKER / COMPONENT LIBRARY</p>
        <h1><span>REACT UI.</span><span>SHARP BY DESIGN.</span></h1>
        <p className="launch-description">An open-source component library for React,<br />built for angular, electric-blue interfaces.</p>
        <div className="launch-next"><span>COMING SOON</span><p>A dedicated motion library.<br />More components.</p></div>
      </div>
      <div className="launch-showcase">
        <span className="launch-specimen-label">BUILT WITH EVOKER COMPONENTS</span>
        <Panel title="Make your next move." eyebrow="Component preview" tone="light" cut={38} actions={<Badge>React</Badge>}>
          <p>Buttons, panels and controls for your next React project.</p>
          <Gauge label="Focus" value={84} max={100} />
          <div className="launch-buttons"><Button>Continue</Button><Button variant="outline">View docs</Button></div>
        </Panel>
        <CodeBlock code={source} filename="your-next-project.tsx" language="tsx" highlightedLines={[3]} copy={false} />
      </div>
    </main>
    <footer className="launch-footer">
      <div><span>TRY THE BETA</span><code>npm install @kartikeyak/evoker@beta</code></div>
      <div><span>PLAYGROUND & DOCUMENTATION</span><p>k2x-lab.github.io/evoker</p></div>
    </footer>
  </Theme>;
}

createRoot(document.getElementById('root')!).render(<LaunchPoster />);
