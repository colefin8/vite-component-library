<template>
    <div>
        <h1 class="aco-h1">Layouts</h1>
        <a class="aco-text" href="https://www.figma.com/file/EOBq2FSaozeysU6jl7vWki/%F0%9F%A4%96-Simon?node-id=311%3A7918" target="_blank">
            Link to Simon
        </a>

        <h2 class="aco-h2">Shadows</h2>
        <div class="section aco-text aco-shadow-avatar">
            <p><b>$aco-shadow-avatar</b> (inset 0px 0px 2px rgba(0, 0, 0, 0.15))</p>
            <p>For all Avatars</p>
        </div>
        <div class="section aco-text aco-shadow-1">
            <p><b>$aco-shadow-1</b> (0px 2px 4px rgba(105, 112, 117, 0.15))</p>
            <p>For widgets/tiles</p>
        </div>
        <div class="section aco-text aco-shadow-2">
            <p><b>$aco-shadow-2</b> (0px 8px 16px rgba(17, 17, 17, 0.1))</p>
            <p>For nav bars/overlays</p>
        </div>
        <div class="section aco-text aco-shadow-3">
            <p><b>$aco-shadow-3</b> (0px 24px 128px rgba(17, 17, 17, 0.25))</p>
            <p>For modals</p>
        </div>
        <br>

        <h2 class="aco-h2">Borders</h2>
        <div class="section aco-text aco-border">
            <p><b>$aco-border</b> (1px solid #1F2937)</p>
            <p>Default for most things</p>
        </div>
        <div class="section aco-text aco-border-icon">
            <p><b>$aco-border-icon</b> (1.5px solid #1F2937)</p>
            <p>For icons</p>
        </div>
        <div class="section aco-text aco-border-active">
            <p><b>$aco-border</b> (4px solid #1F2937)</p>
            <p>Border when things are selected</p>
        </div>
        <br>
        
        <h2 class="aco-h2">Border Radii</h2>
        <div class="section-br aco-text aco-border-radius-large">
            <p><b>$aco-border-radius-large</b> (12px)</p>
            <p>For modals/tiles and large items</p>
        </div>
        <div class="section-br aco-text aco-border-radius-normal">
            <p><b>$aco-border-radius-normal</b> (8px)</p>
            <p>Default size</p>
        </div>
        <div class="section-br aco-text aco-border-radius-small">
            <p><b>$aco-border-radius-small</b> (4px)</p>
            <p>For small items under 40px or things within 8px boxes</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../aco.scss';

.aco-shadow-avatar {
    box-shadow: $aco-shadow-avatar;
}

.aco-shadow-1 {
    box-shadow: $aco-shadow-1;
}

.aco-shadow-2 {
    box-shadow: $aco-shadow-2;
}

.aco-shadow-3 {
    box-shadow: $aco-shadow-3;
}

.section-br {
    background-color: $aco-ui-300;
    margin: 16px 0;
    padding: 8px;
    max-width: 500px;
}

.aco-border-radius-large {
    border-radius: $aco-border-radius-large;
}

.aco-border-radius-normal {
    border-radius: $aco-border-radius-normal;
}

.aco-border-radius-small {
    border-radius: $aco-border-radius-small;
}

.section {
    padding: 8px;
    margin: 24px 0;
    max-width: 500px;
    border-radius: $aco-border-radius-normal;
}

.aco-border {
    border: $aco-border;
}

.aco-border-icon {
    border: $aco-border-icon;
}

.aco-border-active {
    border: $aco-border-active;
}

</style>