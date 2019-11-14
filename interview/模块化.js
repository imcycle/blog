// 分类

// es6: import / export
// commonjs: require / module.exports / exports
// amd: require / defined




// require与import的区别

// require支持 动态导入，import不支持，正在提案(babel 下可支持)
// require是 同步 导入，import属于 异步 导入
// require是 值拷贝，导出值变化不会影响导入值；import指向 内存地址，导入值会随导出值而变化
