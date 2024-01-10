import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import MenuItem from './menu-item.component.vue';

describe('menu-item', () => {
  const title = 'text';

  it('should render', () => {
    const wrapper = mount(MenuItem, { props: { active: false, title } });

    expect(wrapper.html()).toContain('div');
    expect(wrapper.classes()).toContain('menuitem');
  });

  it('must contain text passed in the title property', () => {
    const wrapper = mount(MenuItem, {
      props: { title, active: false },
    });

    expect(wrapper.props().title).toBe(title);
    expect(wrapper.text()).toBe(title);
  });

  it('must receive active property and apply active class', () => {
    const wrapper = mount(MenuItem, { props: { active: true, title } });

    expect(wrapper.props().active).toBe(true);
    expect(wrapper.classes()).toContain('active');
  });
});
