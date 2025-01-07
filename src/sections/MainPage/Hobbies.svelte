<script lang="ts">
    import { hobbyData } from '../../constants/hobbies';
</script>

<div class="space-y-12 text-regular">
    {#each hobbyData.hobbies as hobbyType}
        <div class="space-y-4">
            <div class="text-center text-3xl font-bold ">
                {hobbyType.category}
            </div>
        
            <div class="page-grid">
                {#each hobbyType.items as hobby}
                    <div class="sm-content-card">
                        {#if hobbyType.category === 'Sports/Hobbies'}
                            <div class="text-center mb-4 text-2xl"> {"🔥"} </div>
                        {/if}
                        
                        <h3 class="text-center text-lg font-semibold"> {hobby.name} </h3>
                    </div>
                {/each}
            </div>
        
        </div>
        
    {/each}
</div>




<!-- {#if hobby.description}
    <p class="text-gray-600 dark:text-gray-400 text-sm">
        {hobby.description}
    </p>
{/if}

{#if hobby.level}
    <div class="pt-3">
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
                class="bg-blue-500 dark:bg-blue-400 h-1.5 rounded-full"
                style="width: {hobby.level}%"
            ></div>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">Proficiency</span>
    </div>
{/if} -->