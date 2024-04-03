stateDiagram-v2
    main --> App.vue:import App from './App.vue'
    main --> router/index.js:import router from './router'
    main --> vue:import createApp from vue, import markRaw from vue
    App.vue --> vue_router:import RouterView
    router/index.js --> vue_router:import
    router/index.js --> Firebase:import
    Firebase --> firebase:import
    router/index.js --> registeregisterView:import
    router/index.js --> LoginView:import
    router/index.js --> HomeView:import
    router/index.js --> Dashboard:import
    RegisteregisterView --> vue:import
    RegisteregisterView --> user.js:import
    LoginView --> vue:import
    LoginView --> user.js:import
    HomeView --> vue_router:import
    Dashboard --> user.js:import
    user.js --> pinia:import
    user.js --> Firebase:import
    user.js --> firebase:import