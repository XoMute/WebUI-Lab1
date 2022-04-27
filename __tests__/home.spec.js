import { mount, RouterLinkStub } from '@vue/test-utils'
import Home from '../src/views/Home.vue'

describe('Testing Home component', () => {
    it('checks html to contain "There are no posts!"', () => {
        const $store = {
            state: {
                blogPosts: {
                    posts: undefined
                }
            }
        }

        const wrapper = mount(Home, {
            global: {
                mocks: {
                    $store
                },
                stubs: ['router-link']
            }
        });
        expect(wrapper.element.textContent).toContain("There are no posts!");
    });

    it('checks html to contain list element with one blog post', () => {
        const $store = {
            state: {
                blogPosts: {
                    posts: [{
                        id: 1,
                        authorId: 2,
                        title: "Title",
                        subtitle: "Subtitle",
                        created: Date.now()
                    }]
                },
                users: {
                    findById: jest.fn((_) => {
                        return {
                            firstname: "The",
                            lastname: "Admin"
                        }
                    })
                }
            }
        }

        const wrapper = mount(Home, {
            global: {
                mocks: {
                    $store
                },
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        });
        expect(wrapper.findAll('.container').length).toBe(1);
        const elem = wrapper.find('.container');
        expect(elem.element.textContent).toContain("By The Admin");
    });
})