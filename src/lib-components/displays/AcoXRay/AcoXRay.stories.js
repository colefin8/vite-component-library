import AcoAvatar from '../AcoAvatar/AcoAvatar.vue';
import AcoBreadcrumb from '../navigation/AcoBreadcrumb/AcoBreadcrumb.vue';
import AcoButton from '../../inputs/AcoButton/AcoButton.vue';
import AcoButtonSelector from '../../inputs/AcoButtonSelector/AcoButtonSelector.vue';
import AcoCard from '../AcoCard/AcoCard.vue';
import AcoCheckbox from '../../inputs/AcoCheckbox/AcoCheckbox.vue';
import AcoChip from '../AcoChip/AcoChip.vue';
import AcoChipGroup from '../AcoChipGroup/AcoChipGroup.vue';
import AcoColorPicker from '../../inputs/AcoColorPicker/AcoColorPicker.vue';
import AcoFancyTree from '../AcoFancyTree/AcoFancyTree.vue';
import AcoIcon from '../icons/AcoIcon/AcoIcon.vue';
import AcoIconMenu from '../AcoIconMenu/AcoIconMenu.vue';
import AcoInlineAlert from '../notifications/AcoInlineAlert/AcoInlineAlert.vue';
import AcoInput from '../../inputs/AcoInput/AcoInput.vue';
import AcoLabel from '../AcoLabel/AcoLabel.vue';
import AcoLeftRightPicker from '../../inputs/AcoLeftRightPicker/AcoLeftRightPicker.vue';
import AcoMediaInput from '../../inputs/media/AcoMediaInput/AcoMediaInput.vue';
import AcoOnOffSwitch from '../../inputs/AcoOnOffSwitch/AcoOnOffSwitch.vue';
import AcoRadioBar from '../../inputs/AcoRadioBar/AcoRadioBar.vue';
import AcoRadioButton from '../../inputs/AcoRadioButton/AcoRadioButton.vue';
import AcoRichText from '../../inputs/AcoRichText/AcoRichText.vue';
import AcoStatusChip from '../AcoStatusChip/AcoStatusChip.vue';
import AcoStepper from '../AcoStepper/AcoStepper.vue';
import AcoTabMenu from '../AcoTabMenu/AcoTabMenu.vue';
import AcoTable from '../tables/AcoTable/AcoTable.vue';
import AcoTextarea from '../../inputs/AcoTextarea/AcoTextarea.vue';
import AcoXRay from './AcoXRay.vue';

import { _optionsStatus } from '../../../propTypes';

export default {
    title: 'displays/AcoXRay',
    component: AcoXRay,
};


