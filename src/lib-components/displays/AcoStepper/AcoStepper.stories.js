import AcoStepper from './AcoStepper.vue';
import { _optionsTheme } from '../../../propTypes';

export default {
    title: 'displays/AcoStepper',
    component: AcoStepper,
    argTypes: {
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    },
};

const StepperTemplate = (args, { argTypes }) => ({
    components: { AcoStepper },
    props: Object.keys(argTypes),
    template: '<div><aco-stepper v-bind="$props" v-model="currStep"></aco-stepper>' +
                '<p>Current Step: {{this.currStep}}</p>' +
                '<p>Change current step by clicking on the circle/icon above or you can use the buttons below:</p>' +
                '<button @click="currStep--">-</button><button @click="currStep++">+</button></div>',
    data() {
        return {
            currStep: 0,
        }
    },
});

export const Stepper = StepperTemplate.bind({});
Stepper.args = {
    numSteps: 6,
    isInteractive: true,
};

export const StepperWithIcons = StepperTemplate.bind({});
StepperWithIcons.args = {
    numSteps: 3,
    isInteractive: true,
    icons: ['ph-bell', 'ph-shopping-cart', 'ph-credit-card'],
}

export const StepperWithLabels = StepperTemplate.bind({});
StepperWithLabels.args = {
    numSteps: 3,
    isInteractive: true,
    labels: ['Step 12345', 'Step 2', ' Step'],
}

export const StepperWithIconsAndLabels = StepperTemplate.bind({});
StepperWithIconsAndLabels.args = {
    numSteps: 3,
    isInteractive: true,
    labels: ['Step 1', 'a b c d e f g h i j k l m', 'Checkout'],
    icons: ['ph-bell', 'ph-shopping-cart', 'ph-credit-card'],
}

const StepperStartComplete = (args, { argTypes }) => ({
    components: { AcoStepper },
    props: Object.keys(argTypes),
    template: '<div><aco-stepper v-bind="$props" v-model="currStep"></aco-stepper>' +
                '<p>Current Step: {{this.currStep}}</p>' +
                '<p>Change current step by clicking on the circle/icon above or you can use the buttons below:</p>' +
                '<button @click="currStep--">-</button><button @click="currStep++">+</button></div>',
    data() {
        return {
            currStep: 4,
        }
    },
});

export const StepperComplete = StepperStartComplete.bind({});
StepperComplete.args = {
    numSteps: 4,
    isInteractive: true,
}

const StepperTemplateNoNavigate = (args, { argTypes }) => ({
    components: { AcoStepper },
    props: Object.keys(argTypes),
    template: '<div><aco-stepper v-bind="$props" v-model="currStep"></aco-stepper>' +
                '<p>Current Step: {{this.currStep}}</p>' +
                '<p>Change current step by using the buttons below:</p>' +
                '<button @click="currStep--">-</button><button @click="currStep++">+</button></div>',
    data() {
        return {
            currStep: 0,
        }
    },
});

export const StepperNoNavigate = StepperTemplateNoNavigate.bind({});
StepperNoNavigate.args = {
    numSteps: 4,
}

export const StepperWithTopLabels = StepperTemplate.bind({});
StepperWithTopLabels.args = {
    numSteps: 5,
    isInteractive: false,
    allowLongerLabels: true,
    labels: ['Reminder Notification', 'Start Production', 'Ship Date', 'Shipment in hand', 'Start of Period'],
    topLabels: ['35 days', '30 days', '10 days', '5 days', '0 days']
}
