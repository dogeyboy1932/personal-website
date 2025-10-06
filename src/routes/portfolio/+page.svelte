<script lang="ts">
	// import { Container } from '../../components/Container';
	import { Badge } from '../../components/Badge';
</script>

<!-- <Container class="py-8"> -->
	<div class="space-y-8">
		<div class="relative bg-black border-2 border-yellow-400 rounded-lg p-6 shadow-xl overflow-hidden">
			<!-- Cyberpunk overlay effects -->
			<div class="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-yellow-500/5 to-yellow-400/10 animate-pulse"></div>
			
			<h1 class="text-3xl font-bold text-yellow-400 mb-6 relative z-10">>>> PORTFOLIO_MATRIX.SYS</h1>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
				<!-- Portfolio Item 1 -->
				<div class="bg-black border border-yellow-400/50 rounded-lg p-4 hover:border-yellow-400 transition-colors group">
					<div class="relative overflow-hidden rounded mb-4">
						<img src="/api/placeholder/400/200" alt="Project 1" class="w-full h-48 object-cover rounded transition-transform group-hover:scale-105" />
						<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
					</div>
					<h2 class="text-xl font-bold text-yellow-400 mb-2">Neural Network Visualizer</h2>
					<p class="text-yellow-400/80 mb-4">An interactive tool for visualizing neural network architectures and their learning process in real-time.</p>
					<div class="flex flex-wrap gap-2 mb-4">
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">Python</Badge>
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">TensorFlow</Badge>
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">React</Badge>
					</div>
					<a href="#" class="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center">
						View Project 
						<span class="ml-1 transition-transform group-hover:translate-x-1">→</span>
					</a>
				</div>

				<!-- Portfolio Item 2 -->
				<div class="bg-black border border-yellow-400/50 rounded-lg p-4 hover:border-yellow-400 transition-colors group">
					<div class="relative overflow-hidden rounded mb-4">
						<img src="/api/placeholder/400/200" alt="Project 2" class="w-full h-48 object-cover rounded transition-transform group-hover:scale-105" />
						<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
					</div>
					<h2 class="text-xl font-bold text-yellow-400 mb-2">Quantum Computing Simulator</h2>
					<p class="text-yellow-400/80 mb-4">A web-based quantum circuit simulator supporting basic quantum gates and quantum algorithm visualization.</p>
					<div class="flex flex-wrap gap-2 mb-4">
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">TypeScript</Badge>
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">WebGL</Badge>
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">Three.js</Badge>
					</div>
					<a href="#" class="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center">
						View Project 
						<span class="ml-1 transition-transform group-hover:translate-x-1">→</span>
					</a>
				</div>

				<!-- Portfolio Item 3 -->
				<div class="bg-black border border-yellow-400/50 rounded-lg p-4 hover:border-yellow-400 transition-colors group">
					<div class="relative overflow-hidden rounded mb-4">
						<img src="/api/placeholder/400/200" alt="Project 3" class="w-full h-48 object-cover rounded transition-transform group-hover:scale-105" />
						<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
					</div>
					<h2 class="text-xl font-bold text-yellow-400 mb-2">Cybersecurity Dashboard</h2>
					<p class="text-yellow-400/80 mb-4">Real-time network security monitoring dashboard with threat detection and visualization.</p>
					<div class="flex flex-wrap gap-2 mb-4">
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">Node.js</Badge>
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">D3.js</Badge>
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">Socket.IO</Badge>
					</div>
					<a href="#" class="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center">
						View Project 
						<span class="ml-1 transition-transform group-hover:translate-x-1">→</span>
					</a>
				</div>

				<!-- Portfolio Item 4 -->
				<div class="bg-black border border-yellow-400/50 rounded-lg p-4 hover:border-yellow-400 transition-colors group">
					<div class="relative overflow-hidden rounded mb-4">
						<img src="/api/placeholder/400/200" alt="Project 4" class="w-full h-48 object-cover rounded transition-transform group-hover:scale-105" />
						<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
					</div>
					<h2 class="text-xl font-bold text-yellow-400 mb-2">AR Code Visualizer</h2>
					<p class="text-yellow-400/80 mb-4">Augmented reality application for visualizing code structures and software architecture in 3D space.</p>
					<div class="flex flex-wrap gap-2 mb-4">
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">Unity</Badge>
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">C#</Badge>
						<Badge variant="outline" class="border-yellow-400 text-yellow-400">ARKit</Badge>
					</div>
					<a href="#" class="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center">
						View Project 
						<span class="ml-1 transition-transform group-hover:translate-x-1">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>
<!-- </Container> -->