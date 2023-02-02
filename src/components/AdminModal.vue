<template>
    <div class="flex justify-center items-center absolute h-full w-full z-50 bg-gray-900 bg-opacity-70">
        <div class="flex-col justify-center rounded-lg bg-white h-[600px] w-[600px] py-20 px-20 ">
            <p class="text-center">{{email}}</p>
            <p class="text-center">{{modalMessage}}</p>
            <button type="submit" @click="closeModal" class="item-center py-2 px-4 font-medium rounded-md text-white bg-indigo-800">
                      Close
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Admin Modal',
    props: ['modalMessage', 'email'],
    data: function(){
        return {
        
        }
    },

    methods: {
        closeModal(){
            // we must listen this to the component we are sending it to
            this.$emit('close-modal')
        }
    }
}
</script>