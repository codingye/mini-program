// 云函数入口文件
const cloud = require('wx-server-sdk')
let superagent = require('superagent') //发送请求获取页面HTML
let cheerio = require('cheerio') //获取dom结构的标签
let charset = require('superagent-charset')
charset(superagent)

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let serverUrl = `https://m.bige7.com/${event.url}`
  let result = await superagent.get(serverUrl) //网页编码
  const $ = cheerio.load(result.text)
  let html = ""
  html = $('#chaptercontent').html()
  return {
    html
  }
}