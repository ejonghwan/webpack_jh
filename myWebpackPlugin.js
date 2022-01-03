class MyWebpackPlugin {
    apply(compiler) {
        // compiler.hooks.done.tap('my plugin', stats => {
        //     console.log('my plugin: done')
        // })

        compiler.plugin('emit', (compilation, callback) => {
            const source = compilation.assets['main.js'].source();
            // console.log(source) //웹팩이 빌드한 메인js 

            compilation.assets['main.js'].source = () => { // 빌드된 결과물에 추가함 앞부분에
                const banner = [
                    '/**',
                    ' * 이것은 배너플로그인이 처리한 결과 ',
                    ' * ㅎㅎㅎㅎㅎ ',
                    ' */ '
                ].join('\n');
                return banner + '\n\n' + source;
            }

            callback();
        })
    }

    
}


module.exports = MyWebpackPlugin;