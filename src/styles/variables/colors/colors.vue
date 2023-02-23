<template>
    <div class="storybook">
        <h1 class="aco-h1">Colors</h1>
        <a class="aco-text" href="https://www.figma.com/file/EOBq2FSaozeysU6jl7vWki/%F0%9F%A4%96-Simon?node-id=311%3A7918" target="_blank">
            Link to Simon
        </a>

        <h2 class="aco-h2">Brand</h2>
        <div class="aco-text aco-primary color-sample">
            $aco-primary
        </div>
        <div class="aco-text aco-secondary color-sample">
            $aco-secondary
        </div>
        
        <h2 class="aco-h2">UI</h2>
        <div class="aco-text aco-ui-900 color-sample">
            $aco-ui-900
        </div>
        <div class="aco-text aco-ui-600 color-sample">
            $aco-ui-600
        </div>
        <div class="aco-text aco-ui-400 color-sample">
            $aco-ui-400
        </div>
        <div class="aco-text aco-ui-300 color-sample">
            $aco-ui-300
        </div>
        <div class="aco-text aco-ui-200 color-sample">
            $aco-ui-200
        </div>
        <div class="aco-text aco-ui-100 color-sample">
            $aco-ui-100
        </div>
        <div class="aco-text aco-ui-white color-sample">
            $aco-ui-white
        </div>

        <h2 class="aco-h2">Positive</h2>
        <div class="aco-text aco-positive-light color-sample">
            $aco-positive-light
        </div>
        <div class="aco-text aco-positive-medium color-sample">
            $aco-positive-medium
        </div>
        <div class="aco-text aco-positive-dark color-sample">
            $aco-positive-dark
        </div>

        <h2 class="aco-h2">Warning</h2>
        <div class="aco-text aco-warning-light color-sample">
            $aco-warning-light
        </div>
        <div class="aco-text aco-warning-medium color-sample">
            $aco-warning-medium
        </div>
        <div class="aco-text aco-warning-dark color-sample">
            $aco-warning-dark
        </div>

        <h2 class="aco-h2">Danger</h2>
        <div class="aco-text aco-danger-light color-sample">
            $aco-danger-light
        </div>
        <div class="aco-text aco-danger-medium color-sample">
            $aco-danger-medium
        </div>
        <div class="aco-text aco-danger-dark color-sample">
            $aco-danger-dark
        </div>
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

.aco-primary {
    background-color: $aco-primary;
}
.aco-secondary {
    background-color: $aco-secondary
}

.aco-ui-900 {
    color: $aco-ui-white;
    background-color: $aco-ui-900;
}
.aco-ui-600 {
    color: $aco-ui-white;
    background-color: $aco-ui-600;
}
.aco-ui-400 {
    color: $aco-ui-white;
    background-color: $aco-ui-400;
}
.aco-ui-300 {
    background-color: $aco-ui-300;
}
.aco-ui-200 {
    background-color: $aco-ui-200;
}
.aco-ui-100 {
    background-color: $aco-ui-100;
}
.aco-ui-white {
    background-color: $aco-ui-white;
}

.aco-positive-light {
    background-color: $aco-positive-light;
}
.aco-positive-medium {
    background-color: $aco-positive-medium;
}
.aco-positive-dark {
    color: $aco-ui-white;
    background-color: $aco-positive-dark;
}
.aco-warning-light {
    background-color: $aco-warning-light;
}
.aco-warning-medium {
    background-color: $aco-warning-medium;
}
.aco-warning-dark {
    color: $aco-ui-white;
    background-color: $aco-warning-dark;
}
.aco-danger-light {
    background-color: $aco-danger-light;
}
.aco-danger-medium {
    background-color: $aco-danger-medium;
}
.aco-danger-dark {
    color: $aco-ui-white;
    background-color: $aco-danger-dark;
}
</style>