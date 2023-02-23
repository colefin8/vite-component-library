<script>
export default {
    props: {
        vNodes: {
            required: true
        }
    },
    render(h) {
        return h('div', {class: 'v-node-holder'}, this.vNodes);
    }
}
</script>

<style scoped>
.v-node-holder {
    display: contents;
}
</style>
