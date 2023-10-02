export default () => {
  return (
      <svg width="80" height="80" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#06083c"/>
        <stop offset="100%" stop-color="#fff"/>
      </linearGradient>
      <linearGradient id="grad11" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#596B7E"/>
        <stop offset="100%" stop-color="#111E2F"/>
      </linearGradient>
      <mask id="mask1">
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#000000"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </linearGradient>
        <circle cx="100" cy="100" r="50" fill="url(#grad2)"/>
      </mask>
    </defs>
    <defs>
      <filter id="nnneon-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="17 8" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"/>
      </filter>
      <filter id="nnneon-filter2" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="10 17" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"/>
      </filter>
    </defs>
    <g stroke-width="16" fill = "white" stroke="hsl(0, 0%, 100%)">
      <circle r="50" cx="100" cy="100" filter="url(#nnneon-filter)"/>
      <circle r="50" cx="102" cy="100" filter="url(#nnneon-filter2)" opacity="0.25"/>
      <circle r="50" cx="98" cy="100" filter="url(#nnneon-filter2)" opacity="0.25"/>
      <circle r="50" cx="100" cy="100"/>
    </g>
    <path d="M100 50 L150 100 L100 150" stroke="#AAA" stroke-width="2">
      <animate attributeName="stroke-dasharray" from="0 300" to="300 0" dur="2s" repeatCount="indefinite" fill="freeze"/>
      <animate attributeName="stroke" from="#ddd" to="#111E2F" dur="2s" repeatCount="indefinite" fill="freeze"/>
    </path>
    <path d="M100 100 L50 150 L100 200" stroke="#111E2F" stroke-width="2">
      <animate attributeName="stroke-dasharray" from="0 300" to="300 0" dur="2s" repeatCount="indefinite" fill="freeze"/>
      <animate attributeName="stroke" from="#ddd" to="#111E2F" dur="2s" repeatCount="indefinite" fill="freeze"/>
    </path>
    <path d="M100 150 L150 200 L100 250" stroke="#000" stroke-width="2">
      <animate attributeName="stroke-dasharray" from="0 300" to="300 0" dur="2s" repeatCount="indefinite" fill="freeze"/>
      <animate attributeName="stroke" from="#ddd" to="#111E2F" dur="2s" repeatCount="indefinite" fill="freeze"/>
    </path>
    <path id="path1" d="M100 150 L100 100"/>
    <path id="path2" d="M100 100 L100 50"/>
  </svg>
  );
};
