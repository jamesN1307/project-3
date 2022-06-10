module.exports = {
    resolve: {
        fallback: {
            querystring: require.resolve("querystring-es3"),
            zlib: require.resolve("browserify-zlib"),
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            http: require.resolve("stream-http"),
            url: require.resolve("url/")
    },
}
}