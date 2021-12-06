const conn = require('./mysqlconfig.js');

exports.getAll = function(table,callback) {
        var sql="SELECT * FROM "+ table ;
                               conn.query(sql,function(error,rows){
                                if (error) {
                                  console.log(error);
                                }
                               callback(rows);
                    })
}

exports.createarticle = function(table, datas, callback) {
  var sql="INSERT INTO "+ table +" VALUES(NULL,'"+ datas.nom +"','"+ datas.description +"','"+ datas.prix +"'); ";
  console.log(sql);
  // INSET INTO article VALUE (NULL, 'velo', 'toto',200)
  // 
                conn.query(sql,function(error) {
                  if(error) { console.log(error);}
                  callback();
                })
}

exports.update = function(table, id, datas, callback) {
  var sql="UPDATE "+ table + " SET desciption = '" + datas.description + "', nom = '"+ datas.nom +"', prix = " + datas.prix + "WHERE id = " + id
  console.log(sql);
                conn.query(sql,function(error) {
                  if(error) { console.log(error);}
                  callback();
                })


  exports.getOne = function(table, id, callback) {
    var sql = "SELECT * FROM" + table +" WHERE id = " + id;

                  conn.query(sql,function(error,rows) {
                    if(error) { 
                                console.log(error);
                              }
                    console.log(error);
                  }
                  console.log("ROW:",rows)
                  callback(rows[0]);
                  })

}
              
