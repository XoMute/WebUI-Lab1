import { mount } from '@vue/test-utils';
import Register from '../src/views/Register.vue';

describe('Testing Register component', () => {
    it('checks registration attempt with empty fields', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            dispatch: jest.fn()
        }

        const wrapper = mount(Register, {
            global: {
                mocks: {
                    $router,
                    $store
                }
            }
        });
        console.log = jest.fn();
        expect(wrapper.find('input[name="firstname"]').text()).toBe("");
        expect(wrapper.find('input[name="lastname"]').text()).toBe("");
        expect(wrapper.find('input[name="username"]').text()).toBe("");
        expect(wrapper.find('input[name="password"]').text()).toBe("");
        await wrapper.find('button').trigger('click');
        expect($router.push).toBeCalledTimes(0);
        expect($store.dispatch).toBeCalledTimes(0);
        expect(console.log).toBeCalledWith('Full name must be set');
    });

    it('checks registration attempt with empty username', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            dispatch: jest.fn()
        }

        const wrapper = mount(Register, {
            global: {
                mocks: {
                    $router,
                    $store
                }
            }
        });
        console.log = jest.fn();
        await wrapper.find('input[name="firstname"]').setValue("A");
        await wrapper.find('input[name="lastname"]').setValue("B");
        await wrapper.find('input[name="password"]').setValue("123");
        await wrapper.find('button').trigger('click');
        expect($router.push).toBeCalledTimes(0);
        expect($store.dispatch).toBeCalledTimes(0);
        expect(console.log).toBeCalledWith('Username and password must be set');
    });


    it('checks registration attempt with all fields filled', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            state: {
                users: {
                    findByUsername: jest.fn((_) => false)
                }
            },
            dispatch: jest.fn()
        }

        const wrapper = mount(Register, {
            global: {
                mocks: {
                    $router,
                    $store
                }
            }
        });
        await wrapper.find('input[name="firstname"]').setValue("Taras");
        await wrapper.find('input[name="lastname"]').setValue("Kobzar");
        await wrapper.find('input[name="username"]').setValue("user");
        await wrapper.find('input[name="password"]').setValue("somePass");
        await wrapper.find('button').trigger('click');
        expect($router.push).toBeCalledWith("/login");
        expect($store.dispatch).toBeCalledWith("ADD_USER", { firstname: "Taras", lastname: "Kobzar", username: "user", password: "somePass" });
    });

    it('checks registration attempt with existing username', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            state: {
                users: {
                    findByUsername: jest.fn((_) => true)
                }
            },
            dispatch: jest.fn()
        }

        const wrapper = mount(Register, {
            global: {
                mocks: {
                    $router,
                    $store
                }
            }
        });
        console.log = jest.fn();
        await wrapper.find('input[name="firstname"]').setValue("Taras");
        await wrapper.find('input[name="lastname"]').setValue("Kobzar");
        await wrapper.find('input[name="username"]').setValue("user");
        await wrapper.find('input[name="password"]').setValue("somePass");
        await wrapper.find('button').trigger('click');
        expect($router.push).toBeCalledWith('/register');
        expect(console.log).toBeCalledWith("User with username 'user' already exists!");
    });
})