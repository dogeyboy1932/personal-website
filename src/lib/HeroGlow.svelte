<script lang="ts">
  // export let size = 300;
</script>

<div class="absolute inset-0 pointer-events-none flex items-center justify-center">
  <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="none" class="opacity-30">
    <defs>
      <radialGradient id="g1">
        <stop offset="0%" stop-color="#00ff9f" stop-opacity="0.9" />
        <stop offset="50%" stop-color="#00b8ff" stop-opacity="0.45" />
        <stop offset="100%" stop-color="#ff00ff" stop-opacity="0" />
      </radialGradient>
      <filter id="f1" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="50" />
      </filter>
    </defs>
    <g filter="url(#f1)">
      <circle cx="20%" cy="30%" r="200" fill="url(#g1)">
        <animate attributeName="cx" dur="8s" values="10%;30%;20%;10%" repeatCount="indefinite" />
        <animate attributeName="cy" dur="6s" values="20%;40%;30%;20%" repeatCount="indefinite" />
      </circle>
      <circle cx="80%" cy="70%" r="160" fill="#0016ff33">
        <animate attributeName="cx" dur="10s" values="70%;90%;80%;70%" repeatCount="indefinite" />
        <animate attributeName="cy" dur="7s" values="60%;80%;70%;60%" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
</div>
