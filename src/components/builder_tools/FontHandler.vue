<template>
    <div class="text-editor-wrapper">
        <v-btn class="close-btn" icon @click="$emit('closeSidepanel')">
            <v-icon>
                mdi-close
            </v-icon>
        </v-btn>
        <div class="text-editor">
            <div class="text-editor-setfont">
                <v-select v-model="fontFamily" :items="fontFamilyList" item-text="text" item-value="value" dense
                    outlined prepend-icon="mdi-format-text" label="Font">
                </v-select>
            </div>
            <div class="text-editor-setfontsize">
                <v-select v-model="fontSize" :items="fontSizeList" item-text="text" item-value="value" dense outlined
                    label="Font Size" placeholder="Select fontsize-">
                </v-select>
            </div>

            <div class="text-editor-setalignment">
                <v-btn-toggle v-model="horizontalAlignment">
                    <v-btn value="left" icon tile small>
                        <v-icon small>mdi-format-align-left</v-icon>
                    </v-btn>
                    <v-btn value="center" icon tile small>
                        <v-icon small>mdi-format-align-center</v-icon>
                    </v-btn>
                    <v-btn value="right" icon tile small>
                        <v-icon small>mdi-format-align-right</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </div>
            <div class="text-editor-setfontstyle">
                <v-btn icon tile small @click="toggleBold">
                    <v-icon small>mdi-format-bold</v-icon>
                </v-btn>
                <v-btn icon tile small @click="toggleItalic">
                    <v-icon small>mdi-format-italic</v-icon>
                </v-btn>
                <v-btn icon tile small @click="toggleUnderline">
                    <v-icon small>mdi-format-underline</v-icon>
                </v-btn>
            </div>
            <div class="text-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="color" hide-details class="ma-0 pa-0" outlined v-bind="attrs" v-on="on"
                            label="color">
                        </v-text-field>
                    </template>
                    <v-color-picker v-model="color" flat mode="hexa" />
                </v-menu>
            </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from '../../EventBus';
export default {
    data() {
        return {
            fontSizeList: [],
            fontFamilyList: [
                {
                    text: "Arial",
                    value: "Arial, Helvetica, sans-serif",
                },
                {
                    text: "Arial Black",
                    value: "'Arial Black', Gadget, sans-serif",
                },
                {
                    text: "'Comic Sans MS'",
                    value: "'Comic Sans MS', cursive, sans-serif",
                },
                {
                    text: "Impact",
                    value: "Impact, Charcoal, sans-serif",
                },
                {
                    text: "'Lucida Sans Unicode'",
                    value: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
                },
                {
                    text: "Tahoma",
                    value: "Tahoma, Geneva, sans-serif",
                },
                {
                    text: "'Trebuchet MS'",
                    value: "'Trebuchet MS', Helvetica, sans-serif",
                },
                {
                    text: "Verdana",
                    value: "Verdana, Geneva, sans-serif",
                },
                {
                    text: "Comic Sans",
                    value: "Comic Sans, Comic Sans MS, cursive",
                },
                {
                    text: "'Lucida Console'",
                    value: "'Lucida Console', Monaco, monospace",
                },
                {
                    text: "'Courier New'",
                    value: "'Courier New', Courier, monospace",
                },
                {
                    text: "'Allura'",
                    value: "'Allura', cursive",
                },
            ],
            horizontalAlignment: 0,
            color: "#000",
            menu: false,
            fontSize: 40,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: "normal",
            fontStyle: "normal",
            underline: false,
        }
    },
    mounted() {
        this.generateFontSizeList();
    },
    watch: {
        color(newVal) {
            this.updateTextAttribute({
                attributeName: 'color',
                attributeValue: newVal
            });
        },
        horizontalAlignment(newVal) {
            this.updateTextAttribute({
                attributeName: 'horizontalAlignment',
                attributeValue: newVal
            });
        },
        fontSize(newVal) {
            this.updateTextAttribute({
                attributeName: 'fontSize',
                attributeValue: newVal
            });
        },
        fontWeight(newVal) {
            this.updateTextAttribute({
                attributeName: 'fontWeight',
                attributeValue: newVal
            });
        },
        fontStyle(newVal) {
            this.updateTextAttribute({
                attributeName: 'fontStyle',
                attributeValue: newVal
            });
        },
        underline(newVal) {
            this.updateTextAttribute({
                attributeName: 'underline',
                attributeValue: newVal
            });
        },
        fontFamily(newVal) {
            console.log(newVal)
            let fontFamilyObject = this.fontFamilyList.find(obj => obj.value == newVal)
            console.log(fontFamilyObject)
            this.updateTextAttribute({
                attributeName: 'fontFamily',
                attributeValue: fontFamilyObject.text
            });
        },
    },
    methods: {
        generateFontSizeList() {
            for (let i = 10; i <= 400; i += 10) {
                this.fontSizeList.push({
                    text: i + " px",
                    value: i,
                });
            }
        },
        updateTextAttribute(data) {
            eventBus.$emit('updateTextAttribute', data)
        },
        toggleBold() {
            if (this.fontWeight == 'normal') {
                this.fontWeight = 'bold';
            } else {
                this.fontWeight = 'normal';
            }
        },
        toggleItalic() {
            if (this.fontStyle == 'normal') {
                this.fontStyle = 'italic';
            } else {
                this.fontStyle = 'normal';
            }
        },
        toggleUnderline() {
            if (this.underline) {
                this.underline = false;
            } else {
                this.underline = true;
            }
        }
    }
}


</script>
<style lang="scss" scoped>
.text-editor-wrapper {
    padding: 2rem;
    width: 20vw;
    height: 100vh;
    border-right: 0.02rem solid $dark-one;
    position: relative;
}

.text-editor {
    margin-top: 3vh;

    &-setfontsize {
        &-label {
            font-size: medium;
        }
    }

    &-setalignment {
        .v-btn--icon {
            height: 2rem;
            width: 3rem;
        }

        margin-bottom: 1.4rem;
    }

    &-setfontstyle {
        margin-bottom: 1.4rem;

        &-label {
            font-size: medium;
        }

        .v-btn {
            height: 2rem;
        }
    }
}

.close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    .v-icon {
        font-size: 2rem;
    }

}
</style>