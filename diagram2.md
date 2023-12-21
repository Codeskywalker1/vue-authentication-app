stateDiagram-v2
    main --> app.vue:import App from './App.vue'
    main --> router/index.js:import router from './router'
    main --> vue:import
    app.vue --> vue_router:import
    registeregisterView --> vue:import
    registeregisterView --> user:import
    LoginView --> vue:import
    LoginView --> user:import
    HomeView --> vue_router:import
    Dashboard --> user:import
    user --> pinia:import
    user --> Firebase:import
    user --> firebase:import
    router/index.js --> vue_router:import
    router/index.js --> Firebase:import
    Firebase --> firebase:import
    router/index.js --> registeregisterView:import
    router/index.js --> LoginView:import
    router/index.js --> HomeView:import
    router/index.js --> Dashboard:import