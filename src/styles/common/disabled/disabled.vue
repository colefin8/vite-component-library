<template>
    <div>
        <h1 class="aco-h1">Disabled</h1>
        <a class="aco-text" href="https://www.figma.com/file/EOBq2FSaozeysU6jl7vWki/%F0%9F%A4%96-Simon?node-id=311%3A7918" target="_blank">
            Link to Simon
        </a>

        <h2 class="aco-h2">Button</h2>
        <label class="aco-text">:disabled</label><br>
        <input type="button" value="Button with disabled attribute" disabled />
        <br><br>
        <label class="aco-text">.aco-disabled</label><br>
        <input class="aco-disabled" type="button" value="Button with .aco-disabled" />
        <br><br>
        <label class="aco-text">.aco-readonly</label><br>
        <input class="aco-readonly" type="button" value="Button with .aco-readonly" />
        <br>

        <h2 class="aco-h2">Input</h2>
        <label class="aco-text">:disabled</label><br>
        <input type="text" value="Input with disabled attribute" disabled />
        <br><br>
        <label class="aco-text">.aco-disabled</label><br>
        <input class="aco-disabled" type="text" value="Input with .aco-disabled" />
        <br><br>
        <label class="aco-text">.aco-readonly</label><br>
        <input class="aco-readonly" type="text" value="Input with .aco-readonly" />
        <br>

    </div>
</template>

<style lang="scss" scoped>
@import '../../aco.scss';
</style>