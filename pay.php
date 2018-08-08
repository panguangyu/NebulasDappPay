<?php

	if(!isset($_GET['addr'])){
		
		exit;
	}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>扫码支付NAS - 确认信息</title>

    <!-- Bootstrap Core CSS -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">

    <!-- Main stylesheet -->
    <link href="assets/css/hallooou.css" rel="stylesheet">

    <!-- Color stylesheet -->
    <!-- <link href="assets/css/colors.css" rel="stylesheet"> -->
    <!-- <link href="assets/css/colors_2.css" rel="stylesheet"> -->
    <!-- <link href="assets/css/colors_3.css" rel="stylesheet"> -->
    <!-- <link href="assets/css/colors_4.css" rel="stylesheet"> -->


    <!-- Plugin stylesheets -->
    <link href="assets/css/plugins/owl.carousel.css" rel="stylesheet">
    <link href="assets/css/plugins/owl.theme.css" rel="stylesheet">
    <link href="assets/css/plugins/owl.transitions.css" rel="stylesheet">
    <link href="assets/css/plugins/animate.css" rel="stylesheet">
    <link href="assets/css/plugins/magnific-popup.css" rel="stylesheet">
    <link href="assets/css/plugins/jquery.mb.YTPlayer.min.css" rel="stylesheet">


    <!-- Custom Fonts -->
    <link href="assets/css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Raleway:100,600' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300' rel='stylesheet' type='text/css'>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <script>
        document.createElement('video');
      </script>
    <![endif]-->

</head>

<body id="home">
            <!-- Navigation -->
            <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
                <div class="container">
                    <div class="navbar-header pull-left">
                        <a class="navbar-brand page-scroll" href="#page-top">
                            <!-- replace with your brand logo/text -->
                            <span class="brand-logo">扫码支付NAS</span>
                        </a>
                    </div>
                    <div class="main-nav pull-right">
                        <div class="button_container toggle">
                            <span class="top"></span>
                            <span class="middle"></span>
                            <span class="bottom"></span>
                        </div>
                    </div>
                </div><!-- /.container -->
            </nav>

			<section id="services" class="services content-section">
                <div class="container">
                    <div class="row text-center">
                        <div class="col-md-12">
                            <h2>扫码成功</h2>
                            <h3 class="caption gray">您将转账给商家：<span id='sellerName'></span></h3>
                        </div><!-- /.col-md-12 -->

                        <div class="container">
                            <div class="row text-center">
                                <div class="col-md-12">
                                    <div class="row services-item text-center wow flipInX" data-wow-offset="10">
                                        <i class="fa fa-cogs fa-3x"></i>
                                        <h4>确认信息无误后，点击确认并在chrome钱包的浏览器中支付</h4>
									
										<span id='text'>
										<p style='margin-top:20px;margin-bottom:10px;'>支付金额(单位NAS)：<input type='text' value='' style='color:black' id='nas'/></p>
										
										<p style='margin-top:20px;margin-bottom:10px;'><a href="javascript:save()" class="btn btn-default btn-lg">确认信息</a></p>
										</span>
                                    </div><!-- /.row -->
                                </div><!-- /.col-md-4 -->

                          
                            </div><!-- /.row -->
                        </div><!-- /.container -->

                    </div><!-- /.row -->
                </div><!-- /.container -->
            </section><!-- /.section -->
         


    <!-- jQuery -->
    <script src="assets/js/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="assets/js/bootstrap.min.js"></script>

		<script type="text/javascript" src="./dist/nebulas.js"></script>

    <script type="text/javascript" src="./dist/nebPay.js"></script>
	<script>
	"use strict";
    var dappContactAddress = "n1vG4cNrVj5rphz9NjG2QXw28nQodioyXVd";
    var nebulas = require("nebulas"), Account = Account, neb = new nebulas.Neb();
    neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"))


    var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
    var nebPay = new NebPay();
    var serialNumber
	
	$(function(){
		
			var addr = '<?php if(isset($_GET['addr'])) echo $_GET['addr'];?>';
			
			var from = dappContactAddress
			var value = "0";
			var nonce = "0"
			var gas_price = "100000"
			var gas_limit = "200000"
			var callFunction = "getPay"
			var callArgs = '["' + addr + '"]';
			        var contract = {
				"function": callFunction,
				"args": callArgs
			}
			
			neb.api.call(from, dappContactAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
				var result = resp.result;
	
				result = JSON.parse(result);
				
				console.log(result);
				
				$("#sellerName").html(result.sellerName);
				
			}).catch(function (err) {
			
				//console.log(1);

			})
	});
		
		function save() {
			var nas = $("#nas").val();
			var sellerWallet = '<?php if(isset($_GET['addr'])) echo $_GET['addr'];?>';
			var tradeid = <?php echo time();?>
	
			if (!nas) {
				alert("请填写nas金额");
				return;
			}
			
			if (sellerWallet.length!=35) {
				alert("钱包地址不正确");
				return;
			}
			
			$.ajax({
				
				type:"post",
				url:"./data.php", 
				data:{"tradeid":tradeid, "nas":nas, "sellerWallet":sellerWallet}, 
				success:function(){
					
					$("#text").html("<p style='margin-top:20px;margin-bottom:10px;'>交易号为：<?php echo time();?></p>");
					
				}
			});
		
		}
		
		</script>
	
    <!-- Plugin JavaScript -->
    <script src="assets/js/plugins/wow.min.js"></script>
    <script src="assets/js/plugins/owl.carousel.min.js"></script>
    <script src="assets/js/plugins/jquery.parallax-1.1.3.js"></script>
    <script src="assets/js/plugins/jquery.magnific-popup.min.js"></script>
    <script src="assets/js/plugins/jquery.mb.YTPlayer.min.js"></script>
    <script src="assets/js/plugins/jquery.countTo.js"></script>
    <script src="assets/js/plugins/jquery.inview.min.js"></script>
    <script src="assets/js/plugins/pace.min.js"></script>
    <script src="assets/js/plugins/jquery.easing.min.js"></script>
    <script src="assets/js/plugins/jquery.validate.min.js"></script>
    <script src="assets/js/plugins/additional-methods.min.js"></script> 

	

</body>

</html>
