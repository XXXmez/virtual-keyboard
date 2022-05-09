module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'no-restricted-modules': ['error', 'foo-module', 'bar-module'],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
