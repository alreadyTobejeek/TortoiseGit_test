$(function() {
	$('#submit').click(function(event) {
		// 邮箱验证部分
		var email = $("#exampleInputEmail1").val();
		if (email === "") {
			$('#exampleInputEmail1').focus().addClass('err_style');
			$('#email_err').text('* 邮箱地址不能为空！').addClass('shake');
			setTimeout(function() {
					$('#email_err').removeClass('shake').addClass('shake_after');
				}, 1000);
		} else {
			var reg =  /^([\w]+)+@([\w]+\.){1}(com|cn)$/;	// 验证邮箱的正则表达式
			if (!reg.test(email)) {
				$('#email_err').text("* 邮箱格式错误！").addClass('shake');
				$('#exampleInputEmail1').focus().addClass('err_style');
				setTimeout(function() {
					$('#email_err').removeClass('shake').addClass('shake_after');
				}, 1000);
			} else {
				$('#email_err').text('');
				// 邮箱格式正确,发送数据
				var email_data = {};
				email_data.emailInfo = $('#exampleInputEmail1').attr('value');	// 获取输入框的值并存入对象
				var password_info = $('#confrimInputPassword1').val();
				var ajax_data = JSON.stringify(email_data);	// 将对象转化成JSON格式

				// 查看“记住密码”复选框是否勾选
				var checkbox = $("input[name='checkbox']").is(':checked');
				if (checkbox) {
					$.cookie("User", "true", {expires: 7});	//存储一个带7天期限的cookie
					$.cookie('useEmail', email_data.emailInfo, {expires: 7});
					$.cookie('usePassword', password_info, {expires: 7});
				} else {
					$.cookie("User", "false", {expires: -1});
					$.cookie('useEmail', "", {expires: -1});
					$.cookie('usePassword', "", {expires: -1});
				};

				$.ajax({
					url: 'Json/registery.json',
					type: 'GET',
					dataType: 'json',
					contentType: "application/x-www-form-urlencoded; charset=utf-8",
					data: {email: email_data.emailInfo, password: password_info, checkbox: checkbox},
					error: function(){
						alert("数据传输错误！");
					},
					success: function(err){		// 只有success才能返回，否则后台不返回任何内容
						if(err.error) {
							alert("错误信息为：" + err.message);	// message属性是与后台商定好之后返回的属性值
						} else {
							alert("提交成功");
						}
					}
				});
			}
			}
		});
	$('#reset').click(function(event) {
		$('#email_err').text('');
	});

});





		// // 处理在火狐中的问题（因为FireFox会把文本节点误当做元素节点的兄弟节点来处理）下一个兄弟节点
  //       function nextSibling(node) {
  //           var tempLast = node.parentNode.lastChild;
  //           if (node == tempLast) return null;
  //           var tempObj = node.nextSibling;
  //           while (tempObj.nodeType != 1 && tempObj.nextSibling !== null) {
  //               tempObj = tempObj.nextSibling;
  //           }
  //           return (tempObj.nodeType==1)? tempObj:null;
  //       }
  //       //前一个兄弟节点
  //       function prevSibling(node) {
  //           var tempFirst = node.parentNode.firstChild;
  //           if (node == tempFirst) return null;
  //           var tempObj = node.previousSibling;
  //           while (tempObj.nodeType != 1 && tempObj.previousSibling !== null) {
  //               tempObj = tempObj.previousSibling;
  //           }
  //           return (tempObj.nodeType==1)? tempObj:null;
  //       }