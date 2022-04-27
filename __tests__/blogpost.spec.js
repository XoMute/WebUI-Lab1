import { mount } from '@vue/test-utils'
import BlogPost from '../src/views/BlogPost.vue'

describe('Testing BlogPost component', () => {
    it('checks blog post rendering without comments', () => {
        const $store = {
            state: {
                users: {
                    findById: jest.fn((_) => {
                        return {
                            firstname: "Mocked post",
                            lastname: "with mocked subtitle"
                        }
                    })
                },
                blogPosts: {
                    findById: jest.fn((_) => {
                        return {
                            title: "Mocked post",
                            subtitle: "with mocked subtitle",
                            authorId: 1,
                            content: "Some post content",
                            comments: []
                        }
                    })
                }
            }
        }
        const $route = {
            params: {
                postId: 0
            }
        }

        const wrapper = mount(BlogPost, {
            global: {
                mocks: {
                    $store,
                    $route
                }
            }
        });
        expect(wrapper.element.textContent).toContain("Mocked post with mocked subtitle");
    });

    it('checks blog post delete button rendering for non-author', () => {
        const $store = {
            state: {
                currentUser: {
                    id: 2
                },
                users: {
                    findById: jest.fn((_) => {
                        return {
                            firstname: "Mocked post",
                            lastname: "with mocked subtitle",
                            id: 1
                        }
                    })
                },
                blogPosts: {
                    findById: jest.fn((_) => {
                        return {
                            title: "Mocked post",
                            subtitle: "with mocked subtitle",
                            authorId: 1,
                            content: "Some post content",
                            comments: []
                        }
                    })
                }
            }
        }
        const $route = {
            params: {
                postId: 0
            }
        }

        const wrapper = mount(BlogPost, {
            global: {
                mocks: {
                    $store,
                    $route
                }
            }
        });
        expect(wrapper.vm.isAuthor()).toBeFalsy();
        expect(wrapper.find("button#deleteButton").exists()).toBeFalsy()
    });

    it('checks blog post deletion', async () => {
        const $store = {
            state: {
                currentUser: {
                    id: 1
                },
                users: {
                    findById: jest.fn((_) => {
                        return {
                            firstname: "Mocked post",
                            lastname: "with mocked subtitle",
                            id: 1
                        }
                    })
                },
                blogPosts: {
                    findById: jest.fn((_) => {
                        return {
                            title: "Mocked post",
                            subtitle: "with mocked subtitle",
                            authorId: 1,
                            content: "Some post content",
                            comments: []
                        }
                    })
                }
            },
            dispatch: jest.fn()
        }
        const $route = {
            params: {
                postId: 0
            }
        }
        const $router = {
            push: jest.fn()
        }

        const wrapper = mount(BlogPost, {
            global: {
                mocks: {
                    $store,
                    $route,
                    $router
                }
            }
        });
        expect(wrapper.vm.isAuthor()).toBeTruthy();
        const button = wrapper.find("button#deleteButton");
        expect(button.exists()).toBeTruthy();
        await button.trigger('click');
        expect($store.dispatch).toBeCalledWith('DELETE_POST', 0);
        expect($router.push).toBeCalledWith('/home');
    });

    it('checks comment adding with empty name', async () => {
        const $store = {
            state: {
                currentUser: {
                    id: 1
                },
                users: {
                    findById: jest.fn((_) => {
                        return {
                            firstname: "Mocked post",
                            lastname: "with mocked subtitle",
                            id: 1
                        }
                    })
                },
                blogPosts: {
                    findById: jest.fn((_) => {
                        return {
                            title: "Mocked post",
                            subtitle: "with mocked subtitle",
                            authorId: 1,
                            content: "Some post content",
                            comments: []
                        }
                    })
                }
            },
            dispatch: jest.fn()
        }
        const $route = {
            params: {
                postId: 0
            }
        }
        const $router = {
            push: jest.fn()
        }

        const wrapper = mount(BlogPost, {
            global: {
                mocks: {
                    $store,
                    $route,
                    $router
                }
            }
        });
        console.log = jest.fn();
        const button = wrapper.find('button#commentButton');
        expect(button.exists()).toBeTruthy();
        await button.trigger('click');
        expect(console.log).toBeCalledWith('Name must be set');
        expect($store.dispatch).not.toBeCalled();
    });

    it('checks comment adding with empty comment', async () => {
        const $store = {
            state: {
                currentUser: {
                    id: 1
                },
                users: {
                    findById: jest.fn((_) => {
                        return {
                            firstname: "Mocked post",
                            lastname: "with mocked subtitle",
                            id: 1
                        }
                    })
                },
                blogPosts: {
                    findById: jest.fn((_) => {
                        return {
                            title: "Mocked post",
                            subtitle: "with mocked subtitle",
                            authorId: 1,
                            content: "Some post content",
                            comments: []
                        }
                    })
                }
            },
            dispatch: jest.fn()
        }
        const $route = {
            params: {
                postId: 0
            }
        }
        const $router = {
            push: jest.fn()
        }

        const wrapper = mount(BlogPost, {
            global: {
                mocks: {
                    $store,
                    $route,
                    $router
                }
            }
        });
        console.log = jest.fn();
        await wrapper.find('input[name = "name"]').setValue("commentator");
        const button = wrapper.find('button#commentButton');
        expect(button.exists()).toBeTruthy();
        await button.trigger('click');
        expect(console.log).toBeCalledWith('Comment must be set');
        expect($store.dispatch).not.toBeCalled();
    });

    it('checks comment adding with filled inputs', async () => {
        const $store = {
            state: {
                currentUser: {
                    id: 1
                },
                users: {
                    findById: jest.fn((_) => {
                        return {
                            firstname: "Mocked post",
                            lastname: "with mocked subtitle",
                            id: 1
                        }
                    })
                },
                blogPosts: {
                    findById: jest.fn((_) => {
                        return {
                            title: "Mocked post",
                            subtitle: "with mocked subtitle",
                            authorId: 1,
                            content: "Some post content",
                            comments: []
                        }
                    })
                }
            },
            dispatch: jest.fn()
        }
        const $route = {
            params: {
                postId: 0
            }
        }
        const $router = {
            push: jest.fn()
        }

        const wrapper = mount(BlogPost, {
            global: {
                mocks: {
                    $store,
                    $route,
                    $router
                }
            }
        });
        await wrapper.find('input[name = "name"]').setValue("commentator");
        await wrapper.find('textarea').setValue("Some comment content");
        const button = wrapper.find('button#commentButton');
        expect(button.exists()).toBeTruthy();
        await button.trigger('click');
        expect($store.dispatch).toBeCalledWith('ADD_COMMENT', expect.anything());
    });
})