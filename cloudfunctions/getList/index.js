// 云函数入口文件
const cloud = require('wx-server-sdk')
let superagent = require('superagent') //发送请求获取页面HTML
let cheerio = require('cheerio') //获取dom结构的标签
let charset = require('superagent-charset')
charset(superagent)

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let serverUrl = "https://m.bige7.com/"
 let result = await superagent.get(serverUrl) //网页编码
 const $ = cheerio.load(result.text)
 //热门推荐
 let hotList = $('.hot').find('.image')
 let hotData = [] //热榜数据
 for(let i = 0;i < hotList.length;i++) {
   let obj = {}
   obj['url'] = $(hotList[i]).find('a').attr('href')
   obj['imgUrl'] = $(hotList[i]).find('img').attr('src')
   obj['name'] = $(hotList[i]).find('img').attr('alt')
   obj['author'] = $(hotList[i]).next().find('dt').find('span').text()
   obj['detail'] = $(hotList[i]).next().find('dd').text()
   hotData.push(obj)
 }

 //列表推荐
 let classifyList = $('.block')
 let classifyData = [] //分类
 for(let i = 0;i < classifyList.length;i++) {
  let obj = {}
  let childData = []
  let childDom = $(classifyList[i]).find('.lis').find('li')
  obj['h2'] = $(classifyList[i]).find('h2').text()
  for (let j = 0; j < childDom.length;j++) {
    let childObj = {}
    childObj['type'] = $(childDom[j]).find('.s1').text()
    childObj['name'] = $(childDom[j]).find('.s2').find('a').text()
    childObj['author'] = $(childDom[j]).find('.s3').text()
    childObj['url'] = $(childDom[j]).find('.s2').find('a').attr('href')
    childData.push(childObj)
  }
  obj['data'] = childData
  classifyData.push(obj)
}
 return {
   hotData,
   classifyData
 }
}