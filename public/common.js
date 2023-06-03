$(document).ready(function(){
        $(".opt-btn a").each(function(){
            if(($(this).text()).toLowerCase()==location.pathname.replace("/","")){
                $(this).addClass('active')
            }
            else if(location.pathname.replace("/","")==''){
                if(($(this).text()).toLowerCase()=='url')
                    $(this).addClass('active')
            }
        })
        $('#generate').click(function(){
            let finLink = "";
            onPass = function(e){
                $('.imgQR').append(`<img src="${e.data}" >`);
                $('.imgQR img').css({height:"250px",width:"250px"});
                $('.img-box').css({display:"block"});
                $('#download').attr('href',`/download?file_path=${e.path}`);
            }
            switch (location.pathname){
                case '/url':
                    finLink = $('input').val();
                    break;
                case '/text':
                    finLink = $('input').val();
                    break;
                case '/youtube':
                    finLink = $('input').val();
                    break;
                case '/upi':
                    if($('#withAcc').prop('checked')==true){
                        finLink = { 
                            type:  'withAcc',
                            accName : $("#accName").val(),
                            accNumber : $("#accNumber").val(),
                            accIFSC : $("#accIFSC").val(),
                            ammount : ($('#amtEnter').val()!="" ? $('#amtEnter').val() : 0)
                            }
                    }
                    else if($('#withUPI').prop('checked')==true){
                        finLink = { 
                            type:  'withUPI',
                            upiName : $("#upiName").val(),
                            upiId : $("#upiId").val(),
                            ammount : ($('#amtEnter').val()!="" ? $('#amtEnter').val() : 0)
                            }
                    }
                    break;
                case '/email':
                    finLink = { 
                        emailId: $('#emailId').val(), 
                        subType: $('#subType').val(),
                        msgtext: $('#msgtext').val(),
                    }
                    break;
                case '/sms':
                        finLink = { 
                            phoneNo: $('#phoneNo').val(), 
                            msgtext: $('#msgtext').val(),
                        }
                    break;
                case '/facebook':
                    if($('#fbUrl').prop('checked')==true)
                        finLink = $('#fbText').val();
                    else
                        finLink = $('#shareText').val();
                    break;
                case '/twitter':
                    if($('#twitterUrl').prop('checked')==true)
                        finLink = $('#twUrl').val();
                    else
                        finLink = $('#msgtext').val()
                    break;
                }
            WebCall({link:finLink},onPass);
        })
        $('#reset').click(function(){
            $('input').val("");
            $('.img-box').css({display:"none"});
            $('.imgQR').empty();
            $('textarea').val("");
        })
        $('input[type="radio"]').change(function(){
           if($(this).attr('id')=='withAcc'){
                $('.box-Acc').css('display','block');
                $('.box-Upi').css('display','none');
           }
           else if($(this).attr('id')=='withUPI'){
                $('.box-Acc').css('display','none');
                $('.box-Upi').css('display','block');
           }
           else if($(this).attr('id')=='fbUrl'){
                $('.box-fb').css('display','block');
                $('.box-share').css('display','none');
           }
           else if($(this).attr('id')=='shareUrl'){
                $('.box-fb').css('display','none');
                $('.box-share').css('display','block');
           }
           else if($(this).attr('id')=='twitterUrl'){
                $('.box-twitter').css('display','block');
                $('.box-tweet').css('display','none');
            }
            else if($(this).attr('id')=='tweet'){
                $('.box-twitter').css('display','none');
                $('.box-tweet').css('display','block');
            }
        })
        $('#withAmount').change(function(){
            $(this).prop('checked') ? $('.box-amt').css('display','block') : $('.box-amt').css('display','none');
            $('#amtEnter').val('');
        })
        function WebCall(Data,onPass){
            $.ajax({
                type:"POST",
                url:location.pathname, 
                data:Data,
                dataType:"json",
                success: onPass             
            })
        }
        if(location.pathname=="/")
            location.replace("/url");
        
        //Google Map
        let map;
        async function initMap() {
        const { Map } = await google.maps.importLibrary("maps");
        map = new Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        }

        initMap();
});
