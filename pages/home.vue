<template>
    <section>
        <div class="absolute right-5 top-5 text-white">
            <button @click="logout" class="bg-white text-black px-4 py-2 font-bold text-xs md:text-md xl:text-lg">Log
                Out</button>
        </div>
        <div class="w-screen h-screen flex justify-center items-center flex-col gap-6 bg-slate-900">
            <h1 class="text-white">Rastgele Kedi Resmi</h1>
            <transition name="fade" mode="out-in">
                <img v-if="catImage" :key="catImage" :src="catImage" alt="Kedi Resmi"
                    class="w-72 h-72 object-cover rounded-full border-[4px]" />
            </transition>
            <Button @click="fetchCatImage" class="border border-white hover:bg-white hover:text-slate-900">
                Yeni Kedi Resmi Getir
            </Button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from '~/components/ui/button/Button.vue';

const catImage = ref<string | null>(null);

if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');

    if (user !== "LoggedIn") {
        window.location.href = '/'
    }
}

const fetchCatImage = async () => {
    try {
        const response = await fetch('/api/images/search');
        const data = await response.json();
        catImage.value = data[0]?.url;
    } catch (error) {
        console.error('Kedi resmi alınırken bir hata oluştu:', error);
    }
};

const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
};

onMounted(fetchCatImage);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
