


module.exports.formatYupErrors = function name(errors) {
    let modifiedErrors = {}
    errors.inner.map(item => {
        modifiedErrors[item.path] = item.errors.toString()
    })
    return modifiedErrors
}
module.exports.formatJoiErrors = function name(errors) {
    let modifiedErrors = {}
    errors.details.map(item => {
        modifiedErrors[item.context.key] = item.message.replace(/"/g, '')
        // console.log('item.message', item)
    })
    // console.log('errors', errors)
    return modifiedErrors
}