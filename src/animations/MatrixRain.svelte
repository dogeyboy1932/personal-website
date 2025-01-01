<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    export let primaryColor: string = '#0066ff';
    export let secondaryColor: string = '#00ccff';
    
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let animationFrame: number;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    let columns: number[];
    let drops: number[];
    
    function initMatrix() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        canvas.width = width;
        canvas.height = height;
        
        columns = Array(Math.floor(width / fontSize))
            .fill(0)
            .map(() => Math.floor(Math.random() * -100));
        
        drops = Array(columns.length).fill(0);
        
        ctx.font = `${fontSize}px monospace`;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = primaryColor;
        ctx.textAlign = 'center';
        
        for (let i = 0; i < columns.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Add glow effect
            ctx.shadowBlur = 5;
            ctx.shadowColor = primaryColor;
            
            // Gradient color based on position
            const gradient = ctx.createLinearGradient(x, y - fontSize, x, y);
            gradient.addColorStop(0, primaryColor);
            gradient.addColorStop(1, secondaryColor);
            ctx.fillStyle = gradient;
            
            ctx.fillText(char, x, y);
            
            // Reset shadow
            ctx.shadowBlur = 0;
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        animationFrame = requestAnimationFrame(draw);
    }
    
    onMount(() => {
        ctx = canvas.getContext('2d')!;
        initMatrix();
        draw();
        
        window.addEventListener('resize', initMatrix);
    });
    
    onDestroy(() => {
        window.removeEventListener('resize', initMatrix);
        cancelAnimationFrame(animationFrame);
    });
</script>

<canvas
    bind:this={canvas}
    class="fixed top-0 left-0 w-full h-full -z-10"
/>
