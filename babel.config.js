const devPresets = ['@vue/babel-preset-app'];
const buildPresets = [
  [
    '@babel/preset-env',
    // Config for @babel/preset-env
    {
      // Example: Always transpile optional chaining/nullish coalescing
      include: [
        /(optional-chaining|nullish-coalescing)/
      ],
    },
  ],
];

export default {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
  plugins: [
    // ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    // ["@babel/plugin-proposal-private-methods", { "loose": true }],
    // ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ]
};
