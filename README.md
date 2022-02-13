# tpns nodejs sdk

https://cloud.tencent.com/document/product/548/39060

## Development

```
npm i
```

## Build

```shell
npm run compile
```

## Publish to npm

```shell
npm publish
```

## Usage

```typescript
const tpns = new Tpns({
  baseURL: 'https://api.tpns.sh.tencent.com/',
  accessID: 'accessID',
  secretKey: 'secretKey',
});

// https://cloud.tencent.com/document/product/548/39064
const res = await tpns.push({
  audience_type: 'all',
  message: {
    title: 'title-1',
    content: 'content-1',
  },
  message_type: 'notify',
  environment: 'dev',
});
```
