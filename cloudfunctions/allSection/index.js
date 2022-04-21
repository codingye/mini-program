// 云函数入口文件
const cloud = require('wx-server-sdk')
let superagent = require('superagent') //发送请求获取页面HTML
let cheerio = require('cheerio') //获取dom结构的标签
let charset = require('superagent-charset')
charset(superagent)
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let serverUrl = `https://m.bige7.com/${event.url}/list.html`
  let result = await superagent.get(serverUrl) //网页编码
  const $ = cheerio.load(result.text)
  
  //分页章节
  let currentPage = event.currentPage // 第几页
  let pagesectionData = {}
  let pageSection = []
  let pageList = $('.book_last').find('dd')
  pagesectionData.totalPage = Math.ceil(pageList.length / 20)  // 所有章节的页数
  let prelen = currentPage  * 20 
  for(let i =prelen + 1;i < (prelen + 21);i++) {
    let obj = {}
    obj['sectionName'] = $(pageList[i]).find('a').text()
    obj['url'] = $(pageList[i]).find('a').attr('href')
    pageSection.push(obj)
  }
  pagesectionData['currentPage'] = pageSection
  return {
    pagesectionData
  }
}