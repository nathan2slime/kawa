import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import Input from './input.component.vue';

describe('input', () => {
    const value = 'value';

    it('should render', ()=>{
        const wrapper = mount(Input, { props: { value}})

        expect(wrapper.html()).include('input')
    })
});
