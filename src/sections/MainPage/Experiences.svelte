<script lang="ts">
    import { experiences } from '../../constants/experiences';
    import { fade } from 'svelte/transition';
</script>

<div class="one-grid">
    {#each experiences as experience, i}
        <div 
            class="content-card"
            in:fade={{delay: i * 200, duration: 500}}
        >
            <div class="p-6">
                <div class="section-header">
                    <span class="title">
                        {experience.company}
                    </span>
                    
                    <span class="time-badge">
                        {experience.duration}
                    </span>
                </div>

                <div class="label-header mt-2 mb-4">
                    {experience.role}
                </div>
                
                <p class="description">
                    {experience.description}
                </p>
            </div>
        </div>
    {/each}
</div>