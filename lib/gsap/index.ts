'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);
}

// Export GSAP and plugins
export { gsap, ScrollTrigger, SplitText, ScrollToPlugin };

// Export default GSAP instance
export default gsap;
