$(function() {
	$('#submit').click(function(event) {
		// 邮箱验证部分
		var email = $("#find_password").val();
		if (email === "") {
			$('#find_password').focus().addClass('err_style');
			$('#email_err').text('* 验证的邮箱不为空！').addClass('shake');
			setTimeout(function() {
					$('#email_err').removeClass('shake').addClass('shake_after');
				}, 1000);
		} else {
			var reg =  /^([\w]+)+@([\w]+\.){1}(com|cn)$/;	// 验证邮箱的正则表达式
			if (!reg.test(email)) {
				$('#email_err').text("* 验证邮箱格式错误！").addClass('shake');
				$('#find_password').focus().addClass('err_style');
				setTimeout(function() {
					$('#email_err').removeClass('shake').addClass('shake_after');
				}, 1000);
			} else {
				$('#email_err').text('');
				// 邮箱格式正确,验证验证码是否为空与正确
				var code_input = $('#code_input').val();
				if (code_input === "") {
					$('#code_input').focus().addClass('err_style');
					$('#email_err').text('* 验证码不为空！').addClass('shake');
					setTimeout(function() {
						$('#email_err').removeClass('shake').addClass('shake_after');
					}, 1000);
				} else{
					// 验证验证码输入是否正确
					var data = 'code_input=' + code_input;
					 //向客户端ajax发送数据
					$.ajax({
						type: "post",
						url: "",
						dataType: "json",
						data: data,			// 此data即为前台获取的数据，用于返给后台
									success: function(dataReturn) {	// dataReturn为后台访问成功返回的数据，自命名
										if (dataReturn == "false") {
											$("form").submit(function(event) {
												event.preventDefault();
											});
										} else {
											GetMoreSource();
										}
									},
									error: function() {
										alert("数据返给后台出错！");
									},
					});
				}

			}
		}
	});
	$('#reset').click(function(event) {
		$('#email_err').text('');
	});

});

