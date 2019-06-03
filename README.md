# node-parse2ch

## Install

```bash
$ npm install @range3/parse2ch
```

## Usage

```js
const Parse2ch = require('@range3/parse2ch')

const board = Parse2ch.board('http://example.com/boardname/')

for await (const thread of board.threads()) {
  console.log(thread.subject)
  for await (const post of thread.posts()) {
    console.log(
      post.name,
      post.mail,
      post.timestamp,
      post.id,
      post.text,
      post.subject)
  }
}

```

## Plugin
You can make plugins to parse any 2ch-like BBSs that do not provide DAT data.
See `./src/dat/index.js`, It is an example of plugin object.

Add plugin object to parse2ch like below.
``` js
const Parse2ch = require('@range3/parse2ch')
const myPlugin = require('parse2ch-my-plugin')
Parse2ch.use(myPlugin)
...
```
