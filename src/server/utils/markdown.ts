import * as Markdown from 'markdown-it'
import * as katex from 'markdown-it-katex'
import * as kbd from 'markdown-it-kbd'
import { imageInit } from 'shared/markdown/image-resource'

export const unTokeniseMarkdown = description =>
  reduceTokenList(initMarkdown().parse(description))
    .join(' ')
    .replace(/-\w+/g, '')
    .replace(/[*.?!%:]/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim()

const initMarkdown = () => new Markdown({}).use(katex).use(kbd).use(imageInit({}))

const reduceTokenList = tokenList =>
  tokenList.reduce((acc, i) => {
    if (i.type === 'text') { return acc.concat(i.content) }
    if (i.type === 'inline') { return acc.concat(reduceTokenList(i.children)) }
    return acc
  }, [])
