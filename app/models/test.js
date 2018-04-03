import Knex from 'knex';
import validate from 'validate';
import md5 from 'md5';


import configs from '../configs/index';

const knex = Knex(configs.knexConfig);


export default class ModelTest{
  static async save(data){
    //console.log(data);
    let result = await knex('test_data')
                       .insert(data);

    if(result[0]){
      return true;
    }else{
      return false;
    }
  }
//将获取到的数据存入到数据库
static async save_diaocha(data_diaocha){
    // console.log(data_diaocha['调查人员']);
    let insert_data = {}
    let id = await knex.column('id').select().from('diaocha');
    // console.log(id);
    insert_data.diaocha_person = data_diaocha['调查人员'];
    insert_data.peitong_person = data_diaocha['陪同人员'];
    insert_data.diaocha_phone = data_diaocha['调查人员联系电话'];
    insert_data.peitong_phone = data_diaocha['陪同人员联系电话'];
    insert_data.beizhu = data_diaocha['备注'];
    insert_data.diaocha_id = id.length+1;
    // console.log(insert_data.diaocha_person);
    let result_diaocha = await knex('diaocha').insert(insert_data);
    return result_diaocha;
}
//获取调查依据栏目中的数据
  static async get_diaocha_sql(){
      // console.log('========run=======');
      let diaocha_data = await knex.column('diaocha_id','diaocha_person','peitong_person','diaocha_phone',
      'peitong_phone','beizhu').select().from('diaocha');
      // console.log(diaocha_data);
      // var json_arr=JSON.stringify(diaocha_data);
      // console.log(json_arr[1]);
      return diaocha_data;
  }
//存储企业基本情况表
  static async save_company(data_company){
    let insert_company_data = {};
    let id = await knex.column('id').select().from('company');
    insert_company_data.id_company = id.length+1;  //id_company
    insert_company_data.danwei_name = data_company['单位名称'];
    insert_company_data.faren = data_company['法定代表人'];
    insert_company_data.address = data_company['通讯地址']+data_company['详细地址'];
    // console.log(insert_company_data.address);
    insert_company_data.lianxi = data_company['联系人'];
    insert_company_data.lianxi_phone = data_company['联系电话'];
    insert_company_data.zhuce_money = data_company['注册资金'];
    insert_company_data.pre_year_money = data_company['上一年销售额'];
    insert_company_data.guimo = data_company['企业规模'];
    let result_company = await knex('company').insert(insert_company_data);
    return result_company;
  }
//存储项目情况数据进入数据库
  static async save_project(data_project){
    let insert_project = {}
    let id = await knex.column('id').select().from('project_case');
    insert_project.project_id = id.length+1;
    insert_project.leiji = data_project['前三年项目累计'];
    insert_project.project_name = data_project['项目名称'];
    insert_project.money = data_project['投入资金'];
    insert_project.lx_time = data_project['立项时间'];
    insert_project.cailiao = data_project['材料'];
    insert_project.content = data_project['内容用途领域成果'];
    let result_project = await knex('project_case').insert(insert_project);
    return result_project;
  }

  存储研发中心基本情况数据进入数据库
  static async save_yanji(data_yanji){
      console.log(data_yanji);
      let insert_yanji = {}   //研发中心总表
      let insert_people = {}  //人员总表
      let insert_finance = {} //财务总表
      let insert_patent = {}  //专利总表
      let insert_manage = {}  //管理制度总表
      let id = await knex.column('id_yanfa_case').select().from('yanfa_case');
      let insert_id = id.length+1;
      // console.log(insert_id);
      //将数据插入研发总表
      insert_yanji.field = data_yanji['领域'];
      insert_yanji.degree = data_yanji['程度'];
      insert_yanji.id_yanfa_people = insert_id;
      insert_yanji.id_yanfa_finance = insert_id;
      insert_yanji.id_yanfa_patent = insert_id;
      insert_yanji.id_yanfa_manage = insert_id;
      let result_yanji = await knex('yanfa_case').insert(insert_yanji);
      // console.log('研发',result_yanji);

      //将数据插入人员总表
      insert_people.id_yanfa_people = insert_id;
      insert_people.doctor = data_yanji['博士'];
      insert_people.master = data_yanji['硕士'];
      insert_people.college_stu = data_yanji['本科'];
      insert_people.other = data_yanji['大专及以下'];
      let result_people = await knex('yanfa_people').insert(insert_people);
      // console.log('人员',result_people);
      //讲数据插入财务总表
      insert_finance.id_yanfa_finance = insert_id;
      insert_finance.assets = data_yanji['资产增长率'];
      insert_finance.sales = data_yanji['销售增长率'];
      let result_finance = await knex('yanfa_finance').insert(insert_finance);
      // console.log('财务',result_finance);
      //将数据插入专利总表
      insert_patent.id_yanfa_patent = insert_id;
      insert_patent.foreign = data_yanji['国外专利'];
      insert_patent.domestic = data_yanji['国内发明专利'];
      insert_patent.shiyong = data_yanji['实用新型'];
      insert_patent.softly = data_yanji['软著'];
      insert_patent.waiguan = data_yanji['外观设计'];
      insert_patent.ic = data_yanji['集成电路'];
      // console.log('集成电路',insert_patent.ic);
      insert_patent.new_varieties = data_yanji['新品种'];
      let result_patent = await knex('yanfa_patent').insert(insert_patent);
      // console.log('专利',result_patent);
      //将数据插入管理制度总表
      insert_manage.id_yanfa_manage = insert_id;
      insert_manage.ms_one = data_yanji['管理制度1'];
      insert_manage.ms_two = data_yanji['管理制度2'];
      insert_manage.ms_three = data_yanji['管理制度3'];
      insert_manage.ms_four = data_yanji['管理制度4'];
      let result_manage = await knex('yanfa_manage').insert(insert_manage);
      // console.log('管理',result_manage);

      if (result_yanji[0] !=0){
          if(result_people[0] !=0){
            if(result_finance[0] !=0){
              if(result_patent[0] !=0){
                if(result_manage[0] !=0){
                    return 'success';

                }else{
                  return 'manageWrong';
                }
              }else{
                return 'patentWrong';
              }
            }else{
              return 'financeWrong';
            }
          }else{
            return 'peopleWrong';
          }
      }else{
        return 'yanjiWrong';
      }
      return 'wrong'
  }


}
