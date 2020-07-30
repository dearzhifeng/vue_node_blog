/*
  返回到前台得msgCode:
  0:成功


 */

var sqlMap = {
  // 用户
  user: {
    login: 'select * from users where username = ? ',
    add: 'insert into users(username,password,email,phone) values (?,?,?,?) ',
    querynum:'select count(*) from users where username like ?',
    queryAll: 'select * from users where username like ? limit ? offset ?',
    querybyid:'select * from users where id = ?',
    updatestate:'update users set state = ? where id = ? ',
    updateusers:'update users set username = ?,password=?, email=?,phone=? where id = ? ',
    deleteuser:'delete from users where id = ?'
  },
  // 标签
  label: {
    add: 'insert into labels(labelname) values (?) ',
    querynum:'select count(*) from labels where labelname like ?',
    queryAll: 'select * from labels where labelname like ? limit ? offset ?',
    edit: 'update labels set labelname = ? where id = ? ',
    delete:'delete from labels where id = ?',
    getalllabelsname:'select labelname from labels'
  },
  // 分类
  category: {
    add: 'insert into categories(categoryname) values (?) ',
    querynum:'select count(*) from categories where categoryname like ?',
    queryAll: 'select * from categories where categoryname like ? limit ? offset ?',
    edit: 'update categories set categoryname = ? where id = ? ',
    delete:'delete from categories where id = ?',
    getallcategoriesname:'select categoryname from categories'
  },
  //文章
  article:{
    add: 'insert into articles(title,category,labels,author,cover,content,html,createtime) values (?,?, ?, ?, ?, ?, ?, ?)',
    querynum:'select count(*) from articles where title like ?',
    queryAll: 'select * from articles where title like ? limit ? offset ?',
    querybyid:'select * from articles where id = ?',
    updatestate:'update articles set state = ? where id = ? ',
    edit: 'update articles set title = ?,category = ?,labels = ?,cover = ?,content = ?,html = ? where id = ? ',
    delete: 'delete from articles where id = ?',

    blogquerynumbytitle:'select count(*) from articles where title like ? AND state = true',
    blogquerybytitle:'select * from articles where title like ? AND state = true limit ? offset ?',
    blogquerybycategory:'select * from articles where category like ? AND state = true',
    blogquerynumbycategory:'select count(*) from articles where category like ? And state = true',
    blogquerybylabel:'select * from articles where labels like ? AND state = true',
    blogquerynumbylabel:'select count(*) from articles where labels like ? And state = true limit ? offset ?',
    blogqueryNew:'select title,id from articles where  state = true  order  by createtime desc limit 5 offset 0 '
  },

}
module.exports = sqlMap;
