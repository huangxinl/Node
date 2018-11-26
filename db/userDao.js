var pool = require('./pool')
var dao = {}

dao.login = function (user,res) {
    pool.getConnection((err, connection) => {
        if (err)
            throw err      
            console.log(user.username ,user.password)
        connection.query(`select * from table1 where username=${user.username} and password=${user.password}`,
        (err, result) => {
            if( result.length > 0){
                if(user.remember) {
                    // console.log('登录')
                    console.log(result)
                    res.cookie("userId", result[0].id,{ maxAge: 1000 *10*60})
                }
                res.send('登录成功')
            }else{
                res.send('登录失败')
            }
            connection.release()
        })
    })
}
dao.register = (user,res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err
            var sql = `insert into table1(username,password) values(?,?)`
        connection.query(sql, [user.username,user.password],
        (err, result) => {
            // console.log('注册')
           if(err)
           throw err
           console.log(result)
           connection.release()
           res.send('注册成功')
        })
    })
}
dao.selectUserById = (userId,res) => {
    pool.getConnection((err,connection) => {
        if(err)
            throw err
        var sql = `select id,username,password from table1 where id=?`   //少写了id 导致查不到id值
        connection.query(sql,[userId],(err,result) =>{   //坑逼这里代码都能写错改了半天
            if(err)
                throw err
                // console.log('获取userId')
            console.log(result)                  
            res.render('register',{user:result[0], title:"用户更新"})
            connection.release()
     
        })
    })
}
dao.updateUserById = (user,res) => {
    pool.getConnection((err,connection) => {
        if(err)
            throw err
        var sql = `update table1 set username=?,password=? where id=?`
        connection.query(sql,[user.username,user.password,user.id],(err,result) =>{
            if(err)
                throw err
                // console.log('更新数据')
                console.log(result)
        res.send('更新成功')
        connection.release()
        })
    })
}
// dao.delete = (userId,res) => {
//     pool.getConnection((err,connection) => {
//         if(err)
//             throw err
//         var sql = `delete from table1 where id=?`
//         connection.query(sql,[userId],(err,result) =>{
//             if(err)
//                 throw err
//                 // console.log('更新数据')
//                 console.log(result)
//         // res.send('删除成功')
//         res.json({
//             result:"删除成功"
//         })
//         connection.release()
//         })
//     })
// }

module.exports = dao;