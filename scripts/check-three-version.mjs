// index.html の importmap が読み込む three の版と、package.json の版が同じかを確かめる。
// Dependabot が package.json だけを更新したときに、CI を失敗させて知らせるためのもの。
import { readFileSync } from 'node:fs'

const expected = JSON.parse(readFileSync('package.json', 'utf8')).dependencies.three
const html = readFileSync('index.html', 'utf8')
const versions = [...html.matchAll(/cdn\.jsdelivr\.net\/npm\/three@([^/"]+)\//g)].map((m) => m[1])

if (versions.length === 0) {
  console.error('index.html に three の CDN の URL が見つかりません')
  process.exit(1)
}

const mismatched = versions.filter((v) => v !== expected)
if (mismatched.length > 0) {
  console.error(`index.html の three の版 (${[...new Set(mismatched)].join(', ')}) が package.json の版 (${expected}) と違います`)
  process.exit(1)
}

console.log(`three の版は ${expected} で一致しています（${versions.length} か所）`)
