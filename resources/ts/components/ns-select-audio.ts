import { __ } from '@/libraries/lang';
import Vue from 'vue';

const nsSelectAudio      =   Vue.component( 'ns-select-audio', {
    data: () => {
        return {
        }
    },
    props: [ 'name', 'placeholder', 'field' ],
    computed: {
        hasError() {
            if ( this.field.errors !== undefined && this.field.errors.length > 0 ) {
                return true;
            }
            return false;
        },
        disabledClass() {
            return this.field.disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-transparent';
        },
        inputClass() {
            return this.disabledClass + ' ' + this.leadClass
        },
        leadClass() {
            return this.leading ? 'pl-8' : 'px-4';
        }
    },
    methods: { 
        __,
        playSelectedSound() {
            if ( this.field.value.length > 0 ) {
                (new Audio( this.field.value )).play();
            }
        }
    },
    template: `
    <div class="flex flex-col flex-auto">
        <label :for="field.name" :class="hasError ? 'text-red-700' : 'text-gray-700'" class="block leading-5 font-medium"><slot></slot></label>
        <div :class="hasError ? 'border-red-400' : 'border-gray-200'" class="border-2 mt-1 flex relative overflow-hidden rounded-md shadow-sm mb-2">
            <div @click="playSelectedSound()" class="border-r-2 border-gray-200 flex-auto flex items-center justify-center hover:bg-blue-400 hover:text-white">
                <button class="w-10 flex item-center justify-center">
                    <i class="las la-play text-2xl"></i>
                </button>
            </div>
            <select :disabled="field.disabled ? field.disabled : false" @change="$emit( 'change', $event )" :name="field.name" v-model="field.value" :class="inputClass" class="text-gray-700 form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5 h-10">
                <option :value="option.value" v-for="option of field.options" class="py-2">{{ option.label }}</option>
            </select>
        </div>
        <p v-if="! field.errors || field.errors.length === 0" class="text-xs text-gray-500"><slot name="description"></slot></p>
        <p v-for="error of field.errors" class="text-xs text-red-400">
            <slot v-if="error.identifier === 'required'" :name="error.identifier">{{ __( 'This field is required.' ) }}</slot>
            <slot v-if="error.identifier === 'email'" :name="error.identifier">{{ __( 'This field must contain a valid email address.' ) }}</slot>
            <slot v-if="error.identifier === 'invalid'" :name="error.identifier">{{ error.message }}</slot>
        </p>
    </div>
    `,
});

export { nsSelectAudio }