const ComponentsExample = (args, { argTypes }) => ({
    components: { 
        AcoAvatar,
        AcoBreadcrumb,
        AcoButton,
        AcoButtonSelector,
        AcoCard,
        AcoCheckbox,
        AcoChip,
        AcoChipGroup,
        AcoColorPicker,
        AcoFancyTree,
        AcoIcon,
        AcoIconMenu,
        AcoMediaInput,
        AcoInlineAlert,
        AcoInput,
        AcoLabel,
        AcoLeftRightPicker,
        AcoOnOffSwitch,
        AcoRadioBar,
        AcoRadioButton,
        AcoRichText,
        AcoStatusChip,
        AcoStepper,
        AcoTabMenu,
        AcoTable,
        AcoTextarea,
        AcoXRay,
    },
    props: Object.keys(argTypes),
    template: `
    <div>
        <p class="aco-text">
            The Design System components are designed to automatically show as skeleton loaders when included in AcoXRay.  Setting isLoading to false will disable the skeleton loader.
        </p>
        <aco-x-ray v-bind="$props">

            <div style="padding: 8px; display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">

                <aco-avatar url="https://ca.slack-edge.com/T07KNT22J-U02LY5EK33K-f3bbdc611799-512" initials="AR" />

                <aco-breadcrumb
                    :items='[{"label":"All Active Budgets","value":1},{"label":"The United States of America Region","value":2},{"label":"Provo South Office","value":3},{"label":"Product Budget","value":4},{"label":"Frontend Team","value":5}]'
                />

                <div style="width: 100%; display: flex; justify-content: space-around;">
                    <aco-button buttonStyle="tertiary">Button</aco-button>
                    <aco-button buttonStyle="secondary">Button</aco-button>
                    <aco-button buttonStyle="primary">Button</aco-button>
                </div>

                <aco-button-selector name="myButtonSelector" :options="[{label: 'Teamwork', value: 'team'}, {label: 'No Ego', value: 'noEgo'}, {label: 'A-team Ready', value: 'aTeam'}]" :selected="[]" />

                <aco-card url="https://reeoo.jingoffer.com/Slack-icon.png!icon512" title="Slack" subtitle="Social Integration" description="Recognize teammates without leaving Slack!" chipText="Free" chipStatus="warning" style="width: 100%;" />

                <aco-checkbox id="checkbox1" :checked="true" label="Checkbox Label" />

                <aco-chip
                    text="Item"
                    showXIcon
                    label="Location"
                    image="https://ca.slack-edge.com/T07KNT22J-U01J1TBS2MT-99590fdbc548-512"
                />

                <aco-chip-group
                    title="Movies"
                    :chips='[{"text":"The Social Network","id":1},{"text":"Saving Private Ryan","id":2},{"text":"The Truman Show","id":3},{"text":"True Grit","id":4}]'
                    canDeleteGroup
                    canDeleteChips
                    :hasAddButton="true"
                    addButtonText="Add"
                />

                <aco-color-picker color="#FC0" />

                <aco-fancy-tree
                    :root='[{"title":"Item 1","key":"1","children":[{"title":"Item 1.1","key":"1.1","children":[]},{"title":"Item 1.2","key":"1.2","children":[]},{"title":"Item 1.3","key":"1.3","children":[]}]},{"title":"Item 2","key":"2","children":[]},{"title":"Item 3","key":"3","children":[{"title":"Item 3.1","key":"3.1","children":[{"title":"Item 3.1.1","key":"3.1.1","children":[]}]},{"title":"Item 3.2","key":"3.2","children":[]},{"title":"Item 3.3","key":"3.3","children":[{"title":"Item 3.3.1","key":"3.3.1","children":[{"title":"Item 3.3.1.1","key":"3.3.1.1","children":[]}]}]}]}]'
                />

                <aco-icon icon="ph-alien" />

                <aco-icon-menu
                    ariaLabel="Icon Menu"
                    :items='[{"icon":"ph-archive","label":"Archive","key":"archive"},{"icon":"ph-download","label":"Download"},{"icon":"ph-copy","label":"Duplicate","disabled":true,"key":"duplicate"},{"icon":"ph-pencil","label":"Edit","disabled":true,"key":"edit"},{"icon":"ph-star","label":"Favorite label with lots of text that will be cut off","key":"favorite"},{"label":"Print","key":"print"},{"icon":"ph-trash","label":"Delete","status":"danger","key":"delete"}]'
                    disabled=""
                />

                <aco-inline-alert status="neutral" :links="[]" default="The file upload failed to save.">The file upload failed to save.</aco-inline-alert>

                <aco-input
                    type="text"
                    size="default"
                    label="Label"
                    required
                    requiredText="At least one value required"
                    placeholder="type the secret phrase"
                    :maxlength="100"
                    prefix="http://"
                    prefixIcon="ph-calendar"
                    suffix="USD"
                    suffixIcon="ph-armchair"
                    pattern="hello world"
                    width="500px"
                    showClearButton
                    statusMessage="status message"
                    status="neutral"
                />

                <aco-label
                    prefixIcon="ph-calendar-blank"
                    text="Label"
                    labelFor="123"
                    context="MM-DD-YY"
                    tooltipText="This is a tooltip"
                    required
                    requiredText="Required"
                    :readonly="false"
                />

                <aco-left-right-picker 
                    :options='[{"id":101,"name":"Item 1","order":null,"isSelected":false},{"id":102,"name":"Item 2","order":null,"isSelected":false}]'
                />

                <aco-media-input :mediaList="[]" type="single" />

                <aco-on-off-switch id="on-off-switch" :checked="false" />

                <aco-radio-bar
                    :options='[{"name":"One","id":1},{"name":"Two","id":2},{"name":"Three","id":3}]'
                    :value="1"
                    name="default"
                />

                <div>
                    <aco-radio-button selectedValue="1" value="1" id="1" name="myGroup4" label="Radio 1" />
                    <aco-radio-button selectedValue="1" value="2" id="2" name="myGroup4" label="Radio 2" />
                </div>

                <aco-rich-text :value="null" />

                <aco-status-chip
                    status="neutral"
                    text="Connected"
                    isDropdownOpen
                />

                <aco-stepper
                    :numSteps="5"
                    :selectedValue="0"
                    :labels='["Reminder Notification","Start Production","Ship Date","Shipment in hand","Start of Period"]'
                    :topLabels='["35 days","30 days","10 days","5 days","0 days"]'
                    :isInteractive="false"
                    allowLongerLabels
                    style="width: 100%;box-sizing: border-box;"
                />

                <aco-tab-menu :items='["Item 1","Item 2","Item 3"]' />

                <aco-textarea
                    label="Label"
                    required
                    placeholder="Placeholder text"
                    statusMessage="Status message"
                    status="neutral"
                    :minlength="2"
                    :maxlength="120"
                    :width="500"
                    :height="100"
                    resize="vertical"
                    :minWidth="50"
                    :minHeight="150"
                />

                <aco-table
                    :headers='[[{"text":"Food","key":"name"},{"text":"Nutrients","colspan":5,"align":"center"}],[{"text":"Dessert (100g serving)","key":"name"},{"text":"Calories","key":"calories","type":"numeric","align":"right"},{"text":"Fat (g)","key":"fat","type":"numeric","align":"right"},{"text":"Carbs (g)","key":"carbs","type":"numeric","align":"right"},{"text":"Protein (g)","key":"protein","type":"numeric","align":"right"},{"text":"Iron (%)","key":"iron","type":"numeric","align":"right"}]]'
                    :items='[{"name":"Frozen Yogurt","calories":159,"fat":6,"carbs":24,"protein":4,"iron":"1%"},{"name":"Ice cream sandwich","calories":237,"fat":9,"carbs":37,"protein":4.3,"iron":"1%"},{"name":"Eclair","calories":262,"fat":16,"carbs":23,"protein":6,"iron":"7%"},{"name":"Cupcake","calories":305,"fat":3.7,"carbs":67,"protein":4.3,"iron":"8%"},{"name":"Gingerbread","calories":356,"fat":16,"carbs":49,"protein":3.9,"iron":"16%"},{"name":"Jelly bean","calories":375,"fat":0,"carbs":94,"protein":0,"iron":"0%"},{"name":"Lollipop","calories":392,"fat":0.2,"carbs":98,"protein":0,"iron":"2%"},{"name":"Honeycomb","calories":408,"fat":3.2,"carbs":87,"protein":6.5,"iron":"45%"},{"name":"Donut","calories":452,"fat":25,"carbs":51,"protein":4.9,"iron":"22%"},{"name":"KitKat","calories":518,"fat":26,"carbs":65,"protein":7,"iron":"6%"}]'
                />

            </div>

        </aco-x-ray>
    </div>
    `,
});

export const Components = ComponentsExample.bind({});
Components.args = {};


const CustomExample = (args, { argTypes }) => ({
    components: { AcoXRay },
    props: Object.keys(argTypes),
    template: `
    <div>
        <p class="aco-text">
            A custom skeleton loader can be created by adding data-x-ray="true" to those elements that should appear gray and data-x-ray-border="true" to those that should show a border.
        </p>
        <aco-x-ray v-bind="$props">
            <div data-x-ray-border="true" class="aco-text" style="display: inline-flex; gap: 8px; padding: 16px; border-radius: 8px;">
                <img data-x-ray="true" src="dummy.png" style="display: inline-block; width: 64px; height: 64px; border-radius: 16px; flex-shrink: 0;" />
                <div>
                    <span style="padding: 10px 0;" data-x-ray="true">This element will have a border</span>
                    <p data-x-ray="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <hr data-x-ray-border="bottom" />
                </div>
            </div>
        </aco-x-ray>
    </div>
    `,
});

export const Custom = CustomExample.bind({});
Custom.args = {
    isLoading: false,
};
