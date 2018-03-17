'use strict';

import ModelTest from '../models/test';

//main
// exports.index = async function(ctx, next){
//   //点击'Project name'， 回到主页，同时删除缓存session
//   delete ctx.session.user;
//   await ctx.render('index', {   //默认后缀名为html
//    title: 'managePlatform'
//  })
// }

export default class Test {
  static async test(ctx, next){
    ctx.session.user = {data: "session"};
    let data = {
      data: "123456",
      time: Date.now()
    }
    let result = ModelTest.save(data);
    if(result == true){
      //console.log(ctx.session);
      ctx.body = {data: "hello world"};
    }else{
      ctx.body = {data: "hello world"};
    }
  }
}
