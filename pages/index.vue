<template>
    <section class="relative overflow-hidden w-screen h-screen flex justify-center items-center">
        <img src="https://i.pinimg.com/originals/70/8c/9a/708c9a31314c3f563593a14b6fbe48b3.jpg" alt=""
            class="absolute top-0 left-0 z-[-1] brightness-[.3] w-screen h-screen object-cover">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
            <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
                        <div>
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 ">Your
                                username</label>
                            <input type="text" v-model="usernameInput" name="text" id="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:outline-none block w-full p-2.5"
                                placeholder="username" required="" />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" v-model="password" name="password" id="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:outline-none block w-full p-2.5"
                                required="" />
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 ">Remember me</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline ">Forgot
                                password?</a>
                        </div>
                        <Button type="submit" class="w-full">Sign in</Button>

                        <p v-if="userNotFound" class="text-center font-bold text-red-500">User Not found</p>
                        <p class="text-sm font-light text-gray-500 ">
                            Don’t have an account yet? <a href="#"
                                class="font-medium text-primary-600 hover:underline">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import Button from '~/components/ui/button/Button.vue';
import { useRouter } from 'vue-router';

const usernameInput = ref('');
const password = ref('');
const userNotFound = ref(false);
const router = useRouter();

const handleSubmit = async () => {
    userNotFound.value = false;

    const { data, error } = await useAsyncData('userData', () => $fetch('/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }));

    if (error.value) {
        console.error('Error fetching data:', error.value);
        return;
    }

    const filteredData = data.value.items;

    if (filteredData) {
        const user = filteredData.find((el) => el.username === usernameInput.value);

        if (user) {
            router.push('/home');
            localStorage.setItem("user", "LoggedIn");
        } else {
            userNotFound.value = true;
            console.log('User not found');
        }
    }
};
</script>

<style scoped></style>
