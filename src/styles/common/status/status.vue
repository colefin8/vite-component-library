<template>
    <div>
        <h1 class="aco-h1">Status</h1>
        <a class="aco-text" href="https://www.figma.com/file/EOBq2FSaozeysU6jl7vWki/%F0%9F%A4%96-Simon?node-id=311%3A7918" target="_blank">
            Link to Simon
        </a>

        <h2 class="aco-h2">Text</h2>
        <div class="aco-text aco-status-text-positive">.aco-status-text-positive</div>
        <div class="aco-text aco-status-text-warning">.aco-status-text-warning</div>
        <div class="aco-text aco-status-text-danger">.aco-status-text-danger</div>
        <div class="aco-text aco-status-text-neutral">.aco-status-text-neutral</div>
        <br>
        <div class="aco-text aco-status-text-positive--interactive">.aco-status-text-positive--interactive</div>
        <div class="aco-text aco-status-text-warning--interactive">.aco-status-text-warning--interactive</div>
        <div class="aco-text aco-status-text-danger--interactive">.aco-status-text-danger--interactive</div>
        <div class="aco-text aco-status-text-neutral--interactive">.aco-status-text-neutral--interactive</div>
        <br>
        
        <h2 class="aco-h2">Background</h2>
        <h3 class="aco-h3">Light</h3>
        <div class="aco-text aco-status-background-light-positive color-sample">
            .aco-status-background-light-positive
        </div>
        <div class="aco-text aco-status-background-light-warning color-sample">
            .aco-status-background-light-warning
        </div>
        <div class="aco-text aco-status-background-light-danger color-sample">
            .aco-status-background-light-danger
        </div>
        <div class="aco-text aco-status-background-light-neutral color-sample">
            .aco-status-background-light-neutral
        </div>
        <br>

        <h3 class="aco-h3">Medium</h3>
        <div class="aco-text aco-status-background-medium-positive color-sample">
            .aco-status-background-medium-positive
        </div>
        <div class="aco-text aco-status-background-medium-warning color-sample">
            .aco-status-background-medium-warning
        </div>
        <div class="aco-text aco-status-background-medium-danger color-sample">
            .aco-status-background-medium-danger
        </div>
        <div class="aco-text aco-status-background-medium-neutral color-sample">
            .aco-status-background-medium-neutral
        </div>
        <br>

        <h3 class="aco-h3">Dark</h3>
        <div class="aco-text aco-text--light aco-status-background-dark-positive color-sample">
            .aco-status-background-dark-positive
        </div>
        <div class="aco-text aco-text--light aco-status-background-dark-warning color-sample">
            .aco-status-background-dark-warning
        </div>
        <div class="aco-text aco-text--light aco-status-background-dark-danger color-sample">
            .aco-status-background-dark-danger
        </div>
        <div class="aco-text aco-text--light aco-status-background-dark-neutral color-sample">
            .aco-status-background-dark-neutral
        </div>
        <br>
    </div>
</template>

<style lang="scss" scoped>
@import '../../aco.scss';

.color-sample {
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 8px;
    box-shadow: $aco-shadow-1;
}

.aco-text--light {
    color: $aco-ui-white;
}
</style>