'use strict';
import Knex from 'knex';
import validate from 'validate';
import md5 from 'md5';
import configs from '../configs/index';

const knex = Knex(configs.knexConfig);

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
    try{
      ctx.session.user = {data: "session"};
      let data = {
        data: "123456",
        time: Date.now()
      }
      let result = await ModelTest.save(data);
      console.log(result)
      if(result == true){
        console.log(ctx.session);
        ctx.body = {data: "hello world"};
      }else{
        ctx.body = {data: "hello world"};
      }
    }catch(err){
      console.log(err)
      throw err;
    }

  }

//接收调查页面提交的数据
  static async tijiao(ctx, next){
      let data_diaocha = ctx.request.body;
      console.log(data_diaocha);
      let result = await ModelTest.save_diaocha(data_diaocha);
      console.log(result);
      if(result[0] != 0){
        console.log("插入数据成功！");
      }else{
        console.log("插入数据失败！");
      }
  }
  //获取到提交页面存放在数据库中是数据
  static async get_diaocha(ctx,next){
    // let data = ModelTest.get_diaocha_sql();   //get_diaocha_sql() 获取数据库数据，并且返回该数据
    // console.log('=============================run================================');
    // console.log(data[0]['diaocha_person']);
    // let diaocha_putdata = {}
    let diaocha_data = await knex.column('diaocha_id','diaocha_person','peitong_person','diaocha_phone',
    'peitong_phone','beizhu').select().from('diaocha');    //从数据库中获取数据
    console.log(diaocha_data);
    // diaocha[0](diaocha_person);
    // for(var i=0; i< diaocha_data.length;i++){
    //   diaocha_putdata['调查人员'] = diaocha_data[i+1].diaocha_person;
    //   diaocha_putdata['陪同人员'] = diaocha_data[i+1].peitong_person;
    //   diaocha_putdata['调查人员联系方式'] = diaocha_data[i+1].diaocha_phone;
    //   diaocha_putdata['陪同人员联系方式'] = diaocha_data[i+1].peitong_phone;
    //   diaocha_putdata['备注'] = diaocha_data[i+1].beizhu;
    // }

    ctx.body = diaocha_data[diaocha_data.length-1];      //将数据赋给请求题，返回给前端,这里输出最后一次输入的数据

  }

  //企业基本情况提交
  static async company_tijiao(ctx,next){
    let data_company = ctx.request.body;
    console.log(data_company);
    let result_company = await ModelTest.save_company(data_company);
    if (result_company[0]!=0){
      console.log("插入数据成功！");
    }else{
      console.log("插入数据失败！");
    }

  }
  //企业基本情况数据查找---

//项目情况数据提交
  static async project_tijiao(ctx,next){
    let data_project = ctx.request.body;
    console.log(data_project);
    // let result_project = await ModelTest.save_project(data_project);
    // if (result_project[0]!=0){
      console.log("插入数据成功！");
    // }else{
    //   console.log("插入数据失败！");
    // }

  }

  //研发中心基本情况数据提交
  static async yanji_tijiao(ctx,next){
    let data_yanji = ctx.request.body;
    console.log(data_yanji);
  }

}
