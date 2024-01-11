import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import Button from './button.component.vue';

describe('button', () => {
  it('should render', () => {
    const wrapper = mount(Button);

    expect(wrapper.html()).toContain('button');
  });

  it('must receive block property and apply block class', () => {
    const wrapper = mount(Button, { props: { block: true } });

    expect(wrapper.props().block).toBe(true);
    expect(wrapper.classes()).toContain('block');
  });

  it('must receive disabled property and apply disabled class', () => {
    const wrapper = mount(Button, { props: { disabled: true } });

    expect(wrapper.props().disabled).toBe(true);
    expect(wrapper.classes()).toContain('disabled');
  });
});
