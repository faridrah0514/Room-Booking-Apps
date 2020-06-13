const rooms = [
    {
        'satu': 'satu',
        'asset': ['a','b','c']
    },
    {
        'dua': 'dua',
        'asset': ['a','b']
    },
    {
        'tiga': 'tiga',
        'asset': ['b','c']
    },
    {
        'empat': 'empat',
        'asset': ['a','c']
    },
    {
        'lima': 'lima',
        'asset': ['a','b']
    }

]
const selected_asset = ['a', 'b']

console.log(selected_asset.length)

var a = rooms.filter(item => {
    var statement = true
    for (i =0; i < selected_asset.length; i++) {
        if (item.asset.includes(selected_asset[i]) == false){
            statement = false
            break
        }
    }
    return statement
})
console.log(a)


console.log(['a','b'].includes('c'))