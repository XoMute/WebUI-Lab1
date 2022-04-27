import { mount } from '@vue/test-utils';
import Login from '../src/views/Login.vue';


describe('Testing Login component', () => {
    it('checks login attempt with empty username and password', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            dispatch: jest.fn()
        }

        const wrapper = mount(Login, {
            global: {
                mocks: {
                    $router,
                    $store
                }
            }
        });
        console.log = jest.fn();
        expect(wrapper.find('input[name="username"]').text()).toBe("");
        expect(wrapper.find('input[name="password"]').text()).toBe("");
        await wrapper.find('button').trigger('click');
        expect($router.push).toBeCalledTimes(0);
        expect($store.dispatch).toBeCalledTimes(0);
        expect(console.log).toBeCalledWith('Username and password must be set');
    });

    it('checks login attempt with empty username', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            dispatch: jest.fn()
        }

        const wrapper = mount(Login, {
            global: {
                mocks: {
                    $router,
                    $store
                }
            }
        });
        console.log = jest.fn();
        await wrapper.find('input[name="password"]').setValue("SomePass");
        await wrapper.find('button').trigger('click');
        expect($router.push).toBeCalledTimes(0);
        expect($store.dispatch).toBeCalledTimes(0);
        expect(console.log).toBeCalledWith('Username and password must be set');
    });

    it('checks login attempt with empty password', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            dispatch: jest.fn()
        }

        const wrapper = mount(Login, {
            global: {
                mocks: {
                    $router,
                    $store
                }
            }
        });
        console.log = jest.fn();
        await wrapper.find('input[name="username"]').setValue("user");
        await wrapper.find('button').trigger('click');
        expect($router.push).toBeCalledTimes(0);
        expect($store.dispatch).toBeCalledTimes(0);
        expect(console.log).toBeCalledWith('Username and password must be set');
    });

    it('checks login attempt with filled username and password', async () => {
        const $router = {
            push: jest.fn()
        }
        const $store = {
            dispatch: jest.fn()
        }

        const wrapper = mount(Login, {
            global: {
                mocks: {
                    $router,
                    $store
                }
            }
        });
        await wrapper.find('input[name="username"]').setValue("user");
        await wrapper.find('input[name="password"]').setValue("somePass");
        await wrapper.find('button').trigger('click');
        expect($router.push).toBeCalledWith("/home");
        expect($store.dispatch).toBeCalledWith("LOGIN", { username: "user", password: "somePass" });
    });
})