#three.js-demo

https://maangie.github.io/three.js-demo/

## three の版

three は `index.html` の importmap で CDN（jsdelivr）から読み込んでいます。
`package.json` は Dependabot に three の版を見せるためだけのもので、ビルドはしません。

Dependabot が `package.json` の three を更新する PR を作ったら、`index.html` の importmap の版も同じにしてください。
版が違うと CI（`scripts/check-three-version.mjs`）が失敗します。
