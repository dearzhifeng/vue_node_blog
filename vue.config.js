module.exports = {
    chainWebpack : config =>{
        //发行模式
        config.when(process.env.NODE_ENV === 'production' , config=>{
            config.entry('app').clear().add('./src/main_prod.js')

            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                lodash: '_',
                nprogress: 'NProgress',
            })

            config.plugin('html').tap(args =>{
                args[0].isProd = true
                return args
            })
        })

        //开发模式
        config.when(process.env.NODE_ENV === 'development' , config=>{
            config.entry('app').clear().add('./src/main_dev.js')

            config.plugin('html').tap(args =>{
                args[0].isProd = false
                return args
            })
        })
    }
}
