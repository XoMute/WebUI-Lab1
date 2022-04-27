import { mount } from '@vue/test-utils';
import About from '../src/views/About.vue';

describe('Testing About component', () => {
    const wrapper = mount(About);
    it('checks textContent to contain "Dmytro Khomutnyk\'s Blog"', () => {
        expect(wrapper.element.textContent).toContain("Dmytro Khomutnyk's Blog");
    });

    it('checks component to contain one image with alt = "Vue logo"', () => {
        const images = wrapper.findAll('img');
        expect(images.length).toBe(1);
        const image = images.at(0);
        expect(image.element.alt).toBe('Vue logo');
    });
})