import { calendarTime } from "../utils/formatDate";

// 搜索书名
export function do_searchbook(input_bookname) {
  if (!input_bookname) {
    this.tableData1 = this.tableData;
    this.$message.warning("请输入要查询的书名");
    return false;
  } else {
    //逻辑-->根据input的value值筛选books中的数据
    var arrByZM = []; //声明一个空数组来存放数据
    for (var i = 0; i < this.tableData.length; i++) {
      //for循环数据中的每一项（根据name值）
      if (this.tableData[i].bookname.search(input_bookname) != -1) {
        //判断输入框中的值是否可以匹配到数据，如果匹配成功
        arrByZM.push(this.tableData[i]);
        //向空数组中添加数据
      }
    }
    //一定要记得返回筛选后的数据
    return (this.tableData1 = arrByZM);
  }
}
// 搜索日期
export function do_searchtime(value_borrowtime) {
  var NewItemtimes = [];
  if (!value_borrowtime) {
    this.tableData1 = this.tableData;
    this.$message.warning("请输入要查询的借出日期");
    return false;
  } else {
    var date_value = calendarTime(value_borrowtime);
    NewItemtimes = this.tableData.filter(function(item1) {
      return item1.date === date_value;
    });
    return (this.tableData1 = NewItemtimes);
  }
}
// 续借
export function do_renewal(renewal_time) {
  // 将勾选内容的长度赋值在select，判断是否勾选书籍
  var select = this.multipleSelection.length;
  // 校验输入是否是数字
  let reg = /^[1-9]\d*$/;
  if (renewal_time) {
    if (!reg.test(renewal_time)) {
      this.$message.error("输入框只能输入1-30的数字！");
      return false;
    } else {
      if (select === 0) {
        this.$message.error("请勾选需要续借的书籍！");
        return false;
      } else {
        for (const gx of this.multipleSelection) {
          if (gx.yn === "是") {
            this.$message.error("请借阅后再操作！");
            return false;
          } else {
            this.$ajax({
              url: "/api/bookBorrowContinue",
              method: "post",
              data: {
                time: renewal_time,
                _id: gx.bookid,
                _userId: gx.userid
              }
            }).then(res => {
              if (res.data.code === 200) {
                gx.remainder_days += parseInt(renewal_time);
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        }
      }
    }
  } else {
    this.$message.warning("请输入续借时间！");
    return false;
  }
}
// 还书
export function do_return() {
  // 将勾选内容的长度赋值在select，判断是否勾选书籍
  var select = this.multipleSelection.length;
  if (select === 0) {
    this.$message.error("请勾选需要归还的书籍！");
    return false;
  } else {
    for (const gx of this.multipleSelection) {
      if (gx.yn === "是") {
        this.$message.warning("书籍已归还，请勿重复操作！");
      } else {
        this.$confirm("是否确定归还该书？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // 确定
            this.$ajax({
              url: "/api/returnBook",
              method: "post",
              data: {
                _id: gx.bookid,
                _userId: gx.userid
              }
            }).then(res => {
              this.$message.success(res.data.msg);
              for (const item in this.tableData) {
                if (this.tableData[item].bookid === gx.bookid) {
                  this.tableData.splice(item, 1);
                }
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消归还"
            });
          });
      }
    }
  }
}
// 点击书名跳转书籍详情借阅页
export function borrowbook(index, row) {
  console.log(row)
  this.$router.push({
    name: "borrowbook",
    params: {
      bookid: row.bookid
    }
  });
}
