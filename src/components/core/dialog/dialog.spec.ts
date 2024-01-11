import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import Dialog from './dialog.component.vue';

describe('dialog', () => {
  it('should render', () => {
    const wrapper = mount(Dialog, { props: { open: true } });

    expect(wrapper.html()).toContain('dialog-wrapper');
  });

  it('must receive open property and apply open class', () => {
    const wrapper = mount(Dialog, { props: { open: true } });

    expect(wrapper.props().open).toBe(true);
    expect(wrapper.classes()).toContain('open');
  });

  it('should emit toggle close event when clicking on overlay', () => {
    const wrapper = mount(Dialog, { props: { open: true } });

    wrapper.trigger('click');

    expect(wrapper.emitted('toggle-open')?.length).toBe(1);
  });
});
