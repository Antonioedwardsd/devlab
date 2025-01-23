## ROOT FOLDER

# .prettierrc

{
"semi": true,
"singleQuote": true,
"printWidth": 120,
"tabWidth": 2,
"trailingComma": "all",
"bracketSpacing": true,
"arrowParens": "always"
}

# eslint.config.mjs

import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
{
ignores: [
'node_modules',
'**/.next',
'frontend/dist',
'frontend/build',
'.env',
'.env.local',
'next-env.d.ts',
'package-lock.json',
'README.md',
'eslint.config.mjs',
],
},
js.configs.recommended,
{
files: ['**/*.ts', '**/*.tsx'],
languageOptions: {
parser: tsParser,
parserOptions: {
project: './tsconfig.json',
tsconfigRootDir: process.cwd(),
},
globals: {
...globals.node,
...globals.browser,
},
},
plugins: {
'@typescript-eslint': ts,
prettier: prettierPlugin,
},
rules: {
...ts.configs.recommended.rules,
'prettier/prettier': 'error',
'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
},
},
prettierConfig,
];

# package.json

{
"name": "task-app",
"version": "1.0.0",
"description": "Task management application",
"main": "index.js",
"scripts": {
"start:backend": "cd backend && npm run start",
"dev:backend": "cd backend && npm run dev",
"start:frontend": "cd frontend && npm run dev",
"build:backend": "cd backend && npm run build",
"build:frontend": "cd frontend && npm run build",
"lint": "eslint . --no-cache",
"lint:fix": "eslint . --fix --no-cache",
"format": "prettier --write ."
},
"keywords": [],
"author": "",
"license": "MIT",
"devDependencies": {
"@eslint/eslintrc": "^3.2.0",
"@eslint/js": "^9.18.0",
"@types/node": "^22.10.7",
"@typescript-eslint/eslint-plugin": "^8.21.0",
"@typescript-eslint/parser": "^8.21.0",
"eslint": "^8.57.1",
"eslint-config-next": "^15.1.6",
"eslint-config-prettier": "^10.0.1",
"eslint-plugin-prettier": "^5.2.3",
"prettier": "^3.4.2",
"typescript": "^5.7.3"
},
"dependencies": {
"axios": "^1.7.9",
"dotenv": "^16.4.7"
}
}

# tsconfig.json

{
"extends": "./frontend/tsconfig.json",
"compilerOptions": {
"moduleResolution": "node"
},
"include": ["frontend/**/*", "backend/**/*"]
}
