import {mount} from '@vue/test-utils';
import {describe, expect, it} from "vitest";
import NodataFound from "@/components/NodataFound.vue";

describe('H1 props test', () => {
    it('should have a props message', () => {
        const wrapper = mount(NodataFound, {
            props: {
                dede: "props message received"
            }
        });
        expect(wrapper.text()).toContain("props message received");
    });
});

describe('H1 class test', () => {
    it('should have a H1 title', () => {
        const wrapper = mount(NodataFound, {
            props: {
                dede: "props message received"
            }
        });
        expect(wrapper.find('h1').exists()).toBe(true);
        expect(wrapper.find('h1').classes('green')).toBeTruthy();
    });
});

describe('H3 class test', () => {
    it('should have a H3 title', () => {
        const wrapper = mount(NodataFound, {
            props: {
                dede: "props message received"
            }
        });
        expect(wrapper.find('h3').exists()).toBe(true);
    });
});

describe('a link test 1', () => {
    it('should have a link', () => {
        const wrapper = mount(NodataFound, {
            props: {
                dede: "props message received"
            }
        });
        expect(wrapper.findAll('a').at(0).attributes('href')).toBe('https://vitejs.dev/');
        expect(wrapper.findAll('a').at(0).text()).toBe('Vite');
    });
});

describe('a link test 2', () => {
    it('should have a link', () => {
        const wrapper = mount(NodataFound, {
            props: {
                dede: "props message received"
            }
        });
        expect(wrapper.findAll('a').at(1).attributes('href')).toBe('https://vuejs.org/');
        expect(wrapper.findAll('a').at(1).text()).toBe('Vue 3');
    });
});