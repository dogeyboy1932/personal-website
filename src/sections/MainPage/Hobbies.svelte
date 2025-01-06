<script lang="ts">
    import { hobbyData } from '../../constants/hobbies';
</script>

<div class="container mx-auto px-4 py-8">
    {#each hobbyData.hobbies as hobbyType}
        <div class="category mb-16">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    {hobbyType.category}
                </h2>
                
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each hobbyType.items as hobby}
                    <div class="bg-white/80 dark:bg-gray-700/80 rounded-lg p-6 shadow-sm">
                        {#if hobbyType.category === 'Sports/Hobbies'}
                            <div class="text-center mb-4">
                                <span class="text-2xl">{"🔥"}</span>
                            </div>
                        {/if}

                        <div class="text-center space-y-2">
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {hobby.name}
                            </h3>
                            
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
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>