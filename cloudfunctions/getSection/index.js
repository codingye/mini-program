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
  let bookDetailData = {}
    bookDetailData['name'] = $('.book_info').find('.cover').find('img').attr('alt')
    bookDetailData['imgurl'] = $('.book_info').find('.cover').find('img').attr('src')
    bookDetailData['author'] = $('.book_info').find('.book_box').find('.dd_box').eq(0).find('span').eq(0).text()
    bookDetailData['status'] = $('.book_info').find('.book_box').find('.dd_box').eq(1).find('span').eq(0).text()
    bookDetailData['update'] = $('.book_info').find('.book_box').find('.dd_box').eq(2).find('span').eq(0).text()
    bookDetailData['detail'] = $('.book_about').find('dd').text()

    //获取章节列表
    let sectionListData = []
    let sectionList = $('.book_last').find('dd')
    for(let i = 0;i < sectionList.length;i++) {
      let obj = {}
      obj['url'] = $(sectionList[i]).find('a').attr('href')
      obj['section'] = $(sectionList[i]).find('a').text()
      sectionListData.push(obj)
    }

    //
  return {
    bookDetailData,
    sectionListData
  }
}