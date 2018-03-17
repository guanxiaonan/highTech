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
}
