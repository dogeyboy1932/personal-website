<script lang="ts">
    import { page } from '$app/stores';
    import ThemeToggle from '../components/Button/ThemeToggle.svelte';
</script>

<nav class="w-full h-12 bg-black/90 backdrop-blur-sm border-b border-emerald-500/50 px-4 top-0 z-50 sticky">
    <div class="h-full flex items-center justify-between space-x-8">
        {#each [
            { href: '/', label: 'HOME' },
            // { href: '/blog', label: 'BLOG' },
            // { href: '/portfolio', label: 'PORTFOLIO' },
            // { href: '/projects', label: 'PROJECTS' }
        ] as item}
            <a href={item.href} 
                class="text-emerald-500 hover:text-emerald-400 font-mono text-sm tracking-wider
                    transition-all duration-300 relative py-1
                    {$page.url.pathname === item.href ? 'after:w-full' : 'after:w-0'}
                    after:absolute after:bottom-0 after:left-0 after:h-[1px] 
                    after:bg-emerald-500 hover:after:w-full after:transition-all after:duration-300">
                {item.label}
            </a>
        {/each}
        <ThemeToggle />
    </div>
</nav>