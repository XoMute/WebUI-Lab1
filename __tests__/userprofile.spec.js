import { mount } from '@vue/test-utils'
import UserProfile from '../src/views/UserProfile.vue'

describe('Testing UserProfile component', () => {
    it('checks update attempt with empty fields', async () => {
        const $store = {
            state: {
                currentUser: {
                    firstname: "a",
                    lastname: "b",
                    username: "c",
                    password: "d"
                }
            },
            dispatch: jest.fn()
        }

        const wrapper = mount(UserProfile, {
            global: {
                mocks: {
                    $store
                }
            }
        });
        console.log = jest.fn();
        await wrapper.find('input[name="firstname"]').setValue("");
        await wrapper.find('input[name="lastname"]').setValue("");
        await wrapper.find('input[name="username"]').setValue("");
        await wrapper.find('input[name="password"]').setValue("");
        await wrapper.find('button').trigger('click');
        expect($store.dispatch).toBeCalledTimes(0);
        expect(console.log).toBeCalledWith('Full name must be set');
    });

    it('checks update attempt with empty username', async () => {
        const $store = {
            state: {
                currentUser: {
                    firstname: "a",
                    lastname: "b",
                    username: "c",
                    password: "d"
                }
            },
            dispatch: jest.fn()
        }

        const wrapper = mount(UserProfile, {
            global: {
                mocks: {
                    $store
                }
            }
        });
        console.log = jest.fn();
        await wrapper.find('input[name="username"]').setValue("");
        await wrapper.find('button').trigger('click');
        expect($store.dispatch).toBeCalledTimes(0);
        expect(console.log).toBeCalledWith('Username and password must be set');
    });


    it('checks update attempt with all fields filled', async () => {
        const $store = {
            state: {
                currentUser: {
                    firstname: "a",
                    lastname: "b",
                    username: "c",
                    password: "d"
                }
            },
            dispatch: jest.fn()
        }

        const wrapper = mount(UserProfile, {
            global: {
                mocks: {
                    $store
                }
            }
        });
        await wrapper.find('input[name="firstname"]').setValue("Taras");
        await wrapper.find('input[name="lastname"]').setValue("Kobzar");
        await wrapper.find('input[name="username"]').setValue("user");
        await wrapper.find('input[name="password"]').setValue("somePass");
        await wrapper.find('button').trigger('click');
        expect($store.dispatch).toBeCalledWith("UPDATE_USER", { firstname: "Taras", lastname: "Kobzar", username: "user", password: "somePass" });
    });
})