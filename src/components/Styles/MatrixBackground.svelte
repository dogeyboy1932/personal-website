<script lang="ts">
    import { onMount } from 'svelte';

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    
    const matrixCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    let columns: number[];
    let fontSize = 14;
    let drops: number[] = [];

    onMount(() => {
        initMatrix();
        window.addEventListener('resize', initMatrix);
        return () => window.removeEventListener('resize', initMatrix);
    });

    function initMatrix() {
        if (!canvas) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d')!;
        
        columns = Array.from({ length: canvas.width / fontSize }, () => 0);
        drops = Array(columns.length).fill(1);
        
        ctx.font = fontSize + 'px monospace';
        
        setInterval(draw, 50);
    }

    function draw() {
        if (!ctx) return;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
</script>

<canvas
    bind:this={canvas}
    class="fixed top-0 left-0 w-full h-full pointer-events-none opacity-15 dark:opacity-25 z-[-1]"
></canvas>

<style>
    canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>