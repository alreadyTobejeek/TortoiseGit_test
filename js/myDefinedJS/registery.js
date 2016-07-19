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
				// 检查两次密码是否一致
				var password = $('#exampleInputPassword').val();
				var confirm_Password = $('#confrimInputPassword1').val();
				if (password !== confirm_Password) {
					$('#confrimInputPassword1').focus().addClass('err_style');	// 多个输入框时只能有一个focus
					$('#pwd_err').text('* 两次密码不一致！').addClass('shake');
					setTimeout(function() {
					$('#pwd_err').removeClass('shake').addClass('shake_after');
				}, 1000);
				} else {
					// 邮箱格式正确,两次密码一致，发送数据
					var email_data = {};
					email_data.emailInfo = $('#exampleInputEmail1').attr('value');	// 获取输入框的值并存入对象
					var ajax_data = JSON.stringify(email_data);	// 将对象转化成JSON格式

					$.ajax({
						url: 'Json/registery.json',
						type: 'GET',
						dataType: 'json',
						contentType: "application/x-www-form-urlencoded; charset=utf-8",
						data: {email: email_data.emailInfo, password: $('#confrimInputPassword1').val()},
						error: function(){
							alert("数据传输错误！");
						},
						success: function(err){
							if(err.error) {
								alert("错误信息为：" + err.message);
							} else {
								alert("提交成功");
								// 提交后跳转到登录页面
								window.location.href = "login.html";
							}
						}
					});
				}
			}
		}
	});
	$('#reset').click(function(event) {
		$('#email_err').text('');
	});

});