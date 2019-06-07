(function($){
	$.fn.FileUpload=function(options){
       var settings = $.extend({
            class: "container_anexo",
            backgroundColor: "white",
            selectAFile:"Favor selecione um arquivo para anexar!",
            errFileSize:"Tamanho do arquivo excede o permitido (8mb)!",
            MaxFileSize:8388608,
            urlTarget:'',
            data: null,
            type:'POST',
           callBackSuccess:function (data) {},
           callBackError: function (data) { }, 
           callBackComplete: function (data) { }, 
           callBackFileSizeErr: function () { alert(settings.errFileSize); }, 
           callBackFileEmptyErr: function () { alert(settings.selectAFile); }, 
        }, options );


       this.fileName=function(){
       		return document.getElementById("fileEvidencia").files[0].name;
       }

		if(!this.prop('data-uploado')){
			this.prop('data-uploado',true);
	   		this.append('<div class="form-row" style="margin-left: 20px; margin-right: 20px;"><div class="row"><form id="formAnexo" method="post" enctype="multipart/form-data"><div class="form-group"><div class="input-group input-file" name="Fichier1"><span class="input-group-btn"><button class="btn btn-default btn-choose" title = "Clique aqui para escolher o anexo" id="chooseFile" type="button"><i class="fas fa-paperclip"></i>&nbsp;Escolha</button></span><input type="text" style="cursor:pointer;"  title ="Clique aqui para escolher o anexo" id="textFile" class="form-control" readonly placeholder="Escolha algum arquivo para anexar"/><input type="file" style="cursor:pointer;display:none" id="fileEvidencia" name="evidencia" ><span class="input-group-btn"><button class="btn btn-primary" id="enviarAnexo"  title = "Clique aqui para enviar o anexo" type="button"><div style="display:none" class="loader" id="enviarLoader">Loading...</div><div id="lblBtnEnviar">Enviar</div></button></span></div></div><hr/></form></div></div>');
	   		
	   		$('#chooseFile ,#textFile').on('click',function(){
	            $('#fileEvidencia').trigger('click');
	        });

	        $('#fileEvidencia').on('change',function(){
	            $('#textFile').val( document.getElementById("fileEvidencia").files[0].name);
	        });

	        $("#enviarAnexo").on('click',function(){
	            
	            if($('#textFile').val()=="") {
                     settings.callBackFileEmptyErr();
	            }
	            else{
                    var tamanhoArquivo = parseInt(document.getElementById("fileEvidencia").files[0].size);
                    if (tamanhoArquivo > settings.MaxFileSize) { 
                        settings.callBackFileSizeErr();
	                    return false;
	                }
	                   var formdata = new FormData($('#formAnexo')[0]);
	                    $.each(settings.data, function( key,value){
	                   		formdata.append(key,value);
                    });
	                    $.ajax({
                            type:settings.type,
	                        url: settings.urlTarget,
	                        data: formdata ,
	                        processData: false,
	                        contentType: false,
	                        beforeSend: function() {
	                            $('#enviarLoader').show();
	                            $('#lblBtnEnviar').hide();
	                            $('#formAnexo').addClass('disabledbutton');
	                        },
	                        success: function(data) {
                                settings.callBackSuccess(data);
	                        },
                            error: function (data) {
                                settings.callBackError(data);
	                        },
                            complete: function (data) {
	                            $('#enviarLoader').hide();
	                            $('#lblBtnEnviar').show();
                                $('#formAnexo').removeClass('disabledbutton');
                                settings.callBackComplete(data);
	                        }

	                    });
	                return false;
	            }
	        });

	        return this.css({
	            class: settings.class,
	            backgroundColor: settings.backgroundColor
	        });	
		}else{
			return this;
		}
	};
	
}(jQuery));