// const lipsum = require('lipsum-zh');
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const Mock = require('mockjs');
const { fakerZH_CN } = require('@faker-js/faker');

/**
 * 随机生成指定段数的英文文本
 * @param {Number|string} count 
 */
const randomParagraph = (count) => {
  return Mock.Random.paragraph( Number(count) )
}

/**
 * 随机生成指定段数的中文文本
 * @param {Number|string} count 
 */
const randomCnParagraph = (count) => {
  return Mock.Random.cparagraph( Number(count) )
}

/**
 * 生成随机指定单词个数的英文字符
 * @param {Number|string} count 
 * @returns 
 */
const randomEnText = (count) => {
  // const lorem = new LoremIpsum({
  //   sentencesPerParagraph: {
  //     max: 8,
  //     min: 4
  //   },
  //   wordsPerSentence: {
  //     max: 16,
  //     min: 4
  //   }
  // });
  // const insertText = lorem.generateWords(Number(count));
  const insertText = Mock.Random.sentence( Number(count) );
  return insertText;
}

/**
 * 生成随机指定字母个数的英文字符
 * @param {Number|string} count 
 * @returns 
 */
const randomEnWord = (count) => {
  const insertText = Mock.Random.word( Number(count) );
  return insertText;
}

/**
 * 生成随机指定个数的中文字符
 * @param {Number|string} count 
 * @returns 
 */
const randomCnText = (count) => {
  // const insertText = lipsum.generateText(Number(count));
  const insertText = Mock.Random.csentence( Number(count) );
  return insertText;
}

/**
 * 生成随机时间
 * @returns 
 */
const randomTime = () => {
  const insertText = Mock.Random.time( 'yyyy-MM-dd A HH:mm:ss SS' );
  return insertText;
}

/**
 * 生成随机uuid
 * @returns 
 */
const randomUuid = () => {
  const insertText = Mock.Random.guid();
  return insertText;
}

/**
 * 生成随机电话
 * @returns 
 */
const randomPhone = () => {
  const insertText = fakerZH_CN.phone.number();
  return insertText;
}

/**
 * 生成随机地址
 * @returns 
 */
const randomAddress = () => {
  const insertText = `${Mock.Random.county(true)} ${fakerZH_CN.location.streetAddress()}`;
  return insertText;
}

/**
 * 生成随机邮箱
 * @returns 
 */
const randomEmail = () => {
  const insertText = fakerZH_CN.internet.email();
  return insertText;
}

/**
 * 生成随机url
 * @returns 
 */
const randomUrl = () => {
  const insertText = fakerZH_CN.internet.url();
  return insertText;
}

/**
 * 生成随机姓名
 * @returns 
 */
const randomUsername = () => {
  const insertText = fakerZH_CN.person.fullName();
  return insertText;
}


module.exports = {
  randomEnText,
  randomCnText,
  randomParagraph,
  randomCnParagraph,
  randomEnWord,
  randomTime,
  randomUuid,
  randomPhone,
  randomAddress,
  randomEmail,
  randomUrl,
  randomUsername
}