import { mount, shallowMount } from '@vue/test-utils';
import NewPost from '../src/views/NewPost.vue';

describe('Testing NewPost component', () => {
    it('checks post creation attempt with unlogged user', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            state: {
                currentUser: undefined
            }
        }

        shallowMount(NewPost, {
            global: {
                mocks: {
                    $router,
                    $store
                }
            }
        });
        expect($router.push).toBeCalledWith("/home")
    });

    it('checks post creation attempt without post title', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            state: {
                currentUser: true
            }
        }

        const wrapper = shallowMount(NewPost, {
            global: {
                mocks: {
                    $router,
                    $store
                }
            }
        });
        console.log = jest.fn();
        await wrapper.find('button').trigger('click');
        expect(console.log).toBeCalledWith("Title must be set");
    });

    it('checks post creation attempt without content', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            state: {
                currentUser: true
            }
        }
        const CustomEditor = {
            template: '<span/>',
            methods: {
                getHTML() {
                    return '';
                }
            }
        }

        const wrapper = mount(NewPost, {
            global: {
                mocks: {
                    $router,
                    $store
                },
                stubs: {
                    QuillEditor: CustomEditor
                }
            }
        });
        console.log = jest.fn();
        await wrapper.find('input#title').setValue("Title");
        await wrapper.find('button').trigger('click');
        expect(console.log).toBeCalledWith("Post content must be set");
    });

    it('checks post creation attempt with all fields filled', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            state: {
                currentUser: true,
            },
            dispatch: jest.fn()
        }
        const CustomEditor = {
            template: '<span/>',
            methods: {
                getHTML() {
                    return '<p>Some post content</p>';
                }
            }
        }

        const wrapper = mount(NewPost, {
            global: {
                mocks: {
                    $router,
                    $store
                },
                stubs: {
                    QuillEditor: CustomEditor
                }
            }
        });
        console.log = jest.fn();
        await wrapper.find('input#title').setValue("Title");
        await wrapper.find('input#subtitle').setValue("Subtitle");
        await wrapper.find('button').trigger('click');
        expect($store.dispatch).toBeCalledWith("ADD_POST", expect.anything());
        expect($router.push).toBeCalledWith("/home");
    });
})