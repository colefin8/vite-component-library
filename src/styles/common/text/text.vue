<template>
    <div>
        <h1 class="aco-h1">Text</h1>
        <a class="aco-text" href="https://www.figma.com/file/EOBq2FSaozeysU6jl7vWki/%F0%9F%A4%96-Simon?node-id=311%3A7918" target="_blank">
            Link to Simon
        </a>

        <h2 class="aco-h2">Default</h2>
        <p class="aco-text">.aco-text</p>
        <br>
        <h2 class="aco-h2">Paragraph</h2>
        <p class="aco-p-xsmall">.aco-p-xsmall</p>
        <p class="aco-p-small">.aco-p-small</p>
        <p class="aco-p-medium">.aco-p-medium</p>
        <p class="aco-p-large">.aco-p-large</p>
        <p class="aco-p-xlarge">.aco-p-xlarge</p>
        <br>
        <h2 class="aco-h2">Heading</h2>
        <h4 class="aco-h4">.aco-h4</h4>
        <h3 class="aco-h3">.aco-h3</h3>
        <h2 class="aco-h2">.aco-h2</h2>
        <h1 class="aco-h1">.aco-h1</h1>
        <br>
        <h2 class="aco-h2">Other</h2>
        <p class="aco-table-header">.aco-table-header</p>
        <p class="aco-list-header">.aco-list-header</p>

        <h2 class="aco-h2">Secondary text color (UI 600)</h2>
        <p class="aco-text aco-text-600">.aco-text.aco-text-600</p>
        <h3 class="aco-h3">Comparison:</h3>
        <span class="aco-text">aco-ui-900,</span>
        <span class="aco-text aco-text-600">aco-ui-600</span>
    </div>
</template>

<style lang="scss" scoped>
@import '../../aco.scss';
</style>