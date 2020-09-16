<template>
    <v-image ref="poker" :config="imageConfig" @click="onClickPoker" />
</template>

<script>
    export default {
        name: "PokerCard",
        props: ['poker', 'x', 'y', 'index', 'selectedPoker', 'canOperate', 'scaleX', 'scaleY'],
        data() {
            return {
                imageConfig: {
                    x: this.x,
                    y: this.y,
                    image: null,
                    scaleX: this.scaleX===undefined?1:this.scaleX,
                    scaleY: this.scaleY===undefined?1:this.scaleY
                },
                isSelected: false
            };
        },
        created() {
            const image = new window.Image();
            image.src = this.poker.image;
            image.onload = () => {
                // set image only when it is loaded
                this.imageConfig.image = image;
            };
        },
        watch: {
            x: function(newX) {
                this.imageConfig.x = newX;
            },
            y: function(newY) {
                this.imageConfig.y = newY;
            }
        },
        methods: {
            onClickPoker() {
                if(this.canOperate === undefined || !this.canOperate)
                    return;
                if(this.isSelected) {
                    delete this.selectedPoker.poker;
                    this.imageConfig.y += 20;
                    this.isSelected = false;
                } else {
                    this.selectedPoker.poker = this.poker;
                    this.imageConfig.y -= 20;
                    this.isSelected = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>